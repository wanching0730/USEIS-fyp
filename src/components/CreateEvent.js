import React, { Component } from 'react';
import NavBar from './NavBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory} from 'react-router';
import { Link } from 'react-router';
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../style/form.css';

class CreateProfile extends Component {

  constructor(props){
    super(props);

    this.state = {
      society_name:'',
      society_desc:'',
      startDate: moment(),
      endDate: moment(),
      eventCategory: 'dance',
      softskillCategory: 'communication'
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

    this.handleStart = this.handleStart.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.handleEventCategory = this.handleEventCategory.bind(this);
    this.handleSoftskilltCategory = this.handleSoftskilltCategory.bind(this);
  }

  handleClick(event) {
    console.log("start date: " + moment(this.state.startDate).format("hh:mm a"));
    console.log("end date: " + moment(this.state.endDate).format("DD MMM YYYY hh:mm a"));
    console.log("event category: " + this.state.eventCategory);
    console.log("softskill category: " + this.state.softskillCategory);
    browserHistory.push("/societyEvents");
  }

  handleStart(date) {
    this.setState({
      startDate: date
    });
  }

  handleEnd(date) {
    this.setState({
      endDate: date
    });
  }

  handleEventCategory(event) {
    this.setState({eventCategory: event.target.value});
  }

  handleSoftskilltCategory(event) {
    this.setState({softskillCategory: event.target.value});
  }

  mapItem(item) {
    return <option value={item.value}>{item.name}</option>;
  }

  render() {

    const { RaisedButtonStyle, ContainerStyle } = styles;

    const eventCategories = [{value:'dance', name:'Dance'}, {value:'design', name:'Design'}, {value:'education', name:'Education'},
    {value:'entertainment', name:'Entertainment'}, {value:'music', name:'Music'}, {value:'softskill', name:'Soft Skill'}, 
    {value:'sport', name:'Sport'}, {value:'technology', name:'Technology'}];

    const softSkillCategories = [{value:'communication', name:'Communication & Language Skills'}, {value:'criticalThinking', name:'Critical Thinking & Problem Solving'}, {value:'digitalLiteracy', name:'Digital Literacy'},
    {value:'eq', name:'Emotional Intelligence & Teamwork Skills'}, {value:'entrepreneur', name:'Entrepreneurship Skills'}, {value:'leadership', name:'Leadership Skills'},
    {value:'lifelong', name:'Lifelong Learning & Information Management'}, {value:'moral', name:'Moral & Professional Ethics'}];

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
                        <select value={this.state.eventCategory} onChange={this.handleEventCategory}>
                          {eventCategories.map(this.mapItem)}
                        </select>
                        {/* <input type="text" onChange={(event) => {this.setState({first_name:event.target.value})}}/> */}
                        <br/>
                        <label>Event Description</label>
                        <textarea name="field2"></textarea>
                    </div>

                    <div class="section"><span>2</span>Date &amp; Time &amp; Venue</div>
                    <div class="inner-wrap">
                      <label>Event Start Date &amp; Time </label>
                      <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleStart.bind(this)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="LLL"
                        timeCaption="time"
                      />
                      {/* <input type="text" onChange={(event) => {this.setState({first_name:event.target.value})}}/> */}
                      <br/>
                      <label>Event End Date &amp; Time </label>
                      <DatePicker
                        selected={this.state.endDate}
                        onChange={this.handleEnd.bind(this)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="LLL"
                        timeCaption="time"
                      />
                      {/* <label>Event Time</label> 
                      <input type="text" onChange={(event) => {this.setState({first_name:event.target.value})}}/> */}
                      <br/>
                      <label>Event Venue</label> 
                      <input type="text" onChange={(event) => {this.setState({first_name:event.target.value})}}/>
                    </div>

                    <div class="section"><span>3</span>Fee</div>
                        <div class="inner-wrap">
                        <label>Event Fee</label>
                        <input type="text" onChange={(event) => {this.setState({first_name:event.target.value})}}/>
                    </div>

                    <div class="section"><span>4</span>Chairperson &amp; Contact Number</div>
                    <div class="inner-wrap">
                      <label>Organizing Chairperson</label>
                      <input type="text" onChange={(event) => {this.setState({first_name:event.target.value})}}/>
                      <br/>
                      <label>Contact Number</label> 
                      <input type="text" onChange={(event) => {this.setState({first_name:event.target.value})}}/>
                      <br/>
                    </div>

                    <div class="section"><span>5</span>Soft Skill Points &amp; Category</div>
                    <div class="inner-wrap">
                      <label>Soft Skill Points</label>
                      <input type="text" onChange={(event) => {this.setState({first_name:event.target.value})}}/>
                      <br/>
                      <label>Soft Skill Category</label> 
                      <select value={this.state.softskillCategory} onChange={this.handleSoftskilltCategory}>
                        {softSkillCategories.map(this.mapItem)}
                      </select>
                      <br/>
                    </div>

                    <div class="button-section">
                      <RaisedButton label="Submit" id="button2" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleClick(event)}/>
                      <RaisedButton label="Back" primary={true} style={RaisedButtonStyle} onClick={(event) => window.history.back()}/>
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