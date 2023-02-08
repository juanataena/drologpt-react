// available calls

// APP
export async function getMachineName(){
    // e.preventDefault();
    const response = await fetch('/get-machine-name', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    },
      body: JSON.stringify(),
    });
    const body = await response.text();
    ;
    return body;
};
export async function getCommitInfo(){
    // e.preventDefault();
    const response = await fetch('/get-commit-info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    },
      body: JSON.stringify(),
    });
    const body = await response.text();
    ;
    return body;
};

// OPENAI
export async function promptOpenAI(prompt, maxTokens, temperature, topP, frequencyPenalty, presencePenalty, stop){
    // e.preventDefault();
    const response = await fetch('/prompt-openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    },
      body: JSON.stringify({prompt, maxTokens, temperature, topP, frequencyPenalty, presencePenalty, stop}),
    });
    const body = await response.text();
    return body;
}

// BOTS
export async function getBots(){
    // e.preventDefault();
    const response = await fetch('/get-bots', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    },
      body: JSON.stringify(),
    });
    const body = await response.text();
    ;
    return body;
}
export async function getBot(bot){
    // e.preventDefault();
    const response = await fetch('/get-bot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    },
      body: JSON.stringify({bot}),
    });
    const body = await response.text();
    ;
    return body;
}
export async function createBot(bot){
    // e.preventDefault();
    const response = await fetch('/create-bot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    },
      body: JSON.stringify({bot}),
    });
    const body = await response.text();
    ;
    return body;
}
export async function updateBot(bot){
    // e.preventDefault();
    const response = await fetch('/update-bot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    },
      body: JSON.stringify({bot}),
    });
    const body = await response.text();
    ;
    return body;
}
export async function deleteBot(bot){
    // e.preventDefault();
    const response = await fetch('/delete-bot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    },
      body: JSON.stringify({bot}),
    });
    const body = await response.text();
    ;
    return body;
}

