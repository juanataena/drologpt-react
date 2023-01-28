// Intervals for loading and typing text
export function loader(element, loadInterval) {

    // Clear any existing intervals
    clearInterval(loadInterval);

    // Remove any existing loading indicators
    var loadingIndicators = document.querySelectorAll('.loading-indicator');
    loadingIndicators.forEach(function (loadingIndicator) {
        // Remove the loading indicator
        loadingIndicator.remove();
    });

    // Create a loading indicator below the element
    var loadingIndicator = document.createElement('span');
    loadingIndicator.className = 'loading-indicator';
    element.appendChild(loadingIndicator);
    
    loadingIndicator.textContent = ''

    loadInterval = setInterval(() => {
        // Update the text content of the loading indicator
        loadingIndicator.textContent += '.';

        // If the loading indicator has reached three dots, reset it
        if (loadingIndicator.textContent === '....') {
            loadingIndicator.textContent = '';
        }
    }, 300);
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
 *  Chat stripe
 * @param {*} isAi 
 * @param {*} value 
 * @param {*} uniqueId 
 * @returns 
 */
export function chatStripe(isAi, value, uniqueId) {
    debugger;
    return (
        `

    `
    )
}

