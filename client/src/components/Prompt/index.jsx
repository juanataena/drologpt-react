export default function Prompt (props) {

    const renderPrompt = () => {


        return (
        <div className={'chat-prompt'}>
           <form>
                <textarea name="prompt" rows="1" cols="1" placeholder="Ask codex..."></textarea>
                <button onClick={props.handleDataForServerPost} >
                    <img src="assets/send.svg" alt="send" />
                </button>
            </form>
       </div>

        );
    }

    // Render
    let value = props.nodesTree !== null ?props.nodesTree : '';
    let HAS_CHART_DATA = value != null && value.length > 0;
    // let machineName = props.machineName;

    return (
        <>
            {!HAS_CHART_DATA && renderPrompt()}
        </>
        
    );
}
    
