import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
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

import SettingsComponent from '../Settings';

export default function Header (props) {


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
      
      const [openSettings, setOpenSettings] = React.useState(false);
      const handleOpenSettings = () => setOpenSettings(true);
      const handleCloseSettings = () => setOpenSettings(false);
    

    // Renderers
    /**
     * Render action button bar
     * @returns {JSX}
     * */
    const renderActionButtonBar = () => {

        const saveActions = [
            { icon: <BrowserUpdatedIcon />, name: 'As HTML', action : props.handleSaveAsHTML },
            { icon: <TabUnselectedIcon />, name: 'As PNG', action : props.handleSaveAsPng },
            { icon: <SaveIcon />, name: 'as json', action : props.handleSaveAsJson },
            { icon: <FileUploadIcon />, name: 'Import...', action : props.handleImportJSON },
          ];
          const saveDialIcon = <SaveIcon /> ;
          const settingDialIcon = <Fab color="grey" size="small" aria-label="Settings" onClick={handleOpenSettings}><SettingsIcon /></Fab>;          
        return (<>
            <div className="action-button-bar">
            <Tooltip className="icon-bar is-hidden" title={props.theme === 'dark' ? "oscuridad" : "luz"} placement='bottom' TransitionComponent={Fade} TransitionProps={{ timeout: 300 }}>
                <Fab color="warning" size="small" aria-label="Change Theme" onClick={props.handleChangeTheme}>
                    {props.theme === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
                </Fab>
            </Tooltip>
            <Tooltip className="icon-bar" title="Clear Chat" placement='bottom' TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                <Fab color="warning" size="small" aria-label="Clear Chat" onClick={props.handleDeleteStripes}>
                    <CleaningServicesIcon />
                </Fab>
            </Tooltip>
            {/* <Backdrop open={open} /> */}
            <SpeedDial
                className='speed-dial icon-bar'
                ariaLabel="SpeedDial tooltip example"
                sx={{ position: 'relative', bottom: 0, right: 0 }}
                icon={saveDialIcon}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                direction="down"
                color='warning'

            >
                {saveActions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                />
                ))}
            </SpeedDial>
            <Tooltip className="icon-bar" title="Settings" placement='bottom' TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                <Fab color="grey" size="small" aria-label="Settings" onClick={handleOpenSettings}>
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
            {props.showHeader === true ? 
            <div className="drologpt-header">
                {renderTheme()}
                {renderMachineName()}
                {renderIntervalInfo()}
                {renderLoadingBar()}
                {renderPromptBar()}
            </div>
            : null}
            {renderActionButtonBar()}
            <div className="drologpt-settings">
                <SettingsComponent
                    openSettings={openSettings}
                    handleCloseSettings={handleCloseSettings}
                    theme={props.theme}
                    showHeader={props.showHeader}
                    setTheme={props.setTheme}
                    setDebugHeader={props.setDebugHeader}  

                    model={props.model}
                    setModel={props.setModel}
                    n={props.n}
                    setN={props.setN}
                    temperature={props.temperature}
                    setTemperature={props.setTemperature}
                    top_p={props.top_p}
                    setTop_p={props.setTop_p}
                    presence_penalty={props.presence_penalty}
                    setPresence_penalty={props.setPresence_penalty}
                    frequency_penalty={props.frequency_penalty}
                    setFrequency_penalty={props.setFrequency_penalty}
                    stop={props.stop}
                    setStop={props.setStop}
                    max_tokens={props.max_tokens}
                    setMax_tokens={props.setMax_tokens}
    
                />
            </div>

        </>
    );
}
    
