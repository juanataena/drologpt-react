import React, { useEffect } from 'react';
import droloGPTButton from 'assets/favicon.png';
import sangraButton from 'assets/sangra.png';
export default function Prompt (props) {

    // Handle first time
    useEffect(() => {

        // Add ENTER key listener
        document.addEventListener('keydown', handleKeyDown);
        const promptTexArea = document.querySelector(".chat-prompt textarea");
        promptTexArea.focus();
        promptTexArea.selectionStart = promptTexArea.selectionEnd = promptTexArea.value.length;
        // Remove ENTER key listener
        // return () => {
        //     document.removeEventListener('keydown', handleKeyDown);
        // }
    }, []);

    // Focus each time stripes change
    useEffect(() => {
        const promptTexArea = document.querySelector(".chat-prompt textarea");
        promptTexArea.focus();
        promptTexArea.selectionStart = promptTexArea.selectionEnd = promptTexArea.value.length;
    }, [props.stripes]);

    const handleKeyDown = (e) => {
        
        // e.preventDefault();

        // Get the button
        var chatPromptButton = document.querySelector(".chat-prompt button");

        // Add ENTER key listener
        if (!e.shiftKey && e.key === 'Enter') {
            // Click the button
            chatPromptButton.click();
            e.preventDefault();
        }

        // Add CTRL + ENTER key listener
        if (e.ctrlKey && e.key === 'Enter') {
            chatPromptButton.click();
        }

        // Cursor UP
        if (e.key === 'ArrowUp') {
            // Get the last stripe
            const lastStripe = props.stripes[props.stripes.length - 2];
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
     * Render prompt
     * @returns {JSX}
     * */
    const renderPrompt = () => {
        return (
        <div className={'chat-prompt'}>
           <form>
           <button onClick={props.handleSendSangraPrompt}>
                <img src={sangraButton} alt="Cuánto Sangra?" />
            </button>
                <textarea name="prompt" rows="1" cols="1"
                    placeholder={props.placeholder}
                    value={props.prompt}
                    onChange={handlePromptChange}>                   
                </textarea>
                <button onClick={props.handleSendPrompt}>
                    <img src="../../assets/send.svg" alt="send" />
                </button>
            </form>
       </div>

        );
    }

    // Render
    return (
        <>
            {renderPrompt()}
        </>
        
    );
}
    
