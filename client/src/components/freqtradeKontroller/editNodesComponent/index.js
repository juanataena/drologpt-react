import React from 'react';
import JWTResultValue from 'components/freqtradeKontroller/resultValue';

export default function EditNodesComponent (props) {

    /*                             */
    /*                             */
    /*  -------------------------  */
    /*      4. ⚙️ Renderers         */
    /*  -------------------------  */

    const renderJsonViewer = () => {

        // const nodesTree = props.nodesTree;
        // const machineName = props.machineName;
        // debugger;
        // const selectedNode = nodesTree.find(n => n.name === selected);
        return (
            <JWTResultValue
            name="jsonConfig"
            operation={false}
            description="Json config file"
            value={JSON.stringify(props.jsonConfig || {}, null, 4)}
            editResultValue={props.setJsonConfig}                  
            theme={props.theme}
            collapsed={1}
        />
        );
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
    // const themeClass = props.theme === 'dark' ? 'is-dark' : 'is-light';        
    
    return (
            <>
                {IS_VALID_JSON && <div className={'json-explore color-' + props.name}>
                    <article className="clean-article  is-bordered-1">
                        <div className="content">
                            {true && renderJsonViewer()}
                    </div>
                    </article> 
                </div>}
            </>
    );
}
