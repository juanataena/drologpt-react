import React from "react";
import Avatar from "@mui/material/Avatar";
export default function BotsSelector (props) {

    // Renderers
    const renderBotsSelector = () => {

        
        return (
            <select className="bot-selector-select" onChange={props.handleBotChange} value={props.activeBot.id}>
                {/* Create a selector for the bots */}
                {props.bots.map((bot, index) => {
                    return <option key={index} value={bot.id}>
                        {bot.name}
                        </option>
                })}
            </select>
        );
    }

    const renderActiveBotBanner = () => {
        return (
            <div className="bot-selector-banner">
                <div className="bot-selector-banner-text is-size-4 has-text-centered">
                    <span className="bot-selector-banner-text-active has-text-weight-bold">Active Bot:</span>
                    &nbsp;&nbsp;&nbsp;
                    <span className="bot-selector-banner-text-name">{props.activeBot ? renderBotsSelector() : 'No bot'}</span>
                </div>
                <div className="bot-selector-banner-image">
                <Avatar
                    alt={props.activeBot.name}
                    src={'img/bots/' + props.activeBot.id + '.png'}
                    sx={{ width: 200, height: 200, margin: '20px auto' }}

                    />
                    
                </div>
                <div className="bot-selector-banner-text is-size-5 has-text-centered px-5">
                    <span className="bot-selector-banner-text-name">{props.activeBot ? props.activeBot.description : 'No desc'}</span>
                </div>

                <div className="bot-selector-banner-buttons is-hidden">
                    <button className="bot-selector-banner-buttons-button" onClick={props.handleBotDelete}>Delete</button>
                    <button className="bot-selector-banner-buttons-button" onClick={props.handleBotEdit}>Edit</button>
                </div>

            </div>
        );
    }


    const HAS_BOTS = props.bots.length > 0;
    return (
        <div className="bot-selector-container" >
            <hr />
            {HAS_BOTS ? renderActiveBotBanner() : null}
            <hr />
        </div>
    );
}
