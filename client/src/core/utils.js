
import { createAvatar } from '@dicebear/core';
import * as avatarCollections from '@dicebear/collection';


// Intervals for loading and typing text

export function loader(uniqueId, loadInterval, setLoadInterval) {

    // get the message div
    const element = document.getElementById(uniqueId)

    if (!element) {
        console.log ("No element found with ID: ", uniqueId)
        return;
    }
    console. log ("Found element with ID: ", uniqueId)
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
    const messages = document.querySelector('.chat-container');
    messages.scrollTop = messages.scrollHeight;
}