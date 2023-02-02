import React, { useEffect } from 'react';
import sangraButton from 'assets/bloody.png';
import logo from 'assets/favicon.png';
import Tooltip from '@mui/material/Tooltip';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Fade from '@mui/material/Fade';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import InfoIcon from '@mui/icons-material/Info';
import PreviewIcon from '@mui/icons-material/Preview';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';

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
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        borderRadius: 4,
        p: 1,
    };
  
    const [value, setValue] = React.useState(0);
      
    const handleChange = (event, newValue) => {
          setValue(newValue);
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

    const renderOpenAIParameters = () => {
        return (
            <div>
                <h1 className="settings-header">OpenAI API</h1>
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
                    <div className="settings-section-header">
                        <h2 className="settings-section-header-text">Theme</h2>
                    </div>
                    <div className="settings-section-content">
                        <div className="settings-section-content-item">
                            <div className="settings-section-content-item-text">
                                <p>Dark</p>
                            </div>
                            <div className="settings-section-content-item-switch">
                                <label className="switch">
                                    <input type="checkbox" />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <div className="settings-section-content-item">
                            <div className="settings-section-content-item-text">
                                <p>Light</p>
                            </div>
                            <div className="settings-section-content-item-switch">
                                <label className="switch">
                                    <input type="checkbox" />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </div>
                    </div>
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
                    <img src = {sangraButton} alt="sangra button" />

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

                <Box className="settings-box" sx={modalSettingsStyle}>
                        <Tabs
                            className="tabs-scroller"
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            sx={{ borderRight: 1, borderColor: 'divider' }}
                        >
                            
                            <Tab icon={<SettingsApplicationsIcon className="header-icon"/>} label="General" />
                            <Tab icon={<PsychologyIcon className="header-icon"/>} label="OpenAI API" />
                            <Tab icon={<PreviewIcon className="header-icon"/>} label="Interface" />
                            <Tab icon={<InfoIcon className="header-icon"/>} label="About" />
                        </Tabs>
                        <div className="tab-panels">
                        <TabPanel className="tab-panel" value={value} index={0}>
                            {renderGeneral()}
                        </TabPanel>
                        <TabPanel className="tab-panel" value={value} index={1}>
                            {renderOpenAIParameters()}
                        </TabPanel>
                        <TabPanel className="tab-panel" value={value} index={2}>
                            {renderInterface()}
                        </TabPanel>
                        <TabPanel className="tab-panel" value={value} index={3}>
                            {renderAbout()}
                        </TabPanel>
                        </div>
                </Box>
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
    
