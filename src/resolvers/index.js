// import * as _C from '../constants';
import { default as PostRender } from './reactPostRender';

export { PostRender };

// App
export function getMachineNameResponse(req, res, machineName) {
    if (machineName /* ----> & body.result === 200 ??? <---- */) {
        // ;
        res.send(machineName);
    } else {
        res.send('errormarchineName');
    }
}
export function getCommitInfoResponse(req, res, commitInfo) {
    if (commitInfo /* ----> & body.result === 200 ??? <---- */) {
        // ;
        res.send(commitInfo);
    } else {
        res.send('errorcommitInfo');
    }
}

// OpenAI
export function promptOpenAIResponse(req, res, openAIResponse) {
    if (openAIResponse /* ----> & body.result === 200 ??? <---- */) {
        // ;
        res.send(openAIResponse);
    } else {
        res.send("error prompting openAI");
    }
}

// Bots
export function getBotsResponse(req, res, bots) {
    if (bots /* ----> & body.result === 200 ??? <---- */) {
        // ;
        res.send(bots);
    } else {
        res.send('errorbots');
    }
}
export function getBotResponse(req, res, bot) {
    if (bot /* ----> & body.result === 200 ??? <---- */) {
        // ;
        res.send(bot);
    } else {
        res.send('errorbot');
    }
}
export function createBotResponse(req, res, bot) {
    if (bot /* ----> & body.result === 200 ??? <---- */) {
        // ;
        res.send(bot);
    } else {
        res.send('errorbot');
    }
}
export function updateBotResponse(req, res, bot) {
    if (bot /* ----> & body.result === 200 ??? <---- */) {
        // ;
        res.send(bot);
    } else {
        res.send('errorbot');
    }
}
export function deleteBotResponse(req, res, bot) {
    if (bot /* ----> & body.result === 200 ??? <---- */) {
        // ;
        res.send(bot);
    } else {
        res.send('errorbot');
    }
}


