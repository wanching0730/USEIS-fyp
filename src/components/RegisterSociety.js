import React, { Component } from 'react';
import NavBar from './NavBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import '../style/form.css';
import ToggleButton from 'react-toggle-button';
import ReactNotifications from 'react-browser-notifications';

class RegisterSociety extends Component {

  constructor(props){
    super(props);
    this.state={
      first_name:'',
      last_name:'',
      email:'',
      password:''
    }
  }

  handleClick(event) {
     
    }
  
  render() {

    const { RaisedButtonStyle, ContainerStyle, FormStyle } = styles;

    return (
      <div>
        <MuiThemeProvider>
          <div>
            <NavBar />
            <div className="container" style={ContainerStyle}>
            <form style={FormStyle}>
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
            <RaisedButton label="Submit" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleClick(event)}/>
            </form>
            </div>
            </div>
          </MuiThemeProvider>
      </div>
    );
    }
}

const styles = {
  RaisedButtonStyle: {
    margin: 15,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  ContainerStyle: {
    margin: 60
  }, 
  FormStyle: {
    borderWidth: "3px",
    borderStyle: "solid",
    borderColor: "#666",
    padding: "15px",
    backgroundColor: "#ebeef4"
  }
};

export default RegisterSociety;