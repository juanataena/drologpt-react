import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import Tooltip from '@mui/material/Tooltip';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import HelpIcon from '@mui/icons-material/Help';
import PercentIcon from '@mui/icons-material/Percent';
import TableRowsIcon from '@mui/icons-material/TableRows';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TodayIcon from '@mui/icons-material/Today';
import Filter9PlusIcon from '@mui/icons-material/Filter9Plus';
import ExpandIcon from '@mui/icons-material/Expand';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Terminal} from '@mui/icons-material';

export default function NodesTable (props) {

    {/*  -------------------------  */}
    {/*         🛠 Setup            */}
    {/*  -------------------------  */}
    {/*                             */}
    {/*    -    🧘🏻 State   -        */}
    {/*                             */}
    const RENDER_IT = false;
    const [data, setData] = useState(props.filteredNodes);
    const [sortModel, setSortModel] = React.useState([
        {
          field:  props.selectedTab === 'balance' ? 'balance': props.selectedTab === 'freqtrade-control-panel' ? 'colorName': 'profit',
          sort: 'desc',
        },
    ]);
    const [selectedNode, setSelectedNode] = React.useState(null);
    const [selectedAction, setSelectedAction] = React.useState(null);
    const Item = styled(Paper)(({ theme }) => ({
    
        backgroundColor: props.theme === 'dark' ? '#1A2027' : '#fff',
        padding: 10,
        textAlign: 'center',
        color: 'aaa',
      }));
    {/*                             */}
    {/*    -    🤡 Efects   -       */}
    {/*                             */}
    useEffect(() => {
    } , []);
    useEffect(() => {
        setData(props.filteredNodes);
    }
    , [props.filteredNodes]);
    {/*                             */}
    {/*                             */}
    {/*                             */}
    {/*  -------------------------  */}
    {/*       1. 🔈 Events          */}
    {/*  -------------------------  */}
    {/*                             */}
    let bubblesTimeout = null;
    const onSortModelChange = (sortModel) => {
        setSortModel(sortModel);
    }
    const handleMouseEnterIcon = (record) => {
        // Get action from icon
        const action = record.target.attributes.action ? record.target.attributes.action.value : null;
        
        let row = {};        
        // Check if params are null
        if (record !== null && action !== null) {
            const index = Number(record.currentTarget.parentElement.parentElement.parentElement.getAttribute("data-id"));
            row = data[index - 1];
        }  

        if (action) {
            stopHandleMouseLeaveIcon();
            setSelectedAction(action);
            setSelectedNode(row);
        }
    }
    const handleMouseLeaveIcon = (record) => {
            bubblesTimeout = setTimeout(() => {
                setSelectedAction (null);
                setSelectedNode (null);
               }, 500);
    }
    const stopHandleMouseLeaveIcon = () => {
        clearTimeout(bubblesTimeout);
    }
    const handleActionIcon = (record) => {

        
        // Get action from icon (check in the element and in the child, as it's an SVG) 
        let element = record.target.attributes.action ? record.target : null;
        if (!element) {
            element = record.target.parentElement.attributes.action ? record.target.parentElement : null;
        }
        const action = element.attributes.action.value;

        // Get the node name from the info of the row and the state
        const id = element.parentElement.parentElement.parentElement.getAttribute("data-id");
        const node = data.find (node => node.id === Number(id));
        const name = node.name;
        // const color = node.color;

        // Check if params are null, if not, execute the action
        if (action && name) {
        
            // console.log('action', action);

            // Put the tooltip in loading mode
            // setTooltipLoading(true);

            // Call the action
            props.executeFreqtradeCommand(name, action);
        }

    }
    {/*                             */}
    {/*                             */}
    {/*  -------------------------  */}
    {/*    2. ⬅️ Some Getters       */}
    {/*  -------------------------  */}
    const getGlobalPositionValueForGrid = (key, record, nodesTree) => {
   
        // debugger;

        if (!record) {
            return null;
        }
        let content = '';
        const dataInRecord = record.row;
        
        if (!dataInRecord) {
            return null;
        }
        
        const value = dataInRecord[key];
        
        if (value === 1) {
            content = <span className="emoji">{'🥇'}</span>;
        }

        if (value === 2) {
            content = <span className="emoji">{'🥈'}</span>;
        }
        
        if (value === 3) {
            content = <span className="emoji">{'🥉'}</span>;
        }

        if (value === nodesTree.length - 2) {
            content = <span className="emoji">{'💀'}</span>;
        }
        
        if (value === nodesTree.length - 1) {
            content = <span className="emoji">{'☠️'}</span>;
        }
        
        if (value === nodesTree.length) {
            content = <span className="emoji">{'🦨'}</span>;
        }
        
        const color = getDangerGradientColorForGrid(key, value, nodesTree.length);
        const contentAsMarkup = <span style={{color}}>{content} {value}</span>;
        return contentAsMarkup;
    }
    const getDangerGradientColorForGrid = (key, value, nodesTreeLength) => {
        const cellData = value;
        const percentage = (cellData / nodesTreeLength) * 100;
        let color = '#aaa';

        // Gradient from green to red
        if (percentage < 40) {
            color = 'green';
        }
        if (percentage >= 40 && percentage < 70) {
            color = '#aaa';
        }
        if (percentage >= 70 && percentage < 100) {
            color = 'darkred';
        }
        if (percentage >= 100) {
            color = 'red';
        }

        return color;
    }
    const getSparkLinesForGrid = (record) => {
        
        // Find in data the record with the s
        // We take the initial balance
        const initialBalance = 1000;
        const initialProfit = 0;

        const sparklinesData = record.value;
        
        // Add the first value to the sparklines
        sparklinesData.unshift(record.field.startsWith("balance") ? initialBalance:initialProfit);
                
        return <Sparklines data={sparklinesData} limit={0} width={100} height={20} margin={5}>
         <SparklinesLine color={record.row.color} />
        </Sparklines>;
    }
    {/*                             */}
    {/*                             */}
    {/*  -------------------------  */}
    {/*    3. 📖 Grid Functions     */}
    {/*  -------------------------  */}
    {/*                             */}
    const generateGridColumns = () => {

        const tooltipProps = {
            placement: 'top',
            trigger: 'hover',
            enterDelay: 10,
            leaveDelay: 10,
            className: 'action-element',
            arrow: true
            
        };


        // debugger;
        const columns = [            
            {
                headerName: 'ID',
                field: 'id',
                width: 50,
                renderCell: (record) => {
                    return <div className="has-text-bold has-text-weight-bold">{record.value}</div>;
                },
                sortable: true,
                filter: true,
                align:'center'


            },

            {
                headerName: 'Color',
                headerAlign: 'center',
                field: 'color',
                sortable: false,
                align: 'center',
                width: 100,
                disableExport: true,
                valueFormatter: ( record ) => record.color,
                renderCell: (record) => {return(<div className="color-row" style={{backgroundColor: record.row.color}}>{record.row.color}</div>)}
            },
            {
                headerName: 'Instance',
                headerAlign: 'center',
                field: 'colorTitle',
                sortable: true,
                align: 'center',
                width: 300,
                disableExport: true,
                valueFormatter: ( record ) => record.name,
                renderCell: (record) => renderInstanceCell(record.row)
            },
            {
                field: 'profitGlobalPosition',
                headerName: '🏆 Ranking',
                headerAlign: 'center',
                width: 150,
                sortable: true,
                align: 'center',
                renderCell: (record ) => <div className="ranking-row">{getGlobalPositionValueForGrid('profitGlobalPosition', record, props.nodesTree )}</div>
            },
            {
                field: 'balanceGlobalPosition',
                headerName: '🏆 Ranking',
                headerAlign: 'center',
                width: 150,
                sortable: true,
                align: 'center',
                renderCell: (record) => <div className="ranking-row">{getGlobalPositionValueForGrid('balanceGlobalPosition', record, props.nodesTree  )}</div>
            },
            {
                headerName: 'Color',
                headerAlign: 'center',
                field: 'colorCircle',
                sortable: false,
                align: 'center',
                width: 100,
                disableExport: true,
                renderCell: (record) => <div className="color-row color-row-rounded" style={{backgroundColor: record.row.color}}>&nbsp;</div>
            },
            {
                field: 'cluster',
                headerName: 'Cluster',
                headerAlign: 'center',
                width: 100,
                sortable: true,
                align: 'center',
            },
            {
                field: 'name',
                headerName: 'Name',
                headerAlign: 'center',
                width: 230,
                sortable: true,
            },
            {
                headerName: 'Strategy',
                headerAlign: 'center',
                field: 'strategy',
                width: 150,
                sortable: true,
                renderCell: (record) => <div className="strategy-row">{record.row.strategy}</div>
            },
            {
                headerName: 'Target Path',
                headerAlign: 'center',
                field: 'targetPath',
                sortable: true,
                width: 120,
                renderCell: (record) => <div className="strategy-row">{record.row.targetPath}</div>
            },
            {
                headerName: 'Balance',
                headerAlign: 'center',
                field: 'balance',
                sortable: true,
                align: 'right',
                width: 100,
                renderCell: function (record){ 
                    
                    const lastTradeBalance = record.row.balance;
                    const lastTradeBalanceFormatted = lastTradeBalance ? lastTradeBalance.toFixed(2) + " $" : "0 $";
                    
                    return (
                        <div className="Balance-row">{lastTradeBalanceFormatted}</div>
                    )
                }
            },
            {
                headerName: 'Profit',
                headerAlign: 'center',
                field: 'profit',
                sortable: true,
                align: 'center',
                width: 100,
                renderCell: function (record){ 
                    const lastTradeProfit = (record.row.profit*0.1);
                    const lastTradeProfitFormatted = lastTradeProfit && !isNaN(lastTradeProfit) ? lastTradeProfit.toFixed(2) + "%" : "0%";
                    return (
                        <div className="profit-row">{lastTradeProfitFormatted}</div>
                    )
                }
            },
            {
                field: 'balanceSparkLines',
                headerName: 'Tendence',
                headerAlign: 'center',
                width: 150,
                sortable: false,
                align: 'center',
                disableExport: true,
                renderCell: (record) => getSparkLinesForGrid(record),
            },
            {
                field: 'profitSparkLines',
                headerName: 'Tendence',
                headerAlign: 'center',
                width: 150,
                sortable: false,
                align: 'center',
                disableExport: true,
                renderCell: (record) => getSparkLinesForGrid(record),
            },
            {
                headerName: 'Dynamic',
                headerAlign: 'center',
                field: 'useDynamicList',
                width: 100,
                sortable: true,
                align: 'center',
                renderCell: (record) => {/*debugger*/;return (<div className={(record.row.useDynamicList? 'is-dynamic': 'is-not-dynamic') + ' is-dynamic-row'}>{record.row.useDynamicList ? '🟢' : '⚪️'}</div>)},
            },
            {   
                headerName: 'Actions',
                headerAlign: 'center',
                field: 'actions',
                width: 400,
                align: 'center',
                sortable: false,
                valueFormatter: ( record ) => ``,
                renderCell: ({ row }) => (
                    <div className='table-control-icons'>
                        <Tooltip title="/daily" 
                            action="/daily"
                            onClick={handleActionIcon}
                            onMouseEnter={handleMouseEnterIcon}
                            onMouseLeave={handleMouseLeaveIcon}
                            {...tooltipProps}
                        >
                                <TodayIcon className="daily-icon"/>
                        </Tooltip>
                        <Tooltip title="/profit"
                            action="/profit" 
                            onClick={handleActionIcon}
                            onMouseEnter={handleMouseEnterIcon}
                            onMouseLeave={handleMouseLeaveIcon}
                            {...tooltipProps}
                         >
                            <PercentIcon className="profit-icon" />
                        </Tooltip>
                        <Tooltip title="/balance"
                            action="/balance"
                             onClick={handleActionIcon}
                             onMouseEnter={handleMouseEnterIcon}
                             onMouseLeave={handleMouseLeaveIcon}
                            {...tooltipProps}
                         >
                            <AttachMoneyIcon className="balance-icon" />
                        </Tooltip>
                        <Tooltip title="/status"
                            action="/status" 
                            onClick={handleActionIcon}
                            onMouseEnter={handleMouseEnterIcon}
                            onMouseLeave={handleMouseLeaveIcon}
                            {...tooltipProps}
                         >
                            <DoneAllIcon className="status-icon" />
                        </Tooltip>
                        <Tooltip title="/performance"
                            action="/performance"
                            onClick={handleActionIcon}
                            onMouseEnter={handleMouseEnterIcon}
                            onMouseLeave={handleMouseLeaveIcon}
                            {...tooltipProps}
                         >
                            <ExpandIcon className="performance-icon" />
                        </Tooltip>
                        <Tooltip title="/count"
                            action="/count"
                            onClick={handleActionIcon}
                            onMouseEnter={handleMouseEnterIcon}
                            onMouseLeave={handleMouseLeaveIcon}
                            {...tooltipProps}
                         >
                            <Filter9PlusIcon className="count-icon" />
                        </Tooltip>
                        <Tooltip title="/start"
                            action="/start"
                            onClick={handleActionIcon}
                            onMouseEnter={handleMouseEnterIcon}
                            onMouseLeave={handleMouseLeaveIcon}
                            {...tooltipProps}
                         >
                            <PlayArrowIcon className="start-icon" />
                        </Tooltip>
                        <Tooltip title="/stop"
                            action="/stop"
                            onClick={handleActionIcon}
                            onMouseEnter={handleMouseEnterIcon}
                            onMouseLeave={handleMouseLeaveIcon}
                            {...tooltipProps}
                         >
                            <StopIcon className="stop-icon" />
                        </Tooltip>
                        <Tooltip title="/help"
                            action="/help"
                            onClick={handleActionIcon}
                            onMouseEnter={handleMouseEnterIcon}
                            onMouseLeave={handleMouseLeaveIcon}
                            {...tooltipProps}
                         >
                            <HelpIcon className="help-icon" />
                        </Tooltip>
                    </div>
                )
            },
            {
                headerName: 'Status',
                headerAlign: 'center',
                field: 'freqtradeStatus',
                width: 100,
                sortable: true,
                align: 'center',
                renderCell: (record) => {/*debugger*/;
                    let freqtradeStatusIcon = record.row.freqtradeStatus==='running' ? '🟢' : '⚪️';
                    freqtradeStatusIcon = record.row.freqtradeStatus==='stopped' ? '🔴' : freqtradeStatusIcon;
                    return (<div className={'is-freqtrade-status is-'+record.row.freqtradeStatus}>{freqtradeStatusIcon}</div>)
                },
            },
        ];
        
        return columns;
    }
    const generateGridRows = () => {
        const rows = [];
    
        for (let i = 0; i < data.length; i++) {
            rows.push({
                id: data[i].id,
                name: data[i].name,
                strategy: data[i].strategy,
                targetPath: data[i].targetPath,
                balance: data[i].trades[data[i].trades.length - 1] ? data[i].trades[data[i].trades.length - 1].balance: 0,
                profit: data[i].trades[data[i].trades.length - 1] ? data[i].trades[data[i].trades.length - 1].profit : 0,
                color: data[i].color,
                colorTitle: data[i].color,
                colorCircle: data[i].color,
                cluster: data[i].cluster,
                balanceGlobalPosition: data[i].balanceGlobalPosition,
                profitGlobalPosition: data[i].profitGlobalPosition,
                balanceSparkLines: data[i].trades ? data[i].trades.map (record=> record.balance) : [],
                profitSparkLines: data[i].trades ? data[i].trades.map (record=> record.profit) : [],
                useDynamicList: data[i].useDynamicList,
                freqtradeStatus: data[i].freqtradeStatus,
                actions: data[i].id,
            });
        }
        return rows;
    }
    {/*                             */}
    {/*                             */}
    {/*  -------------------------  */}
    {/*      4. ⚙️ Renderers         */}
    {/*  -------------------------  */}
    const renderTextToShow = (record, action) =>  {

        const iconClassname = "icon " + (record !== null ? "" : "is-hidden");
        // debugger;
        return (
            <Stack
                direction={{ md: 'column', lg: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                justifyContent="center"
                alignItems="center"
                className={"selected-node-in-freqtrade-control-panel"}
                md ={{ style: {span: 12, border: '1px solid green!important' }}}
            >

                <Item className="left">
                    <img src="img/freqtrade-logo.png" className={iconClassname} alt="Freqtrade" />
                    <b className="is-hidden">Instance: </b> <span className="name">{renderInstanceCell(record)} </span>
                </Item>
                <Item className="right">
                    <Terminal className={iconClassname}  />
                    <b className="is-hidden">Command: </b> <span className="command">{action}</span>
                </Item>
            </Stack>
            );
    } 
    const renderInstanceCell = (record) => {
        return (
            <div className="color-row" style={{backgroundColor: record ? record.color : 'lightgray'}}>
                {record ? record.name : ''}
            </div>
        );
    }
    const renderDataGrid = () => {
        
        const columns = generateGridColumns();
        const rows = generateGridRows();

        const isBalanceTab = props.selectedTab === 'balance' ? true : false;
        const isProfitTab = props.selectedTab === 'profit' ? true : false;
        const isTableTab = props.selectedTab === 'data' ? true : false;
        const isFreqtradeControlPanelTab = props.selectedTab === 'freqtrade-control-panel' ? true : false;
        const isEmailEngineTab = props.selectedTab === 'email-engine' ? true : false;
        // const pageSize = isTableTab ? 24 : rows.length > 12 ? 12 : rows.length;
        const exportDate =  new Date().toISOString().substring(0,new Date().toISOString().length-5);
        // const exportFileName = `${exportDate}_${props.selectedTab}_${props.selectedFilter}_${props.selectedSort}_${props.selectedSortOrder}_${props.selectedSortOrder}_${pageSize}_${props.selectedPage}`;

        const tableComponents = isFreqtradeControlPanelTab || isEmailEngineTab ? {} : { Toolbar: GridToolbar };

    return (
        <>
                <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ flexGrow: 1 }}>
                        <DataGrid
                            componentsProps={{ toolbar: {
                                printOptions: { disableToolbarButton: true },
                                csvOptions: { fileName: `Freko · export-on-${exportDate}` } }
                            }}
                            initialState={{
                                columns: {
                                    columnVisibilityModel: {
                                        id: true,
                                        name: !isFreqtradeControlPanelTab,
                                        strategy: !isFreqtradeControlPanelTab,
                                        targetPath: isTableTab,
                                        cluster: isTableTab,
                                        balanceSparkLines: isBalanceTab,
                                        profitSparkLines: isProfitTab || isTableTab || isFreqtradeControlPanelTab,
                                        balance: isBalanceTab || isTableTab,
                                        profit: isProfitTab || isTableTab|| isFreqtradeControlPanelTab,
                                        color: false,
                                        colorTitle: isFreqtradeControlPanelTab,
                                        colorCircle: !isFreqtradeControlPanelTab,
                                        useDynamicList: !isFreqtradeControlPanelTab,
                                        balanceGlobalPosition: isBalanceTab,
                                        profitGlobalPosition: isProfitTab || isTableTab,
                                        actions: isFreqtradeControlPanelTab,
                                    }
                                },
                            }}
                            rows={rows}
                            columns={columns}
                            components={tableComponents}
                            autoHeight
                            sortModel= {sortModel}
                            onSortModelChange = {onSortModelChange}
                            hideFooterPagination = {isFreqtradeControlPanelTab}
                            hideFooterSelectedRowCount = {isFreqtradeControlPanelTab}
                            disableSelectionOnClick = {false}
                        />
                    </div>
                </div>
        </>
    );
    }
    {/*                             */}
    {/*                             */}
    {/*  -------------------------  */}
 
    {/*  -------------------------  */}
    {/*  -   🧩 MODULE RENDERER  -  */}
    {/*  -------------------------  */}
    let value = props.filteredNodes !== null ? props.filteredNodes : '';
    // const themeClass = props.theme === 'dark' ? 'is-dark' : 'is-light';      
    const HAS_TABLE_DATA = value != null && value.length > 0;
    const isFreqtradeControlPanelTab = props.selectedTab === 'freqtrade-control-panel' ? true : false;
    // const isEmailEngineTab = props.selectedTab === 'email-engine' ? true : false;

    return (
        <>
            {HAS_TABLE_DATA && <div className="has-text-grey">{renderDataGrid()}</div>}
            {!HAS_TABLE_DATA && <p className="has-text-grey">No data</p>}
            {RENDER_IT && HAS_TABLE_DATA && isFreqtradeControlPanelTab && renderTextToShow(selectedNode, selectedAction)}
        </>
    );
}

