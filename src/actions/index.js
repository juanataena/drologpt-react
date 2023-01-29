require('dotenv').config();
import * as _C from '../constants';
import * as resolvers from '../resolvers';
import * as utils from '../core/utils';
import * as systemUtils from '../core/systemUtils';
import * as freqtradeCommandUtils from '../core/freqtradeCommandUtils';
import * as fileUtils from '../core/fileUtils';
import * as sqlite3Utils from '../core/sqlite3Utils';

import * as chartDataUtils from '../core/chartDataUtils';
// Logger
// Logger
var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "info";

export function getMachineName(req, res) {

    logger.info('Getting machine name...');
    const machineName = systemUtils.getMachineNameFromSystem();
    logger.info('Machine name retrieved OK. Name: %s', machineName);
    resolvers.getMachineNameResponse(req, res, machineName);

}
export function getNodesTree(req, res) {

    // Get current nodes from local data
    const nodes = req.app.get('freqtradeKontrollerData').nodes;

    // // Add field freqtradeStatus to each node
    // const nodesWithStatus = nodes.map((node, index) => {

    //     // Get Freqtrade status
    //     const freqtradeStatus = freqtradeCommandUtils.getFreqtradeStatus(node); 

    //     node.freqtradeStatus =  freqtradeStatus || 'off';

    //     return node;
    // });


    logger.info('Getting nodes tree...');
    resolvers.getNodesTreeResponse(req, res, nodes);
    logger.info('Nodes retreived OK. Total: %s nodes', nodes.length);

}
export function getLastUpdate (req, res) {
    logger.info('Getting last update...');
    const lastUpdate = req.app.get('freqtradeKontrollerData').lastUpdate;
    logger.info('Last update retrieved OK. Date: %s', lastUpdate);
    resolvers.getLastUpdateResponse(req, res, lastUpdate);
}
export function getNodeConfig(req, res) {

    // 1. Take the node name from the request
    const nodeName = req.body.name;
    // 2. Get current nodes from local data
    const nodeConfig = utils.getNodeConfigFromName(nodeName);
    resolvers.getNodeConfigResponse(req, res, nodeConfig);

}
export function getNodeStrategy(req, res) {

    // 1. Take the templateId from the request
    const nodeName = req.body.name;
    logger.info('Getting node strategy for %o...', nodeName);

    const nodeConfig = utils.getNodeStrategy(nodeName)
    resolvers.getNodeStrategyResponse(req, res, nodeConfig);

}
export function getNodeTrades(req, res) {

    // 1. Take the templateId from the request
    const nodeName = req.body.name;
    const nodes = req.app.get('freqtradeKontrollerData').nodes;
  
    logger.info('Getting trades for %o...', nodeName);
    sqlite3Utils.getNodeTrades(nodes, nodeName, rows => {
        logger.info('Trades retrieved OK.');
        resolvers.getNodeTradesResponse(req, res, rows);
    });
}
export function getNodeBalance(req, res) {

    // 1. Take the templateId from the request
    const nodeName = req.body.name;
    logger.info('Getting Balance for %o...', nodeName);

    const nodes = req.app.get('freqtradeKontrollerData').nodes;
    
    sqlite3Utils.getNodeBalance(nodes, nodeName, rows => {
        logger.info('Balance retrieved OK.');
        resolvers.getNodeBalanceResponse(req, res, rows);
    });
}
export function getBalanceData(req, res) {

    logger.info('Getting Balance for chart...');

    const nodes = req.app.get('freqtradeKontrollerData').nodes;
    const initialBalance = 1000;
    
    const rows = chartDataUtils.getBalanceData(nodes, initialBalance);

    resolvers.getBalanceDataResponse(req, res, rows);
}
export function getProfitData(req, res) {

    logger.info('Getting Profit for chart...');

    const nodes = req.app.get('freqtradeKontrollerData').nodes;
    const initialProfit = 0;
    
    const rows = chartDataUtils.getProfitData(nodes, initialProfit);

    resolvers.getProfitDataResponse(req, res, rows);
}
export function getConfigJson(req, res) {

    // Get current nodes from local data

    logger.info('Getting config.json file...');

    // 1. Get nodes json from local file
    const nodes = utils.getNodesJson();
  
    resolvers.getConfigJsonResponse(req, res, nodes);
    logger.info('JSON file retreived OK. Total: %s nodes', nodes.length);

}
export function setJsonConfig(req, res) { 

    // Initializing status to ok
    let status = {"status": "OK"};
    logger.info('Setting config.json file with new values...');
    // debugger;
    // Get current nodes from local data
    let nodesAsString = req.body.config;

    // If body is already a JSON, convert to string
    if (typeof nodesAsString === 'object') {
        nodesAsString = JSON.stringify(nodesAsString);
    }

    // Write the new config file
    if (nodesAsString.length > 0) {
    
        const nodes = JSON.parse(nodesAsString);
        const filename = 'src/config/'+process.env.CONFIG_FILE_NAME;
        fileUtils.writeFile(filename, JSON.stringify(nodes, null, 4));
        logger.info('JSON file updated OK. Total: %s nodes', nodes.length);

        // Update local data
        utils.initNodes(req.app, {nodes});

    } else {
        // Error
        logger.info('JSON file update failed. No nodes found.');
        status = {"status": "ERROR", "message": "No nodes found."};
    }

    // Return the status to the client
    resolvers.setJsonConfigResponse(req, res, status);
}
export function getCommitInfo(req, res) {

    logger.info('Getting commit info...');
    const commitInfo = systemUtils.getCommitInfoFromSystem();
    logger.info('Commit info retrieved OK: %s', commitInfo);
    resolvers.getCommitInfoResponse(req, res, commitInfo);

}
export function reloadData(req, res) { 

    logger.info('Reloading data...');
    // Initializing status to ok
    let status = {"status": "OK"};
    // Get current nodes from local data
     // 1. Get nodes json from local file
     const nodes = utils.getNodesJson();
    const lastUpdate = new Date().toISOString();
    req.app.locals.freqtradeKontrollerData = {nodes, lastUpdate};

        // 12. Initialize the data
    const reloadDataPromise = new Promise( (resolve,reject) => {

        utils.initNodes(req.app, req.app.locals.freqtradeKontrollerData);
        logger.info('Data reloaded OK.');
        resolve(req.app.locals.freqtradeKontrollerData);
    });

    // Initializing the data when app starts.
    reloadDataPromise.then( freqtradeKontrollerData => {

        // Storing the nodes in the app, filtering out the ones that are not active
        logger.info('Data reloaded OK.');
        resolvers.reloadDataResponse(req, res, status);
    });
}

export function executeFreqtradeCommand(req, res) { 

    logger.info('Executing Freqtrade Command for %o', req.body);
    
    // Initializing status to ok
    let status = {"status": "OK", ...req.body, date: new Date().toISOString()};

    // Taking action param from the body
    const command = req.body.command;
    const nodeName = req.body.instanceName;

    // Control if parameters are empty
    if (!command || !nodeName) {
        status = {"status": "ERROR", "message": "Parameters are empty."};
        resolvers.executeFreqtradeCommandResponse(req, res, status);
        return;
    }

    // Get current nodes from local data
    // const nodes = req.app.get('freqtradeKontrollerData').nodes;
    const nodes = req.app.get('freqtradeKontrollerData').nodes;
    // Remove first slash if exists
    const commandWithoutSlash = command.startsWith('/') ? command.substring(1) : command;
    

    // Execute the command
    const result = freqtradeCommandUtils.executeFreqtradeCommand(commandWithoutSlash, nodeName, nodes);
    

        // debugger;
        // Check if the command was executed OK
        if (result.status === 200) {
            // Update the node status
            

        logger.info('Freqtrade command executed OK.');


        // Attaching the status of the traders (running or paused)
        if (command.indexOf('start') > -1 || command.indexOf('stop') > -1) {
            // Update the node status
            const node = nodes.find(n => n.name === nodeName);
            node.freqtradeStatus = command.indexOf('start') > -1  ? 'running' : 'stopped';
            const freqtradeKontrollerData = {
                nodes: nodes,
                lastUpdate: new Date().toISOString()
            };
            // freqtradeCommandUtils.attachFreqtradeStatusInfo(freqtradeKontrollerData);
            req.app.set ('freqtradeKontrollerData', freqtradeKontrollerData);
        }


        resolvers.executeFreqtradeCommandResponse(req, res, result);
        } else {
            logger.info('Freqtrade command execution failed.');
            resolvers.executeFreqtradeCommandResponse(req, res, result);
        }
}

export function getTableInfo (req, res) {
    
    // Take parameters from the body
    const name = req.body.name;
    const columns = req.body.columns;
    logger.info('Reading table data for %s with [%s] columns...', name, columns);

    // Take the data from the table 
    sqlite3Utils.getTableInfo(req, name, columns).then( (rows)  => {
        logger.info('Table data retrieved OK.');
        resolvers.getTableInfoResponse(res, rows);
    }).catch( err => {
        logger.info('Table data retrieval failed.');
        resolvers.getTableInfoResponse(res, []);
    } );
}


export function takeProfitSnapshot(req, res) { 

    logger.info('Taking profit snapshot at %s...', new Date().toISOString());

    // Taking last profit snapshots from the freqtrades
    const nodes = req.app.get('freqtradeKontrollerData').nodes;
    const lastProfitSnapshotsFromNodes = freqtradeCommandUtils.takeProfitSnapshot(nodes);

    // Saving them into the local database
    sqlite3Utils.saveProfitSnapshots(req, lastProfitSnapshotsFromNodes, nodes).then( (status) => {
        logger.info('Profit snapshot saved OK.');
        resolvers.takeProfitSnapshotResponse(res, status);
    }).catch( err => {
        logger.info('Profit snapshot save failed.');
        resolvers.takeProfitSnapshotResponse(res, err);
    }
    );

}
