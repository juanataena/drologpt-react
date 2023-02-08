import React, { useEffect } from 'react';

import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';

import OpenAIParameters from 'components/OpenAIParameters';
import Conversations from 'components/Conversations';
import BotsSelector from 'components/BotsSelector';

export default function Drawer (props) {


    const [state, setState] = React.useState({
        top: false,
        left: true,
        bottom: false,
        right: true,
      });
      const toggleDrawer = (anchor, open) => (event) => {
        if (
          event &&
          event.type === 'keydown' &&
          (event.key === 'Tab' || event.key === 'Shift')
        ) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };
    // EFECTS
    // Add ENTER key listener (first time)
    useEffect(() => {
    
   
    }, [props.prompt]);
    const list = (anchor) => (
        <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        {anchor === 'left' ? renderConversations() : renderOpenAIParameters()}

    </Box>
    );
    function renderConversations(){
        return <Conversations {...props} />
    }
    function renderOpenAIParameters(){
        return (<>
            <BotsSelector {...props} />
            <OpenAIParameters  {...props} />

        </>
        
        )
    }
    // RENDERS
    /**
     * Render prompt
     * @returns {JSX}
     * */
    const renderDrawer = () => {
        return (    <div>
            {['left', 'right'].map((anchor) => (
              <React.Fragment key={anchor}>
                <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                <SwipeableDrawer
                  
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                  onOpen={toggleDrawer(anchor, true)}
                  variant="permanent"
                >
                  {list(anchor)}
                </SwipeableDrawer>
              </React.Fragment>
            ))}
          </div>
        );
    }
   




    // Render
    return (
        <>
            {renderDrawer()}
        </>
        
    );
}
    
