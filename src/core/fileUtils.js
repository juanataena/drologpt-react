import fs from 'fs';
import Handlebars from 'handlebars';
import codemirror from 'codemirror-node';
import {toJson} from 'really-relaxed-json';

// FILES
// Read the original file and convert it to JSON
export const readFile = (filePath) => {
    const rawdata = fs.readFileSync(filePath);
    const config = toJson(rawdata.toString());
    return config;  
}
export const writeFile = (filePath, fileAsString) => {

    fs.writeFileSync(filePath, fileAsString);
}
export const getFilesFromFolder = (folderPath) => {
    
    const files = fs.readdirSync(folderPath);
    return files;
}

// HTML
export const getHtmlContentFor = (who, bestBTCKeysArray, configAsString, date) => {

    const templatePath = bestBTCKeysArray.length > 0 ? './templates/email/success-deploy.handlebars' : './templates/email/fail-deploy.handlebars';
    const htmlContent = fs.readFileSync(templatePath, 'utf8');
    var template = Handlebars.compile(htmlContent);
  
    // Get Quote of the day
    const footerQuote = "Sangra";
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
  
  