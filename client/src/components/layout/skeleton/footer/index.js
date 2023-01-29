export default function Footer (props) {

    // -----------------------------------
    //            0. Setup
    // -----------------------------------
    
    const HAS_COMMIT_INFO = props.lastCommit !== null;

    //  Hero footer: will stick at the bottom of the page
    return <div className={"app-footer " + props.className}>
    <nav className="level iis-invisible">
        { /* Left side */ }
            <div className="level-item has-text-centered">
                <div className="">{props.textLeft}</div>
            </div>
            <div className="level-item has-text-centered">
                <a className="navbar-item" target="_blank" href="https://github.com/juanataena/app-freqtrade-controller" rel="noopener noreferrer">
                    <i className="material-icons">history</i>
                    {HAS_COMMIT_INFO && <div className="commit-info">{props.commitInfo}</div>}
                </a>
                <span>-&nbsp;&nbsp;</span>
                <a href="https://www.sap.com/products/crm/customer-data-management.html" target="_blank" rel="noopener noreferrer"><div className="has-text-weight-bold">{props.textRight}</div></a>
            </div>
    </nav>
    </div>
    
}
