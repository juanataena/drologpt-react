import express from 'express'
import * as dotenv from 'dotenv'
import bodyParser from 'body-parser';
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'
import {fileURLToPath} from 'url';

import path from 'path';

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);
dotenv.config({path:'./.env'})

const apiKey = process.env.OPENAI_API_KEY;
// const apiKey = "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";
const configuration = new Configuration({
  apiKey,
});
console.log(configuration);

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from CodeX!!'
  })
})

app.post('/', async (req, res) => {
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
    res.status(500).send(error || 'Something went wrong');
  }
})

// 5. Configure app
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/client')); // Link with client!


app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/client')); // Link with client!
app.listen(5001, () => console.log('AI server started on http://localhost:5001'));
