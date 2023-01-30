import axios from "axios";
import { useEffect, useState } from "react";

import * as utils from 'core/utils';

import Header from 'components/Header';
import Prompt from 'components/Prompt';
import ChatContainer from 'components/ChatContainer';

import * as api from 'core/api';

import 'bulma/css/bulma.min.css';
import '../css/drologpt.css'


function DroloGPT(props) {

    const [placeholder, setPlaceholder] = useState("Hola, soy Drolo GPT. Qué quieres preguntar?");
    const [prompt, setPrompt] = useState("¿Cuánto sangra?");
    // const [prompt, setPrompt] = useState("hola");
    const [data, setData] = useState();
    const [stripes, setStripes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadInterval, setLoadInterval] = useState(); 
    const [userAvatar, setUserAvatar] = useState();

    // Setup first time
    useEffect(() => {

        // Set one initial stripe (welcome message from Drolo GPT)
        // setStripes([{isAi: true, value: "Hola, soy Drolo GPT. ¿Qué quieres preguntar?", uniqueId: utils.generateUniqueId()}]);

        // Set the user avatar
        utils.getRandomAvatarAsPNG().then (png => {
            setUserAvatar(png);
        });
        
        // Get prompt from the server
        const stramboticHelloPrompt = "Say hello in a strambotic way";
        api.promptOpenAI(stramboticHelloPrompt).then( (response) => {
            console.log("Prompt: %o", JSON.parse(response));
            const drologptStripe = {isAi: true, value: JSON.parse(response).bot, uniqueId: utils.generateUniqueId()};
            setStripes([...stripes, drologptStripe]);
            // debugger;
        }).catch(utils.showError);

    }, []);

    // React Effect for loading & prompt state change // FAKE
    useEffect(() => {
        console.log("Loading: ", loading);
        if (loading) {

            // Remove the last stripe (the one with the loader), if any
            if (stripes.length > 0) {

                // For each stripe check if isAi is true and the value is " ". If so, remove it
                const nonLoadingStripes = stripes.filter(stripe => !(stripe.isAi && stripe.value === " "));

                // Add a new stripe loading stripe
                const newStripe = {isAi: true, value: " ", uniqueId: utils.generateUniqueId()};
                const newStripes = [...nonLoadingStripes, newStripe];
                setStripes(newStripes);            
            }
        }
    }, [loading]);

    // React Effect for STRIPES state change
    useEffect(() => {
        console.log("Stripes: %o", stripes);
        if (stripes.length > 0) {
            const lastStripe = stripes[stripes.length - 1];
            if (lastStripe.isAi) {
                
                // If it has text and it is the last one, then stop the loader
                // debugger;
                if (lastStripe.value === " ") {
                    console.log("cargando");
                    utils.loader(lastStripe.uniqueId, loadInterval, setLoadInterval);
                } else {
                    console.log("no cargando");
                    // if (loadInterval) {
                    //     clearInterval(loadInterval);
                    //     setLoadInterval(null);

                    // }
                }
            } 

            // Scroll to bottom
            utils.scrollToBottom();

        }
    }, [stripes]);

    // React Effect for DATA state change
    useEffect(() => {

        // Log the data
        console.log("Data: %o", data);
        // Get the result from the state
        const result = data?.bot;

        if (result) {

            // Remove the last stripe (the one with the loader), if any
            if (stripes.length > 0) {

                // For each stripe check if isAi is true and the value is " ". If so, remove it
                const nonLoadingStripes = stripes.filter(stripe => !(stripe.isAi && stripe.value === " "));

                // Add a new stripe with the result
                const newStripe = {isAi: true, value: result, uniqueId: utils.generateUniqueId()};
                const newStripes = [...nonLoadingStripes, newStripe];
                setStripes(newStripes);

                // Set Loading to false
                setLoading(false);

                if (loadInterval) {
                    clearInterval(loadInterval);
                    setLoadInterval(null);

                }

            }
    
        }
    }, [data]);

    // Funciones para el chat
    const handleDeleteStripes = () => {

        // Clear prompt
        setPrompt('');
        setData(null);

        // Clear stripes
        setStripes([]);

        // Clear loading
        setLoading(false);

        // Clear interval
        if (loadInterval) {
            clearInterval(loadInterval);
            setLoadInterval(null);
        }
        
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
  
        // Stop any other previous requests

        // Check if we have the comodin prompt
        if (prompt === "¿Cuánto sangra?") {
            utils.sendFakeRequest(setData, setLoading);
        } else {
        api.promptOpenAI(prompt).then( (response) => {
            utils.log('1. OpenAI Prompted', 'MAIN_END', response);
            setData(JSON.parse(response))
        }).catch(() => {
            utils.showError();
            const chatContainer = document.querySelector('#chat_container')
            const uniqueId = utils.generateUniqueId()
            chatContainer.innerHTML += utils.chatStripe(true, " ", uniqueId)
            const messageDiv = document.getElementById(uniqueId)
            clearInterval(this.loadInterval)
            messageDiv.innerHTML = "Something went wrong"
            
        });

            // // Post data to server
            // axios
            // .post(urlWithProxyPost, {prompt})
            // .then((res) => parseResponse(res))
            // .catch((err) => parseErrorResponse(err))
        }
        
    }
    const parseResponse = (res) => {
        // debugger;
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

    }

    return (
        <div id="drologpt_app" className="drologpt-app-container">
            
            {/* Header de Drolo GPT */}
            <Header
                machineName={props.machineName}
                prompt={prompt}
                data={data}
                stripes={stripes}
                loading={loading}
                loadInterval={loadInterval}
                userAvatar={userAvatar}
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
                loadInterval={loadInterval}
                setPrompt={setPrompt}
                userAvatar={userAvatar}

                handleSendPrompt={handleSendPrompt}
            />
        </div>
    );
}

export default DroloGPT;
