import axios from "axios";
import { useEffect, useState } from "react";

import * as utils from './core/utils';

import Header from './components/Header';
import Prompt from './components/Prompt';
import ChatContainer from './components/ChatContainer';

function App() {
    const [placeholder, setPlaceholder] = useState("Qué quieres preguntar?");
    const [prompt, setPrompt] = useState("Cuánto sangra?");
    const [data, setData] = useState();
    const [stripes, setStripes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadInterval, setLoadInterval] = useState(); 
    const [userAvatar, setUserAvatar] = useState();
    

    // Setup first time
    useEffect(() => {

        // Set one initial stripe (welcome message from Drolo GPT)
        // const initialStripe = {isAi: true, value: "Hola, soy Drolo GPT. ¿Qué quieres preguntar?", uniqueId: utils.generateUniqueId()};
        // Set the stripes
        // setStripes([initialStripe]);

        // Set the loading
        setLoading(false);

        // Set the load interval
        setLoadInterval();

        // Set the user avatar
        // Taken from dicebear.com
        utils.getRandomAvatarAsPNG().then (png => {
            
        setUserAvatar(png);
        });
    }, []);

    // React Effect for loading state change // FAKE
    useEffect(() => {
        if (loading) {

            // Remove the last stripe (the one with the loader), if any
            if (stripes.length > 0) {

            // For each stripe check if isAi is true and the value is " ". If so, remove it
            const nonLoadingStripes = stripes.filter(stripe => !(stripe.isAi && stripe.value === " "));            

            // Add a new stripe
            const newStripe = {isAi: true, value: " ", uniqueId: utils.generateUniqueId()};
            setStripes([...nonLoadingStripes, newStripe]);
            setLoading (false);
        }
        }
    }, [loading]);

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

    // React Effect for load interval state change
    useEffect(() => {
        if (loadInterval) {
            // get last stripe
            const lastStripe = stripes[stripes.length - 1];
            const uniqueId = lastStripe.uniqueId;
            // get the message div
            const messageDiv = document.getElementById(uniqueId)
            utils.loader(messageDiv, loadInterval);
        }
    }, [loadInterval]);

    // Funciones para el chat
    const handleDeleteStripes = () => {
        setStripes([]);
    }
    const handleSendPrompt = async (e) => {
        
        // Prevent page from reloading
        e.preventDefault()
        
        // No prompt, no post
        if (!prompt) {
            return;
        }
        
        // Log the prompt
        console.log("Prompt Before: ", prompt);
        const uniqueId = utils.generateUniqueId();
        const newStripe = {isAi: false, value: prompt, uniqueId: uniqueId};
    
        // Clear prompt
        setPrompt('');
        setData(null);
        setStripes([...stripes, newStripe]);
        setLoading(true);
        
        // // Post data to server
        // axios
        // .post(urlWithProxyPost, {prompt})
        // .then((res) => parseResponse(res))
        // .catch((err) => parseErrorResponse(err))
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
            
            {/* Header de Drolo GPT */}
            <Header
                handleSendPrompt={handleSendPrompt}
                handleDeleteStripes={handleDeleteStripes}
            />

            {/* Chat container de Drolo GPT */}
            <ChatContainer
                prompt={prompt}
                data={data}
                stripes={stripes}
                loading={loading}
                loadInterval={loadInterval}
                userAvatar={userAvatar}
            />

            {/* Prompt de Drolo GPT */}
            <Prompt
                prompt={prompt}
                stripes = {stripes}
                placeholder={placeholder}
                data={data}

                setPrompt={setPrompt}
                userAvatar={userAvatar}

                handleSendPrompt={handleSendPrompt}
            />
        </div>
    );
}

export default App;
