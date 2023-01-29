import React, { useState, useEffect } from 'react';

import { Card, Content, Level, Heading } from 'react-bulma-components';
import * as utils from '../../../core/utils';
import { Console } from 'console-feed';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
// import { LazyLog } from 'react-lazylog';

export default function LogTerminal (props) {

    {/*  -------------------------  */}
    {/*         🛠 Setup            */}
    {/*  -------------------------  */}
    {/*                             */}
    {/*    -    🧘🏻 State   -        */}
    {/*                             */}
    {/*                             */}
    {/*    -    🤡 Efects   -       */}
    {/*                             */}

    {/*                             */}
    {/*                             */}
    {/*                             */}
    {/*  -------------------------  */}
    {/*       1. 🔈 Events          */}
    {/*  -------------------------  */}
    {/*                             */}
    {/*                             */}
    {/*                             */}
    {/*  -------------------------  */}
    {/*    2. ⬅️ Some Getters       */}
    {/*  -------------------------  */}
    {/*                             */}
    {/*                             */}
    {/*  -------------------------  */}
    {/*    3. 📖 Grid Functions     */}
    {/*  -------------------------  */}
    {/*                             */}
    {/*                             */}
    {/*                             */}
    {/*  -------------------------  */}
    {/*      4. ⚙️ Renderers         */}
    {/*  -------------------------  */}
    const renderTerminal = () => {
        return (
            <div className="terminal-container">
                <div style={{  }}>

                    <Console
                        logs={props.logs}
                        variant={props.theme}
                        filter={['info', 'table', 'error', 'debug']}
                    />
                    
                </div>
            </div>
        );
    }
    const renderTerminalAPelaco = () => {
        return (
            <div className="terminal-container">
                <div style={{  }}>

                    {/* Add an entry per log */}
                    {props.logs.map((log, index) => {
                        return (
                            <div key={index}>
                                <Level>
                                    <Level.Item>
                                        <Heading size={4}>{utils.getIsoDate(log.date)}</Heading>
                                    </Level.Item>
                                    <Level.Item>
                                        <Heading size={4}>{log.method + ' ' + log.data}</Heading>
                                    </Level.Item>
                                </Level>
                            </div>
                        )
                    } )}
                </div>
            </div>
        );
    }

    const cleanLogs = () => {
        props.setLogs([]);
    }
    const renderDeleteLogsSection = () => {
        return (
            <div className="delete-logs-section">
                <button className="button delete-log-terminal" onClick={cleanLogs}>
                    <DeleteSweepIcon className="icon"/>
                </button>
            </div>
        );
    }

    {/*                             */}
    {/*                             */}
    {/*  -------------------------  */}
 
    {/*  -------------------------  */}
    {/*  -   🧩 MODULE RENDERER  -  */}
    {/*  -------------------------  */}
    const themeClass = props.theme === 'dark' ? 'is-dark' : 'is-light';      

    return (
        <>
            {renderDeleteLogsSection()}
            {true && renderTerminal()}
            {false && renderTerminalAPelaco()}
        </>
    );
}

