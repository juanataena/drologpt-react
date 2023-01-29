require('dotenv').config();
import * as _C from '../constants';
import * as resolvers from '../resolvers';
import * as systemUtils from '../core/systemUtils';
import * as openAIUtils from '../core/openAIUtils';
// import * as utils from '../core/utils';
// import * as freqtradeCommandUtils from '../core/freqtradeCommandUtils';
// import * as fileUtils from '../core/fileUtils';
// import * as sqlite3Utils from '../core/sqlite3Utils';

// import * as chartDataUtils from '../core/chartDataUtils';
// Logger
// Logger
var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "info";

export function getMachineName(req, res) {

    logger.info('Getting machine name...');
    const machineName = systemUtils.getMachineNameFromSystem();
    logger.info('Machine name retrieved OK. Name: %s', machineName);
    resolvers.getMachineNameResponse(req, res, machineName);

}

export function promptOpenAI(req, res) {

    logger.info('Prompting OpenAI...');
    const prompt = req.body.prompt;
    const maxTokens = req.body.maxTokens;
    const temperature = req.body.temperature;
    const topP = req.body.topP;
    const frequencyPenalty = req.body.frequencyPenalty;
    const presencePenalty = req.body.presencePenalty;
    const stop = req.body.stop;

    const openAIResponse = openAIUtils.prompt(prompt, maxTokens, temperature, topP, frequencyPenalty, presencePenalty, stop);

    resolvers.promptOpenAIResponse(req, res, openAIResponse);
}