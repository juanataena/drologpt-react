import React, { useEffect } from 'react';

export default function Prompt (props) {

    // Handle first time
    useEffect(() => {

        // Add ENTER key listener
        document.addEventListener('keydown', handleKeyDown);
        document.querySelector(".chat-prompt textarea").focus();
        // Remove ENTER key listener
        // return () => {
        //     document.removeEventListener('keydown', handleKeyDown);
        // }
    }, []);

    // Focus each time stripes change
    useEffect(() => {
        document.querySelector(".chat-prompt textarea").focus();
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
                <textarea name="prompt" rows="1" cols="1"
                    placeholder={props.placeholder}
                    value={props.prompt}
                    onChange={handlePromptChange}>                   
                </textarea>
                <button onClick={props.handleDataForServerPost}>
                    <img src="assets/send.svg" alt="send" />
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
    
