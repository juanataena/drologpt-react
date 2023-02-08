import React, { useEffect } from 'react';
import logo from 'assets/favicon.png';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Switch from '@mui/material/Switch';
import Fade from '@mui/material/Fade';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import InfoIcon from '@mui/icons-material/Info';
import PreviewIcon from '@mui/icons-material/Preview';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import OpenAIParameters from 'components/OpenAIParameters';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }
export default function Settings (props) {
      
    const modalSettingsStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 555,
        height: 333,
        borderRadius: 1,
        p: 1,
    };
  
    const [tabValue, setTabValue] = React.useState(0);
      
    const handleTabChange = (event, newTabValue) => {
          setTabValue(newTabValue);
    }; 
    const handleChangeTheme = (event) => {
        props.setTheme(event.target.checked  ? "light" : "dark");
    };
    const handleDebugHeaderChange = (event) => {
        props.setDebugHeader(event.target.checked);
    };


    
    // RENDERS
    
    /**
     * Render Settings Window
     * @returns {JSX}
     */

    const renderGeneral = () => {
        return (
            <div>
                <h1 className="settings-header">General</h1>
            </div>
        );
    }

    const renderInterface = () => {
        
        return (
            <>
                <div>
                    <h1 className="settings-header">Interface</h1>
                </div>
                <div className="settings-section">
                    {/* Form with the theme and the showHeader  toggles */}
                    <form className="settings-form">
                        <div className="settings-form-group">
                        <hr />
                            <div className="settings-form-input">
                            <label className="settings-form-label">{props.theme!=="light" ? "Dark":"Light"}</label>
                            <Switch size="small" className="settings-form-select" name="theme" id="theme" onChange={handleChangeTheme} checked={props.theme==="light"} />
                            </div>
                            <div className="settings-form-input">
                            <label className="settings-form-label">Debug Header</label>
                            <Switch size="small" className="settings-form-select" name="showHeader" id="showHeader" onChange={handleDebugHeaderChange} checked={props.showHeader}/>
                            </div>
                        </div>
                        <hr />
                    </form>
                </div>

                
            </>
        );
    }
    const renderAbout = () => {
        return (
            <div className='has-text-centered is-size-7'>
                <h1 className="settings-header">About</h1>
                {/* <!-- logo --> */}
                <br />
                <div className="about-text is-size-5">
                    <p>
                        <b>DroloGPT V0.1.0</b>
                    </p>
                </div>
                <br />
                <div className="logo">
                    <img src = {logo} alt="logo" className="logo"/>
                </div>
                <br />
                <div className="about-text   pl-5  pr-5">
                    <p>
                        <b>DroloGPT</b> is a destroyer text generator that uses the OpenAI API to generate text based on a prompt.
                    </p>
                    <br />
                    <p>
                        Sangra is a project by <a href="https://drolo.club">Drolo</a> and <a href="#">Sangra</a>. associated with <a href="https://drolo.club">Drolo ©</a>.

                    </p>
                </div>

                {/* <!-- sangra button --> */}
                <div className="sangra-button">
                    <img src="img/assets/bloody.png" alt="sangra button" />

                </div>

                {/* <!-- version --> */}
                <div className="version">
                    <p>
                        Version 0.1.0
                    </p>
                </div>
            </div>
        );
    }
    const renderSettingsWindow = () => {
        return (
            <Fade in={props.openSettings}>

                        <Paper elevation={3} sx={modalSettingsStyle} className="settings-box">
                        <Tabs
                            className="tabs-scroller"
                            orientation="vertical"
                            variant="scrollable"
                            value={tabValue}
                            onChange={handleTabChange}
                            aria-label="Vertical tabs example"
                            sx={{ borderRight: 
                                1, borderColor: 'divider' }}
                        >
                            
                            <Tab icon={<SettingsApplicationsIcon className="header-icon"/>} label="General" />
                            <Tab icon={<PsychologyIcon className="header-icon"/>} label="OpenAI API" />
                            <Tab icon={<PreviewIcon className="header-icon"/>} label="Interface" />
                            <Tab icon={<InfoIcon className="header-icon"/>} label="About" />
                        </Tabs>
                        <div className="tab-panels">
                        <TabPanel className="tab-panel" value={tabValue} index={0}>
                            {renderGeneral()}
                        </TabPanel>
                        <TabPanel className="tab-panel" value={tabValue} index={1}>
                            <OpenAIParameters {...props} />
                        </TabPanel>
                        <TabPanel className="tab-panel" value={tabValue} index={2}>
                            {renderInterface()}
                        </TabPanel>
                        <TabPanel className="tab-panel" value={tabValue} index={3}>
                            {renderAbout()}
                        </TabPanel>
                        </div>
                </Paper>
            </Fade>
        );
    }
    /**
     * Render Settings Modal
     * @returns {JSX}
     * */
    const renderSettingsModal = () => {
        return (

            <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={props.openSettings}
            onClose={props.handleCloseSettings}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
                {renderSettingsWindow()}
        </Modal>
        );
    }
    // Render
    return (
        <>
            {renderSettingsModal()}
        </>        
    );
}
    
