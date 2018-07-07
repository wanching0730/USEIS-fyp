import React, { Component } from 'react';
import NavBar from './NavBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import '../style/form.css';
import ToggleButton from 'react-toggle-button';
import ReactNotifications from 'react-browser-notifications';

class CreateProfile extends Component {

  constructor(props){
    super(props);

    this.state = {
      society_name:'',
      society_desc:'',
    }
    
    if(this.props.params.societyId != null) {
      fetch(`http://localhost:5000/puppies/` + this.props.params.societyId).then(result => result.json()).then(reply => {
        this.setState ({
          society_name: reply[0][1],
          society_desc: reply[0][2]
        });
      });
    }
  }

  handleClick(event) {
     console.log(this.state.society_name);
     console.log(this.state.society_desc);
    }

  render() {

    const { RaisedButtonStyle, ContainerStyle } = styles;

    return (
      <div>
        <MuiThemeProvider>
          <div>
            <NavBar />
            <div className="container" style={ContainerStyle}>
            <form>
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
    margin: 15
  },
  ContainerStyle: {
    margin: 60
  }
};

export default CreateProfile;