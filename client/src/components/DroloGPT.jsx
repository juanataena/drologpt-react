import { useEffect, useState, useMemo } from "react";

import * as utils from 'core/utils';

import Header from 'components/Header';
import Prompt from 'components/Prompt';
import ChatContainer from 'components/ChatContainer';
import html2canvas from 'html2canvas';

import { withCookies } from 'react-cookie';

import * as api from 'core/api';

import 'bulma/css/bulma.min.css';
import '../css/drologpt.css'


function DroloGPT(props) {

    const cookies = useMemo(() => props.cookies, [props.cookies]);
    
    // State
    const [placeholder] = useState("Hola, soy Drolo GPT. Qué quieres preguntar?");
    const [prompt, setPrompt] = useState("");
    const [data, setData] = useState();
    const [stripes, setStripes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadInterval, setLoadInterval] = useState(); 
    const [userAvatar, setUserAvatar] = useState();
    const [theme, _setTheme] = useState(cookies.get('theme') || 'light');

    // Setup FIRST TIME
    useEffect(() => {

        // Set the user avatar
        utils.getRandomAvatarAsPNG().then (png => {
            setUserAvatar(png);
        });
    
        // Get prompt from the server
        promptDroloGPT("Say hello in a strambotic way");

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // React Effect for PROMPT state change
    useEffect(() => {
        console.log("Prompt: ", prompt);
        if (prompt) {    
            // Check if we have the comodin prompt
            if (prompt === "¿Cuánto sangra?") {
                handleSendPrompt();
            } else {
                // Nothing to do
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prompt]);
    // React Effect for LOADING state change // FAKE
    useEffect(() => {
        console.log("Loading: ", loading);
        if (loading) {

            // Remove the last stripe (the one with the loader), if any
            if (stripes.length >= 0) {

                // For each stripe check if isAi is true and the value is " ". If so, remove it
                const nonLoadingStripes = stripes.filter(stripe => !(stripe.isAi && stripe.value === " "));

                // Add a new stripe loading stripe
                const newStripe = {isAi: true, value: " ", uniqueId: utils.generateUniqueId()};
                const newStripes = [...nonLoadingStripes, newStripe];
                setStripes(newStripes);         
                setPrompt("");
                // debugger;   
            }

            // Check if we have the comodin prompt
            if (prompt === "¿Cuánto sangra?") {
                utils.sendFakeRequest(setData, setLoading, setLoadInterval);
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
                    console.log('a');
                    clearInterval(loadInterval);
                    setLoadInterval(null);
                    messageDiv.innerHTML = "Something went wrong"
                    
                });

                // // Post data to server
                // axios
                // .post(urlWithProxyPost, {prompt})
                // .then((res) => parseResponse(res))
                // .catch((err) => parseErrorResponse(err))
            }

            // Clear prompt
            setPrompt('');
            setData(null);

        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    console.log("no cargando. Escribiendo...");
                    utils.typeText(lastStripe, loadInterval, setLoadInterval);
                }
            } 

            // Scroll to bottom
            utils.scrollToBottom();

        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);
    // React Effect for THEME state change
    useEffect(() => {
        console.log("Theme: ", theme);
        if (theme === "light") {
            document.body.classList.add("light-theme");
        } else {
            document.body.classList.remove("light-theme");
        }
    }, [theme]);
    // React Effect for LOADINTERVAL state change
    useEffect(() => {
        console.log("LoadInterval: ", loadInterval);

        // If there is no load interval, clear it
        if (!loadInterval) {
            clearInterval(loadInterval);
        }
    }, [loadInterval]);


    // CORE FUNCTIONS
    // State Cookie Functions
    const setTheme = (theme) => {

        // Set the theme in the cookies
        const { cookies } = props;
        cookies.set('theme', theme, { path: '/' });

        _setTheme(theme);
    }
    const promptDroloGPT = (prompt) => {
        // Set the prompt in the state
        setPrompt(prompt);
        // Set loading to true
        setLoading(true);
    }
    
    // HANDLER FUNCTIONS
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
    const handleSendPrompt = (e) => {
        
        // Prevent page from reloading
        if (e) e.preventDefault();
    
        // No prompt, no post
        if (!prompt) {
            return;
        }
        
        // Log the prompt
        console.log("Prompt Before: ", prompt);
        const uniqueId = utils.generateUniqueId();
        const newStripe = {isAi: false, value: prompt, uniqueId: uniqueId};
    
        setStripes([...stripes, newStripe]);
        setLoading(true);
  
        // Stop any other previous requests

        
        
    }
    const handleSendSangraPrompt = (e) => {

        // Prevent page from reloading
        if (e) e.preventDefault();
        
        setPrompt('¿Cuánto sangra?');
    }
    const handleChangeTheme = () => {
        if (theme === "light") {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }

    const generatePromptAndSend = (prompt) => {

        // If there is no prompt, no post
        if (!prompt) {
            return;
        }

        // Log the prompt
        console.log("Prompt Before: ", prompt);
        const uniqueId = utils.generateUniqueId();
        const newStripe = {isAi: false, value: prompt, uniqueId: uniqueId};
        
        setStripes([...stripes, newStripe]);
        setLoading(true);
    }

    // ACTION BUTTON FUNCTIONS
    const handleSaveAsHTML = () => {

        console.log("Saving as HTML...");
        const chatContainer = document.querySelector('.chat-stripes')
        const html = chatContainer.innerHTML
        const blob = new Blob([html], {type: 'text/html'})
        const url = URL.createObjectURL(blob)

        const a = document.createElement('a')
        const filenameWithDate = `chat_${new Date().toISOString().split('.')[0].replaceAll('T', ' at ')}.html`
        a.download = filenameWithDate

        a.href = url
        a.click()
        URL.revokeObjectURL(url)
        
        console.log("DONE");


    }
    const handleSaveAsPng = () => {

        console.log("Saving as PNG...");
        const chatContainer = document.querySelector('.chat-stripes')

        // Add a style object class to the container to prepare it for the screenshot
        const style = document.createElement('style');
        style.innerHTML = `
            .drologpt-export {
                background-color: pink!important;
                padding: 1rem;
                border-radius: 1rem;
                box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
            }
        `;
        chatContainer.appendChild(style);


        html2canvas(chatContainer).then(canvas => {

            const imgData = canvas.toDataURL('image/png')

            const a = document.createElement('a')
            const filenameWithDate = `chat_${new Date().toISOString().split('.')[0].replaceAll('T', ' at ')}.png`
            a.download = filenameWithDate
            a.href = imgData
            
            // click with callback 
            a. click(function() {

                URL.revokeObjectURL(imgData)
            
                const prompt = "File saved.";
                generatePromptAndSend(prompt);

                // Remove the style object class
                chatContainer.removeChild(style);
    
            });
            
            
        });        
    }
    const handleSaveAsJson = () => {

        console.log("Saving as JSON...");
        const json = JSON.stringify(stripes)
        const blob = new Blob([json], {type: 'application/json'})
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        const filenameWithDate = `chat_${new Date().toISOString().split('.')[0].replaceAll('T', ' at ')}.json`
        a.download = filenameWithDate

        a.href = url
        a.click()
        URL.revokeObjectURL(url)


    }
    const handleImportJSON = () => {

        console.log("Importing JSON...");
        
        // Ask for a file
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.json';
        fileInput.click();

        // When the file is selected
        fileInput.onchange = () => {

            // Get the file
            const file = fileInput.files[0];
            const reader = new FileReader();

            // When the file is read
            reader.onload = () => {

                // Get the content
                const content = reader.result;

                // Parse the content
                const parsedContent = JSON.parse(content);

                // Set the content
                setStripes(parsedContent);
            }

            // Read the file
            reader.readAsText(file);
        }

        // console.log("DONE");


    }    
    // RENDER
    return (
        <div id="drologpt_app" className="drologpt-app-container">
            
            {/* Header de Drolo GPT */}
            <Header
                theme={theme}
                machineName={props.machineName}
                commitInfo={props.commitInfo}
                prompt={prompt}
                data={data}
                stripes={stripes}
                loading={loading}
                loadInterval={loadInterval}
                userAvatar={userAvatar}

                // Actions
                handleChangeTheme={handleChangeTheme}

                // Handlers
                handleSendPrompt={handleSendPrompt}
                handleDeleteStripes={handleDeleteStripes}
                handleSaveAsHTML={handleSaveAsHTML}
                handleSaveAsPng={handleSaveAsPng}
                handleSaveAsJson={handleSaveAsJson}
                handleImportJSON={handleImportJSON}
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
                userAvatar={userAvatar}
                commitInfo={props.commitInfo}
                stripes = {stripes}
                placeholder={placeholder}
                data={data}
                loadInterval={loadInterval}
                
                setPrompt={setPrompt}       
                handleSendPrompt={handleSendPrompt}
                handleSendSangraPrompt={handleSendSangraPrompt}
            />
        </div>
    );
}

export default withCookies(DroloGPT);