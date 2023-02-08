import React, { useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';

export default function Prompt (props) {

    // EFECTS
    // Add ENTER key listener (first time)
    useEffect(() => {
    
        const promptTexArea = document.querySelector(".chat-prompt textarea");
        promptTexArea.focus();
        promptTexArea.selectionStart = promptTexArea.selectionEnd = promptTexArea.value.length;
    
        // Remove ENTER key listener
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []);
    // Focus each time PROMPT change
    useEffect(() => {
        const promptTexArea = document.querySelector(".chat-prompt textarea");
        promptTexArea.focus();
        promptTexArea.selectionStart = promptTexArea.selectionEnd = promptTexArea.value.length;
    }, [props.stripes]);
    // Focus each time STRIPES change
    useEffect(() => {
        console.log('prompt changed: ' + props.prompt);
    }, [props.prompt]);


    // HANDLERS
    /** 
     * Handle prompt change
     * @param {Event} e
     * @returns {void}
     * */
    const handlePromptChange = (e) => {

        // Prevent default
        e.preventDefault();
        // debugger

        // Set the prompt
        const prompt = e.target.value;
        props.setPrompt(prompt);        
    }

    /**
     *  Handle keydown event
     * @param {*} e 
     * @returns 
     */
    const handleKeyDown = (e) => {
        
        // e.preventDefault();

        // Add ENTER key listener
        if (!e.shiftKey && e.key === 'Enter') {
            // debugger;
            
            // Prevent default
            e.preventDefault();

            // Check if the prompt is empty
            if (props.prompt === "") {
                return;
            }

            // Check if the prompt is not empty
            if (props.prompt !== "") {
                // Set the prompt
                props.handleSendPrompt();
            }
            
            
        }

        // Cursor UP
        if (e.key === 'ArrowUp') {
            // Get the last stripe
            const lastStripe = props.stripes[props.stripes.length - 1];
            // Check if it is AI
            if (lastStripe && !lastStripe.isAi) {
                // Set the prompt
                props.setPrompt(lastStripe.value);
            }
        }

        // Cursor DOWN
        if (e.key === 'ArrowDown') {
            // Set the prompt
            props.setPrompt('');
        }

    }

    // RENDERS
    /**
     * Render prompt
     * @returns {JSX}
     * */
    const renderPrompt = () => {
        return (
        <div className={'chat-prompt'} onDragEnter={() => this.handleDragEnter()}>
           <form>
           <Tooltip title="¿Cuánto sangra?" placement='top' TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
            <button onClick={props.handleSendSangraPrompt}>
                    <img src="img/assets/bloody.png" alt="¿Cuánto sangra?" />
                </button>
            </Tooltip>
                <textarea name="prompt" rows="1" cols="1"
                    placeholder={props.placeholder}
                    value={props.prompt}
                    onChange={handlePromptChange}
                    onKeyDown={handleKeyDown}
                    >                   
                </textarea>
                <button onClick={props.handleSendPrompt}>
                    <img src="../../assets/send.svg" alt="send" />
                </button>
            </form>
       </div>

        );
    }
    /**
     * Render commit info
     * @returns {JSX}
     */
    const renderCommitInfo = () => {
        return (
            <div className="commit-info">
                <b>Commit: </b>:&nbsp;&nbsp;&nbsp;<span className="has-text-info">{props.commitInfo}</span>
            </div>
        );
    }    
    // Render
    return (
        <>
            {renderPrompt()}
            <div className="drologpt-commit">
                {renderCommitInfo()}
            </div>
        </>
        
    );
}
    
