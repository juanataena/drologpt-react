import axios from "axios";
import { useState } from "react";
import * as utils from './core/utils';
import Prompt from './components/Prompt';
import ChatContainer from './components/ChatContainer';
let loadInterval;
// form.addEventListener('submit', handleSubmit)
// form.addEventListener('keyup', (e) => {
//     if (e.keyCode === 13) {
//         handleSubmit(e)
//     }
// })



function App() {
    
    const [data, setData] = useState();
    const [prompt, setPrompt] = useState();
    const [chatContainer, setChatContainer] = useState();
    const [form, setForm] = useState();

    const [loadInterval, setLoadInterval] = useState();

    const urlWithProxy = "/api/v1";
    const urlWithProxyPost = "/api/ask";

    // Funciones para el chat
    const handleSubmit = async (e) => {
        e.preventDefault()
    
        const data = new FormData(form)
    
        // user's chatstripe
        chatContainer.innerHTML += utils.chatStripe(false, data.get('prompt'))
    
        // to clear the textarea input 
        form.reset()
    
        // bot's chatstripe
        const uniqueId = utils.generateUniqueId()
        chatContainer.innerHTML += utils.chatStripe(true, " ", uniqueId)
    
        // to focus scroll to the bottom 
        chatContainer.scrollTop = chatContainer.scrollHeight;
    
        // specific message div 
        const messageDiv = document.getElementById(uniqueId)
    
        // messageDiv.innerHTML = "..."
        loader(messageDiv)
    
        let targetUrl = 'https://chat.drolo.club';
        targetUrl = 'http:localhost:5000';
        const response = await fetch(targetUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: data.get('prompt')
            })
        })
    
        utils.clearInterval(this.loadInterval)
        messageDiv.innerHTML = " "
    
        if (response.ok) {
            const data = await response.json();
            const parsedData = data.bot.trim() // trims any trailing spaces/'\n' 
    
            typeText(messageDiv, parsedData)
        } else {
            const err = await response.text()
    
            messageDiv.innerHTML = "Something went wrong"
            console.log(err)
        }
    }




    // Peticiones al servidor
    function getDataFromServer() {
        axios
        .get(urlWithProxy)
        .then((res) => setData(res.data))
        .catch((err) => {
            console.error(err);
        });
    }
    function getDataFromServerPost(prompt) {
        axios
        .post(urlWithProxyPost, {prompt})
        .then((res) => setData(res.data))
        .catch((err) => {
            console.error(err);
        });
    }
    const handleDataForServerPost = function (e) {
        e.preventDefault();
        const form = document.querySelector('form')
        const chatContainer = document.querySelector('#chat_container')

        const data = new FormData(form)
        getDataFromServerPost(data.get('prompt'));
    }
    
    return (
        <div id="drologpt_app" className="drologpt-app-container">
            
            {/* Chat container de Drolo GPT */}
            <ChatContainer chatContainer={chatContainer} setChatContainer={setChatContainer} />

            {/* Prompt de Drolo GPT */}
            <Prompt prompt={prompt} setPrompt={setPrompt} handleDataForServerPost={handleDataForServerPost} />
        </div>
    );
}

export default App;
