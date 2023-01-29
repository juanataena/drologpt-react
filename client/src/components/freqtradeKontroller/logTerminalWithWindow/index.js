import React, { useEffect, useCallback } from 'react';

import { Card, Content, Level } from 'react-bulma-components';
import * as utils from '../../../core/utils';
import LogTerminal from '../logTerminal';
// import { LazyLog } from 'react-lazylog';

export default function LogTerminalWithWindow (props) {

    {/*  -------------------------  */}
    {/*         🛠 Setup            */}
    {/*  -------------------------  */}
    {/*                             */}
    {/*    -    🧘🏻 State   -        */}
    {/*                             */}
    {/*                             */}
    {/*    -    🤡 Efects   -       */}
    {/*                             */}

    const scrollDivToBottom = useCallback(() => {
        // console.log("sangra");
        const terminal = document.querySelector ('.freqtrade-table-container');
        if (terminal) {
           //  console.log("más")
            terminal.scrollTop = terminal.scrollHeight;
        }

    },[]);
    useEffect(() => {
        setTimeout(() => {
            scrollDivToBottom();
        }, 10);
    } , [props.logs]);
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
    {/*                             */}
    {/*                             */}
    {/*  -------------------------  */}
 
    {/*  -------------------------  */}
    {/*  -   🧩 MODULE RENDERER  -  */}
    {/*  -------------------------  */}
    const themeClass = props.theme === 'dark' ? 'is-dark' : 'is-light';      

    return (
        <Card className={'result-' + props.name + ' freko-window is-shady ' + themeClass}>
            <Card.Header>
                <Content className="is-full-width">
                    <Level renderAs="nav">
                        <Level.Side align="left">
                            <Level.Item className="default-header">
                            &nbsp;
                                <b className="" data-tip={props.description} data-place="right" data-html="true">{utils.capitalizeFirst(props.name)}</b>
                                <span className="has-text-grey is-hidden">: {props.description}</span>

                            </Level.Item>
                        </Level.Side>
                        <Level.Side align="right">
                            {'🗒'}&nbsp;
                        </Level.Side>
                    </Level>

                </Content>
            </Card.Header>
            <Card.Content className={'freqtrade-table-container '}>
                <Content>
                    <p className="subtitle is-hidden">{utils.capitalizeFirst(props.name)}:</p>
                    <LogTerminal logs={props.logs} theme={props.theme} setLogs={props.setLogs} />
                </Content>
            </Card.Content>
            <Card.Footer className="is-hiddenn">
                <Content className="is-full-width has-text-right">
                <Level className="result-description is-hiddenn">
                <Level.Side align="left">
                <strong className="is-hidden">{utils.capitalizeFirst(props.name)}: </strong>
                {/* <span className="with-ellipsis">{props.filteredNodes.substring(0, 35)}{props.filteredNodes.length > 35 ? '...': ''}</span> */}
                <span className="with-ellipsis subtitle is-7 has-text-grey is-hidden">{props.description}{props.description.length > 35 ? '...': ''}</span>
                </Level.Side>
                <Level.Side align="right">
                {/* <span className="with-ellipsis">{props.filteredNodes.substring(0, 35)}{props.filteredNodes.length > 35 ? '...': ''}</span> */}
                <span className="with-ellipsis subtitle is-7 has-text-grey"><b className="has-text-grey"></b>{props.description}{props.description.length > 35 ? '...': ''}</span>
                </Level.Side>
                </Level>
                </Content>
            </Card.Footer>
        </Card>
    );
}

