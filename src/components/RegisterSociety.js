import React, { Component } from 'react';
import NavBar from './NavBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {browserHistory} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
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
    browserHistory.push("/perSociety/1");
  }
  
  render() {

    const { RaisedButtonStyle, ContainerStyle, FormStyle } = styles;

    return (
      <div>
        <MuiThemeProvider>
          <div>
            <NavBar />

            <div style={{ margin: 20 }}>
                <Breadcrumb>
                  <BreadcrumbItem><Link to={`/`}>Home</Link></BreadcrumbItem>
                  <BreadcrumbItem><a href="#">Societies</a></BreadcrumbItem>
                  <BreadcrumbItem><a href="#">IT Society</a></BreadcrumbItem>
                  <BreadcrumbItem active>Registration</BreadcrumbItem>
                </Breadcrumb>
            </div>

            <div className="container" style={ContainerStyle}>
              <div className="form-style-10">
                <h1>Register IT Society<span>Register society and looking forward for the upcoming events!</span></h1>
                <form>
                    <div class="section"><span>1</span>Name &amp; IC</div>
                    <div class="inner-wrap">
                        <label>Full Name</label>  
                        {/* <TextField onChange = {(event,newValue) => {this.setState({first_name:newValue})}} /> */}
                        <input type="text" onChange={(event) => {
                          this.setState({first_name:event.target.value});
                          console.log("state value: " + this.state.first_name);
                          }}/>
                        <br/>
                        <label>IC Number (Eg: 998877-66-5555)</label>
                        <input type="text" onChange={(event) => {this.setState({first_name:event.target.value})}}/>
                    </div>

                    <div class="section"><span>2</span>Course &amp; Year</div>
                    <div class="inner-wrap">
                      <label>Course (Eg: Software Engineering)</label>
                      <input type="text" onChange={(event) => {this.setState({first_name:event.target.value})}}/>
                      <br/>
                      <label>Year and Semester (Eg: Y1S1)</label> 
                      <input type="text" onChange={(event) => {this.setState({first_name:event.target.value})}}/>
                    </div>

                    <div class="section"><span>3</span>Contact Number &amp; Email</div>
                    <div class="inner-wrap">
                      <label>Contact Number</label>
                      <input type="text" onChange={(event) => {this.setState({first_name:event.target.value})}}/>
                      <br/>
                      <label>Email Address (Eg: abc@hotmail.com)</label> 
                      <RaisedButton label="Submit" id="button2" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleClick(event)}/>
                      {/* <input type="text" onChange={(event) => {this.setState({first_name:event.target.value})}}/> */}
                    </div>
                </form>
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
    margin: 15,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  ContainerStyle: {
    margin: 45
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