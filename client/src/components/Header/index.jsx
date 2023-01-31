import React, { useEffect } from 'react';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';

import TabUnselectedIcon from '@mui/icons-material/TabUnselected';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import SettingsIcon from '@mui/icons-material/Settings';
import SaveIcon from '@mui/icons-material/Save';
import FileUploadIcon from '@mui/icons-material/FileUpload';
export default function Header (props) {


    /**
     * @returns {JSX}
     * */
    const renderActionButtonBar = () => {
        return (
        <div className="action-button-bar">
            <Tooltip title="Delete">
                <Fab color="warning" size="small" aria-label="Clear Chat" onClick={props.handleDeleteStripes}>
                    <CleaningServicesIcon />
                </Fab>
            </Tooltip>
            <Fab color="info" size="small" aria-label="Clear Chat" onClick={props.handleDeleteStripes}>
                <SaveIcon />
            </Fab>
            <Fab color="info" size="small" aria-label="Clear Chat" onClick={props.handleDeleteStripes}>
                <FileUploadIcon />
            </Fab>
            <Fab color="info" size="small" aria-label="" onClick={props.handleDeleteStripes}>
                <TabUnselectedIcon />
            </Fab>
            <Fab color="info" size="small" aria-label="delete" onClick={props.handleDeleteStripes}>
                <BrowserUpdatedIcon />
            </Fab>
            <Fab color="grey" size="small" aria-label="delete" onClick={props.handleDeleteStripes}>
                <SettingsIcon />
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
    const renderMachineName = () => {
        return (
            <div className="machine-name">
                <b>Machine Name: </b>:&nbsp;&nbsp;&nbsp;<span className="has-text-info">{props.machineName}</span>
            </div>
        );
    }
    const renderCommitInfo = () => {
        return (
            <div className="commit-info">
                <b>Commit: </b>:&nbsp;&nbsp;&nbsp;<span className="has-text-info">{props.commit}</span>
            </div>
        );
    }
    
    // Render
    return (
        <>
            <div className="drologpt-header">
                {renderMachineName()}
                {renderIntervalInfo()}
                {renderLoadingBar()}
                {renderPromptBar()}
                {renderActionButtonBar()}
            </div>
            <div className="drologpt-commit">
                {renderCommitInfo()}
            </div>
        </>
    );
}
    
