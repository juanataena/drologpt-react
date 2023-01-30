import { createContext, useState, useEffect, useCallback, useMemo } from 'react';

import { ErrorBoundary } from 'core/errorBoundary';
import * as api from 'core/api';
import * as utils from 'core/utils';
import { withCookies } from 'react-cookie';
import DroloGPT from 'components/DroloGPT';

export const AuthContext = createContext({
    isAuthenticated: false,
    user: {},
    login: () => {},
    logout: () => {},
    toggleAuth: () => {},
});


const App = (props) => {

    // -----------------------------------
    //            0. Setup
    // -----------------------------------

  
    // qconst cookies = useMemo(() => props.cookies, [props.cookies]);
    const [machineName, setMachineName] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    // First time setup
    useEffect(() => {

        // -----------------------------------
        //            1. Get data
        // -----------------------------------
        // Log init app
        utils.log('0. App Initialized...', 'MAIN_END', new Date().toISOString());
        utils.log('1. Asking for machine name...', 'MAIN_START', new Date().toISOString());
        // utils.log('2. Asking for last commit...', 'MAIN_START', new Date().toISOString());

        // Read the machine name
        api.getMachineName().then( saveMachineName ).catch(utils.showError);  

        api.promptOpenAI('Say hello in a strambotic way').then( (response) => {
            utils.log('1. OpenAI Prompted', 'MAIN_END', response);
        }).catch(utils.showError);

        // Read the last commit
        // api.getCommitInfo().then( commitInfo => setCommitInfo(commitInfo) ).catch(utils.showError);  

        // TODO fix esto
        // Remove dependency warning
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
     



    const saveMachineName = (machineName) => {

        if(machineName.indexOf('error') === -1) {
            utils.log('1. Machine Name Saved', 'MAIN_END', machineName);
        } else {
            machineName = 'Unknown';
            utils.log('1. Error Taking MachineName', 'ORANGEJS', machineName);
        }

        setMachineName(machineName);

    }

    const toggleAuth = () => {
        setIsAuthenticated(!isAuthenticated);
    }


    // 3. Renders
    return (
        <AuthContext.Provider value={{
            isAuthenticated: isAuthenticated,
            setIsAuthenticated: setIsAuthenticated,
            toggleAuth: toggleAuth,
        }}> 
            <ErrorBoundary key="error-boundary">
               <DroloGPT  machineName={machineName}/>
            </ErrorBoundary>
        </AuthContext.Provider>
    );
}

export default withCookies(App);
