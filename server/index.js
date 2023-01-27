import express from 'express'
import * as dotenv from 'dotenv'
import bodyParser from 'body-parser';
// import cors from 'cors'
import path from 'path';
import { Configuration, OpenAIApi } from 'openai'
import {fileURLToPath} from 'url';
import log4js from 'log4js';

// Logging configuration
var logger = log4js.getLogger();
logger.level = "debug";
log4js.configure({
    appenders: {
      out: { type: 'stdout' },
      app: { type: 'file', filename: 'app.log' }
    },
    categories: {
      default: { appenders: [ 'out', 'app' ], level: 'debug' }
    }
  });

// Path configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


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

const app = express();

// 5. Configure app
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/client')); // Link with client!

// app.use(cors())




app.get("/api/v1", (req, res) => {
    logger.info(`[GET] Sending Hello to destroyers in the world.`);
    res.send("hello !!!!");
});

app.post("/api/ask", async (req, res) => {
    try {
        const prompt = req.body.prompt;

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0, // Higher values means the model will take more risks.
            max_tokens: 256, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
            top_p: 1, // alternative to sampling with temperature, called nucleus sampling
            frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
            presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
        });

        res.status(200).send({
            bot: response.data.choices[0].text
        });

    } catch (error) {
        console.error(error)
    }
});


// 14. start the server
app.listen(PORT, () => {
    console.log(`AI server started and listening on port : ${PORT}`);
    logger.info(`[0] App souces in ${__dirname}.`);
    logger.info(`[0] App Server Listening at ${PORT}`);
});
  
