
import bot from 'assets/favicon.png';

export default function ChatContainer (props) {

    // Renderers
    const renderEmptyChat = () => {
        return (
            <div className="wrapper ai is-hidden">
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
    const renderStripes = (stripes) => {
        return stripes.map((stripe, index) => {
            // debugger;
            const isLastStripe = index === stripes.length - 1;
            return (
                <div id={stripe.uniqueId} key={stripe.uniqueId} className={'wrapper is-' + (stripe.isAi ? 'bot':'user')}>
                    <div className="chat">
                        <div className="stripe-index">{index}</div>
                        <div className="profile">
                            <img src = {stripe.isAi ? bot : props.userAvatar} alt={stripe.isAi ? 'bot' : 'user'} />
                        </div>
                        <div className="message">
                            <b>{stripe.isAi ? 'DroloGPT' : 'user'}: </b>
                            {isLastStripe ? '' : stripe.value}
                            {isLastStripe && stripe.isAi && <div className="chat-stripe-loader"></div>}
                        </div>
                    </div>
                </div>
            )
        })
    }
    const renderChat = (stripes) => {

        const style = {
            // backgroundColor: "#343541",
            // color: "white",
            fontFamily: "arial",
            fontSize: "16px"
            
        }
        return (
            <div className="chat-stripes" style={style}>
                {renderStripes(stripes)}                 
            </div>
        )

    }

    // Render        
    let stripes = props.stripes;
    let HAS_STRIPES = stripes.length > 0;

    return (
        <div id="chat_container" className="chat-container" >
            <div className="chat-background"></div>
            {!HAS_STRIPES && renderEmptyChat()}
            {HAS_STRIPES && renderChat(stripes)}
        </div>
    );
}
