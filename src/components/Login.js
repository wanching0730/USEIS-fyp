import NavBar from './NavBar';
import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loginUser, getFcmToken } from '../actions/auth-action';

import '../style/form.css';

class Login extends Component {

  constructor(props){
    super(props);
    this.state={
      name:'',
      password:''
    }

    setTimeout(() => {
      this.props.onGetFcmToken();
    }, 3000);

    this.login = this.login.bind(this);
  }

  login(event) {
    let data = this.state;
    console.log("data content: " + JSON.stringify(data));
    this.props.onLoginUser(data);
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

            <div className="container">
              <div className="row">
                <div className="col-md-6 col-md-offset-3">
                  <div className="form-style-8">
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
                      <RaisedButton label="Submit" id="button2" primary={true} style={RaisedButtonStyle} onClick={(event) => this.login(event)}/>
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

const mapStateToProps = (state, props) => {
  console.log(JSON.stringify(state));
  return {
    userName: state.auth.userName,
    userPosition: state.auth.userPosition,
    token: state.auth.token,
    fcmToken: state.auth.fcmToken
  };
};

const mapActionsToProps = (dispatch, props) => {
  return bindActionCreators({
    onLoginUser: loginUser,
    onGetFcmToken: getFcmToken
  }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(Login);