import React from "react";

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
        return <>Error: {errorInfo}</>;
      } else {
        return <>{this.props.children}</>;
      }
    }
  }