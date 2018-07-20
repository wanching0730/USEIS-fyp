import React, { Component } from 'react';
import NavBar from './NavBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
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

            <div style={{ margin: 20 }}>
              <Breadcrumb>
                <BreadcrumbItem><a href="#">Home</a></BreadcrumbItem>
                <BreadcrumbItem active>Society Profile</BreadcrumbItem>
              </Breadcrumb>
            </div>

            <div className="container" style={ContainerStyle}>
              <div className="form-style-10">
                <h1>Create Society Profile<span>Create your own society profile and start to promote it!</span></h1>
                <form>
                    <div class="section"><span>1</span>Name &amp; Category</div>
                    <div class="inner-wrap">
                        <label>Society Name</label>  
                        {/* <TextField onChange = {(event,newValue) => {this.setState({first_name:newValue})}} /> */}
                        <input type="text" onChange={(event) => {
                          this.setState({first_name:event.target.value});
                          console.log("state value: " + this.state.first_name);
                          }}/>
                        <label>Society Category <textarea name="field2"></textarea></label>
                    </div>

                    <div class="section"><span>2</span>Vision &amp; Mision</div>
                    <div class="inner-wrap">
                      <label>Society Vision</label>
                      <input type="text" onChange={(event) => {this.setState({first_name:event.target.value})}}/>
                      <label>Society Mision</label> 
                      <input type="text" onChange={(event) => {this.setState({first_name:event.target.value})}}/>
                    </div>

                    <div class="section"><span>3</span>Description</div>
                        <div class="inner-wrap">
                        <label>Society Description</label>
                        <textarea id="txtArea" rows="5" cols="10"></textarea>
                    </div>
                    <div class="button-section">
                    <input type="submit" name="Sign Up" />
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
    margin: 15
  },
  ContainerStyle: {
    margin: 60
  }
};

export default CreateProfile;