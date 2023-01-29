import { useState, useEffect, useCallback } from 'react';

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

import JSONNotValidMessage from 'components/layout/skeleton/messages/JSONNotValidMessage';
import ReactTooltip from "react-tooltip";
import { Card, Content, Level, Heading, Button } from 'react-bulma-components';
import ReactJson from 'react-json-view';
import * as utils     from 'core/utils';
import DriveFileRenameOutlineTwoToneIcon from '@mui/icons-material/DriveFileRenameOutlineTwoTone';

export default function ResultValue (props) {

    // -----------------------------------
    //            0. Setup
    // -----------------------------------
    const [isJsonEditor, setisJsonEditor] = useState(true);
    // const [instance, setInstance] = useState(null);
    // const [selected, setSelected] = useState('');
    
    const [editorValue, setEditorValue] = useState(props.value);

    // Codemirror
    let instance = null;

    // -----------------------------------
    //            1. Render
    // -----------------------------------
    const setDatesForJSONEditor = useCallback(() => {
        const dates = document.querySelectorAll('.pretty-json-container .variable-value');
        dates.forEach((item, i) => {
            const type = item.querySelector('.data-type-label');
            if (type && type.textContent === 'int') {
                
                const targetElement = item.parentElement.querySelector('.variable-value');
                const dateAsString = targetElement.textContent.substr(3);
                // unix timestamp
                var ts = parseInt( dateAsString);

                // convert unix timestamp to milliseconds
                var ts_ms = ts * 1000;

                // initialize new Date object
                const dateFormatted = new Date(ts_ms);
                targetElement.setAttribute('data-tip',dateFormatted);
                targetElement.setAttribute('data-place','left');
                targetElement.setAttribute('data-offset','{"left": 61}');
                // console.log(dateFormatted);
            }
        });
    }, []);
    const setDates = useCallback(() => {

        const IS_JSON_EDITOR = isJsonEditor === true;

        if (IS_JSON_EDITOR) {
            // Set date pop-ups for JSON Editor
            setDatesForJSONEditor();
        } else {
            // Set  date pop-ups for CodeMirror
            //
            // NO TIRA. Codemirror lo pisa luego... :S
            // setDatesForCodeMirror();
        }
    }, [setDatesForJSONEditor, isJsonEditor]);

    const setPopups = useCallback(() => {

        const popupsDelete = document.querySelectorAll('.click-to-remove');
        const popupsEdit = document.querySelectorAll('.click-to-edit');
        const popupsCopy = document.querySelectorAll('.copy-to-clipboard-container');
        const popupsAdd = document.querySelectorAll('.click-to-add');

        popupsEdit.forEach((item, i) => {
            item.setAttribute('data-tip','Edit Node');
            // console.log(dateFormatted);
        });

        popupsDelete.forEach((item, i) => {
            item.setAttribute('data-tip','Delete Node');
            // console.log(dateFormatted);
        });

        popupsCopy.forEach((item, i) => {
            item.setAttribute('data-tip','Copy to clipboard');
            // console.log(dateFormatted);
        });

        popupsAdd.forEach((item, i) => {
            item.setAttribute('data-tip','Add Node');
            // console.log(dateFormatted);
        });
    }, []);
    // Use callback to avoid memory leak
    const updateDate = useCallback((evt) => {
        const targetElement = evt.currentTarget;
        const key = targetElement.parentElement.querySelector('.object-key');

        if (key) {
            
            const textContent = key.textContent.slice(1, -1);
            if (props.updateDateFor)
                props.updateDateFor(textContent);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const toggleButtonEditMode = useCallback((show) => {
        // Button
        const headerEditButton = document.querySelector('.result-' + props.name + ' .edit-link');

        if (headerEditButton) {
            if (show) {
                // console.log('showing edit mode...');
                // Header
                headerEditButton.classList.remove('is-invisible');
            } else {
                // console.log('hiding edit mode...');
                // Header
                headerEditButton.classList.add('is-invisible');
            }
        }
    }, [props.name]);
    const toggleYes = useCallback((event) => {
        toggleButtonEditMode(true);
        
    }, [toggleButtonEditMode]);
    const toggleNo = useCallback((event) => {
        toggleButtonEditMode(false);
        
    }, [toggleButtonEditMode]);
    const showEditModeOnHover = useCallback(() => {
        const IS_EDIT = props.operation === false;

        // const that = this;
        const item = document.querySelector('.result-' + props.name);
        if (IS_EDIT) {
            item.addEventListener('mouseover', toggleYes);
            item.addEventListener('mouseout', toggleNo);
            // console.log('activo');
        } else {
            item.removeEventListener('mouseover', toggleYes);
            item.removeEventListener('mouseout',toggleNo);
        }
    }, [props.name, props.operation, toggleYes, toggleNo]);
    const toggleJSONEditorMode = useCallback((show) => {
        setisJsonEditor(show);
    }, []);
    const showEditMode = useCallback(() => {
        toggleJSONEditorMode(false);
    }, [toggleJSONEditorMode]);
    const hideEditMode = useCallback(() => {
        toggleJSONEditorMode(true);
    }, [toggleJSONEditorMode]);
    const editResultValueJSonViewer = useCallback((newValue) => {

        // Take target and call parent function
        props.editResultValue(JSON.stringify(newValue.updated_src));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const onEditorChange = (newValue) => {
        // console.log(newValue);
        setEditorValue(newValue);
    };
    const saveAndHideEditMode = useCallback(() => {
        debugger;
        hideEditMode();
        let editorValueAsJson = null;
        let isValid = true;
        try {
            editorValueAsJson = JSON.parse(editorValue);
        } catch (e) {
            isValid = false;
        } finally {

        }

        if (isValid) {
            props.editResultValue(editorValueAsJson);
        }
    }, [hideEditMode, props, instance]);
    const addDateUpdater = useCallback(() => {

        const IS_EDIT = props.operation === false;
        if (IS_EDIT) {
            const dates = document.querySelectorAll('.pretty-json-container .variable-value');
            dates.forEach((item, i) => {
                const type = item.querySelector('.data-type-label');
                if (type && type.textContent === 'int') {
                    const yetIncluded = item.parentElement.querySelector('.renew-date');
                    if (!yetIncluded) {
                        // console.log('now');
                        
                        const targetElement = item.parentElement.querySelector('.variable-value');
                        // Add the new element
                        var newDiv = document.createElement("div");
                        // and give it some content
                        var iContent = document.createElement('i');
                        iContent.classList.add('material-icons');
                        iContent.textContent = 'update';
                        // var newContent = document.createTextNode('<i className="material-icons">refresh</i>');
                        newDiv.append(iContent);
                        newDiv.classList.add("renew-date");
                        newDiv.setAttribute('data-tip','Renew Date');
                        newDiv.onclick = updateDate;

                        // add the text node to the newly created div
                        targetElement.parentElement.append(newDiv);
                        // ReactTooltip.rebuild();
                    }
                    // console.log(dateFormatted);
                }
            });
        } else {

            // Remove the indicators
            const dates = document.querySelectorAll('.pretty-json-container .renew-date');
            dates.forEach((item, i) => {
                 item.parentNode.removeChild(item);
            });
        }
    }, [props.operation, updateDate]);
    
    const updateInterface = useCallback(() => {
        setDates();
        setPopups();
        showEditModeOnHover();
        addDateUpdater();

        ReactTooltip.rebuild();
    }, [setDates, setPopups, showEditModeOnHover, addDateUpdater]);
    
    useEffect(() => {
        // document.title = `Hi, ${name}`;
        updateInterface();
      }, [updateInterface]);

    // Render
    let value = editorValue !== null ? editorValue: '';
    const IS_EDIT = props.operation === false;

    const IS_JSON_EDITOR = isJsonEditor === true;
    let IS_VALID_JSON = true;
    try {
            JSON.parse(value);
    } catch (e) {
        IS_VALID_JSON = false;
    }
    const jsonClass = IS_VALID_JSON ? 'valid-json-signature' : 'invalid-json';
    const themeClass = props.theme === 'dark' ? 'is-dark' : 'is-light';   
    const themeForJSONViewer = props.theme === 'dark' ? 'pop' : 'rvj-default';     
    return (
        <Card className={'result-' + props.name + ' freko-window result-value is-shady ' + themeClass}>
            <Card.Header>
                <Content className="is-full-width">
                    <Level renderAs="nav">
                        <Level.Side align="left">
                            <Level.Item className="default-header">
                            &nbsp;
                                <b className="hast-text-link has-text-weight-normal" data-tip={props.description} data-place="right" data-html="true"><DriveFileRenameOutlineTwoToneIcon className="card-nodes-header-icon"/><b>{process.env.CONFIG_FILE_NAME}</b> <span className="has-text-light">Tree Mode</span></b>
                                <span className="has-text-grey is-hidden">: {props.description}</span>

                            </Level.Item>
                            <Level.Item className="edition-header is-hidden">
                            <Heading className="is-7" subtitle>

                                <span className="has-text-grey"> Editing <b className="hast-text-link">{utils.capitalizeFirst(props.name)}: </b> ...</span>

                            </Heading>
                            </Level.Item>
                        </Level.Side>

                        {IS_JSON_EDITOR && <Level.Side align="right" className="edit-link is-invisible">
                        <Level.Item>
                        <Button className="is-text" onClick={showEditMode} renderAs="a" size="small" color="">Edit Raw</Button>
                        </Level.Item>
                        </Level.Side>}
                        {!IS_JSON_EDITOR && <Level.Side align="right" className="edit-buttons">
                        <Level.Item><Button onClick={saveAndHideEditMode} renderAs="a" color="success" size="small">Accept</Button></Level.Item>
                        <Level.Item><Button onClick={hideEditMode} renderAs="a" color="danger" size="small">Cancel</Button></Level.Item>
                        </Level.Side>}
                    </Level>

                </Content>
            </Card.Header>
            <Card.Content className={jsonClass}>
                <Content>
                    <p className="subtitle is-hidden">{utils.capitalizeFirst(props.name)}:</p>
                    <>
                        {IS_JSON_EDITOR && IS_VALID_JSON && <div className={'json-explore color-' + props.name}>
                        <ReactJson
                            src={JSON.parse(value)}
                            name={process.env.CONFIG_FILE_NAME}
                            theme={themeForJSONViewer}
                            iconStyle="circle"
                            collapsed={props.collapsed}
                            displayObjectSize
                            displayDataTypes
                            collapseStringsAfterLength={100}
                            enableClipboard={false && IS_EDIT}
                            onEdit={IS_EDIT && editResultValueJSonViewer}
                        />
                        </div>}
                        {!IS_JSON_EDITOR && IS_VALID_JSON && <div className={'json-edit color-' + props.name}>


                        <AceEditor
    mode="json"
    theme="github"
    // onChange={onChange}
    name="UNIQUE_ID_OF_DIV"
    editorProps={{ $blockScrolling: true }}
    value = {value}
    onChange = {onEditorChange}
    width="100%"
    height="500px"
    showGutter
    highlightActiveLine

  />
                        </div>}
                        </>
                        {!IS_VALID_JSON && <JSONNotValidMessage />}

                </Content>
            </Card.Content>
            <Card.Footer className="is-hidden">
                <Content className="is-full-width has-text-right">
                <Level className="result-description is-hiddenn">
                <Level.Side align="left">
                {/* <span className="with-ellipsis">{editorValue.substring(0, 35)}{editorValue.length > 35 ? '...': ''}</span> */}
                <span className="with-ellipsis subtitle is-7 has-text-grey"><b className="has-text-grey">Description: </b>{props.description}{props.description.length > 35 ? '...': ''}</span>
                </Level.Side>
                <Level.Side align="right">
                <strong className="is-hidden">{utils.capitalizeFirst(props.name)}: </strong>
                {/* <span className="with-ellipsis">{editorValue.substring(0, 35)}{editorValue.length > 35 ? '...': ''}</span> */}
                <span className="with-ellipsis subtitle is-7 has-text-grey is-hidden">{props.description}{props.description.length > 35 ? '...': ''}</span>
                </Level.Side>
                </Level>
                </Content>

            </Card.Footer>
        </Card>
    );
}