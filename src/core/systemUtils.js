import { exec } from "child_process";
import * as utils from './utils';
import  * as fileUtils from './fileUtils';
// App
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

// Bots
export const getBotsFromSystem = () => {
    
        // Get all the bots from the folder data/models
        const bots = fileUtils.getFilesFromFolder(__dirname+'/../data/models');

        // Read each file and convert it to JSON
        const botsArray = [];
        bots.forEach(bot => {
            const botJson = fileUtils.readFile(__dirname+'/../data/models/'+bot);
            botsArray.push(botJson);
        });
        return botsArray;
    }

