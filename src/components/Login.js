import NavBar from './NavBar';
import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {browserHistory} from 'react-router';
import { Link } from 'react-router';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import '../style/form.css';

class Login extends Component {

  constructor(props){
    super(props);
    this.state={
    username:'',
    password:''
    }
   }

   handleClick(event) {
     browserHistory.push("/student");
   }

  render() {
    
    const { RaisedButtonStyle } = styles;

    return (
      <div>
        <MuiThemeProvider>
          <div>
            <NavBar />

            <div style={{ margin: 20 }}>
              <Breadcrumb>
              <BreadcrumbItem><Link to={`/`}>Home</Link></BreadcrumbItem>
                <BreadcrumbItem active>Login</BreadcrumbItem>
              </Breadcrumb>
            </div>

            <div className="container">
              <div className="row">
                <div className="col-md-6 col-md-offset-3">
                  <div class="form-style-8">
                    <h2>Login to your account</h2>
                    <form>
                      <TextField
                        hintText="Enter your Username"
                        floatingLabelText="Username"
                        onChange = {(event,newValue) => this.setState({username:newValue})}
                        />
                      <br/>
                      <TextField
                        type="password"
                        hintText="Enter your Password"
                        floatingLabelText="Password"
                        onChange = {(event,newValue) => this.setState({password:newValue})}
                        />
                      <br/>
                      <RaisedButton label="Submit" id="button2" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleClick(event)}/>
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
        margin: 15,
    }
};

export default Login;