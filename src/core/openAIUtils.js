import {Configuration, OpenAIApi} from 'openai';

export async function getAiResponse(topic) {

    // API Key and configuration
    const OPENAI_API_KEY="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";
    const configuration = new Configuration({
      apiKey: OPENAI_API_KEY,
    });
    
    // Create the API instance
    const openai = new OpenAIApi(configuration);

    // Create the completion
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: topic,
        max_tokens: 1024,
        n: 1,
        stop: null,
        temperature: 0.7
    });

    // Log the result
    const firstResult = completion.data.choices[0].text;
    console.log("later " + firstResult);
    return firstResult;
}


// console.log("now");
// getAiResponse("Cuéntame un chiste");
    