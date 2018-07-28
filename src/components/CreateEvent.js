import React, { Component } from 'react';
import NavBar from './NavBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory} from 'react-router';
import { Link } from 'react-router';
import '../style/form.css';

class CreateProfile extends Component {

  constructor(props){
    super(props);

    this.state = {
      society_name:'',
      society_desc:'',
    }
    
    if(this.props.params.eventId != null) {
      console.log(this.props.params.eventId);
      // fetch(`http://localhost:5000/puppies/` + this.props.params.societyId).then(result => result.json()).then(reply => {
      //   this.setState ({
      //     society_name: reply[0][1],
      //     society_desc: reply[0][2]
      //   });
      // });
    }
  }

  handleClick(event) {
    browserHistory.push("/societyEvents");
  }

  render() {

    const { RaisedButtonStyle, ContainerStyle } = styles;

    var header;
    var activeBreadCrumb;

    if(this.props.params.eventId == null) {
        header = <h1>Create Society Event<span>Create a new event for your society and start to promote it!</span></h1>
        activeBreadCrumb = <BreadcrumbItem active>Create Event</BreadcrumbItem>
    } else {
      header = <h1>Edit Society Event<span>Edit your event details and make it better!</span></h1>
      activeBreadCrumb = <BreadcrumbItem active>Edit Event</BreadcrumbItem>
    }

    return (
      <div>
        <MuiThemeProvider>
          <div>
            <NavBar />

            <div style={{ margin: 20 }}>
                <Breadcrumb>
                  <BreadcrumbItem><Link to={`/`}>Home</Link></BreadcrumbItem>
                  <BreadcrumbItem><Link to={`/society`}>Societies</Link></BreadcrumbItem>
                  <BreadcrumbItem><Link to={`/perSociety/1`}>IT Society</Link></BreadcrumbItem>
                  { activeBreadCrumb }
                </Breadcrumb>
            </div>

            <div className="container" style={ContainerStyle}>
              <div className="form-style-10">
                { header }
                <form>
                    <div class="section"><span>1</span>Name &amp; Category &amp; Description</div>
                    <div class="inner-wrap">
                        <label>Event Name</label>  
                        {/* <TextField onChange = {(event,newValue) => {this.setState({first_name:newValue})}} /> */}
                        <input type="text" onChange={(event) => {
                          this.setState({first_name:event.target.value});
                          console.log("state value: " + this.state.first_name);
                          }}/>
                        <br/>
                        <label>Event Category (Eg: Technology)</label>
                        <input type="text" onChange={(event) => {this.setState({first_name:event.target.value})}}/>
                        <br/>
                        <label>Event Description</label>
                        <textarea name="field2"></textarea>
                    </div>

                    <div class="section"><span>2</span>Date &amp; Time &amp; Venue</div>
                    <div class="inner-wrap">
                      <label>Event Date</label>
                      <input type="text" onChange={(event) => {this.setState({first_name:event.target.value})}}/>
                      <br/>
                      <label>Event Time</label> 
                      <input type="text" onChange={(event) => {this.setState({first_name:event.target.value})}}/>
                      <br/>
                      <label>Event Venue</label> 
                      <input type="text" onChange={(event) => {this.setState({first_name:event.target.value})}}/>
                    </div>

                    <div class="section"><span>3</span>Fee</div>
                        <div class="inner-wrap">
                        <label>Event Fee</label>
                        <input type="text" onChange={(event) => {this.setState({first_name:event.target.value})}}/>
                    </div>

                    <div class="section"><span>2</span>Chairperson &amp; Contact Number</div>
                    <div class="inner-wrap">
                      <label>Organizing Chairperson</label>
                      <input type="text" onChange={(event) => {this.setState({first_name:event.target.value})}}/>
                      <br/>
                      <label>Contact Number</label> 
                      <input type="text" onChange={(event) => {this.setState({first_name:event.target.value})}}/>
                      <br/>
                    </div>

                    <div class="button-section">
                    <RaisedButton label="Submit" id="button2" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleClick(event)}/>
                    {/* <input type="submit" name="Sign Up" onClick="handleClick()" /> */}
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
    margin: 45
  }
};

export default CreateProfile;