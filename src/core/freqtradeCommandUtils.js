// Logger
var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "debug";
var syncRequest = require('sync-request');


// Getting login data using open API from freqtrade
export const loginInAPI = (node) => {

    // Get the target Path
    const targetPath = node.targetPath;
    const portEndNumber = targetPath.substring (targetPath.length - 3, targetPath.length-1);
    const port = "100" + portEndNumber;

    // Sync request
    var res = syncRequest(
        'POST',
        'http://localhost:' + port + '/api/v1/token/login', {
            headers: {'Authorization': 'Basic ' + new Buffer('drolo:M4nd4ng4').toString('base64')},
            json: {username: 'ForbesLindesay'},
        }
    );

    const responseAsText = res.getBody('utf8');
    const responseAsJson = JSON.parse(responseAsText);
    const statusAsJson = res.statusCode;

    return {response:responseAsJson, status: statusAsJson}
}
export const executeInAPI = (node, command) => {

    const postActions = ['start', 'stop', 'login'];

        // Check if we have login info
        if (node.loginInfo == null) {
            logger.error("No login info found");
            return;
        }

        // Get the target Path
        const targetPath = node.targetPath;
        const portEndNumber = targetPath.substring (targetPath.length - 3, targetPath.length-1);
        const port = "100" + portEndNumber;
        const verb = postActions.includes(command) ? "POST" : "GET";
        // Sync request
        let responseAsText = null;
        let responseAsJson = {};
        let statusCode = 200;
        var res = syncRequest(
            verb,
            'http://localhost:' + port + '/api/v1/' + command, {
                headers: {'Authorization': 'Bearer ' + node.loginInfo.access_token}
            }
        );
        try {
            responseAsText = res.getBody('utf8');
            console.log (responseAsText);
            responseAsJson = JSON.parse(responseAsText);
            statusCode = res.statusCode;
        } catch (e) {
            const stoppedTraderMessage = "trader is not running";
            if (e.message.includes (stoppedTraderMessage)) {
                responseAsJson = {status: stoppedTraderMessage};
            } else {
                logger.error("Error parsing response: " + e);
                statusCode = e.statusCode;
            }
            
        }
        return {response:responseAsJson, status: statusCode};
}
export const availablefreqtradeAPICommands = [
    {command: "ping"	, description: "Simple command testing the API Readiness - requires no authentication."},
    {command: "start"	, description: "Starts the trader."},
    {command: "stop"	, description: "Stops the trader."},
    {command: "stopbuy"	, description: "Stops the trader from opening new trades. Gracefully closes open trades according to their rules."},
    {command: "reload_config"	, description: "Reloads the configuration file."},
    {command: "trades"	, description: "List last trades. Limited to 500 trades per call."},
    {command: "trade/<tradeid>"	, description: "Get specific trade."},
    {command: "delete_trade <trade_id>"	, description: "Remove trade from the database. Tries to close open orders. Requires manual handling of this trade on the exchange."},
    {command: "show_config"	, description: "Shows part of the current configuration with relevant settings to operation."},
    {command: "logs"	, description: "Shows last log messages."},
    {command: "status"	, description: "Lists all open trades."},
    {command: "count"	, description: "Displays number of trades used and available."},
    {command: "locks"	, description: "Displays currently locked pairs."},
    {command: "delete_lock <lock_id>"	, description: "Deletes (disables) the lock by id."},
    {command: "profit"	, description: "Display a summary of your profit/loss from close trades and some stats about your performance."},
    {command: "forceexit <trade_id>"	, description: "Instantly exits the given trade (Ignoring minimum_roi)."},
    {command: "forceexit all"	, description: "Instantly exits all open trades (Ignoring minimum_roi)."},
    {command: "forceenter <pair> [rate]"	, description: "Instantly enters the given pair. Rate is optional. (force_entry_enable must be set to True)"},
    {command: "forceenter <pair> <side> [rate]"	, description: "Instantly longs or shorts the given pair. Rate is optional. (force_entry_enable must be set to True)"},
    {command: "performance"	, description: "Show performance of each finished trade grouped by pair."},
    {command: "balance"	, description: "Show account balance per currency."},
    {command: "daily <n>"	, description: "Shows profit or loss per day, over the last n days (n defaults to 7)."},
    {command: "stats"	, description: "Display a summary of profit / loss reasons as well as average holding times."},
    {command: "whitelist"	, description: "Show the current whitelist."},
    {command: "blacklist [pair]"	, description: "Show the current blacklist, or adds a pair to the blacklist."},
    {command: "edge"	, description: "Show validated pairs by Edge if it is enabled."},
    {command: "pair_candles"	, description: "Returns dataframe for a pair / timeframe combination while the bot is running. Alpha"},
    {command: "pair_history"	, description: "Returns an analyzed dataframe for a given timerange, analyzed by a given strategy. Alpha"},
    {command: "plot_config"	, description: "Get plot config from the strategy (or nothing if not configured). Alpha"},
    {command: "strategies"	, description: "List strategies in strategy directory. Alpha"},
    {command: "strategy <strategy>"	, description: "Get specific Strategy content. Alpha"},
    {command: "available_pairs"	, description: "List available backtest data. Alpha"},
    {command: "version"	, description: "Show version."}
];
// Execute a command in the node
export function executeFreqtradeCommand(command, nodeName, nodes) { 
    logger.debug("Executing command " + command + " on node " + nodeName);

    // Get node from nodeName
    const node = nodes.find(oneNode => oneNode.name === nodeName);
    const possibleActions = ['start', 'stop', 'restart', 'status','status table', 'count', 'list', 'logs', 'update', 'backup', 'restore', 'daily', 'profit', 'balance', 'performance', 'status-table'];
    let result = {};
    if (command === "login") {
        
            // Sets the access token and the refresh token for the node
           result = loginInAPI(node);
           // Set the access token and the refresh token for the node
            node.loginInfo = result.response;

    } else if (possibleActions.includes(command)) {
        
        result = executeInAPI(node, command);

    
    } else if (command === "help") {
        result = {response: availablefreqtradeAPICommands, status: 200};

    } else {
        logger.error("Unknown action: " + command);
        result = {error: "Unknown command: " + command, status: "KO"};
    }

    // return the result
    return result;
}
export async function executeFreqtradeCommandSync (command, nodeName, nodes) { 
    logger.debug("Executing command Sync" + command + " on node " + nodeName);


    const result = await executeFreqtradeCommand(command, nodeName, nodes);
    // return the result

    return result;
}

// Attaching the status for the real freqtrade instances into the system
export const attachFreqtradeState = (freqtradeKontrollerData) => {
    

    // Iterate over all nodes
    freqtradeKontrollerData.nodes.forEach(node => {
    
        // Get freqtrade status
        const freqtradeStatus = getFreqtradeStatus(node);

        // Set freqtrade status
        node.freqtradeStatus = freqtradeStatus;
        
    });
    
    return freqtradeKontrollerData;
}



export const attachFreqtradeStatusInfo = (freqtradeKontrollerData) => {

    // Iterate over all nodes
    freqtradeKontrollerData.nodes.forEach(node => {

        // If active, get the status info
        if (node.active && node.loginInfo) {
            const statusInfo = executeFreqtradeCommand ("count", node.name, freqtradeKontrollerData.nodes);
            
            // Caso stop
            node.freqtradeStatus = statusInfo.response.status ? (statusInfo.response.status.includes("is not running") ? "stopped" : "running") : node.freqtradeStatus;
            
            // Caso start
            node.freqtradeStatus = statusInfo.status === 200 && statusInfo.response.current ? "running" : node.freqtradeStatus;
            node.freqtradeStatus = statusInfo.status === 200 && typeof statusInfo.response === 'string' && statusInfo.response.includes("is not running") ? "stopped" : node.freqtradeStatus;

        }
    } );
    return freqtradeKontrollerData;
}
// Attaching the login for the real freqtrade instances into the system
export const attachLoginInfo = (freqtradeKontrollerData) => {
    

    // Iterate over all nodes
    freqtradeKontrollerData.nodes.forEach(node => {
        
        // Only for running nodes
        if (node.freqtradeStatus === 'running') {

            // Get freqtrade login Info synchronously
            const freqtradeLoginInfo = loginInAPI(node);

            // Set freqtrade login info
            node.loginInfo = freqtradeLoginInfo.response;
    };
    
    return freqtradeKontrollerData;
    });
}


// Get freqtrade status using console command
export const getFreqtradeStatus = (node) => {

// Get the target Path
const targetPath = node.targetPath;

const cmd = " ps -ef | grep " + targetPath.substring(2, targetPath.length) + " | grep -v grep";
const execSync = require('child_process').execSync;

let freqtradeStatus = 'not running';


try {
    const output = execSync(cmd);
    
    const lines = output.toString().split('\n');
    const line = lines[0];
    const words = line.split(' ');
    const pid = words[5];
    freqtradeStatus = lines[2] !== '' ? 'running' : freqtradeStatus;
    
    logger.info(`[5] - Node '${node.name}' is ${freqtradeStatus} with PID ${pid}`);
}

catch (err) {
    logger.error('[5] - ' + err.message);
}


return freqtradeStatus;

}

export const takeProfitSnapshot = (nodes) => {

    let allOK = true;
    // Take the profit snapshot for each node
    const allNodesProfit = nodes.map( node => {
        
        // Execute the command
        const result = executeFreqtradeCommand("profit", node.name, nodes);
        if (result && result.status === 200) {
            logger.info('Profit snapshot taken OK.');
            return {
                name: node.name,
                cluster: node.cluster,
                profit_closed_percent: result.response.profit_closed_percent
            };
        } else {
            logger.error('Profit snapshot taken failed.');
            allOK = false;
            return {
                name: node.name,
                cluster: node.cluster,
                profit_closed_percent: null
            };
        }
    
    } );

    return allNodesProfit
}