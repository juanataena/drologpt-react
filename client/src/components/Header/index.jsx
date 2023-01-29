import React, { useEffect } from 'react';
import Fab from '@mui/material/Fab';
import DeleteIcon from '@mui/icons-material/DeleteSweep';

export default function Prompt (props) {


    /**
     * @returns {JSX}
     * */
    const actionButtonBar = () => {
        return (
        <div className="action-button-bar">
            <Fab color="warning" aria-label="delete" onClick={props.handleDeleteStripes}>
                <DeleteIcon />
            </Fab>
       </div>

        );
    }

    // Render
    return (
        <div className="drologpt-header">
            {actionButtonBar()}
        </div>
        
    );
}
    
