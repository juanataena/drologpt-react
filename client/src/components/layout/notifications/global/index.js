import React from "react";
import ReactDOM from "react-dom";

const notificationsEl = document.getElementById('notifications');

export default function GlobalNotification (props) {
    // -----------------------------------
    //            0. Setup
    // -----------------------------------
    return ReactDOM.createPortal (
        <div className="notification global-notification is-danger">
            <button className="delete" onClick={props.onClose}></button>
            <div className="content">
                <div className="title">{props.title}</div>
                <div className="subtitle">{props.subtitle}</div>
            </div>
        </div>, notificationsEl);
}
