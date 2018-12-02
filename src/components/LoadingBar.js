import React, { Component } from 'react';
import Loader from 'react-loader-spinner';

class LoadingBar extends Component {

    render() {
        const { loadingBarStyle } = styles;

        return (
            <div style={loadingBarStyle}>
                <Loader 
                    type="TailSpin"
                    color="#00BFFF"
                    height="70"	
                    width="70"
                    z-index="999"
                />  
            </div>
        );
    }
}

const styles = {
    loadingBarStyle: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    }
}

export default LoadingBar;