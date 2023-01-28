import axios from "axios";
import { useEffect, useState } from "react";

import * as utils from './core/utils';

import Prompt from './components/Prompt';
import ChatContainer from './components/ChatContainer';

function App() {
    const [placeholder, setPlaceholder] = useState("Hola. Soy Drolo. Pregúntame.");
    const [prompt, setPrompt] = useState("Cuánto sangra?");
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [loadInterval, setLoadInterval] = useState();

    // React Effect for prompt state change
    // useEffect(() => {

    //     // Log the prompt
    //     console.log("Prompt: %o", prompt);
        
    //     // Get the result from the state
    //     const result = data?.bot;

    //     // Clear the interval
    //     clearInterval(loadInterval);

    //     if (result) {

    //         // Get the unique ID from the state
    //         const uniqueId = data?.uniqueId;

    //         // Get the message div
    //         const messageDiv = document.getElementById(uniqueId);

    //         // Type the text
    //         const parsedData = result.trim() // trims any trailing spaces/'\n'
    //         utils.typeText(messageDiv, parsedData);    
    //     }

    // }, [prompt]);
    
    // React Effect for data state change
    useEffect(() => {

        // Log the data
        console.log("Data: %o", data);

        // Get the result from the state
        const result = data?.bot;

        if (result) {

            // Get the unique ID from the state
            const uniqueId = data?.uniqueId;

            // Get the message div
            const messageDiv = document.getElementById(uniqueId);

            // Type the text
            const parsedData = result.trim() // trims any trailing spaces/'\n'
            utils.typeText(messageDiv, parsedData);

            // const chatContainer = document.querySelector('#chat_container')
            // chatContainer.innerHTML += utils.chatStripe(true, " ", uniqueId)
            // clearInterval(this.loadInterval)
            // messageDiv.innerHTML = " "
            // utils.typeText(messageDiv, parsedData)
    
        }
    }, [data]);

    // React Effect for loading state change
    useEffect(() => {
        if (loading) {
            const chatContainer = document.querySelector('#chat_container')
            const uniqueId = utils.generateUniqueId();
            chatContainer.innerHTML += utils.chatStripe(false, prompt, uniqueId)
            const messageDiv = document.getElementById(uniqueId);
            utils.loader(messageDiv, loadInterval);
        }
    }, [loading]);
    // Funciones para el chat
    const handleDataForServerPost = async (e) => {
        
        // Prevent page from reloading
        e.preventDefault()
        
        // Log the prompt
        console.log("Prompt Before: ", prompt);

        
        // // Post data to server
        // axios
        // .post(urlWithProxyPost, {prompt})
        // .then((res) => parseResponse(res))
        // .catch((err) => parseErrorResponse(err))

        // Clear prompt
        setPrompt(prompt);
    }
    const parseResponse = (res) => {
        debugger;
        setData(res.data);
        // clearInterval(this.loadInterval)
        // messageDiv.innerHTML = " "

        // if (response.ok) {
        //     const data = await response.json();
        //     const parsedData = data.bot.trim() // trims any trailing spaces/'\n' 

        //     typeText(messageDiv, parsedData)
        // } else {
        //     const err = await response.text()

        //     messageDiv.innerHTML = "Something went wrong"
        //     console.log(err)
        // }

        
    }
    const parseErrorResponse = (err) => {
        const chatContainer = document.querySelector('#chat_container')
        const uniqueId = utils.generateUniqueId()
        chatContainer.innerHTML += utils.chatStripe(true, " ", uniqueId)
        const messageDiv = document.getElementById(uniqueId)
        clearInterval(this.loadInterval)
        messageDiv.innerHTML = "Something went wrong"
        console.log(err)
    }


    return (
        <div id="drologpt_app" className="drologpt-app-container">
            
            {/* Chat container de Drolo GPT */}
            <ChatContainer
                prompt={prompt}
                data={data}
            />

            {/* Prompt de Drolo GPT */}
            <Prompt
                prompt={prompt}
                placeholder={placeholder}
                data={data}

                setPrompt={setPrompt}
                handleDataForServerPost={handleDataForServerPost}
            />
        </div>
    );
}

export default App;
