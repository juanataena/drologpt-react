
import bot from 'assets/favicon.png';

export default function Conversations  (props) {

    // Renderers
    const renderConversations  = () => {

        return (
            <>
        <div>
            <h1 className="settings-header">Conversations </h1>
        </div>
        <div className="settings-section">
            {/* Form with the theme and the showHeader  toggles */}
            CONVERSARTIONS
        </div>
        </>
        );
    }


    return (
        <div id="chat_container" className="conversations-container" >
            {renderConversations ()}
        </div>
    );
}
