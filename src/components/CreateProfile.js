import React, { Component } from 'react';
import NavBar from './NavBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import ToggleButton from 'react-toggle-button';
import ReactNotifications from 'react-browser-notifications';

class CreateProfile extends Component {

  constructor(props){
    super(props);
    this.state={
      society_name:'',
      society_desc:'',
    }

    console.log("societyid: " + this.props.params.societyId);
  }

  handleClick(event) {
     console.log(this.state.society_name);
     console.log(this.state.society_desc);
    }

  render() {

    const { RaisedButtonStyle } = styles;

    return (
      <div>
        <MuiThemeProvider>
          <div>
            <NavBar />
            <TextField
              hintText="Enter Society Name"
              floatingLabelText="Name"
              value={this.state.society_name}
              onChange = {(event,newValue) => this.setState({society_name:newValue})}
              />
            <br/>
            <TextField
              hintText="Enter Society Description"
              floatingLabelText="Description"
              value={this.state.society_desc}
              onChange = {(event,newValue) => this.setState({society_desc:newValue})}
              />
            <br/>
            <RaisedButton label="Submit" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleClick(event)}/>
            </div>
          </MuiThemeProvider>
      </div>
    );
    }
}

const styles = {
  RaisedButtonStyle: {
    margin: 15
  }
};

export default CreateProfile;