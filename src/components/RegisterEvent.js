import React, { Component } from 'react';
import NavBar from './NavBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import ToggleButton from 'react-toggle-button';
import NotificationModal from './NotificationModal';
import axios from 'axios';

class RegisterEvent extends Component {

  constructor(props){
    super(props);
    this.state={
      first_name:'',
      last_name:'',
      email:'',
      password:'',
      value: false,
      showModal: false
    }
  }

  displayText() {
      if(this.state.value) {
          console.log("true")
      } else {
          console.log("false")
      }
  }

  handleClick(event) {
      this.displayText()
  }

  renderModal(event) {
      if(this.state.showModal) {
          return <NotificationModal />;
      } else {
          return <p>hello</p>;
      }
    
    
  }
  
  render() {

    const { RaisedButtonStyle } = styles;

    return (
      <div>
        <MuiThemeProvider>
          <div>
            <NavBar />
            <TextField
              hintText="Enter your First Name"
              floatingLabelText="First Name"
              onChange = {(event,newValue) => this.setState({first_name:newValue})}
              />
            <br/>
            <TextField
              hintText="Enter your Last Name"
              floatingLabelText="Last Name"
              onChange = {(event,newValue) => this.setState({last_name:newValue})}
              />
            <br/>
            <TextField
              hintText="Enter your Email"
              type="email"
              floatingLabelText="Email"
              onChange = {(event,newValue) => this.setState({email:newValue})}
              />
            <br/>
            <TextField
              type = "password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange = {(event,newValue) => this.setState({password:newValue})}
              />
            <br/>
            <p>Allow Notification</p>
            <ToggleButton
                value={ this.state.value || false }
                onToggle={(value) => {
                    this.setState({
                    value: !value,
                    })
                }} />
            <br/>
            <RaisedButton label="Allow Noti" primary={true} style={RaisedButtonStyle} onClick={() => this.setState({showModal: this.state.value})} />
            <br/>
            <div>
            {this.renderModal()}
            </div>

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

export default RegisterEvent;