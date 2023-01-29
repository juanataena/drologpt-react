#!/usr/bin/env node

import express from 'express';
import bodyParser from 'body-parser';
import SourceMapSupport from 'source-map-support';
import * as utils from './core/utils';
import * as openAIUtils from './core/openAIUtils';
import appRoutes from './routes'; // 1. Import routes
import cron from 'node-cron';
import * as dotenv from 'dotenv'
import { Configuration, OpenAIApi } from 'openai'



// OPENAI API Configuration
dotenv.config({path:'./.env'})
const apiKey = process.env.OPENAI_API_KEY;
const organization = process.env.OPENAI_ORG_ID;
const configuration = new Configuration({
    apiKey,
    organization
});
// logger.debug("Configuration: %o", configuration);
const openai = new OpenAIApi(configuration);

// Logger
var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "debug"
log4js.configure({
    appenders: {
      out: { type: 'stdout' },
      app: { type: 'file', filename: 'app.log' }
    },
    categories: {
      default: { appenders: [ 'out', 'app' ], level: 'debug' }
    }
  });

// Dot env support
require('dotenv').config();

// 2. Define our app using express
const app = express();

// 4. Allow-cors
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    req.setTimeout(0); // no timeout for all requests, your server will be DoS'd
    next();
});

// 5. Configure app
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/client')); // Link with client!

// add Source Map Support
SourceMapSupport.install();

// 6. Set the port
const port = process.env.PORT || 8080;

// 7. All our post requests are handled here
app.use('/', appRoutes);

// 8. healthz url for kubernetes 'livecheck'
// when deploying, kubernetes uses this address to
// verify a 200 response to confirm the build is running
app.get('/healthz', function (request, response) {
    response.sendStatus(200);
});

// 9. ??
app.get('*', (req, res) => {
    res.send('api working');
    // res.sendFile(path.join(__dirname, 'client', 'index.html'));
});
// 10. catch 404
app.use((req, res/* , next*/) => {
    res.status(404).send('<h2 align=center>Page Not Found!</h2>');
});

// 11. Generic error handling (catch any unhandled error)
app.use((err, req, res/* , next*/) => {
    // logger.withErrorContext(err).error(err.message);
    res.status(500).send('Unexpected server error');
});

// let droloGPTData = {};
// // 12. Initialize the data
// const initDataPromise = new Promise( (resolve,reject) => {

//     // 1. Get nodes json from local file
//     const nodes = utils.getNodesJson();
    
//     logger.info ('[0] - Initializing nodes data...');
//     droloGPTData = {
//         nodes: nodes,
//         lastUpdate: new Date().toISOString()
//     };
//     resolve(droloGPTData);
// });

// // Initializing the data when app starts.
// initDataPromise.then( droloGPTData => {

//     // Storing the nodes in the app, filtering out the ones that are not active
//     // droloGPTData.nodes = droloGPTData.nodes || {};
//     // console.log("NODES: %o", droloGPTData.nodes);
//     // utils.initNodes(app, droloGPTData);
// });

// // 13. Start the crons

// cron.schedule('* * * * *', () => {
//   console.log('running a task every minute');
// });

// cron.schedule('* * * * *', () => {
//     console.log('reloading data...');
    
//     // Initializing the data when app starts.
//     initDataPromise.then( droloGPTData => {

//         // Storing the nodes in the app, filtering out the ones that are not active
//         // droloGPTData.nodes = droloGPTData.nodes || {};
//         // console.log("NODES: %o", droloGPTData.nodes);
//         // utils.initNodes(app, droloGPTData);
//     });

//   });
  
// 14. start the server
app.listen(port, () => {
    logger.info(`[0] App souces in ${__dirname}.`);
    logger.info(`[0] App Server Listening at ${port}`);
});
