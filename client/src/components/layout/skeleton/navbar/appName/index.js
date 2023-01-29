// import { useState } from 'react';

export default function AppName (props) {

    // -----------------------------------
    //            0. Setup
    // -----------------------------------
    // const [textLeft, setTextLeft] = useState(props.textLeft === undefined ? '' : props.textLeft);
    // const [textRight, setTextRight] = useState(props.textRight === undefined ? '' : props.textRight);
    // const [commitInfo, setCommitInfo] = useState(props.commitInfo === undefined ? '' : props.commitInfo);

    const color = props.color && props.color != null ? props.color : '';
    const colorClass = color === "white" ? 'hast-text-weight-bold has-text-light':'has-text-light';

    const v1 = <span className="text-coded has-text-weight-light"><span className="has-text-light">{'{'}</span><b className="has-text-light">{props.textLeft}</b><span className={ colorClass + ' has-text-weight-light'}>{props.textRight}</span><span className="has-text-light">{'}'}</span></span>;
    const v2 = <span className="text-coded has-text-weight-light">{props.textLeft}<b className="has-text-light">{props.textRight}</b></span>;
    const version = props.version && props.version === '2' ? v2 : v1;
    return [
        <div key="gigya-app" className="gigya-app">
            {version}
        </div>
    ]
}
