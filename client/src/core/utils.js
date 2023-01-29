import { ConsoleGray, ConsoleGrayDS, ConsoleGrayJS, ConsoleGrayJSDS, ConsoleOrange, ConsoleOrangeDS, ConsoleOrangeJS, ConsoleOrangeJSDS } from 'colorize-console-log';

export function filterDockerContainerFields(containers) {
    if (!containers) return;

    const filteredContainers = [];
    for (let index = 0; index < containers.length; index++) {
        const oneContainer = containers[index];
        const filteredContainer = {
            id: oneContainer.Id,
            name: oneContainer.Names[0],
            image: oneContainer.Image,
            status: oneContainer.Status,
            command: oneContainer.Command,
            ports: oneContainer.Ports,
            // created: oneContainer.Created,
            // labels: oneContainer.Labels,
            // size: oneContainer.SizeRw,
            // sizeRoot: oneContainer.SizeRootFs,
            // host: oneContainer.HostConfig.NetworkMode,
            
        };
        filteredContainers.push(filteredContainer);
    }
    return filteredContainers;
}
export function isRunning(dockerContainers, oneNode) {

    // debugger;
    // Look for the container with the name of the node in the list of containers
    // const container = dockerContainers.find(container => container.name === oneNode.name);
}
// ERROR FUNCTIONS
export function showError(err) {
  console.log(err);
}
export function errorLog(message) {
    log(message,'ORANGE');
}
export function log(message, kind, subMessage, emoji1, emoji2) {

    // Set defaults
    if(!kind) kind = 'REGULAR';
    if(!emoji1) emoji1 = '🐛';
    if(!emoji2) emoji2 = '🐛';
    let colorizedMessage = null;
    
    // Set special types
    if (kind === 'MAIN_START') {kind = 'GRAY'; emoji1 = '🔥'; emoji2 = '🔥';}
    if (kind === 'LOADING') {kind = 'ORANGEJS'; emoji1 = '⌛'; emoji2 = '⌛';}
    if (kind === 'MAIN_END') {kind = 'GRAYDS'; emoji1 = '🔥'; emoji2 = '🔥';}

    // Select the proper console
    switch(kind) {
        case '':
            colorizedMessage = ConsoleGray(emoji1 + ' ' + message + ' ' + emoji2, subMessage? subMessage: '');
            break;
        case 'ORANGE':
            colorizedMessage = ConsoleOrange(emoji1 + ' ' + message + ' ' + emoji2, subMessage? subMessage: '');
            break;
        case 'ORANGEJS':
            colorizedMessage = ConsoleOrangeJS(emoji1 + ' ' + message + ' ' + emoji2, subMessage? subMessage: '');
            break;
        case 'ORANGEDS':
            colorizedMessage = ConsoleOrangeDS(emoji1 + ' ' + message + ' ' + emoji2, subMessage? subMessage: '');
            break;
        case 'ORANGEJSDS':
            colorizedMessage = ConsoleOrangeJSDS(emoji1 + ' ' + message + ' ' + emoji2, subMessage? subMessage: '');
            break;

        case 'GRAY':
            colorizedMessage = ConsoleGray(emoji1 + ' ' + message + ' ' + emoji2, subMessage? subMessage: '');
            break;
        case 'GRAYJS':
            colorizedMessage = ConsoleGrayJS(emoji1 + ' ' + message + ' ' + emoji2, subMessage? subMessage: '');
            break;
        case 'GRAYDS':
            colorizedMessage = ConsoleGrayDS(emoji1 + ' ' + message + ' ' + emoji2, subMessage? subMessage: '');
            break;
        case 'GRAYJSDS':
            colorizedMessage = ConsoleGrayJSDS(emoji1 + ' ' + message + ' ' + emoji2, subMessage? subMessage: '');
            break;
    
        default:
            colorizedMessage = ConsoleGray(emoji1 + ' ' + message + ' ' + emoji2, subMessage? subMessage: '');
            break;
    }
    console.log(...colorizedMessage);
}
  
// Aux Functions
export function base64Decode(encoded) {
    // console.log('encoded: ' + encoded);
    const b = new Buffer(encoded, 'base64');
    return b.toString();
}
export function capitalizeFirst(value) {
    if (value !== null) {
        const regex = /(\b[a-z](?!\s))/g;
        return value ? value.replace(regex, (v) => {
            return v.toUpperCase();
        }) : '';
    }
    return value;
}
export function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}
export function getWidth(el) {
  const rect = el.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height
  };
}

//
export function htmlToText(html) {
    var temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent; // Or return temp.innerText if you need to return only visible text. It's slower.
}
export function isValidJson(jsonAsString) {
    let IS_VALID_JSON = true;
    try {
            JSON.parse(jsonAsString);
    } catch (e) {
        IS_VALID_JSON = false;
    }
    return IS_VALID_JSON;
}
export function renderSingleMessage(text, ok) {

    let className = ok === true ? 'tag is-success' : 'tag is-danger';
    let status = ok === true ? 'YES' : 'NO';

    // To have the gray

    status = ok === null ? ' --- ' : status;
    className = ok === null ? 'tag is-info is-light' : className;

    return <>
        <div className="tag">
        <span className="control is-inline-block">
            <div className="tags has-addons">
                <span className="tag">{text}</span>
                <span className={className}>{status}</span>
            </div>
          </span>
        </div>
    </>;
}
export function renderTokenProviderMessage(tokenProviderName, ok) {

    let className = ok === true ? 'tag is-info' : 'tag is-danger is-hidden';
    let status = ok === true ? 'YES' : 'NO';
    const text = 'Is ' + tokenProviderName.toUpperCase() + ' token';

    // To have the gray

    status = ok === null ? ' --- ' : status;
    className = ok === null ? 'tag is-info is-light' : className;

    if (ok) {
        return <>
            <div className="tag">
            <span className="control is-inline-block">
                <div className="tags has-addons">
                    <span className="tag">{text}</span>
                    <span className={className}>{status}</span>
                </div>
              </span>
            </div>
        </>;
    } else {
        return <>
        </>;
    }
}
export function isTimestampPast(field, payload) {

    try {
        const payloadAsString =base64Decode(payload);
        const payloadAsJSON =JSON.parse(payloadAsString);
        const fieldTimestamp = payloadAsJSON[field];
        if(typeof payloadAsJSON[field]==='undefined') {
            return true;
        }
        const now = Date.now();
        const nowSecs = now/1000;

        const isPast = nowSecs > fieldTimestamp;
        return isPast;
    } catch (e) {
        return false;
    }
}
export function getAsJson(elementAsString) {
    let element = null;
    try {
        element = JSON.parse(base64Decode(elementAsString));
    } catch (e) {
console.error("error: " + e);
    } finally {

    }
    return element;
}

// Get Values
export function getValuesByFieldInNodesTree(nodes, field) {
    const filteredNodes = [];
    nodes.forEach(node => {
        for (let index = 0; index < node.trades.length; index++) {
            const oneTrade = node.trades[index];
            filteredNodes.push(node[oneTrade][field]);
        }
    });
    return filteredNodes;
}
export function getAllDatesFromChartData(nodes) {
    const filteredNodes = [];
    for (var [value] of Object.entries(nodes)) {
        for (let j = 0; j < value.values.length; j++) {
            const oneChartData = value.values[j];
            filteredNodes.push(oneChartData[0]);
        }
    }
    // debugger;
    return filteredNodes;
}
export function getAllAmountsFromChartData(nodes) {
    const filteredNodes = [];
    for (var [value] of Object.entries(nodes)) {
        for (let j = 0; j < value.values.length; j++) {
            const oneChartData = value.values[j];
            filteredNodes.push(oneChartData[1]);
        }
    }
    return filteredNodes;
}
export function getAmountMinFromData(data) {
    const amounts = getAllAmountsFromChartData(data);
    const min = Math.min(...amounts);
    return min;
}
export function getAmountMaxFromData(data) {
    const amounts = getAllAmountsFromChartData(data);
    const max = Math.max(...amounts);
    return max;
}
export function getDateMinFromData(data) {
    const dates = getAllDatesFromChartData(data);
    // const min = Math.min(...dates);
    return dates[0];
}
export function getDateMaxFromData(data) {
    const dates = getAllDatesFromChartData(data);
    // const max = Math.max(...dates);
    return dates[dates.length-1];
}
export function getColorsFor (nodesFiltered) {
    const colors = {};

    // For each node filtered
    for (let index = 0; index < nodesFiltered.length; index++) {
        const nodeFiltered = nodesFiltered[index];
        const nodeName = nodeFiltered.name;
        const color = nodeFiltered.color;
        colors[nodeName] = color;
    }
    

    return colors;
}
export function getOnlyColorsFor (nodesFiltered) {
    const colors = [];

    // For each node filtered
    for (let index = 0; index < nodesFiltered.length; index++) {
        const nodeFiltered = nodesFiltered[index];
        const color = nodeFiltered.color;
        colors.push(color);
    }
    

    return colors;
}
export function getNamesFor (nodesFiltered) {
    
    const names = [];

    // For each node filtered
    for (let index = 0; index < nodesFiltered.length; index++) {
        const nodeFiltered = nodesFiltered[index];
        const nodeName = nodeFiltered.name;
        names.push(nodeName);
    }
    return names;
}
export function getDataFor (chartData, nodesFiltered) {
    const data = {};
    
    // For each node filtered
    for (let index = 0; index < nodesFiltered.length; index++) {
        const nodeFiltered = nodesFiltered[index];
        const nodeName = nodeFiltered.name;
        data[nodeName] = chartData[nodeName];
    }

    // We remove the ones without trades
    // debugger;

    // We add the 'x' field to the data
    data['x'] = chartData['x'];

    return data;
}

// Get iso date withouth timeZone
export const getIsoDate = (date) => {

    if (date) {
        return new Date(date).toISOString().split('.')[0];    
    }
    return new Date().toISOString().split('.')[0];
}

export const getIconCommand = (command) => {
    switch (command) {
        case '/daily':
            return '📅';
        case '/profit':
            return '％';
        case '/balance':
            return '💲';
        case '/status':
            return '✅';
        case '/status-table':
            return '🧾';
        case '/performance':
            return '📈';
        case '/count':
            return '🧮';
        case '/start':
            return '🟩';
        case '/stop':
            return '🟥';
        case '/help':
            return '🙋🏽‍♂️';
        default :
            return '🤷🏽‍♂️';
    }
}

export const formatMessageForConsole = (command, objStatus) => {
    
    const commandSanitized = command.startsWith('/') ? command.substring(1) : command;
    const response = objStatus.response;
    // debugger;
    switch (commandSanitized) {
        case 'daily': formatMessageForDaily(response); break;
        case 'profit': formatMessageForProfit(response); break;
        case 'balance': formatMessageForBalance(response); break;
        case 'status': formatMessageForStatus(response); break;
        case 'status-table': formatMessageForStatusTable(response); break;
        case 'performance': formatMessageForPerformance(response); break;
        case 'count': formatMessageForCount(response); break;
        case 'start': formatMessageForStart(response); break;
        case 'stop': formatMessageForStop(response); break;
        case 'help': formatMessageForHelp(response); break;
        default : formatMessageForDefault(response); break;
    }
}

export const printStatusDataAsTable = (data) => {

    function dataTable(amount, pair, trade_id, profit_abs, open_rate, current_rate, current_profit, stop_loss_abs, stoploss_current_dist) {
        this.amount = amount;
        this.pair = pair;
        this.trade_id = trade_id;
        this.profit_abs = profit_abs;
        this.open_rate = open_rate;
        this.current_rate = current_rate;
        this.current_profit = current_profit;
        this.stop_loss_abs = stop_loss_abs;
        this.stoploss_current_dist = stoploss_current_dist;
    };
    
    const table = [];
    for (let index = 0; index < data.length; index++) {
        const element = data[index];

        const newRow = new dataTable(element.amount, element.pair, element.trade_id, element.profit_abs, element.open_rate, element.current_rate, element.current_profit, element.stop_loss_abs, element.stoploss_current_dist);
        table.push(newRow);
    }
      
      console.table(table);
    
}

export const printPerformanceDataAsTable = (data) => {

    function dataTable(pair, profit_abs, profit_pct, profit_ratio, count) {
        this.pair = pair;
        this.profit_abs = profit_abs;
        this.profit_pct = profit_pct;
        this.profit_ratio = profit_ratio;
        this.count = count;
    };
    
    const table = [];
    for (let index = 0; index < data.length; index++) {
        const element = data[index];

        const newRow = new dataTable(element.pair, element.profit_abs, element.profit_pct, element.profit_ratio, element.count );
        table.push(newRow);
    }
      
      console.table(table);
    
}

export const printHelpDataAsTable = (data) => {

    function dataTable(command, description) {
        this.command = command;
        this.description = description;
    };
    
    const table = [];
    for (let index = 0; index < data.length; index++) {
        const element = data[index];

        const newRow = new dataTable(element.command, element.description);
        table.push(newRow);
    }
      
      console.table(table);
    
}


export const printResponseWithData = (response) => {
    const responseWithoutData = {...response};
    delete responseWithoutData.data;

    // Create a table structure with the data
    const table = [];
    const keys = Object.keys(responseWithoutData);
    for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        const value = responseWithoutData[key];
        table.push({'key': key, "value": value});
    }
    console.table(table);
    
}

export const printResponseAsTable = (response) => {
    const responseWithoutData = {...response};
    delete responseWithoutData.data;

    // Print as table the response and the associated data
    console.table(responseWithoutData);
    
}

export const printTableData = (data, filter) => {
    
    if (filter && filter.length > 0) {
        console.table(data, filter);
    } else {
        console.table(data);
    }
}
export const printServerTraderStatusDataAsTable = (response) => {
    console.info(response.status)
}



export const formatMessageForDaily = (response) => {
    printResponseWithData(response);
    printTableData(response.data, []);
}


export const formatMessageForProfit = (response) => {
    printResponseWithData(response);
}
export const formatMessageForBalance = (response) => {
    printResponseWithData(response);
    printTableData(response.currencies, []);
}
export const formatMessageForStatus = (response) => {
    printStatusDataAsTable(response);
}
export const formatMessageForStatusTable = (response) => {
    printResponseWithData(response);
    printTableData(response.data, []);
}
export const formatMessageForPerformance = (response) => {
    printPerformanceDataAsTable(response);
}
export const formatMessageForCount = (response) => {
    printResponseWithData(response);
    printTableData(response.data, []);
}
export const formatMessageForStart = (response) => {
    printServerTraderStatusDataAsTable(response);
}
export const formatMessageForStop = (response) => {
    printServerTraderStatusDataAsTable(response);
}
export const formatMessageForHelp = (response) => {
    printHelpDataAsTable(response);    
}
export const formatMessageForDefault = (response) => {
    printResponseWithData(response);
    printTableData(response.data, []);
    console.error("Nothing to show here!. Check the command");
}
