export default function ChatContainer (props) {

    // Render
    let value = props.nodesTree !== null ?props.nodesTree : '';
    let HAS_CHART_DATA = value != null && value.length > 0;
    // let machineName = props.machineName;

    return (
        <>
            <div id="chat_container"></div>
        </>
        
    );
}
    
