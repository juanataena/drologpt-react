import Imap from 'imap';
import {simpleParser} from 'mailparser';
import * as emailUtils from '../core/emailUtils.js';
import * as fileUtils from '../core/fileUtils.js';
import * as systemUtils from '../core/systemUtils.js';
import * as queueUtils from '../core/queueUtils.js';
import dotenv from 'dotenv';
dotenv.config();

const BTCKeysStack = [];
let bestBTCKeys = new queueUtils.Queue;
let bestBTCKeysArray = [];
let lastDate = null;
const who = "BTC";

const generateResultsPage = (who, bestBTCKeysArray, fileAsString, date) => {
  
  const htmlContent = fileUtils.getHtmlContentFor(who, bestBTCKeysArray, fileAsString, date);
  fileUtils.writeResultsFile(htmlContent);
  return htmlContent;

}

const getBestTenFromQueue = () => {
  while (bestBTCKeysArray.length < process.env.MAX_PAIRS && !bestBTCKeys.isEmpty()) {
    const queueElement = bestBTCKeys.dequeue();
      
    if (bestBTCKeys.items.indexOf(queueElement)<0) {
        bestBTCKeysArray.push(queueElement);
      }
    console.log("queueElement: %o, bestBTCKeysArray: %o", queueElement, bestBTCKeysArray);
  }
  return bestBTCKeysArray;
}

const addKEysToBTCKeysQueue = (keys, date) => {
  BTCKeysStack.push({keys, date});
}

const getBestTBTCKEysFromBTCKeysStack = () => {
  
  // Insert Each element into the queue
  for (let i = 0; i < BTCKeysStack.length; i++) {
    const stackElement = BTCKeysStack[i].keys;
    for(let j = 0; j < stackElement.length; j++) {
      const element = stackElement[j];
        bestBTCKeys.enqueue(element);
    }
   console.log(bestBTCKeys); 
  }

  // Reverse the results to get first the last entry
  bestBTCKeys.reverse();

  console.log("Reversed: %o", bestBTCKeys); 

  return bestBTCKeys;
}


const getEmails = () => {
    try {
      const imap = new Imap(emailUtils.imapConfig);
      imap.once('ready', () => {
        imap.openBox('INBOX', false, () => {

          // Take the day of yesterday and set the subject to search
          const subject = 'Screener Alert: New Top gainers'; 
          const d = new Date();
          d.setDate(d.getDate() - 100);
          // Start reading the emails
          imap.search(['UNSEEN', ['SINCE', d], ['SUBJECT', subject]], (err, results) => {

            try {

              const f = imap.fetch(results, {bodies: ''});
              f.on('message', msg => {
                msg.on('body', stream => {
                  simpleParser(stream, async (err, parsed) => {
                    // const {from, subject, textAsHtml, text} = parsed;
                    // console.log(parsed);
                    /* Make API call to save the data
                        Save the retrieved data into a database.
                        E.t.c
                    */
                    const {from, subject, textAsHtml, text, date} = parsed;
                    const BTCKeys = emailUtils.extractInfoBTC(text);
                    addKEysToBTCKeysQueue(BTCKeys, date);
                    
                    // Kitar!
                    // bestBTCKeys = BTCKeys;
                    lastDate = date;

                    // console.log(BTCKeysStack);
                  });
                });
                msg.once('attributes', attrs => {
                  const {uid} = attrs;
                  imap.addFlags(uid, ['\\Seen'], () => {
                    // Mark the email as read after reading it
                    console.log('Marked as read!');
                  });
                });
              });
              f.once('error', ex => {
                return Promise.reject(ex);
              });
              f.once('end', () => {
                console.log('Done fetching all messages!');
                setTimeout(function () {

                  console.log(BTCKeysStack);
                  bestBTCKeys = getBestTBTCKEysFromBTCKeysStack();
                  
                  console.log(getBestTenFromQueue());
                }, 100);

                imap.end();
              });
              
            } catch (error) {
              console.log(error.toString());

              var generatedPage = generateResultsPage(who, bestBTCKeysArray, null, new Date())
              emailUtils.sendNoResultsEmail(who, generatedPage);

              // Cutreeee
              setTimeout(function () {process.exit(0)} , 10000);

            }
          });
        });
      });
  
      imap.once('error', err => {
        console.log(err);
      });
  
      imap.once('end', () => {
        console.log('Connection ended');


        // Generate the results page, email the results & restart the bot only if there are values the bestXXXArray
        console.log('Creating file...');
          if (bestBTCKeysArray.length > 0) {
            // console.log('File created: %o', JSON.parse(fileAsString));
            const fileAsString = fileUtils.createConfigFileForBTC(bestBTCKeysArray, lastDate);
            var generatedPage = generateResultsPage(who, bestBTCKeysArray, fileAsString, lastDate);
         
            emailUtils.sendResultsEmail(who, generatedPage);

            systemUtils.printResultsFile(who);
            console.log('File created: %o', fileAsString);
            // systemUtils.restartBot(who);
            // console.log('Bot restarted!');


            
        } else {
            console.log('No new results found!');
            emailUtils.sendNoResultsEmail(who);
          }
        

      });
  
      imap.connect();
    } catch (ex) {
      console.log('an error occurred');
    }
  };
  
  getEmails();