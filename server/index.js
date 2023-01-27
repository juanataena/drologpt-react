import * as dotenv from 'dotenv'
import { Configuration, OpenAIApi } from 'openai'
import { fileURLToPath } from 'url';
import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);
dotenv.config({ path: './.env' })

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
// console.log(configuration);

const openai = new OpenAIApi(configuration);


app.get("/api/v1", (req, res) => {
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

app.listen(PORT, () => console.log(`start listening on port : ${PORT}`));
