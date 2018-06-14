import React, {Component} from 'react';
import NavBar from './NavBar';
import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class PerSociety extends Component {

    constructor(props) {
        super(props);
    }

    handleClick(event) {
        browserHistory.push("/register_event");
      }

    render() {

        const { RaisedButtonStyle } = styles;

        return (
            <div>
                <NavBar />
                <div>
                    <MuiThemeProvider>
                        <h1>{this.props.params.societyId}</h1>
                        <h2>IT Society</h2>
                        <p>Description: It is a very active Society</p>
                        <p>Category: Technology</p>
                        <h3>Events</h3>
                        <p>1. Workshop</p>
                        <p>2. Talk</p>
                        <RaisedButton label="Join Event" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleClick(event)}/>
                    </MuiThemeProvider>
                </div>
            </div>
        );
    };
}

const styles = {
    RaisedButtonStyle: {
        margin: 15
    }
}

export default PerSociety;
