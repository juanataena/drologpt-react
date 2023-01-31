import React, { useEffect, useState } from 'react';
import droloGPTButton from 'assets/favicon.png';
import sangraButton from 'assets/bloody.png';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';

export default function Prompt (props) {

    const [model, setModel] = useState('text-davinci-002');
    const [prompt, setPrompt] = useState('Enter your text here');
    const [completions, setCompletions] = useState(1);
  
    // // Handle first time
    // const handleKeyDown = (e) => {
        
    //     // e.preventDefault();

    //     // Get the button
    //     var chatPromptButton = document.querySelector(".chat-prompt button");

    //     // Add ENTER key listener
    //     if (!e.shiftKey && e.key === 'Enter') {
    //         debugger;
            
    //         // Prevent default
    //         e.preventDefault();

    //         // Check if the prompt is empty
    //         if (prompt === "") {
    //             // Set the prompt
    //             setPrompt(" ");
    //         }

    //         // Check if the prompt is not empty
    //         if (prompt !== "") {
    //             // Set the prompt
    //             handleSendPrompt();
    //         }
            
            
    //     }

    //     // Cursor UP
    //     if (e.key === 'ArrowUp') {
    //         // Get the last stripe
    //         const lastStripe = props.stripes[props.stripes.length - 1];
    //         // Check if it is AI
    //         if (lastStripe && !lastStripe.isAi) {
    //             // Set the prompt
    //             props.setPrompt(lastStripe.value);
    //         }
    //     }

    //     // Cursor DOWN
    //     if (e.key === 'ArrowDown') {
    //         // Set the prompt
    //         props.setPrompt('');
    //     }

    // }
    // useEffect(() => {

    //     // Add ENTER key listener
    //     document.addEventListener('keydown', handleKeyDown);
    //     const promptTexArea = document.querySelector(".chat-prompt textarea");
    //     promptTexArea.focus();
    //     promptTexArea.selectionStart = promptTexArea.selectionEnd = promptTexArea.value.length;
    //     // Remove ENTER key listener
    //     // return () => {
    //     //     document.removeEventListener('keydown', handleKeyDown);
    //     // }
    // }, []);
    

    const handleSubmit = (e) => {
      e.preventDefault();
      // call OpenAI API with the current settings
    };
    // Focus each time stripes change
    useEffect(() => {
        const promptTexArea = document.querySelector(".chat-prompt textarea");
        promptTexArea.focus();
        promptTexArea.selectionStart = promptTexArea.selectionEnd = promptTexArea.value.length;
    }, [props.stripes]);


    // Focus each time stripes change
    useEffect(() => {
        console.log('prompt changed: ' + props.prompt);
    }, [props.prompt]);



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

    const handleDragEnter = (e) => {
        // e.preventDefault();
        debugger
        // Click the button
        const button = document.querySelector(".chat-prompt button");
        button.click();

    }

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
                    <img src={sangraButton} alt="¿Cuánto sangra?" />
                </button>
            </Tooltip>
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
    const renderCommitInfo = () => {
        return (
            <div className="commit-info">
                <b>Commit: </b>:&nbsp;&nbsp;&nbsp;<span className="has-text-info">{props.commitInfo}</span>
            </div>
        );
    }    
    const renderConfig = () => {
        return (
            <div className="commit-info">
                <b>Config: </b>:&nbsp;&nbsp;&nbsp;<span className="has-text-info">saaa</span>
                <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="model">Model:</label>
        <select id="model" value={model} onChange={(e) => setModel(e.target.value)}>
          <option value="text-davinci-002">Davinci v2</option>
          <option value="text-curie-001">Curie</option>
        </select>
      </div>
      <div>
        <label htmlFor="prompt">Prompt:</label>
        <input id="prompt" type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      </div>
      <div>
        <label htmlFor="completions">Completions:</label>
        <input id="completions" type="number" value={completions} onChange={(e) => setCompletions(e.target.value)} />
      </div>
      <button type="submit">Submit</button>
    </form>
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
            {/* {renderConfig()} */}
        </>
        
    );
}
    
