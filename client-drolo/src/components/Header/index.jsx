import React, { useEffect } from 'react';
import Fab from '@mui/material/Fab';
import DeleteIcon from '@mui/icons-material/DeleteSweep';

export default function Header (props) {


    /**
     * @returns {JSX}
     * */
    const renderActionButtonBar = () => {
        return (
        <div className="action-button-bar">
            <Fab color="warning" size="small" aria-label="delete" onClick={props.handleDeleteStripes}>
                <DeleteIcon />
            </Fab>
       </div>

        );
    }
    const renderLoadingBar = () => {
        const IS_LOADING = props.loading;
        return (
            <div className="loading-bar">
                {IS_LOADING && <><b>Loading</b>:&nbsp;&nbsp;&nbsp;<span className="has-text-success">true</span></>}
                {!IS_LOADING && <><b>Loading</b>:&nbsp;&nbsp;&nbsp;<span className="has-text-danger">false</span></>}
            </div>
        );
    }

    const renderPromptBar = () => {
        return (
            <div className="prompt-bar">
                <b>Prompt</b>:&nbsp;&nbsp;&nbsp;<span className="has-text-warning">{props.prompt}</span>
            </div>
        );
    }
    const renderIntervalInfo = () => {
        return (
            <div className="interval-info">
                <b>Interval</b>:&nbsp;&nbsp;&nbsp;<span className="has-text-success">{props.loadInterval}</span>
            </div>
        );
    }
    
    // Render
    return (
        <div className="drologpt-header">
            {renderIntervalInfo()}
            {renderLoadingBar()}
            {renderPromptBar()}
            {renderActionButtonBar()}
        </div>
        
    );
}
    
