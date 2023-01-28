export default function Prompt (props) {

    /** 
     * Handle prompt change
     * @param {Event} e
     * @returns {void}
     * */
    const handlePromptChange = (e) => {

        // Prevent default
        e.preventDefault();

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
    
