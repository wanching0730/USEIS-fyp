import NavBar from './NavBar';
import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { confirmAlert } from 'react-confirm-alert';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from "amazon-cognito-identity-js";
import '../style/form.css';
import '../style/spinner.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loginUser, updateAuthLoadingBar } from '../actions/auth-action';

class Login extends Component {

  constructor(props){
    super(props);
    this.state={
      name:'',
      password:''
    }

    this.login = this.login.bind(this);
  }

  login(event) {
    const { name, password } = this.state;

    if(name == '' || password == '' ) {
      confirmAlert({
        title: 'Warning',
        message: 'Please fill in all empty fields before proceed',
        buttons: [
            {
                label: 'Close'
            }
        ]
      })
      return false;
    } else {
      var poolData = {
          UserPoolId : 'ap-southeast-1_4dPeZiFVv', 
          ClientId : '1nts071hctdk3kvt7kt6h6pjf' 
      };
      var userPool = new CognitoUserPool(poolData);
      var userData = {
          Username : this.state.name, 
          Pool : userPool
      };

      var authenticationData = {
        Username : this.state.name, 
        Password : this.state.password 
    };

      var authenticationDetails = new AuthenticationDetails(authenticationData);
      
      var cognitoUser = new CognitoUser(userData);
      cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: function (result) {
              //var accessToken = result.getAccessToken().getJwtToken();
              const refreshToken = result.getRefreshToken().getToken();
              //console.log(JSON.stringify(refreshToken));
              console.log(userPool.getCurrentUser());
              localStorage.setItem('currentUser', userPool.getCurrentUser());
          },
    
          onFailure: function(err) {
              console.log(err);
          },
          mfaRequired: function(codeDeliveryDetails) {
              var verificationCode = prompt('Please input verification code' ,'');
              cognitoUser.sendMFACode(verificationCode, this);
          },

          newPasswordRequired: function(userAttributes, requiredAttributes) {
            console.log("called");
            // User was signed up by an admin and must provide new 
            // password and required attributes, if any, to complete 
            // authentication.

            // userAttributes: object, which is the user's current profile. It will list all attributes that are associated with the user. 
            // Required attributes according to schema, which don’t have any values yet, will have blank values.
            // requiredAttributes: list of attributes that must be set by the user along with new password to complete the sign-in.

            
            // Get these details and call 
            // newPassword: password that user has given
            // attributesData: object with key as attribute name and value that the user has given.
            cognitoUser.completeNewPasswordChallenge(authenticationData.Password, {name: "abc"}, this)
          }
        });
      
      this.props.onUpdateAuthLoadingBar();
      console.log(cognitoUser.username);
      console.log(userPool.getCurrentUser);
      this.props.onLoginUser({username: cognitoUser.username, userPool: userPool});
      }
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

             {this.props.loading ?
                [
                  <div class="spinner">
                    <div class="bounce1"></div>
                    <div class="bounce2"></div>
                    <div class="bounce3"></div>
                  </div>
                ]
                :
                [
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
                ]}
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

const mapStateToProps = (state) => {
  return {
    userName: state.auth.userName,
    userPosition: state.auth.userPosition,
    token: state.auth.token,
    loading: state.auth.loading
  };
};

const mapActionsToProps = (dispatch) => {
  return bindActionCreators({
    onLoginUser: loginUser,
    onUpdateAuthLoadingBar: updateAuthLoadingBar
  }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(Login);