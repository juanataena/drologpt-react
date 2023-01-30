import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';
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

// OPENAI API Configuration
dotenv.config({path:'./.env'})

export async function prompt(prompt, maxTokens=100, temperature=0.9, topP=1, frequencyPenalty=0, presencePenalty=0, stop=" "){

    // OPENAI API Configuration
    dotenv.config({path:'./.env'})
    const apiKey = process.env.OPENAI_API_KEY;
    const organization = process.env.OPENAI_ORG_ID;
    const configuration = new Configuration({
        apiKey,
        organization
    });
    // Create the API instance
    const openai = new OpenAIApi(configuration);

    // Create the completion
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: maxTokens,
        n: 1,
        stop: stop,
        temperature: temperature,
        top_p: topP,
        frequency_penalty: frequencyPenalty,
        presence_penalty: presencePenalty
    });

    // Log the result
    const firstResult = completion.data.choices[0].text.trim();

    console.log("later " + completion);
    return {bot: firstResult};
}
    