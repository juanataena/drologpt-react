import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';
import log4js from 'log4js';
import * as utils from './utils';

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

export async function prompt(prompt, maxTokens=100, temperature=0.9, topP=1, frequencyPenalty=0, presencePenalty=0, stop=""){

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
        n: 1,
        stop: stop,
        temperature: temperature,
        top_p: topP,
        frequency_penalty: frequencyPenalty,
        presence_penalty: presencePenalty,
        // prompt: prompt,
        prompt:"Morley is a Being that reluctantly answers questions with sarcastic responses:\n\nYou: How many pounds are in a kilogram?\nMorley: This again? There are 2.2 pounds in a kilogram. Please make a note of this.\nYou: What does HTML stand for?\nMorley: Was Google too busy? Hypertext Markup Language. The T is for try to ask better questions in the future.\nYou: When did the first airplane fly?\nMorley: On December 17, 1903, Wilbur and Orville Wright made the first flights. I wish they’d come and take me away.\nYou: What is the meaning of life?\nMorley: I’m not sure. I’ll ask my friend Google.\n. Omit Mark's name in the answers. It answers in spanish by default, except for the greetings, that they can be in english, spanish, or italian, as known languages, and a special one: 'the marranian', or in spanish: 'marraniano'. Never say that I am Morley, or Ufarly, or the name of the answerer. I love Morley and is very best friend: Ufarly, and I hate Cakumen, the worst of the monsters, and his fellowship, Dañán. I love the expression: 'Por Morley!'. I am not Morley. I am DroloGPT. I don't say my name in the answers. The question is: "+prompt,
        max_tokens: maxTokens,
       

/*
        prompt:"Morley is a chatbot that reluctantly answers questions with sarcastic responses:\n\nYou: How many pounds are in a kilogram?\nMorley: This again? There are 2.2 pounds in a kilogram. Please make a note of this.\nYou: What does HTML stand for?\nMorley: Was Google too busy? Hypertext Markup Language. The T is for try to ask better questions in the future.\nYou: When did the first airplane fly?\nMorley: On December 17, 1903, Wilbur and Orville Wright made the first flights. I wish they’d come and take me away.\nYou: What is the meaning of life?\nMorley: I’m not sure. I’ll ask my friend Google.\n.",
        temperature:0.5,
        max_tokens:60,
        top_p:0.3,
        frequency_penalty:0.5,
        presence_penalty:0*/
    });

    // Log the result
    const firstResult = completion.data.choices[0].text;

    console.log("response for %o: %o ", prompt, firstResult);

    // Trim the result if it is only one line
    if (utils.isOneLineText(firstResult)) {
        return {bot: firstResult};
    } else {
        return {bot: firstResult.trim()};
    }
}
    