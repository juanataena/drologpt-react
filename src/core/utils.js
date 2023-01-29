// Logger
import * as sqlite3Utils from '../core/sqlite3Utils';
import * as fileUtils from '../core/fileUtils';
import * as systemUtils from '../core/systemUtils';
import * as freqtradeCommandUtils from '../core/freqtradeCommandUtils';



var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "info";

// Nodes
export function findNodeByName (nodes, name) {
    for (let index = 0; index < nodes.length; index++) {
        const node = nodes[index];
        if (node.name === name) {
            return node;
        }
    }
    return null;
}

// All Values
export function getAllValuesByField(array, field) {
    const filteredArray = [];
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        filteredArray.push(element[field]);
    }
    return filteredArray;
}

// Filtered Values
export function filterByField(array, field) {
    const filteredArray = [];
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        const value = element[field];

        // Insert into the filtered array using the name of the field
        filteredArray.push({[field]: value});
    }
    return filteredArray;
}
export function filterByFields(array, fields) {
    const filteredArray = [];
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        const values = {};
        for (let index = 0; index < fields.length; index++) {
            const field = fields[index];
            values[field]= element[field];
        }
        filteredArray.push(values);
    }
    return filteredArray;
}


// Node Balance

export function initNodes(app, freqtradeKontrollerData) {

    // Taking only the actives
    const activeNodes = freqtradeKontrollerData.nodes.filter( node => node.active );
    freqtradeKontrollerData.nodes = activeNodes;
    app.set('freqtradeKontrollerData', freqtradeKontrollerData);
    logger.info("[1] - Attaching initial data to app: %o nodes in total",freqtradeKontrollerData.nodes.length);


    // Attaching to local database
    sqlite3Utils.connectToLocalDatabase().then( (db) => {
 
        // & Attaching them as global vabiarble for the app
        app.set('localDatabase', db);

        // Creating a new entry for triggers
        // sqlite3Utils.createEntryForTriggers(db);
   });

    // Attaching databases to the nodes
    sqlite3Utils.attachDatabases (freqtradeKontrollerData.nodes).then( (nodes) => {
        
        // Initializing the nodes (adding the databases)
        for (let index = 0; index < nodes.length; index++) {
            const oneNode = nodes[index];
            const nodeName = oneNode.name;
            logger.info(`[4.${index+1}] - Getting Balance for %o...`, nodeName);
            sqlite3Utils.getNodeBalance(nodes, nodeName, rows => {

                if (rows.length > 0) {
                    logger.info(`[4.${index+1}] - Balance retrieved OK for %o. %o rows were taken`,nodeName, rows.length);
                } else {
                    logger.warn(`[4.${index+1}] - Balance retrieved KO for %o. %o rows were taken`, nodeName, rows.length);
                }
            });
        }

        // Attaching the status for the real freqtrade instances into the system
        freqtradeCommandUtils.attachFreqtradeState(freqtradeKontrollerData);

        // Attaching the login for the real freqtrade instances into the system
        freqtradeCommandUtils.attachLoginInfo(freqtradeKontrollerData);

        // Attaching the status of the traders (running or paused)
        freqtradeCommandUtils.attachFreqtradeStatusInfo(freqtradeKontrollerData);

        // & Attaching them as global vabiarble for the app
        freqtradeKontrollerData = {
            nodes: nodes,
            lastUpdate: new Date().toISOString()
        };    
        app.set('freqtradeKontrollerData', freqtradeKontrollerData);
        // console.log(freqtradeKontrollerData.nodes[0]);
    });
}

export function getNodesJson() {

    // Reading the file from the local file system and convert to JSON
    const fs = require('fs');
    const path = require('path');
    const filePathFromEnv = process.env.CONFIG_FILE_NAME;
    const filePath = path.join(__dirname + '/../config/', filePathFromEnv);
    const data = fs.readFileSync(filePath, 'utf8');
    const nodes = JSON.parse(data);
    
    // reading the file from the local file system and convert to JSON
    
    // Taking now the real strategy from file paths and adding it to the nodes
    
    nodes.forEach(node => {
        const nodeFromFile = getNodeConfigFromName(node.name, nodes);
        node.configFromFile = JSON.parse(nodeFromFile);
    });
    
    return nodes;

}

export function getNodeConfigFromName (nodeName, nodes) {
    
    const node = findNodeByName(nodes, nodeName);
    let nodeConfig = null;
    logger.info('Getting node config for %o in path %o...', nodeName);

    // 3. Find the node configuration path
    if (node !== null && node !== undefined && typeof node === 'object') {
        const configFilePath = __dirname + '/../../../' + node.targetPath + 'config.json';

    
        nodeConfig = fileUtils.readFile(configFilePath);
    }
    return nodeConfig;
}

export function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    }).toUpperCase();
}

// Convert 
    
    
