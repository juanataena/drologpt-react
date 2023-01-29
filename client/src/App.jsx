import { createContext, useState, useEffect, useCallback, useMemo } from 'react';

import FreqtradeKontroller from 'components/FreqtradeKontroller';
import { ErrorBoundary } from 'core/errorBoundary';
import * as api from 'core/api';
import * as utils from 'core/utils';
import { withCookies } from 'react-cookie';
import { Hook, Unhook } from 'console-feed';

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

  
    const cookies = useMemo(() => props.cookies, [props.cookies]);
    
    const [nodesTree, setNodesTree] = useState(null);
    const [filteredNodes, setFilteredNodes] = useState(null);
    const [machineName, setMachineName] = useState(null);
    const [balanceData, setBalanceData] = useState(null);
    const [profitData, setProfitData] = useState(null);
    const [jsonConfig, setJsonConfig] = useState(null);
    const [commitInfo, setCommitInfo] = useState(null);
    const [allDataLoaded, setAllDataLoaded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [theme, setTheme] = useState(cookies.get('theme') || 'light');
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [selectedMachinaTab, setSelectedMachinaTab] = useState(cookies.get('selectedMachinaTab') || 'machina-status');
    const [selectedTreeTab, setSelectedTreeTab] = useState(cookies.get('selectedTreeTab') || 'all');
    const [selectedTab, setSelectedTab] = useState(cookies.get('selectedTab') || 'balance');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [lastUpdate, setLastUpdate] = useState(null);
    const [selectedStrategy, setSelectedStrategy] = useState(cookies.get('selectedStrategy') || 'all');
    const [logs, setLogs] = useState([{method: 'info', id: utils.getIsoDate() , data: ['Loading...']}]);
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [isAdmin, setIsAdmin] = useState(false);
    // const [isFreqtradeRunning, setIsFreqtradeRunning] = useState(false);
    // const [isFreqtradeStopped, setIsFreqtradeStopped] = useState(false);
    

    // 2. Custom methods
  
  
    const filterNodesTree = useCallback((nodesTree) => {
        if (nodesTree === null) {
            return null;
        }

        // Sort the nodes by profit
        const dataSortedByProfit = [...nodesTree];
        const dataSortedByBalance = [...nodesTree];

        // debugger;
        dataSortedByProfit.sort((a, b) => {
            if (a.trades && b.trades && a.trades.length > 0 && b.trades.length > 0) 
                return b.trades[b.trades.length - 1].profit - a.trades[a.trades.length - 1].profit;
            return 0;
        });
        
        dataSortedByBalance.sort((a, b) => {
            // console.log(a.trades);
            // console.log(b.trades);
            if (a.trades && b.trades && a.trades.length > 0 && b.trades.length > 0) 
                return b.trades[b.trades.length - 1].balance - a.trades[a.trades.length - 1].balance;
        
            return 0;
        });
        
        const nodesWithInfo = nodesTree.map((node, index) => {

                let balance = 0;
                let profit = 0;
                // debugger;
                if (node.trades && node.trades.length > 0) {
                    balance = node.trades[node.trades.length - 1].balance;
                    profit = node.trades[node.trades.length - 1].profit;
                }
                
                return {
                ...node,
                index: index + 1,
                id: index + 1,
                strategy: node.configFromFile.strategy,
                balance,
                profit,
                profitGlobalPosition: getProfitGlobalPosition(dataSortedByProfit, profit),
                balanceGlobalPosition: getBalanceGlobalPosition(dataSortedByBalance, balance),
            }
        });
    
        const data = nodesWithInfo.filter(node => node.visible === true && node.trades !== undefined && node.trades.length > -1);

        return data;
    }, []);
    
    const saveNodesTree = useCallback((nodesTreeAsText) => {

        let nodesTree = null;
        try {
            nodesTree = JSON.parse(nodesTreeAsText);
            
        } catch (error) {
            nodesTree = null;
            utils.log('1. Error Taking Nodes', 'ORANGEJS', nodesTree);
        }

        if(nodesTree !== null && nodesTree !== undefined && typeof nodesTree === 'object') { 

            utils.log('2. Nodes Saved', 'MAIN_END', nodesTree.length);
  

            for (let i = 0; i < nodesTree.length; i++) {
                const node = nodesTree[i];
                // debugger;
                if (node.name) {
                    node.visible=true;
                }
            }

        } else {
            nodesTree = null;
            utils.log('2. Error Taking Nodes', 'ORANGEJS', nodesTree);
        }

        // Take possible hidden nodes from cookies
        if (cookies.get('hiddenNodes')) {
            const hiddenNodes = cookies.get('hiddenNodes').split(',');
            for (let i = 0; i < nodesTree.length; i++) {
                const node = nodesTree[i];
                if (hiddenNodes.includes(node.name)) {
                    node.visible=false;
                }
            }
        }
        
        setFilteredNodes(filterNodesTree(nodesTree));
        setNodesTree(nodesTree);
    }, [cookies, filterNodesTree]);
    
    const initPanels = useCallback(() => {
        utils.log('x. Re.Asking for json...', 'MAIN_START', new Date().toISOString());
        // Informing in the logs that the data is loaded
        setLogs ([...logs, {icon: '✅', method: 'info', id: new Date(),date: new Date(), action: '/load-site-data', data: ['Data loaded']}]);

        

        // Read the available nodes from file
        api.getNodesTree().then( saveNodesTree ).catch(utils.showError);  

        // Read the balance data information for the chart
        api.getBalanceData().then( saveBalanceData ).catch(utils.showError);  

        // Read the profit data information for the chart
        api.getProfitData().then( saveProfitData ).catch(utils.showError);  

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[saveNodesTree]);

    // First time setup
    useEffect(() => {

        // -----------------------------------
        //            1. Get data
        // -----------------------------------
        // Log init app
        utils.log('0. App Initialized...', 'MAIN_END', new Date().toISOString());
        utils.log('1. Asking for machine name...', 'MAIN_START', new Date().toISOString());
        utils.log('2. Asking for last commit...', 'MAIN_START', new Date().toISOString());
        utils.log('3. Asking for json...', 'MAIN_START', new Date().toISOString());

        // Read the machine name
        api.getMachineName().then( saveMachineName ).catch(utils.showError);  

        // Read the last commit
        api.getCommitInfo().then( commitInfo => setCommitInfo(commitInfo) ).catch(utils.showError);  

        // Get the last update date
        // api.getLastUpdate().then( lastUpdate => setLastUpdate(lastUpdate) ).catch(utils.showError);
  

        // Read the profit data information for the chart
        // api.getConfigJson().then( saveJsonConfig ).catch(utils.showError);  
        
        // Read the profit data information for the chart
        // initPanels()
        
        // TODO fix esto
        // Remove dependency warning
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
     

    // run once!
    useEffect(() => {

        console.log('run once!. Hooking up to the console.log...');
        Hook(
        window.console,
        (log) => setLogs((currLogs) => [...currLogs, log]),
        false
        )
        return () => Unhook(window.console)
    }, [])


    // Update the data when the data changes
    useEffect(() => {

        // -----------------------------------
        //            1. Get data
        // -----------------------------------
        // If all data is loaded, then we can render the app
        if (allDataLoaded === true) {

            utils.log('1. All data loaded', 'MAIN_END', new Date().toISOString());
        } else {
            // utils.log('X. All data not loaded', 'LOADING', new Date().toISOString());

            const ALL_FILLED = nodesTree !== null && balanceData !== null && profitData !== null;
            const ALL_BLANK = nodesTree === null && balanceData === null && profitData === null
            // Check that the nodes tree is loaded
            if (ALL_FILLED) {
                utils.log('1. App is ready to start...', 'MAIN_START', new Date().toISOString());
                setLoading(false);
                setAllDataLoaded(true);
            } else {
                // debugger;
                if (ALL_BLANK) {
                    // initPanels();
                } else {
                    // console.log('%cApp.jsx line:96 loading...', 'color: #007acc;');
                }
            }
            // utils.log('1. App is not ready to start...' + toString(), 'LOADING', new Date().toISOString());
        }
    }, [machineName, jsonConfig, theme, balanceData, profitData, allDataLoaded, nodesTree, initPanels]);
     
    // Changes in nodesTree. Update cookies
    useEffect(() => {
        if (nodesTree !== null) {
            console.log('%cApp.jsx line:105 nodesTree changed...', 'color: #007acc;');

            const hiddenNodes = nodesTree.filter(n => n.visible === false);
            const hiddenNodesStr = hiddenNodes.map(n => n.name).join(',');
            cookies.set('hiddenNodes', hiddenNodesStr, { path: '/' });
        }
    }, [nodesTree, cookies]);


    const getProfitGlobalPosition = (dataSortedByProfit, profit) => {

        // Find the index of the profit in the sorted array
        const index = dataSortedByProfit.findIndex(d => { 
            const currentProfit = d.trades[d.trades.length - 1] ? d.trades[d.trades.length - 1].profit.toFixed(4) : null;
            return currentProfit === profit.toFixed(4);
        });
        return index + 1;
    }



    const getBalanceGlobalPosition = (dataSortedByBalance, balance) => {
        // Find the index of the balance in the sorted array
        const index = dataSortedByBalance.findIndex(d => { 
            const currentProfit = d.trades[d.trades.length - 1] ? d.trades[d.trades.length - 1].balance.toFixed(4) : null;
            return currentProfit === balance.toFixed(4);
        });
        return index + 1;
    }

    const reloadNodesTree = (nodesTree) => {
        if (nodesTree === null) {
            return null;
        }
        
        setFilteredNodes(filterNodesTree(nodesTree));
        setNodesTree(nodesTree);

    }

    const saveBalanceData = (balanceDataAsText) => {

        let balanceData = null;
        try {
            balanceData = JSON.parse(balanceDataAsText);
            
        } catch (error) {
            balanceData = null;
            utils.log('1. Error Taking Nodes', 'ORANGEJS', balanceData);
        }

        if(balanceData !== null && balanceData !== undefined && typeof balanceData === 'object') { 

            utils.log('4. Balance Data saved Saved', 'MAIN_END', balanceData.length);
  
        } else {
            balanceData = null;
            utils.log('4. Error Taking Nodes', 'ORANGEJS', balanceData);
        }
        setBalanceData(balanceData);
    }
    const saveProfitData = (profitDataAsText) => {

        let profitData = null;
        try {
            profitData = JSON.parse(profitDataAsText);
            
        } catch (error) {
            profitData = null;
            utils.log('1. Error Taking Nodes', 'ORANGEJS', profitData);
        }

        if(profitData !== null && profitData !== undefined && typeof profitData === 'object') { 

            utils.log('4. Profit Data saved Saved', 'MAIN_END', profitData.length);
  
        } else {
            profitData = null;
            utils.log('4. Error Taking Nodes', 'ORANGEJS', profitData);
        }
        setProfitData(profitData);
    }
    const saveMachineName = (machineName) => {

        if(machineName.indexOf('error') === -1) {
            utils.log('1. Machine Name Saved', 'MAIN_END', machineName);
        } else {
            machineName = 'Unknown';
            utils.log('1. Error Taking MachineName', 'ORANGEJS', machineName);
        }

        setMachineName(machineName);

    }
    const setThemeInCookie = (theme) => {

        // Set the theme in the cookies
        const { cookies } = props;
        cookies.set('theme', theme, { path: '/' });

        setTheme(theme);
    }
    const setSelectedTabInCookie = (selectedTab) => {

        // Set the current tab in the cookies
        const { cookies } = props;
        cookies.set('selectedTab', selectedTab, { path: '/' });

        setSelectedTab(selectedTab);
    }
    const setSelectedTreeTabInCookie = (selectedTreeTab) => {

        // Set the current tab in the cookies
        const { cookies } = props;
        cookies.set('selectedTreeTab', selectedTreeTab, { path: '/' });

        setSelectedTreeTab(selectedTreeTab);
    }
    const setSelectedMachinaTabInCookie = (selectedMachinaTab) => {

        // Set the current tab in the cookies
        const { cookies } = props;
        cookies.set('selectedMachinaTab', selectedMachinaTab, { path: '/' });

        setSelectedMachinaTab(selectedMachinaTab);
    }
    const setSelectedStrategyInCookie = (selectedStrategy) => {

        // Set the theme in the cookies
        const { cookies } = props;
        cookies.set('selectedStrategy', selectedStrategy, { path: '/' });

        setSelectedStrategy(selectedStrategy);
    }
    const saveJsonConfig = (jsonConfig) => {
        // debugger;
        let jsonConfigParsed = JSON.parse(jsonConfig);
        if(jsonConfigParsed.indexOf('error') === -1) {
            utils.log('5. Json Config Saved. Length: ', 'MAIN_END', jsonConfigParsed.length);
        } else {
            jsonConfigParsed = 'Unknown';
            utils.log('6. Error Taking Json Config', 'ORANGEJS', jsonConfigParsed);
        }
        
        // Reset all properties
        setJsonConfig(JSON.parse(jsonConfig));
    }
    const setJsonConfigAndRestart = (jsonConfig) => {
        //  debugger;
        if (loading === false) {
            // Set Loading to true and assign new json config
            api.setJsonConfig(jsonConfig).then( status => {

                if(status.indexOf('error') === -1) {
                    utils.log('3. Json Config Saved. Reloading data...', 'MAIN_END', status);
    
                    // Reset all properties and re-init the panel
                    setTimeout (() => {
                            initPanels();
                    }, 2000);
                    
    
                } else {
                    utils.log('3. Error Saving Json Config', 'ORANGEJS', status);
                }
            }).catch(utils.showError);  
            
            // Changes in the state
            setJsonConfig(JSON.parse(jsonConfig));
            setLoading(true);
            setAllDataLoaded(false);
            setNodesTree(null);
            setFilteredNodes(null);
            setBalanceData(null);
            setProfitData(null);
        }

    }
    const toggleAuth = () => {
        setIsAuthenticated(!isAuthenticated);
    }
    const reloadData = () => {
        if (loading === false) {
            // Set Loading to true and assign new json config
            api.reloadData().then( status => {

                if(status.indexOf('error') === -1) {
                    utils.log('3. Data Reloaded', 'MAIN_END', status);

                    // Reset all properties and re-init the panel
                    setTimeout (() => {
                        // Get the last update date
                              api.getLastUpdate().then( lastUpdate => setLastUpdate(lastUpdate) ).catch(utils.showError);
  
                            initPanels();
                    }, 2000);

                } else {
                    utils.log('3. Error Reloading Data', 'ORANGEJS', status);
                }
            }).catch(utils.showError);
            // Changes in the state
            setLoading(true);
            setAllDataLoaded(false);
            setNodesTree(null);
            setFilteredNodes(null);
            setBalanceData(null);
            setProfitData(null);

        }
    }

    const executeFreqtradeCommand = (instance, command) => {
        if (loading === false) {

            utils.log('4. Executed Freqtrade Command', 'MAIN_END');

            // Set Loading to true and assign new json config
            api.executeFreqtradeCommand(instance, command).then( status => {

                // debugger;
                if(status.indexOf('error') === -1) {
                    // debugger;
                
                    const statusObj = JSON.parse(status);
                
                    // Get node info from instance
                    const node = nodesTree.find (node => node.name === instance);
                    const filteredNode = filteredNodes.find (node => node.name === instance);
                    // debugger;
                    const iconCommand = utils.getIconCommand(command);
                    const styleStatus = "font-weight: bold; color: white; " + (statusObj.status === 200 ? "background-color: green": "background-color: red");
                    const styleNode = `background-color: ${node.color}; color: white; font-weight: bold; font-family: monospace`;
                    const styleReset = 'background: none; color: black; font-weight: normal;';
                    const styleCommand = "font-weight: bold; background: #639dd7; color: white;";
                    const statusBeautified = statusObj.status === 200 ? "OK": "KO";
                    // Informing in the console and to the user in the panel
                    console.info("%c %s %c executed %c %s %c the command %s %c %s %c",styleNode,node.name,styleReset ,styleStatus,statusBeautified, styleReset ,iconCommand, styleCommand, command, styleReset);
                    
                    // Format the message to show it in the panel
                    utils.formatMessageForConsole(command, statusObj);   
                    
                    // Update the tree with the new status
                    // Attaching the status of the traders (running or paused)
                    if (command.indexOf('start') > -1 || command.indexOf('stop') > -1) {
                        // debugger;
                        node.freqtradeStatus = command.indexOf('start') > -1  ? 'running' : 'stopped';
                        filteredNode.freqtradeStatus = command.indexOf('start') > -1  ? 'running' : 'stopped';
                        
                        console.log(node.freqtradeStatus);
                        setNodesTree(nodesTree);
                        setFilteredNodes(filteredNodes);
                    }


                } else {
                    utils.log('3. Error Executing Freqtrade Command', 'ORANGEJS', status);
                }
            }).catch(utils.showError);
            // Changes in the state
            // setLoading(true);
            // setAllDataLoaded(false);
            // setNodesTree(null);
            // setFilteredNodes(null);
            // setBalanceData(null);
            // setProfitData(null);

        }
    }
    

    // 3. Renders
    return (
        <AuthContext.Provider value={{
            isAuthenticated: isAuthenticated,
            setIsAuthenticated: setIsAuthenticated,
            toggleAuth: toggleAuth,
        }}> 
            <ErrorBoundary key="error-boundary">
                <FreqtradeKontroller
                    nodesTree={nodesTree}
                    filteredNodes={filteredNodes}
                    machineName={machineName}
                    balanceData={balanceData}
                    profitData={profitData}
                    jsonConfig={jsonConfig}
                    commitInfo={commitInfo}
                    allDataLoaded={allDataLoaded}
                    loading={loading}
                    theme={theme}
                    selectedStrategy={selectedStrategy}
                    isFullScreen={isFullScreen}
                    selectedTab={selectedTab}
                    selectedTreeTab={selectedTreeTab}
                    selectedMachinaTab={selectedMachinaTab}
                    logs={logs}
                    setIsFullScreen={setIsFullScreen}
                    setSelectedTab={setSelectedTabInCookie}
                    setSelectedTreeTab={setSelectedTreeTabInCookie}
                    setSelectedMachinaTab={setSelectedMachinaTabInCookie}
                    setTheme={setThemeInCookie}
                    setJsonConfig={setJsonConfigAndRestart}
                    setNodesTree={reloadNodesTree}
                    setFilteredNodes={setFilteredNodes}
                    lastUpdate={lastUpdate}
                    reloadData={reloadData}
                    executeFreqtradeCommand={executeFreqtradeCommand}
                    setSelectedStrategy={setSelectedStrategyInCookie}
                    setLogs={setLogs}
                />
            </ErrorBoundary>
        </AuthContext.Provider>
    );
}

export default withCookies(App);
