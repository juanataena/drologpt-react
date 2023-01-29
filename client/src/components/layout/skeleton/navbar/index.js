import {version as ReactVersion, useState, useEffect } from 'react';
import AppName from 'components/layout/skeleton/navbar/appName';
import ReactTooltip from "react-tooltip";

import { ScreenCapture } from 'react-screen-capture';

// Icons
import LightModeTwoToneIcon from '@mui/icons-material/LightModeTwoTone';
import DarkModeTwoToneIcon from '@mui/icons-material/DarkModeTwoTone';
import DonutSmallTwoToneIcon from '@mui/icons-material/DonutSmallTwoTone';
import CachedTwoToneIcon from '@mui/icons-material/CachedTwoTone';
import CameraAltTwoToneIcon from '@mui/icons-material/CameraAltTwoTone';
import { PersonOffTwoTone, PersonOutlineTwoTone } from '@mui/icons-material';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';
import { AuthContext } from 'App';
import React from 'react';

export default function NavBar (props) {

    // -----------------------------------
    //            0. Setup
    // -----------------------------------
    // const [logo, setLogo] = useState(props.logo && props.logo != null ? props.logo : '');
    // const [title, setTitle] = useState(props.title && props.title != null ? props.title : '');
    // const [icon, setIcon] = useState(props.icon && props.icon != null ? props.icon : '');
    const [screenCapture, setScreenCapture] = useState('');
    
    // -----------------------------------
    //            1. Effects
    // -----------------------------------
    useEffect(() => {
        ReactTooltip.rebuild();
    }, [])
    useEffect(() => {

        const handleSave = () => {
            const screenCaptureSource = screenCapture;
            const downloadLink = document.createElement('a');
            const fileName = 'drolo-screen-capture.png';
    
            downloadLink.href = screenCaptureSource;
            downloadLink.download = fileName;
            downloadLink.click();
        }
    

        if (screenCapture !== '') {
            handleSave();
            setScreenCapture(screenCapture);
        }

    }, [screenCapture])

    const handleScreenCapture = screenCapture => {
        setScreenCapture(screenCapture);
    }
    const gotoCoinBase = () => {
        window.open('https://pro.coinbase.com/', '_blank');
    }
    const reloadPage = () =>{
        window.location.reload();
    }
    const fullScreenTheScreen = () => {

        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    };
    const handleFullScreen = () => {
        fullScreenTheScreen();

        if (props.isFullScreen) {
            props.setIsFullScreen(false);
        } else {
            props.setIsFullScreen(true);
        }
    }
    const putThemeDark = () => {

        props.setTheme('dark');
    }
    const putThemeLight = () =>{
        props.setTheme('light');
    }

    const renderReactVersion = () => {
        return (
            <div className="react-version">
                <span>React Version: <b>{ReactVersion}</b></span>
            </div>
        )
    }


    // Icons
    const IS_THEME_LIGHT = props.theme === 'light';
    const themeIcon = IS_THEME_LIGHT ? <DarkModeTwoToneIcon /> : <LightModeTwoToneIcon/>;
    const themeIconTitle = IS_THEME_LIGHT ? 'Switch to the darkness' : 'Come to the light';
    const themeIconAction = IS_THEME_LIGHT ? putThemeDark : putThemeLight;
    
    const IS_FULLSCREEN = props.isFullScreen;
            
    const fullScreenIcon = IS_FULLSCREEN ? <ZoomInMapIcon /> : <ZoomOutMapIcon />;
    const fullScreenIconTitle = IS_FULLSCREEN ? 'Restore' : 'Full Screen';
    

    return (
        <AuthContext.Consumer>
            { authContext => (
                <div className="navbar is-inline-flex is-transparentttt is-info is-bold is-hiddenn">
                    <div className="navbar-brand">
                        <button className="navbar-item">
                            <img src="img/drologpt-logo.png" alt="Freqtrade" />
                            {true && <AppName name="drolo_gpt" textLeft="drolo_" textRight="GPT" />}

                        </button>
                    </div>
                    <div className="navbar-menu">
                        <div className="navbar-item">
                            <div className="control has-icons-left is-hidden">
                                <input className="search input is-small has-text-centered" type="text" placeholder="search" />
                                <span className="icon is-left is-small">
                                    <i className="material-icons">search</i>
                                </span>
                            </div>
                            {false && props.isFullScreen && <div className="navbar-item is-hidden-touch">Full Screen</div>}

                            {false && <AppName name="drolo_gpt" textLeft="drolo_" textRight="GPT" />}
                        </div>
                    </div>
                    <div className="navbar-item is-flex-touch has-color-light">
                    <button className="nabvar-item is-transparent has-text-light" onClick={gotoCoinBase}  data-tip={'CoinBase Pro'} data-place="bottom" data-html="true">
                        <DonutSmallTwoToneIcon />
                        </button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;        
                    <button className="nabvar-item is-transparent has-text-light" onClick={themeIconAction} data-tip={themeIconTitle} data-place="bottom" data-html="true">
                        {themeIcon}
                    </button>
                        <button className="nabvar-item is-transparent has-text-light" onClick={reloadPage}  data-tip={'Reload Page'} data-place="bottom" data-html="true">
                        <CachedTwoToneIcon />
                    </button>


                    <ScreenCapture onEndCapture={handleScreenCapture}>
                        {({ onStartCapture }) => (
                        <button className="nabvar-item is-transparent has-text-light" onClick={onStartCapture}  data-tip={'Take Screenshot'} data-place="bottom" data-html="true">
                            <CameraAltTwoToneIcon />
                        </button>
                        )}
                    </ScreenCapture>


                    <button className="nabvar-item is-transparent has-text-light" onClick={handleFullScreen}  data-tip={fullScreenIconTitle} data-place="bottom" data-html="true">                
                        {fullScreenIcon}
                    </button>
                    <button className="navbar-item is-hidden" data-event="click" data-for="test">
                        <i id="test" className="material-icons is-hidden" data-offset="{'bottom': 4}" >miscellaneous_services</i>
                    </button>
                    <button className="navbar-item is-hidden">
                        <i id="test2" className="material-icons is-hidden" data-offset="{'bottom': 4}" data-place="bottom" data-tip="Feedback to <a href='mailto:juan.andres.moreno@sap.com' target='_blank'>juan.andres.moreno@sap.com</a>" data-effect="solid">favorite_border</i>
                    </button>
                    <button className="navbar-item is-hidden">
                        <i id="test3"className="material-icons is-hidden"  data-offset="{'bottom': 4}" data-tip="User Login capabilities" data-place="bottom" data-effect="solid">person_outline</i>
                    </button>
                    <button className="nabvar-item is-transparent has-text-light" onClick={authContext.toggleAuth}  data-tip={authContext.isAuthenticated ? 'De-Authenticate':'Authenticate'} data-place="bottom" data-html="true">
                        {authContext.isAuthenticated ? <PersonOutlineTwoTone />: <PersonOffTwoTone />}
                    </button>
                    <button className="nabvar-item is-transparent has-text-light" data-tip={'Current React Version'} data-place="bottom" data-html="true">
                    {renderReactVersion()}
                    </button>
                    
                    </div>
                </div>
            )}
        </AuthContext.Consumer>
    )
}

