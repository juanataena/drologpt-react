// available calls

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