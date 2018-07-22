import React, { Component } from 'react';
import NavBar from './NavBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {browserHistory} from 'react-router';
import { Link } from 'react-router';
import '../style/form.css';
import axios from 'axios';

class Register extends Component {

  constructor(props){
    super(props);
    this.state={
      first_name:'',
      last_name:'',
      email:'',
      password:''
    }
  }

  handleClick() {
    browserHistory.push("/student");
  }
  
  render() {

    const { RaisedButtonStyle, ContainerStyle } = styles;

    return (
      <div>
        <MuiThemeProvider>
          <div>
            <NavBar />

             <div style={{ margin: 20 }}>
              <Breadcrumb>
                <BreadcrumbItem><Link to={`/`}>Home</Link></BreadcrumbItem>
                <BreadcrumbItem active>Register</BreadcrumbItem>
              </Breadcrumb>
            </div>

            <div className="container">
              <div className="row">
                <div className="col-md-6 col-md-offset-3">
                  <div class="form-style-8">
                    <h2>Register for new account</h2>
                    <form>
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
              </div>
            </div>
            </div>
          </MuiThemeProvider>
      </div>
    );
  }
}

const styles = {
  RaisedButtonStyle: {
    margin: 15
  },
  ContainerStyle: {
    margin: 45
  }
};

export default Register;