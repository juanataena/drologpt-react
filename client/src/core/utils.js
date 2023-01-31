import { ConsoleGray, ConsoleGrayDS, ConsoleGrayJS, ConsoleGrayJSDS, ConsoleOrange, ConsoleOrangeDS, ConsoleOrangeJS, ConsoleOrangeJSDS } from 'colorize-console-log';

import { createAvatar } from '@dicebear/core';
import * as avatarCollections from '@dicebear/collection';

import user from 'assets/user.svg';
import bot from 'assets/favicon.png';
// Intervals for loading and typing text

export function loader(uniqueId, loadInterval, setLoadInterval) {

    // get the message div
    const element = document.getElementById(uniqueId)

    if (!element) {
        console.log ("No element found with ID: ", uniqueId)
        return;
    }
    // console.log ("Found element with ID: ", uniqueId)
    // debugger;
    const loader = element.querySelector('.chat-stripe-loader');
    loader.textContent = ''

    loadInterval = setInterval(() => {
        // Update the text content of the loading indicator
        loader.textContent += '.';

        // If the loading indicator has reached three dots, reset it
        if (loader.textContent === '....') {
            loader.textContent = '';
        }
    }, 300);
    setLoadInterval(loadInterval);
}

export function loaderStop (loadInterval) {
    clearInterval(loadInterval);
}

/**
 * Type text effect
 * @param {HTMLElement} element 
 * @param {String} text 
 */
export function typeText(element, text) {
    let index = 0

    let interval = setInterval(() => {
        if (index < text.length) {
            element.innerHTML += text.charAt(index)
            index++
        } else {
            clearInterval(interval)
        }
    }, 20)
}
/**
 * 
 * generate unique ID for each message div of bot
 * necessary for typing text effect for that specific reply
 * without unique ID, typing text will work on every element
 * 
 * @returns 
 */
export function generateUniqueId() {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);

    return `id-${timestamp}-${hexadecimalString}`;
}

/**
 *         // Taken from dicebear.com
 * Get a random avatar as a PNG
 * @returns 
 */
export async function getRandomAvatarAsPNG () {
    const options = {
        seed: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        borderRadius: 10,
    };
    // Pick one randon library from avatarCollections
    const randomCollection = Object.values(avatarCollections)[Math.floor(Math.random() * Object.values(avatarCollections).length)];
    
    const avatar = createAvatar(randomCollection, options);
    const png = await avatar.png({ 
        options
    });
    return png.toDataUri();
}


export function scrollToBottom () {
    const messages = document.querySelector('.chat-stripes');
    messages.scrollTop = messages.scrollHeight;
}

export function sendFakeRequest (setData, setLoading) {
        // Fake response
        setTimeout(() => {

            const fakeData = {
                bot: "Sangra mucho"
                // bot:"\n\nThe word \"eo\" is not a word in English. It is a root word in Esperanto, an international language created in the late 19th century. In Esperanto, \"eo\" means \"of or belonging to.\""
            }

            
            // Set the data
            setData(fakeData);
            setLoading(false);
}, 2000);}




/////////////


// ERROR FUNCTIONS
export function showError(err) {
    console.log(err);
  }
  export function errorLog(message) {
      log(message,'ORANGE');
  }
  export function log(message, kind, subMessage, emoji1, emoji2) {
  
      // Set defaults
      if(!kind) kind = 'REGULAR';
      if(!emoji1) emoji1 = '🐛';
      if(!emoji2) emoji2 = '🐛';
      let colorizedMessage = null;
      
      // Set special types
      if (kind === 'MAIN_START') {kind = 'GRAY'; emoji1 = '🔥'; emoji2 = '🔥';}
      if (kind === 'LOADING') {kind = 'ORANGEJS'; emoji1 = '⌛'; emoji2 = '⌛';}
      if (kind === 'MAIN_END') {kind = 'GRAYDS'; emoji1 = '🔥'; emoji2 = '🔥';}
  
      // Select the proper console
      switch(kind) {
          case '':
              colorizedMessage = ConsoleGray(emoji1 + ' ' + message + ' ' + emoji2, subMessage? subMessage: '');
              break;
          case 'ORANGE':
              colorizedMessage = ConsoleOrange(emoji1 + ' ' + message + ' ' + emoji2, subMessage? subMessage: '');
              break;
          case 'ORANGEJS':
              colorizedMessage = ConsoleOrangeJS(emoji1 + ' ' + message + ' ' + emoji2, subMessage? subMessage: '');
              break;
          case 'ORANGEDS':
              colorizedMessage = ConsoleOrangeDS(emoji1 + ' ' + message + ' ' + emoji2, subMessage? subMessage: '');
              break;
          case 'ORANGEJSDS':
              colorizedMessage = ConsoleOrangeJSDS(emoji1 + ' ' + message + ' ' + emoji2, subMessage? subMessage: '');
              break;
  
          case 'GRAY':
              colorizedMessage = ConsoleGray(emoji1 + ' ' + message + ' ' + emoji2, subMessage? subMessage: '');
              break;
          case 'GRAYJS':
              colorizedMessage = ConsoleGrayJS(emoji1 + ' ' + message + ' ' + emoji2, subMessage? subMessage: '');
              break;
          case 'GRAYDS':
              colorizedMessage = ConsoleGrayDS(emoji1 + ' ' + message + ' ' + emoji2, subMessage? subMessage: '');
              break;
          case 'GRAYJSDS':
              colorizedMessage = ConsoleGrayJSDS(emoji1 + ' ' + message + ' ' + emoji2, subMessage? subMessage: '');
              break;
      
          default:
              colorizedMessage = ConsoleGray(emoji1 + ' ' + message + ' ' + emoji2, subMessage? subMessage: '');
              break;
      }
      console.log(...colorizedMessage);
  }
    
  // Aux Functions
  export function base64Decode(encoded) {
      // console.log('encoded: ' + encoded);
      const b = new Buffer(encoded, 'base64');
      return b.toString();
  }
  export function capitalizeFirst(value) {
      if (value !== null) {
          const regex = /(\b[a-z](?!\s))/g;
          return value ? value.replace(regex, (v) => {
              return v.toUpperCase();
          }) : '';
      }
      return value;
  }
  export function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }
  export function getWidth(el) {
    const rect = el.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height
    };
  }
  
  //
  export function htmlToText(html) {
      var temp = document.createElement('div');
      temp.innerHTML = html;
      return temp.textContent; // Or return temp.innerText if you need to return only visible text. It's slower.
  }
  export function isValidJson(jsonAsString) {
      let IS_VALID_JSON = true;
      try {
              JSON.parse(jsonAsString);
      } catch (e) {
          IS_VALID_JSON = false;
      }
      return IS_VALID_JSON;
  }
  export function isTimestampPast(field, payload) {
  
      try {
          const payloadAsString =base64Decode(payload);
          const payloadAsJSON =JSON.parse(payloadAsString);
          const fieldTimestamp = payloadAsJSON[field];
          if(typeof payloadAsJSON[field]==='undefined') {
              return true;
          }
          const now = Date.now();
          const nowSecs = now/1000;
  
          const isPast = nowSecs > fieldTimestamp;
          return isPast;
      } catch (e) {
          return false;
      }
  }
  export function getAsJson(elementAsString) {
      let element = null;
      try {
          element = JSON.parse(base64Decode(elementAsString));
      } catch (e) {
  console.error("error: " + e);
      } finally {
  
      }
      return element;
  }
  // Get iso date withouth timeZone
  export const getIsoDate = (date) => {
  
      if (date) {
          return new Date(date).toISOString().split('.')[0];    
      }
      return new Date().toISOString().split('.')[0];
  }
  
  
  
export function chatStripe(isAi, value, uniqueId) {
    
    return (
        `
        <div class="wrapper ${isAi && 'ai'}">
            <div class="chat">
                <div class="profile">
                    <img 
                      src=${isAi ? bot : user} 
                      alt="${isAi ? 'bot' : 'user'}" 
                    />
                </div>
                <div class="message" id=${uniqueId}>${value}</div>
            </div>
        </div>
    `
    )
}

export function dataURItoBlob (dataUril) {

    var byteString = atob(dataUril.split(',')[1]);
    var mimeString = dataUril.split(',')[0].split(':')[1].split(';')[0]
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab], {type: mimeString});
    return blob;
}