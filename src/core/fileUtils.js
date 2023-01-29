import fs from 'fs';
import Handlebars from 'handlebars';
import Quote from 'inspirational-quotes';
import codemirror from 'codemirror-node';
import {toJson} from 'really-relaxed-json';

// Read the original file and convert it to JSON
export const readBTCFile = () => {
  const config = toJson('./original/btc/config.json');
  // const rawdata = fs.readFileSync('./original/btc/config.json');
  // const config = JSON.parse(rawdata);
  return config;  
}

// Read the original file and convert it to JSON
export const readFile = (filePath) => {
    const rawdata = fs.readFileSync(filePath);
    const config = toJson(rawdata.toString());
    return config;  
  }
  

export const writeBTCFile = (config, date) => {

  // Get the target path for BTC
  const targetBTCFilePath = process.env.TARGET_BTC_PATH;
  const targetBTCFile = targetBTCFilePath + '/config.json';

  // Write the file on target path
  const fileAsString = JSON.stringify(config, null, 2);
  fs.writeFileSync(targetBTCFile, fileAsString);

  // Store a copy of this file and add the date for future references
  const dateMarker = date ? date.toISOString().split('T')[0] + '_' + date.toISOString().split('T')[1].split('.')[0].replaceAll(":",".") : new Date().toISOString().split('T')[0] + '_' + new Date().toISOString().split('T')[1].split('.')[0].replaceAll(":",".");
  const targetBTCFileBackup = 'generated/btc/config_' + dateMarker + '.json';
  fs.writeFileSync(targetBTCFileBackup, fileAsString);
  return fileAsString;  
}

export const getHtmlContentFor = (who, bestBTCKeysArray, configAsString, date) => {

  const templatePath = bestBTCKeysArray.length > 0 ? './templates/email/success-deploy.handlebars' : './templates/email/fail-deploy.handlebars';
  const htmlContent = fs.readFileSync(templatePath, 'utf8');
  var template = Handlebars.compile(htmlContent);

  // Get Quote of the day
  const footerQuote = Quote.getQuote();
  const quote = {  
    "text":"sangra la napia por la pestaña",
    "author":"Ufarly"
 };
  console.log("quote: %o", footerQuote);

  // Get JSON Pretified
  let configAsStringPrettied = configAsString ? codemirror(configAsString, 'javascript') : null;

  var data = {
    "who": who,
    "bestBTCKeysArray": bestBTCKeysArray,
    "configAsString": configAsString,
    "configAsStringPrettied": configAsStringPrettied,
    "quote": quote,
    "footerQuote": footerQuote,
    "date": date ? date.toDateString() + ' ' + date.toTimeString().split(' ')[0] : new Date().toDateString() + ' ' + new Date().toTimeString().split(' ')[0]
  };
  var result = template(data);
  return result;
}

export const writeResultsFile = (fileAsString) => {

  // Get the target path for the results file
  const targetResultsPath = process.env.TARGET_RESULTS_FILE_PATH;
  const targetResultsFile = targetResultsPath + '/results.html';

  fs.writeFileSync(targetResultsFile, fileAsString);
}

export const createConfigFileForBTC = (BTCKeys, date) => {

  // Read the original file and convert it to JSON
  const originalConfigAsJSON = readBTCFile();

  // Substitute the values with the ones in params
  originalConfigAsJSON.exchange.pair_whitelist = BTCKeys;

  // Write the file in the targetPath for BTC
  const fileAsString = writeBTCFile(originalConfigAsJSON, date);
  console.log('BTC config file created');
  return fileAsString;
}

export const writeFile = (filePath, fileAsString) => {

    fs.writeFileSync(filePath, fileAsString);
  }
  