import { Card, Content, Level, Heading } from 'react-bulma-components';
import * as utils     from 'core/utils';
import Tree from 'react-animated-tree';

// Tabs
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

// Icons
import DnsTwoToneIcon from '@mui/icons-material/DnsTwoTone';
import VisibilityOffTwoToneIcon from '@mui/icons-material/VisibilityOffTwoTone';
import RemoveRedEyeTwoToneIcon from '@mui/icons-material/RemoveRedEyeTwoTone';
import PanoramaFishEyeTwoTone from '@mui/icons-material/PanoramaFishEyeTwoTone';
import ThumbDownAltTwoToneIcon from '@mui/icons-material/ThumbDownAltTwoTone';
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone';
import RestoreTwoToneIcon from '@mui/icons-material/RestoreTwoTone';
import PsychologyTwoToneIcon from '@mui/icons-material/PsychologyTwoTone';


import React from 'react';


import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// Theming
import { Box, /* Section ,Tile, Heading, Image, Notification */ } from 'react-bulma-components';

// import { color } from 'echarts';

export default function FreqUINodesTree (props) {



    /*  -------------------------  */
    /*      1.  🔦  Filters        */
    /*  -------------------------  */  
    const handleShowHideChart =(event) => {

        // console.log(event);
        const clickedNodeName = event.currentTarget.parentElement.id;
        
        const nodesTree = props.nodesTree;
        
        const nodeIndex = nodesTree.findIndex(n => n.name === clickedNodeName);
        const nodeToUpdate = nodesTree[nodeIndex];
        
        // debugger;
        nodeToUpdate.visible = !nodeToUpdate.visible;
        
        // Update the state fof the tree
        const newNodesTree = [...nodesTree];
        props.setNodesTree( newNodesTree );

        // Update the state for the strategies and the tab
        props.setSelectedStrategy('all');
        props.setSelectedTreeTab(null);

    }
    const handleShowAll =(event) => {

        const nodesTree = props.nodesTree;
        
        // debugger;
        nodesTree.forEach(n => n.visible = true);
        
        // Update the state
        const newNodesTree = [...nodesTree];
        props.setNodesTree( newNodesTree );

        // Update the state for the strategies
        props.setSelectedStrategy('all');

    }
    const handleHideAll =(event) => {

        const nodesTree = props.nodesTree;
        
        // debugger;
        nodesTree.forEach(n => n.visible = false);
        
        // Update the state
        const newNodesTree = [...nodesTree];
        props.setNodesTree( newNodesTree );

                // Update the state for the strategies
        props.setSelectedStrategy('all');

    }
    const handleShowExchange =(exchangeName) => {

        const nodesTree = props.nodesTree;
        const kucoinNodes = nodesTree.filter(n => n.configFromFile.exchange.name === exchangeName);
        // Update the state
        const newNodesTree = [...kucoinNodes];
        props.setNodesTree( newNodesTree );

                // Update the state for the strategies
        props.setSelectedStrategy('all');

    }
    const handleStrategySelectorChange =(event) => {

        // Get the value from the selector
        const selectedStrategy = event.target.value;

        const nodesTree = props.nodesTree;

        for (let i = 0; i < nodesTree.length; i++) {
    
            if (nodesTree[i].configFromFile.strategy === selectedStrategy || selectedStrategy === 'all') {
                nodesTree[i].visible = true;
            } else {
                nodesTree[i].visible = false;
            }

        }
        
        // Update the state
        props.setSelectedStrategy(selectedStrategy);
        // Update the state
        const newNodesTree = [...nodesTree];
        props.setNodesTree( newNodesTree );

    }
    const handleShowExchangeFTX = (event) => {

        handleShowExchange('ftx');
    }
    const handleShowDynamic = (event) => {
            
        const nodesTree = props.nodesTree;

        for (let i = 0; i < nodesTree.length; i++) {
    
            if (nodesTree[i].useDynamicList === true) {
                nodesTree[i].visible = true;
            } else {
                nodesTree[i].visible = false;
            }

        }
        
        // Update the state
        const newNodesTree = [...nodesTree];
        props.setNodesTree( newNodesTree );

                // Update the state for the strategies
        props.setSelectedStrategy('all');
    }
    const handleShowBalanceAbove1000 = (event) => {
            
        const nodesTree = props.nodesTree;
 
        for (let i = 0; i < nodesTree.length; i++) {
            
            // get balance
            const balance = nodesTree[i].trades[nodesTree[i].trades.length-1].balance;
            
            if (balance > 1000) {
                nodesTree[i].visible = true;
            } else {
                nodesTree[i].visible = false;
            }

        }
        
        
        // Update the state
        const newNodesTree = [...nodesTree];
        props.setNodesTree( newNodesTree );

                // Update the state for the strategies
        props.setSelectedStrategy('all');
    }
    const handleShowBalanceBelow1000 = (event) => {
            
        const nodesTree = props.nodesTree;

        for (let i = 0; i < nodesTree.length; i++) {
            
            // get balance
            const balance = nodesTree[i].trades[nodesTree[i].trades.length-1].balance;
            
            if (balance < 1000) {
                nodesTree[i].visible = true;
            } else {
                nodesTree[i].visible = false;
            }

        }
        
        // Update the state
        const newNodesTree = [...nodesTree];
        props.setNodesTree( newNodesTree );

                // Update the state for the strategies
        props.setSelectedStrategy('all');
    }
    const handleTreeTabChange = (event, newValue) => {

        // const value = 'all';
        console.log ("Value:", newValue);
        // Take the new value and apply the correspondent filter
        switch (newValue) {
            case 'all':
                handleShowAll();
                break;
            case 'none':
                handleHideAll();
                break;
            case 'dynamic':
                handleShowDynamic();
                break;
            case 'ftx':
                handleShowExchangeFTX();
                break;
            case 'yeah':
                handleShowBalanceAbove1000();
                break;
            case 'ouch':
                handleShowBalanceBelow1000();
                break;
            default:
                break;
        }
        
        // Store the new value into the state
        props.setSelectedTreeTab(newValue);
    }
    
    /*  -------------------------  */
    /*      1.  🔦  Filters        */
    /*  -------------------------  */  

    // Declarate tabs
    /*                             */
    /*                             */
    /*  -------------------------  */
    /*      4. ⚙️ Renderers         */
    /*  -------------------------  */
    
    const renderStrategySelector = () => {
    
        // Get all strategies from nodesTree
        const strategies = props.nodesTree.map(n => n.configFromFile.strategy);

        // Get all unique strategies
        const uniqueStrategies = [...new Set(strategies)];
        return (
            <div className="strategy-selector">
                
                <FormControl fullWidth>
                    <InputLabel id="strategy-selector-label">Strategy</InputLabel>
                    <Select
                        id="strategy-selector"
                        value={props.selectedStrategy}
                        onChange={handleStrategySelectorChange}
                    >
                        <MenuItem value="all">All</MenuItem>
                        {uniqueStrategies.map(s => <MenuItem className="option-selected" key={s + '_' + new Date().getTime()} value={s}>{s}</MenuItem>)}
                    </Select>
                    </FormControl>
            </div>

        )
    }

    const getColorClassName = (value, tabs) => {
        
        switch (value) {
            case 'all':
                return '';
            case 'none':
                return '';
            case 'dynamic':
                return '';
            case 'ftx':
                return '';
            case 'yeah':
                return 'is-success';
            case 'ouch':
                return 'is-danger';
            case 'maybe':
                return 'is-warning';
            case 'strategy':
                return 'is-primary';

            default:
                return 'color-all';
        }
    }

    const renderTreeNodesFilters = () => {

        const currentSelectedTreeTab = props.selectedTreeTab;
        const isStrategyOption = currentSelectedTreeTab === 'strategy';

        const tabs = [
            {
                label: 'Show All',
                value: 'all',
                icon: <RemoveRedEyeTwoToneIcon className="header-icon"/> 
            },
            {
                label: 'Hide All',
                value: 'none',
                icon: <VisibilityOffTwoToneIcon className="header-icon"/>
    
            },
            {
                label: 'Dynamic',
                value: 'dynamic',
                icon: <RestoreTwoToneIcon className="header-icon"/>
    
            },
            {
                label: 'Yeah',
                value: 'yeah',
                icon: <ThumbUpAltTwoToneIcon className="header-icon" />
    
            },
            {
                label: 'Ouch',
                value: 'ouch',
                icon: <ThumbDownAltTwoToneIcon className="header-icon"/>
    
            },
            {   label: 'Strategy',
                value: 'strategy',
                icon: isStrategyOption ? renderStrategySelector() : <PsychologyTwoToneIcon className="header-icon"/>
            },
        ];
    
        // Find active tab coming from props
        // console.log ("Active tab:", props.selectedTreeTab);
        let selectedTreeTab = tabs.find(tab => tab.value === props.selectedTreeTab);
        let colorClassName = selectedTreeTab ? getColorClassName(selectedTreeTab.value) : '';
        // debugger;
        //
        // Print tabs
        return <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={selectedTreeTab ? selectedTreeTab.value : false}
                    onChange={handleTreeTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                    // className={'tree-filters ' + colorClassName}
            >
                        {tabs.map((tab , i) => (
                            <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} className={colorClassName} tabs={tabs} />
                        ))}
                </Tabs>
            </Box>
        </> 
    }
    const renderTree = () => {
        const nodesTree = props.nodesTree;
        const machineName = props.machineName;
        
        const final = [];

        for (let index = 0; index < nodesTree.length; index++) {
            const oneNode = nodesTree[index];
            // console.log(`${nodeTree}: ${oneNode.configFromFile.stake_currency}`);
            const finalProps = [];

            // Añadimos nodo de configuración
            finalProps.push(
                <Tree key={`${oneNode.name}-conf`} type={<span className="tree-icon">
                        <img className="tree-icon" src="img/json.png" alt="" />{'config.json'}</span>} onClick={console.log} 
                />
            );

            // Añadimos nodo de estrategias
            finalProps.push(
                <Tree key={`${oneNode.name}-strategies`} type={<span className="tree-icon">
                        <img className="tree-icon" src="img/json.png" alt="" />{'strategies.json'}</span>} onClick={console.log} 
                />
            );

            // Añadimos nodo de logs
            finalProps.push(
                <Tree key={`${oneNode.name}-logs`} type={<span className="tree-icon">
                        <img className="tree-icon" src="img/logs.png" alt="" />{'freqtrade.log'}</span>} onClick={console.log} 
                />
            );


            // Añadimos nodo de datis
            finalProps.push(
                <Tree key={`${oneNode.name}-data`} type={<span className="tree-icon">
                    
                    <i className="tree-icon material-icons">database</i>
                    {'tradesv3.sqlite'}</span>} onClick={console.log} 
                />
            );

            // Prepare node to show in tree
            const isConnected = oneNode.trades != null && oneNode.trades.length > -1;
            const isVisible = oneNode.visible;
            const isRunning = true; // utils.isRunning(dockerContainers, oneNode);
            const isConnectedClass = isConnected ? 'is-connected' : 'is-not-connected';
            const isRunningMachineClass = isRunning ? 'is-running-machine' : 'is-not-running-machine';
            const databaseIconClassName = `tree-notification-icon ${isConnectedClass}`;
            const machineStatusIconClassName = `tree-notification-icon ${isRunningMachineClass}`;
            const showInChartIconClassName = `tree-notification-icon ${isConnected ? 'is-not-hidden' : 'is-hidden'} ${isVisible ? 'is-visible-in-chart' : 'is-not-visible-in-chart'}`;
            const styleChartIcon = {color: isConnected ? oneNode.color : '#ddd'};
            const machineStatusIcon = <span className={machineStatusIconClassName}><PanoramaFishEyeTwoTone /></span>;
            const databaseIcon = <span className={databaseIconClassName}><DnsTwoToneIcon /></span>;
            const nodeChartIcon = isVisible ? <RemoveRedEyeTwoToneIcon /> : <VisibilityOffTwoToneIcon />;
            const showInChartIcon = <span className={showInChartIconClassName} style={styleChartIcon} onClick={handleShowHideChart}>{nodeChartIcon}</span>;
            
            const node = 
                <Tree
                    key={`${oneNode.name}-another`}
                    content={''}
                    type={
                    <span id={oneNode.name} className="main-node">
                        {false && machineStatusIcon}
                        {showInChartIcon}
                        <img className="tree-icon" alt="tree-icon" src="img/freqtrade-logo.png"/>
                        {databaseIcon}
                        <span>{oneNode.name} [{oneNode.configFromFile.stake_currency}] <b>[{oneNode.configFromFile.strategy}]</b></span>
                        {false && showInChartIcon}
                    </span>
                    }
                    open={false}
                    ccanHide
                    visible
                    onClick={console.log}
                >
                    {finalProps}
                </Tree>;

            final.push(node);
        }


        return (
            <>
                <Tree content=""
                    type={<span className="tree-icon"><span role="img" aria-label="machine">🌐</span> {machineName}</span>}
                    open
                    canHide={false}
                    visible
                    onClick={console.log}
                >
                {final}
                </Tree>
            </>
            )
        ;

    }        
    /*                             */
    /*                             */
    /*  -------------------------  */
 
    /*  -------------------------  */
    /*  -   🧩 MODULE RENDERER  -  */
    /*  -------------------------  */
    
    let value = props.nodesTree !== null ?props.nodesTree : '';
    let IS_VALID_JSON = typeof value === "object";
    
    // const jsonClass = IS_VALID_JSON ? 'valid-json-signature' : 'invalid-json';
    const themeClass = props.theme === 'dark' ? 'is-dark' : 'is-light';        
    
    return (
        <>
            {/* Five buttons here */}
            {renderTreeNodesFilters()}

            <Card className={'result-' + props.name + ' result-value is-shady ' + themeClass}>
                <Card.Header>
                    <Content className="is-full-width is-hidden">
                        <Level renderAs="nav">
                            <Level.Side align="left">
                                <Level.Item className="default-header">
                                &nbsp;
                                    <b className="hast-text-link has-text-weight-normal" data-tip={props.description} data-place="right" data-html="true">{utils.capitalizeFirst(props.name)}</b>
                                    <span className="has-text-grey is-hidden">: {props.description}</span>

                                </Level.Item>
                                <Level.Item className="edition-header is-hidden">
                                <Heading className="is-7" subtitle>

                                    <span className="has-text-grey"> Editing <b className="hast-text-link">{utils.capitalizeFirst(props.name)}: </b> ...</span>

                                </Heading>
                                </Level.Item>
                            </Level.Side>
                        </Level>

                    </Content>
                </Card.Header>
                <Card.Content className={'nodes-tree-card-content'}>
                    <Content>
                        <p className="subtitle is-hidden">{utils.capitalizeFirst(props.name)}:</p>
                        <>
                            {IS_VALID_JSON && <div className={'json-explore color-' + props.name}>
                                {true && renderTree()}
                            </div>}
                            </>
                    </Content>
                </Card.Content>
                <Card.Footer className="is-hidden">
                    <Content className="is-full-width has-text-right">
                    <Level className="result-description is-hiddenn">
                    <Level.Side align="left">
                    {/* <span className="with-ellipsis">{props.nodesTree.substring(0, 35)}{props.nodesTree.length > 35 ? '...': ''}</span> */}
                    <span className="with-ellipsis subtitle is-7 has-text-grey"><b className="has-text-grey">Description: </b>{props.description}{props.description.length > 35 ? '...': ''}</span>
                    </Level.Side>
                    <Level.Side align="right">
                    <strong className="is-hidden">{utils.capitalizeFirst(props.name)}: </strong>
                    {/* <span className="with-ellipsis">{props.nodesTree.substring(0, 35)}{props.nodesTree.length > 35 ? '...': ''}</span> */}
                    <span className="with-ellipsis subtitle is-7 has-text-grey is-hidden">{props.description}{props.description.length > 35 ? '...': ''}</span>
                    </Level.Side>
                    </Level>
                    </Content>

                </Card.Footer>
            </Card>
        </>
    );
}
