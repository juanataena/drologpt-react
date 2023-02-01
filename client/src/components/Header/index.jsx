import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';

import TabUnselectedIcon from '@mui/icons-material/TabUnselected';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import SettingsIcon from '@mui/icons-material/Settings';
import SaveIcon from '@mui/icons-material/Save';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
export default function Header (props) {


    // Renderers
    /**
     * Render action button bar
     * @returns {JSX}
     * */
    const renderActionButtonBar = () => {
        return (<>
        <div className="action-button-bar">
            <Tooltip className="icon-bar" title={props.theme === 'dark' ? "oscuridad" : "luz"} placement='left' TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                <Fab color="warning" size="small" aria-label="Change Theme" onClick={props.handleChangeTheme}>
                    {props.theme === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
                </Fab>
            </Tooltip>
            <Tooltip className="icon-bar" title="Clear Chat" placement='left' TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                <Fab color="warning" size="small" aria-label="Clear Chat" onClick={props.handleDeleteStripes}>
                    <CleaningServicesIcon />
                </Fab>
            </Tooltip>
            <Tooltip className="icon-bar" title="Save as HTML" placement='left' TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                <Fab color="info" size="small" aria-label="Save as HTML" onClick={props.handleSaveAsHTML}>
                    <BrowserUpdatedIcon />
                </Fab>
            </Tooltip>
            <Tooltip className="icon-bar" title="Save as Png" placement='left' TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                <Fab color="info" size="small" aria-label="Save as Png" onClick={props.handleSaveAsPng}>
                    <TabUnselectedIcon />
                </Fab>
            </Tooltip>
            <Tooltip className="icon-bar" title="Save as Json" placement='left' TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                <Fab color="info" size="small" aria-label="Save as Json" onClick={props.handleSaveAsJson}>
                    <SaveIcon />
                </Fab>
            </Tooltip>
            <Tooltip className="icon-bar" title="Import Json" placement='left' TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                <Fab color="info" size="small" aria-label="import Json" onClick={props.handleImportJSON}>
                <FileUploadIcon />
                </Fab>
            </Tooltip>
            <Tooltip className="icon-bar" title="Delete" placement='left' TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                <Fab color="grey" size="small" aria-label="delete" onClick={props.handleDeleteStripes}>
                    <SettingsIcon />
                </Fab>
            </Tooltip>
       </div>
        </>);
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
                <b>Commit: </b>:&nbsp;&nbsp;&nbsp;<span className="has-text-info">{props.commitInfo}</span>
            </div>
        );
    }
    const renderTheme = () => {
        return (
            <div className="theme">
                <b>Theme: </b>:&nbsp;&nbsp;&nbsp;<span className="has-text-info">{props.theme}</span>
            </div>
        );
    }

    // Render
    return (
        <>
            <div className="drologpt-header">
                {renderTheme()}
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
    
