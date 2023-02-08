
import bot from 'assets/favicon.png';

export default function OpenAIParameters (props) {

    // Renderers
    const renderOpenAIParameters = () => {

        return (<div className="openai-settings">
            <div>
                <h1 className="settings-header">OpenAI API Parameters</h1>
            </div>
            <div className="settings-section">
                {/* Form with the theme and the showHeader  toggles */}
                <form className="settings-form">
                    <div className="settings-form-group">
                    <hr />
                        <div className="settings-form-input">
                            <label className="settings-form-label">Model</label>
                            <select className="settings-form-select" name="model" id="model" onChange={props.handleModelChange} value={props.model}>
                                <option value="davinci">Davinci</option>
                                <option value="curie">Curie</option>
                                <option value="babbage">Babbage</option>
                                <option value="ada">Ada</option>
                            </select>
                        </div>
                        <div className="settings-form-input">
                            <label className="settings-form-label">Temperature</label>
                            <input className="" type="number" name="temperature" id="temperature" onChange={props.handleTemperatureChange} value={props.temperature} />
                        </div>
                        <div className="settings-form-input">
                            <label className="settings-form-label">Max Tokens</label>
                            <input className="" type="number" name="maxTokens" id="maxTokens" onChange={props.handleMaxTokensChange} value={props.maxTokens} />
                        </div>
                        <div className="settings-form-input">
                            <label className="settings-form-label">Top P</label>
                            <input className="" type="number" name="topP" id="topP" onChange={props.handleTopPChange} value={props.topP} />
                        </div>
                        <div className="settings-form-input">
                            <label className="settings-form-label">Frequency Penalty</label>
                            <input className="" type="number" name="frequencyPenalty" id="frequencyPenalty" onChange={props.handleFrequencyPenaltyChange} value={props.frequencyPenalty} />
                        </div>
                        <div className="settings-form-input">
                            <label className="settings-form-label">Presence Penalty</label>
                            <input className="" type="number" name="presencePenalty" id="presencePenalty" onChange={props.handlePresencePenaltyChange} value={props.presencePenalty} />
                        </div>  
                        <div className="settings-form-input">
                            <label className="settings-form-label">Stop Sequence</label>
                            <input className="" type="text" name="stopSequence" id="stopSequence" onChange={props.handleStopSequenceChange} value={props.stopSequence} />
                        </div>
                        <div className="settings-form-input">
                            <label className="settings-form-label">Logprobs</label>
                            <input className="" type="number" name="logprobs" id="logprobs" onChange={props.handleLogprobsChange} value={props.logprobs} />
                        </div>
                        <div className="settings-form-input">
                            <label className="settings-form-label">Echo</label>
                            <input className="" type="text" name="echo" id="echo" onChange={props.handleEchoChange} value={props.echo} />
                        </div>
                        <div className="settings-form-input">
                            <label className="settings-form-label">Best Of</label>
                            <input className="" type="number" name="bestOf" id="bestOf" onChange={props.handleBestOfChange} value={props.bestOf} />
                        </div>
                        <div className="settings-form-input">
                            <label className="settings-form-label">N</label>
                            <input className="" type="number" name="n" id="n" onChange={props.handleNChange} value={props.n} />
                        </div>
                        <div className="settings-form-input">
                            <label className="settings-form-label">Stream</label>
                            <input className="" type="text" name="stream" id="stream" onChange={props.handleStreamChange} value={props.stream} />
                        </div>
                        {/* <div className="settings-form-input">
                            <label className="settings-form-label">Logit Bias</label>
                            <input className="" type="text" name="logitBias" id="logitBias" onChange={props.handleLogitBiasChange} value={props.logitBias} />
                        </div>
                        <div className="settings-form-input">
                            <label className="settings-form-label">Logit Token</label>
                            <input className="" type="text" name="logitToken" id="logitToken" onChange={props.handleLogitTokenChange} value={props.logitToken} />
                        </div>
                        <div className="settings-form-input">
                            <label className="settings-form-label">Logit</label>
                            <input className="" type="text" name="logit" id="logit" onChange={props.handleLogitChange} value={props.logit} />
                        </div>
                        <div className="settings-form-input">
                            <label className="settings-form-label">Return</label>
                            <input className="" type="text" name="return" id="return" onChange={props.handleReturnChange} value={props.return} />
                        </div> */}
                    </div>
                    <hr />
                </form>
            </div>
        </div>
        );
    }


    return (
        <div id="chat_container" className="chat-container" >
            {renderOpenAIParameters()}
        </div>
    );
}
