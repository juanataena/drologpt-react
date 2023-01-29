import React from "react";
import GlobalNotification from 'components/layout/notifications/global/index.js';

export class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = {error: null, errorInfo: null};
    }
  
    componentDidCatch(error, errorInfo) {
        console.log('Oh no!!', error.info);
      this.setState({error: `${error}: ${error.info}`});
    }
  
    render() {
      const {errorInfo} = this.state;
      if (errorInfo) {
        console.log('error', errorInfo);
        return (
            <GlobalNotification title="ehh rrroorrrr" description={errorInfo}/>
        );
      } else {
        return <>{this.props.children}</>;
      }
    }
  }