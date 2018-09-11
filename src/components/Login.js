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
    name:'',
    password:''
    }
   }

  verify_user() {
    const data = Object.keys(this.state).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(this.state[key]);
    }).join('&');

    fetch(`http://localhost:5000/api/get_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: data
    }).then(result => result.json()).then(reply => {
      //localStorage.setItem('token', token);
      console.log("token: " + reply);
      console.log("token in local storage: " + localStorage.getItem('token'));
    });
  }

  handleClick(event) {
    this.verify_user();
    browserHistory.push("/student");
  }

  componentDidMount() {
    window.scrollTo(0, 0);
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
                        onChange = {(event) => this.setState({name:event.target.value})}
                        />
                      <br/>
                      <TextField
                        type="password"
                        hintText="Enter your Password"
                        floatingLabelText="Password"
                        onChange = {(event) => this.setState({password:event.target.value})}
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