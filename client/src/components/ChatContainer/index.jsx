import bot from '../../../assets/favicon.png';
import { useEffect, useState } from "react";
import * as utils from '../../core/utils';

export default function ChatContainer (props) {

    // Render
    let stripes = props.stripes;
    let HAS_STRIPES = stripes.length > 0;

    // Scroll to bottom
    useEffect(() => {
        const chatContainer = document.getElementById("chat-container");

        if (!chatContainer) {
            return;
        }
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, [stripes]);



    const renderEmptyChat = () => {
        return (
            <div className="wrapper ai is-hidden">
            <div className="chat">
                <div className="profile">
                    Empty
                </div>
                <div className="message">
                    Empty
                </div>
            </div>
        </div>    
        )
    }

    const renderChat = (stripes) => {                          
        return stripes.map((stripe, index) => {
            // debugger;
            return (
                <div id={stripe.uniqueId} key={stripe.uniqueId} className={'wrapper is-' + (stripe.isAi ? 'bot':'user')}>
                    <div className="chat">
                        <div className="stripe-index">{index}</div>
                        <div className="profile">
                            <img src = {stripe.isAi ? bot : props.userAvatar} alt={stripe.isAi ? 'bot' : 'user'} />
                        </div>
                        <div className="message">
                            <b>{stripe.isAi ? 'DroloGPT' : 'user'}: </b>
                            {stripe.value}
                            {stripe.isAi && <div className="chat-stripe-loader"></div>}
                        </div>
                    </div>
                </div>
            )
        })
    }
    return (
        <div id="chat_container" className="chat-container">
            {!HAS_STRIPES && renderEmptyChat()}
            {HAS_STRIPES && renderChat(stripes)}
        </div>
    );
}
