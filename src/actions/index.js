require('dotenv').config();
import * as _C from '../constants';
import * as resolvers from '../resolvers';
import * as systemUtils from '../core/systemUtils';
import * as openAIUtils from '../core/openAIUtils';

// Logger
var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "info";

// App
export function getMachineName(req, res) {

    logger.info('Getting machine name...');
    const machineName = systemUtils.getMachineNameFromSystem();
    logger.info('Machine name retrieved OK. Name: %s', machineName);
    resolvers.getMachineNameResponse(req, res, machineName);

}
export function getCommitInfo(req, res) {

    logger.info('Getting commit info...');
    const commitInfo = systemUtils.getCommitInfoFromSystem();
    logger.info('Commit info retrieved OK: %s', commitInfo);
    resolvers.getCommitInfoResponse(req, res, commitInfo);

}

// OpenAI
export async function promptOpenAI(req, res) {

    logger.info('Prompting OpenAI...');
    const prompt = req.body.prompt;
    const maxTokens = req.body.maxTokens;
    const temperature = req.body.temperature;
    const topP = req.body.topP;
    const frequencyPenalty = req.body.frequencyPenalty;
    const presencePenalty = req.body.presencePenalty;
    const stop = req.body.stop;

    const openAIResponse = await openAIUtils.prompt(prompt, maxTokens, temperature, topP, frequencyPenalty, presencePenalty, stop);

    resolvers.promptOpenAIResponse(req, res, openAIResponse);
}

// Bots
export function getBots(req, res) {

    logger.info('Getting bots...');
    const bots = systemUtils.getBotsFromSystem();
    logger.info('Bots retrieved OK. Bots: %s', bots);
    resolvers.getBotsResponse(req, res, bots);

}
export function getBot(req, res) {

    logger.info('Getting bot...');
    const bot = req.body.bot;
    const botInfo = systemUtils.getBotFromSystem(bot);
    logger.info('Bot retrieved OK. Bot: %s', botInfo);
    resolvers.getBotResponse(req, res, botInfo);

}
export function createBot(req, res) {

    logger.info('Creating bot...');
    const bot = req.body.bot;
    const botInfo = systemUtils.createBotFromSystem(bot);
    logger.info('Bot created OK. Bot: %s', botInfo);
    resolvers.createBotResponse(req, res, botInfo);

}
export function updateBot(req, res) {

    logger.info('Updating bot...');
    const bot = req.body.bot;
    const botInfo = systemUtils.updateBotFromSystem(bot);
    logger.info('Bot updated OK. Bot: %s', botInfo);
    resolvers.updateBotResponse(req, res, botInfo);

}
export function deleteBot(req, res) {

    logger.info('Deleting bot...');
    const bot = req.body.bot;
    const botInfo = systemUtils.deleteBotFromSystem(bot);
    logger.info('Bot deleted OK. Bot: %s', botInfo);
    resolvers.deleteBotResponse(req, res, botInfo);

}

