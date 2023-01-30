// Logger
var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "debug";

import { exec } from "child_process";
import * as fs from "fs";
import * as utils from './utils';

export const restartBot = (who) => {

  // Execute system command
  const cmd = process.env.COMMANDS_TO_EXECUTE
  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(stdout);
  });
}
export const printResultsFile = (who) => {

  // Execute system command
  const cmd = "pygmentize -g " + 'results.html';
  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(stdout);
  });
}

export const getMachineNameFromSystem = () => {

    // Execute system command synchronously
    const cmd = "hostname";
    const execSync = require('child_process').execSync;
    const machineName = execSync(cmd); 
    return machineName;
}
export const getCommitInfoFromSystem = () => {

    // Execute system command synchronously

    // Get last commit comment and author
    const cmd = "git log -1 --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit";
    const execSync = require('child_process').execSync;
    const commitInfo = execSync(cmd); 
    return commitInfo;
}
export const getNodesTreeFromFile = () => {

    // 1. Get nodes json from local file
    const nodes = utils.getNodesJson();

    return nodes;
}

