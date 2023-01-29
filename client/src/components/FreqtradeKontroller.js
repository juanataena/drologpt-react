import React, { Suspense } from 'react';
import classNames from 'classnames';

// Freqtrade Comopnents
import DatabaseTables from 'components/freqtradeKontroller/databaseTables';
import FreqUINodesTree from 'components/freqtradeKontroller/freqUINodesTree';
import EditNodesComponent from 'components/freqtradeKontroller/editNodesComponent';
import DockerContainersTable from 'components/freqtradeKontroller/databaseTables';
import BalanceChart from 'components/freqtradeKontroller/balanceChart';
import ProfitChart from 'components/freqtradeKontroller/profitChart';
import MachinaChart from 'components/freqtradeKontroller/machinaChart';
import NodesTable from 'components/freqtradeKontroller/nodesTable';
import LogTerminal from 'components/freqtradeKontroller/logTerminal';
import LogTerminalWithWindow from 'components/freqtradeKontroller/logTerminalWithWindow';
import IsLoading from 'components/freqtradeKontroller/isLoading';
import RefreshButton from 'components/freqtradeKontroller/refreshButton';
import TerminalTwoToneIcon from '@mui/icons-material/TerminalTwoTone';
import PrecisionManufacturingTwoToneIcon from '@mui/icons-material/PrecisionManufacturingTwoTone';
// Tabs
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

// Scrollbars
import { Scrollbars } from 'react-custom-scrollbars-2';

// Theming
import { Box, Section ,Tile, /* Heading, Image, Notification */ } from 'react-bulma-components';

// Tooltips
import ReactTooltip from "react-tooltip";

// Icons
import SmartToyTwoToneIcon from '@mui/icons-material/SmartToyTwoTone';
import AutoGraphTwoToneIcon from '@mui/icons-material/AutoGraphTwoTone';
import MemoryTwoToneIcon from '@mui/icons-material/MemoryTwoTone';
import TocIcon from '@mui/icons-material/Toc';
import PercentIcon from '@mui/icons-material/Percent';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CodeIcon from '@mui/icons-material/Code';
import EditIcon from '@mui/icons-material/Edit';

// Styles
import 'styles/App.sass';
import 'bulma-helpers/css/bulma-helpers.min.css'
import 'bulma/css/bulma.min.css';
import Footer from './layout/skeleton/footer';
  
  function TabPanel(props) {

    const { children, value, index, tabs, ...other } = props;
    const IS_THE_ONE_TO_RENDER = tabs[index] ? value === tabs[index].value : false;
    return IS_THE_ONE_TO_RENDER ? <div
                role="tabpanel"
                hidden={!IS_THE_ONE_TO_RENDER}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                className={IS_THE_ONE_TO_RENDER ? 'tab-panel is-active' : 'tab-panel'}
                {...other}
            >
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            </div> : <></>;
  }
  
// Suspense Navbar
const NavBarSuspense = React.lazy(() => import('components/layout/skeleton/navbar'));

// Main class
export default function FreqtradeKontroller (props) {
    
    {/*  -------------------------  */}
    {/*       1. 🔈 Events          */}
    {/*  -------------------------  */}
    const handleSelectedTabChange = (event, value) => {
        props.setSelectedTab(value);
    }
    const handleSelectedMachinaTabChange = (event, value) => {
        props.setSelectedMachinaTab(value);
    }
    {/*  -------------------------  */}

    {/*  -------------------------  */}
    {/*      2. ⚙️ Renderers         */}
    {/*  -------------------------  */}
    {/*                             */}
    {/*   -  🌳 Tree section  -     */}
    {/*                             */}
    const renderTreeSection = () => {

        return (
        <>
           { /* Árbol */ }
            <article className="clean-article c-2 is-bordered-1">
                <p className="title">
                <SmartToyTwoToneIcon className="header-icon"/>
                    Instances
                </p>
                <div className="content">
                    {true &&
                        <>
                            <FreqUINodesTree
                                name={"Nodes for machine " + props.machineName}
                                description="List of nodes for machine .... "
                                {...props}
                            />
                        </>
                    }
                </div>
            </article>
            <hr/>
            { /* Machina Info */ }
            <article className="clean-article c-2 is-bordered-1">
                <div className="content">
                    {true && renderMachinaTabsSection()}  
                </div>
            </article>
        </>);
    } 
    {/*                             */}
    {/*   -  🎛 Machina Info  -     */}
    {/*                             */}
    const renderMachinaTabsSection = () => {

        // Declarate tabs
        const tabs = [
            {
                label: 'Machina Status',
                value: 'machina-status',
                icon: <MemoryTwoToneIcon className="header-icon"/>

            },
            {
                label: 'Log Terminal',
                value: 'log-terminal',
                icon: <TerminalTwoToneIcon className="header-icon"/>

            },
            {
                label: 'Edit Nodes',
                value: 'edit-nodes',
                icon: <EditIcon className="header-icon"/>

            },
        ];

        // Find active tab coming from props
        let selectedMachinaTab = tabs.find(tab => tab.value === props.selectedMachinaTab);
        selectedMachinaTab = selectedMachinaTab || tabs[0];

        // If Freqtrade Control panel is selected and log-terminal is the selected tab, move to the first
        const isFreqtradePanelSelected = props.selectedTab === 'freqtrade-control-panel';
        const isEmailEngineTabSelected = props.selectedTab === 'email-engine';
        // If Freqtrade Control panel is selected and log-terminal is the selected tab, move to the first tab
        if (isFreqtradePanelSelected || isEmailEngineTabSelected) {
            selectedMachinaTab = tabs[0];

            // Remove log-terminal from tabs array finding it by value
            tabs.splice(tabs.findIndex(tab => tab.value === 'log-terminal'), 1);
        }
    
        // debugger;
        // Print tabs
        return <div className="split decoded">

            <article className="clean-article is-full-height is-bordered-1 is-relative">
            <p className="title is-hidden">
                {selectedMachinaTab.icon}
                {selectedMachinaTab.label}
            </p>

            {/* Tab Box */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="">
            <Tabs
                        value={selectedMachinaTab.value}
                        onChange={handleSelectedMachinaTabChange}
                        variant="scrollable"
                        // centered
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                        
                >
                            {tabs.map(tab => (
                                    <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
                            )
                            )}
                </Tabs>
            </Box>        

            {/* Machina Status section */}    
            <TabPanel value={selectedMachinaTab.value} tabs={tabs} name="machina-status"  index={0}>
                <MachinaChart
                    name="Machina status"
                    description="Status de la machina del almendra"
                    {...props}
                />
            </TabPanel>     

            {/* Render Log Terminal section */}
            <TabPanel value={selectedMachinaTab.value} tabs={tabs} name="log-terminal" className="is-full-height" index={1}>
                {renderLogTerminalWithWindowSection()}
            </TabPanel>
            
            {/* Render Edit nodes section */}
            <TabPanel value={selectedMachinaTab.value} tabs={tabs} name="edit-nodes" className="is-full-height" index={2}>
                {renderEditNodesWindowSection()}
            </TabPanel>
            </article>
        </div>;

    }
    {/*                             */}
    {/*    -  🧮 Log  Section  -    */}
    {/*                             */}
    const renderLogTerminalSection = () => {
        return (
            <article className="clean-article  is-bordered-1">
            <div className="content">
                { /* Payload */ }
                {true && <LogTerminalWithWindow
                  name={"Logs for " + props.machineName}
                  description={"List of logs for machine .... "}
                    {...props}
          />}
          </div>
        </article>
        );
    }
    const renderLogTerminalWithWindowSection = () => {
        return (
            <article className="clean-article  is-bordered-1">
            <div className="content">
                { /* Payload */ }
                {true && <LogTerminalWithWindow
                  name={"Logs for " + props.machineName}
                  description={"List of logs for machine .... "}
                    {...props}
          />}
          </div>
        </article>
        );
    }
    const renderEditNodesWindowSection = () => {
        return (
            <>
                <EditNodesComponent {...props} />
            </>
        );
    }
    {/*                             */}
    {/*   -  ⎍ Tabs section  -     */}
    {/*                             */}
    const renderTabsSection = () => {

        const HAS_PROFIT_DATA = props.profitData;
        const HAS_BALANCE_DATA = props.balanceData;

        // Declarate tabs
        const tabs = [
            {
                label: 'Dashboard',
                value: 'dashboard-almendra',
                icon: <DashboardIcon className="header-icon"/>

            },
            {
                label: 'Balance',
                value: 'balance',
                icon: <AutoGraphTwoToneIcon className="header-icon"/>

            },
            {
                label: 'Profit',
                value: 'profit',
                icon: <PercentIcon className="header-icon"/>

            },
            {
                label: 'Data',
                value: 'data',
                icon: <TocIcon className="header-icon"/>

            },
            {
                label: 'Email Engine',
                value: 'email-engine',
                icon: <ScheduleSendIcon className="header-icon"/>

            },
            {
                label: 'Freqtrade Panel',
                value: 'freqtrade-control-panel',
                icon: <PrecisionManufacturingTwoToneIcon className="header-icon"/>

            },
            {
                label: 'App Schema',
                value: 'dependency-graph',
                icon: <CodeIcon className="header-icon"/>

            },
            {
                label: 'Database Freko',
                value: 'database-freko',
                icon: <DashboardCustomizeIcon className="header-icon"/>
            },
        ];

        // Find active tab coming from props
        let selectedTab = tabs.find(tab => tab.value === props.selectedTab);
        selectedTab = selectedTab || tabs[0];
        // Print tabs
        return <div className="split decoded">

          {/* Balance and profit chart */}
          <article className="clean-article is-full-height is-bordered-1 is-relative">
          <p className="title">
                {selectedTab.icon}
                {selectedTab.label}
           </p>

            {/* Tab Box */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="">
            <Tabs
                        value={selectedTab.value}
                        onChange={handleSelectedTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                >
                            {tabs.map(tab => (
                                <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
                            ))}
                </Tabs>
            </Box>        

            {/* Dashboard Almendra section */}
            <TabPanel value={selectedTab.value} tabs={tabs} name="dashboard-almendra" index={0} className="is-full-height">
                
                {/* Dashboard Almendra */}
                {renderDashboardAlmendraSection()}

            </TabPanel>

            {/* Balance section */}
            <TabPanel value={selectedTab.value} tabs={tabs} name="balance"  index={1}>
                {HAS_BALANCE_DATA && renderBalanceChart()}
                {renderTableSection()}
            </TabPanel>

            {/* Profit section */}
            <TabPanel value={selectedTab.value} tabs={tabs} name="profit"  index={2}>
                {HAS_PROFIT_DATA && renderProfitChart()}
                {renderTableSection()}
            </TabPanel>

            {/* Data section */}
            <TabPanel value={selectedTab.value} tabs={tabs} name="data"  index={3}>
                {renderTableSection()}
            </TabPanel>

            {/* Email Engine section */}    
            <TabPanel value={selectedTab.value} tabs={tabs} name="email-engine"  index={4}>
                {renderEmailSection()}
                {renderLogTerminalSection()}
            </TabPanel>

            {/* Freqtrade Control Panel section */}
            <TabPanel value={selectedTab.value} tabs={tabs} name="freqtrade-control-panel" index={5}>
                {renderTableSection()}
                {renderLogTerminalSection()}
            </TabPanel>

            {/* Dependency Graph section */}    
            <TabPanel value={selectedTab.value} tabs={tabs} name="dependency-graph"  index={6}>
                {renderDevelSection()}
            </TabPanel>     

            {/* Metabase Txeo section */}
            <TabPanel value={selectedTab.value} tabs={tabs} name="database-freko" className="is-full-height" index={7}>
            {renderDashTxeoSection()}
            </TabPanel>
            </article>
        </div>;

    }
        
    {/*                             */}
    {/*   -  ⏱ Dash section   -    */}
    {/*                             */}
    const renderDashboardAlmendraSection = () => {
        return (
            <div className="metabase-content content is-hiddenn">
                <iframe
                    title={'Dashboard Freko Metabase'}
                    src="https://metabase.drolo.club/public/dashboard/0250985c-5b3d-46e3-9ad9-509b0cb538b0"
                        frameBorder={0}
                        width="100%"
                        height="100%"
                    >
                </iframe>
            </div>
        );
    }
    {/*                             */}
    {/* -  📈 Balance section  -    */}
    {/*                             */}
    const renderBalanceChart = () => {
        return (
            <div className="content">
                { /* Balance chart */ }
                <BalanceChart
                    name="Balance for nodes"
                    description="Total Balance for nodes... "
                    nodesTree={props.filteredNodes}
                    balanceData={props.balanceData}
                    machineName={props.machineName}
                    theme={props.theme}
                />
            </div>
        );
    }
    {/*                             */}
    {/*   - 📈 Profit section  -    */}
    {/*                             */}
    const renderProfitChart = () => {
        return (
            <div className="content">
                { /* Profit chart */ }
                <ProfitChart
                    name="Profit (%) for nodes"
                    description="Total Profit for nodes... "
                    nodesTree={props.filteredNodes}
                    profitData={props.profitData}
                    machineName={props.machineName}
                    theme={props.theme}
                />
            </div>
        );
    }
    {/*                             */}
    {/*  -  🧮 Table  Section  -    */}
    {/*                             */}
    const renderTableSection = () => {
        return (
            <article className="clean-article  is-bordered-1">
            <div className="content">
                { /* Payload */ }
                {true && <NodesTable
                  name={"Nodes for machine " + props.machineName}
                  description={"List of " + props.filteredNodes.length  + "nodes for machine .... "}
                    {...props}
          />}
          </div>
        </article>
        );
    }
    {/*                             */}
    {/*  - 📊 Metabase section  -   */}
    {/*                             */}
    {/*                             */}
    {/*   -  📩 Email section   -   */}
    {/*                             */}
    const renderEmailSection = () => {
        return (
            <div className="content">
                To come
            </div>
        );
    }
    {/*                             */}
    {/* - 👩‍💻 Developmnt section  -  */}
    {/*                             */}
    const renderDevelSection = () => {
        return (
            <div className="content">
                {/* show svg from local path */}
                <img src="img/digraph/dependencygraph-server.svg" alt="graph server" />
                {/* show svg from local path */}
                <img src="img/digraph/dependencygraph-client.svg" alt="graph client" />
            </div>
        );
    }
    {/*                             */}
    {/* -  ⏱ Dash txeo section  -  */}
    {/*                             */}
    const renderDashTxeoSection = () => {
        return (
            <>
                <DatabaseTables />
            </>
        );
    }
    {/*                             */}
    {/*  -  🦶 Footer section  -    */}
    {/*                             */}
    const renderFooterSection = () => {
        return (
            <article className="clean-article  is-bordered-1 is-hiddenn">
            <p className="title">
                <img src="img/docker-logo.png" className="docker-header-icon" alt="Freqtrade" />
                Docker Images
                </p>
                <div className="content">
                    {true &&
                        <>
                            <DockerContainersTable
                                name="Docker instances for machine xxx"
                                description="List of docker instances for machine .... "
                                value={props.nodesTree}
                                machineName={props.machineName}
                                dockerContainers={props.dockerContainers}
                            />
                        </>
                    }
                </div>
            </article>
        );
    }
    {/*  -------------------------  */}
    {/*    -    🤖 MAIN APP    -    */}
    {/*  -------------------------  */}
    const renderFrekoApp = () => {

        const IS_DARK = props.theme === 'dark';
        const IS_LIGHT = props.theme === 'light';

        const appClass = classNames({
    //            'is-hidden': !props.isAppReady,
    //            'is-loading': !props.isAppReady,
            'main-container': true,
            'is-theme-dark': IS_DARK,
            'is-theme-light': IS_LIGHT,

        });
        const themeHeroClass = IS_DARK ? 'hero is-dark' : 'hero is-light';
        const reactTooltipType = IS_LIGHT ? 'light' : 'dark';
        const IS_LOADING = props.loading === true;

        // App
        let app = (
            <Scrollbars
                // This will activate auto hide
                autoHide
                // Hide delay in ms
                autoHideTimeout={700}
                // Duration for hide animation in ms.
                autoHideDuration={200}
                autoHeight
                autoHeightMin={'calc(100vh - 0px)'}
                >

                <div className={appClass}>
                
                    { /* 9. Navbar */ }
                    {true && 
                    <Suspense fallback={<div className='fallback-navbar'>Loading...</div>}>
                        <NavBarSuspense
                            theme={props.theme} 
                            setTheme={props.setTheme}
                            isFullScreen={props.isFullScreen}
                            setIsFullScreen={props.setIsFullScreen}
                        />
                    </Suspense>
                    
                    }
                    <Section id="drolo_controller_v2" className={"hero is-bold is-fullheight-with-navbar " + themeHeroClass}>                

                        { /* IS LOADING BOX */ }
                        {IS_LOADING && <IsLoading />}

                        { /* MAIN CONTENT */ }
                        {!IS_LOADING &&
                        <>
                            <Box className="">
                                <RefreshButton setJsonConfig={props.setJsonConfig} configJson={props.jsonConfig} lastUpdate={props.lastUpdate} reloadData={props.reloadData}/>
                                <Tile kind="ancestor">
                                    <Tile size={12} vertical>
                                        <Tile>
                                            <Tile kind="parent" vertical  size={4}>
                                                {true && renderTreeSection()}
                                            </Tile>
                                            <Tile kind="parent" size={8}>
                                                {true && renderTabsSection()}
                                            </Tile>
                                        </Tile>
                                        <Tile kind="parent" width="100%">
                                            {false && renderFooterSection()}
                                        </Tile>
                                    </Tile>
                                </Tile>
                            </Box>
                        </>}
                    </Section>
                    <Footer
                        className={themeHeroClass}
                        commitInfo={props.commitInfo}
                        textLeft={'Sangra la napia por la pestaña'}
                        textRight={'Sangra más'}
                    />
                    <ReactTooltip type={reactTooltipType}/>

                </div>
            </Scrollbars>
        );
        return app;
    }
    
    {/*  -------------------------  */}
    {/*    3. 💪 Some Functions     */}
    {/*  -------------------------  */}
    
    {/*  -------------------------  */}
    {/*  -  🤖 MAIN APP RENDERER -  */}
    {/*  -------------------------  */}
    const freko = renderFrekoApp();
    
    return freko;
}
