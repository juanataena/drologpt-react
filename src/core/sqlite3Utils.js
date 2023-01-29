import * as sqlite3 from 'sqlite3';
import * as utils from './utils';
import * as scrappingUtils from './scrappingUtils';
import * as freqtradeCommandUtils from '../core/freqtradeCommandUtils';

// Logger
var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "info";




// Attaching databases to the nodes
// 12. Initialize the data
export const initDataPromise = function (nodes) {

return new Promise( (resolve,reject) => {
    const freqtradeKontrollerData = {
        nodes: nodes
    };
    resolve(freqtradeKontrollerData);
});
}
export const attachDatabases = function (nodes) {
    return new Promise(function(resolve, reject) {
        logger.info("[3] - Attaching databases to nodes");
        let index = 1;
        nodes.forEach( node => {
            const path = __dirname + `/../../../${node.targetPath}/user_data/tradesv3.sqlite`;
            node.db = new sqlite3.Database(path, sqlite3.OPEN_READONLY, (err) => {
                if (err) {
                    logger.error(`[3.${index}] - Error opening database: '%s, '%o`, node.name, err);
                    reject(err);
                } else {
                    logger.info(`[3.${index}] - Connected to the database '%s'.`, node.name);
                    resolve(nodes);
                }
                index++;
            });
        });
    });
}
  
export const getNodeTrades = (nodes, name, callback) => {
    
    // 1. Get current nodes from local data
    const node = utils.findNodeByName(nodes, name);

    // 2. Get the node trade

    // if the node had a previous trade, return it
    if (node.trades) {
        logger.info('Node %s has a previous trade object: %o entries', node.name, node.trades.length);
        callback(node.trades);
    } else {
        // 2. Get the trades from the database
        logger.info('Getting trades for %o... from database', node.name);
        const sql = `SELECT * FROM trades WHERE strategy = '${node.configFromFile.strategy}'`;
        node.db.all(sql, [], (err, rows) => {
            if (err) {
                logger.error('Error getting trades: %o', err);
            } else {

                // We update the rows and return the trades
                node.trades = rows;



                callback(rows);
            }
        });
    }

}

export const getNodeBalance = (nodes, name, callback) => {
    
    // 1. Get current nodes from local data
    const node = utils.findNodeByName(nodes, name);

    // 2. Get the node balance

    // if the node had a previous balance, return it
    if (node.trades) {
        logger.info('Node %s has a previous balance of %s trades', node.name, node.trades.length);
        callback(utils.filterByFields(node.trades, ['close_profit_abs', 'balance', 'profit', 'close_date']));
    } else {
        // 2. Get the balance from the database
        logger.info('[4] - Getting balance for %o... ', node.name);
        const sql = `SELECT close_profit_abs, close_date FROM trades WHERE strategy = '${node.configFromFile.strategy}' AND close_date IS NOT NULL ORDER BY close_date ASC`;
        node.db.all(sql, [], (err, rows) => {
            if (err) {
                logger.error('[4] - Error getting balance for %s: %o', node.name, err);
            } else {

                // We take the initial balance
                const initialBalance = 1000;

                // We calculate the balance with the trades
                for (let i = 0; i < rows.length; i++) {
                    const row = rows[i];
                    if (i === 0) {
                        row.profit = row.close_profit_abs;
 
                        // We add the balance 
                        row.balance = initialBalance + row.profit;
                    } else {
                        row.profit = rows[i - 1].profit + row.close_profit_abs;
                        row.balance = initialBalance + row.profit;
                    }
                }

                // We update the rows and return the balance
                node.trades = rows;
                
                callback(rows);
            }
        });
    }

}


// Local Database
export const connectToLocalDatabase = () => {
    return new Promise(function(resolve, reject) {
        logger.info("[2] - Connecting to local database...");
        const path = __dirname + `/../../data/app-drolo-gpt.sqlite`;
        const db = new sqlite3.Database(path, sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                logger.error('[2] - Error opening local database: %o', err);
                reject(err);
            } else {
                logger.info('[2] - Connected to local database.');
                resolve(db);
            }
        });
    });
}

// Create a new entry in the database for the table triggers
export const createEntryForTriggers = (db) => {

    logger.info("[5] - Creating entries for the triggers...");

    // Get the new value
    scrappingUtils.readValueFromWebsite('https://www.blockchaincenter.net/altcoin-season-index/#how365', 'body').then(value => {
        
        // Create the new entry if value is not empty
        if (value != null && value != undefined && value != '') {
            const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const sql = `INSERT INTO triggers (value, date) VALUES (${value}, '${currentDate}')`;
            db.run(sql, [], (err) => {
                if (err) {
                    logger.error('[5] - Error creating entry for triggers: %o', err);
                } else {
                    logger.info('[5] - Entry created for triggers');
                }
            });    
        }
    });
}



export const getTableInfo = (req, name, columns) => {

    // New Promise
    return new Promise(function(resolve, reject) {

        // & Attaching them as global vabiarble for the app
        const localDatabase = req.app.get('localDatabase');

        // 2. Get the trades from the database
        logger.info('Getting info for table %o. Taking %o columns...', name, columns);
        const sql = `SELECT ${columns} FROM ${name}`;
        localDatabase.all(sql, [], (err, rows) => {
            if (err) {
                logger.error(`Error getting data from table ${name}: %o`, err);
            } else {
                // We update the rows and return the trades
                resolve(rows);
            }
        });
    });
}



export function saveProfitSnapshots(req, lastProfitSnapshotsFromNodes, nodes) {
    return new Promise(function(resolve, reject) {

        logger.log('Creating entry for profit snapshot...');
        console.table(lastProfitSnapshotsFromNodes);


        const localDatabase = req.app.get('localDatabase');
        const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

        lastProfitSnapshotsFromNodes.forEach(node => {

            const profit_closed_percent = node.profit_closed_percent ? node.profit_closed_percent : null;
            const sql = `INSERT INTO accumulative_profits (name, cluster, profit_closed_percent, date) VALUES ('${node.name}','${node.cluster}', ${profit_closed_percent}, '${currentDate}')`;
            console.table(sql);
            localDatabase.run(sql, [], (err) => {
                if (err) {
                    logger.error('Error creating entry for profit snapshot: %o', err);
                    reject(err);
                } else {
                    logger.info('Entry created for profit snapshot');
                    resolve("Entry inserted ok");

                }
            });
        }
        );
    });
}
