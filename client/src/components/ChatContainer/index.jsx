export default function ChatContainer (props) {

    // Render
    let data = props.data;
    let HAS_DATA = data != null && data.length > 0;

    return (
        <>
            <div id="chat_container">
                {HAS_DATA && data.map((item, index) => {
                    return (
                        <div className="wrapper">
                            <div className="chat">
                                <div className="profile">
                                    <img src = {item.isAi ? bot : user} alt={item.isAi ? 'bot' : 'user'} />
                                    <span className="name">{item.isAi ? 'Drolo' : 'Tú'}</span>
                                </div>
                                <div className="message">{item.value}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
        
    );
}
    
