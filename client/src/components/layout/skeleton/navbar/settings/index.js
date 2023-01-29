export default function Settings (props) {

    // -----------------------------------
    //            0. Setup
    // -----------------------------------
    const [textLeft, setTextLeft] = useState(props.textLeft);
    const [textRight, setTextRight] = useState(props.textRight);
    const [commitInfo, setCommitInfo] = useState(props.commitInfo);
    
        // const HAS_COMMIT_INFO = propslastCommit !== null;

        //  Hero footer: will stick at the bottom

    return <div className="settings">
        <h2>Settings</h2>
        <hr />
        <form>
        <label>Labelll</label>
        <input name="check" type="check" value="check" onChange={console.log('a')}/>
        </form>
    </div>
}
