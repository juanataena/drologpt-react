import bot from '../../../assets/icon-macarrones.png'
import { useEffect, useState } from "react";
import * as utils from '../../core/utils';

export default function ChatContainer (props) {

    // Render
    let stripes = props.stripes;
    let HAS_STRIPES = stripes.length > 0;
   

    // React Effect for loading state change
    useEffect(() => {
        if (props.loading) {
            // get last stripe
            const lastStripe = stripes[stripes.length - 1];
            const uniqueId = lastStripe.uniqueId;
            // get the message div
            const messageDiv = document.getElementById(uniqueId)
            utils.loader(messageDiv, props.loadInterval);
        }
    }, [props.loading]);

    const renderEmptyChat = () => {
        return (
            <div className="wrapper ai">
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
                <div className="wrapper" id={stripe.uniqueId} key={stripe.uniqueId}>
                    <div className="chat">
                        <div className="profile">
                            <img src = {stripe.isAi ? bot : props.userAvatar} alt={stripe.isAi ? 'bot' : 'user'} />
                        </div>
                        <div className="message">
                            <b>{stripe.isAi ? 'DroloGPT' : 'user'}: </b>
                            {stripe.value}
                            {stripe.isAi && <div className="loader"></div>}
                        </div>
                    </div>
                </div>
            )
        })
    }
    return (
        <div id="chat_container">
            {!HAS_STRIPES && renderEmptyChat()}
            {HAS_STRIPES && renderChat(stripes)}
        </div>
    );
}
