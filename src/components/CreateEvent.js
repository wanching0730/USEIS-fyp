import React, { Component } from 'react';
import NavBar from './NavBar';
import LoadingBar from './LoadingBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { RaisedButton, Checkbox } from 'material-ui';
import { Link } from 'react-router';
import moment from "moment";
import DatePicker from "react-datepicker";
import { confirmAlert } from 'react-confirm-alert';
import "react-datepicker/dist/react-datepicker.css";
import '../style/form.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { create, update, updatePostLoadingBar } from '../actions/post-action';
import { retrieveAll, updateLoadingBar } from '../actions/data-action';

class CreateEvent extends Component {

  constructor(props){
    super(props);

    this.state = {
      name:'',
      startDate: '',
      endDate: '',
      desc: '',
      venue: '',
      organiserId: '',
      organiserName: '',
      category: 'Dance',
      ssCategory: 'Communication & Language Skills',
      ssPoint: 0,
      fee: 0,
      chairperson: '',
      contact: '',
      logoUrl: '',
      totalParticipant: 0,
      totalCrew: 0,
      selectedStartDate: moment(),
      selectedEndDate: moment(),
      position: 'Chairperson,Vice Chairperson,',
      userId: this.props.userId,
      positionOptions: [],
      position1: 2, position2: 3, position3: 0,
      selectedFile: null,
      selectedFileName: ''
    }

    this.props.onRetrieveAll("eventRole");

    this.handleClick = this.handleClick.bind(this);
    //this.handleChange = this.handleChange.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.handleSelectedFile = this.handleSelectedFile.bind(this);
    this.handleEventCategory = this.handleEventCategory.bind(this);
    this.handleSoftskilltCategory = this.handleSoftskilltCategory.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.setOrganiserId();

    // wait after 2 seconds just set state
    if(this.props.event != null && this.props.params.type == "event") {
      let event = this.props.event;
      this.setState({
        name: event["name"],
        organiserId: event["organiserId"],
        organiserName: event["organiserName"],
        desc: event["desc"], 
        venue: event["venue"],
        category: event["category"],
        fee: event["fee"],
        ssCategory: event["ssCategory"],
        ssPoint: event["ssPoint"],
        chairperson: event["chairperson"], 
        contact: event["contact"],
        logoUrl: event["logoUrl"],
        totalParticipant: event["totalParticipant"],
        totalCrew: event["totalCrew"],
        boothId: event["boothId"],
        selectedStartDate: event["startDate"] == "0000-00-00 00:00:00" ? moment() : moment(event["startDate"]),
        selectedEndDate: event["endDate"] == "0000-00-00 00:00:00" ? moment() : moment(event["endDate"])
      });

      if(event["roles"].length > 0) {
        let authorizedPositions = event["roles"];
        if(authorizedPositions[0] != null)
          this.setState({ position1: authorizedPositions[0]["eRoleId"]});
        if(authorizedPositions[1] != null)
          this.setState({ position2: authorizedPositions[1]["eRoleId"]});
        if(authorizedPositions[2] != null)
          this.setState({ position3: authorizedPositions[2]["eRoleId"]});
      }
    }
  }

  componentWillReceiveProps(nextProps){
    if((nextProps.roles != this.props.roles) || (this.props.roles != null)) {
      var positionOptions = [];
      var positions = nextProps.roles;

      for(var i = 0; i < positions.length; i++) {
        if(positions[i] != null) {
          let position = positions[i];

          if(position["eRoleId"] == 1) {
            positionOptions.push({
              value: 0,
              name: "None"
            });
          } else {
            positionOptions.push({
              value: position["eRoleId"],
              name: position["roleName"]
            });
          }
        }
      }
      this.setState({positionOptions: positionOptions});
    }
  }

  setOrganiserId() {
    let p = this.props.params;
    if(p.type == "society") {
      this.setState({
        organiserId: p.id
      });
    }
  }

  handleSelectedFile (event) {
    this.setState({
      selectedFile: event.target.files[0],
      selectedFileName: event.target.files[0].name
    });
  }

  handleClick(event) {
    // console.log(typeof this.state.selectedStartDate == "string");
    // console.log(this.state.selectedStartDate);
    // console.log(moment());
    // console.log(this.state.selectedStartDate._d);
    // console.log(moment().format("YYYY-MM-DD HH:mm"));
    // console.log(moment(moment()._d).format("YYYY-MM-DD HH:mm"))
    const { name, desc, venue, chairperson, contact, logoUrl, selectedFileName, position1, position2, position3 } = this.state;
    
    if(name == '' || desc == '' || venue == '' ||  chairperson == '' || contact == '' || selectedFileName == '' || (position1 == 0 && position2 == 0 && position3 == 0)) {
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
      this.props.onUpdateLoadingBar();

      var bucketName = process.env.REACT_APP_S3_BUCKET_NAME;
      var bucketRegion = process.env.REACT_APP_S3_BUCKET_REGION;
      var IdentityPoolId = process.env.REACT_APP_AWS_IDENTITY_POOL_ID;
      var AWS = require('aws-sdk');
      var fileKey = encodeURIComponent(this.state.selectedFileName);
      var file = this.state.selectedFile;
      
      AWS.config.update({
        region: bucketRegion,
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: IdentityPoolId
        })
      });

      var s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        params: {Bucket: bucketName}
      });
      
      s3.upload({ Key: fileKey, Body: file, ACL: 'public-read'}, function(err, data) {
        if (err) {
          return alert('There was an error uploading your photo: ', err.message);
        }
      });

      var authorizedPositions = [];
      if(this.state.position1 != 0)
        authorizedPositions.push(this.state.position1);
      if(this.state.position2 != 0)
        authorizedPositions.push(this.state.position2);
      if(this.state.position3 != 0)
        authorizedPositions.push(this.state.position3);
      
      //let authorizedPositions = this.state.position1 + ',' + this.state.position2 + ',' + this.state.position3;
      //let eventId = this.props.params.id;
      let data = this.state
      let eventName = data["name"];
      data["authorizedPositions"] = authorizedPositions
      data["logoUrl"] = "https://" + bucketName + ".s3." + bucketRegion + ".amazonaws.com/" + selectedFileName;
      //data["selectedStartDate"] = typeof this.state.selectedStartDate != "string" ? "" + moment().format("YYYY-MM-DD HH:mm") : data["selectedStartDate"];

      // if(this.props.params.eventId)
      //   data["authorizedPositions"]= authorizedPositions == '' ? this.props.event["authorizedPosition"] : authorizedPositions;
      // else
      //   data["authorizedPositions"]= authorizedPositions == '' ? "Chairperson,Vice Chairperson" : authorizedPositions;

      if(this.props.params.type == "society")
        this.props.onCreate("event", data);
      else {
        if(data.startDate == '') {
          data.startDate = "" + moment(this.props.event["startDate"]).format("YYYY-MM-DD HH:mm");
        }
        if(data.endDate == '') {
          data.endDate = "" + moment(this.props.event["endDate"]).format("YYYY-MM-DD HH:mm");
        }
        this.props.onUpdate("event", this.props.params.id, eventName, data);
      }
    }
  }

  handleStart(date) {
    this.setState({
      selectedStartDate: date,
      startDate: "" + moment(date).format("YYYY-MM-DD HH:mm")
    }), function() {
      this.setState(this.state);
    };
  }

  handleEnd(date) {
    this.setState({
      selectedEndDate: date,
      endDate: "" + moment(date).format("YYYY-MM-DD HH:mm")
    });
  }

  handleEventCategory(event) {
    this.setState({category: event.target.value});
  }

  handleSoftskilltCategory(event) {
    this.setState({ssCategory: event.target.value});
  }

  mapItem(item) {
    return <option value={item.value}>{item.name}</option>;
  }

  render() {
    const { RaisedButtonStyle } = styles;

    const eventCategories = [{value:'Dance', name:'Dance'}, {value:'Design', name:'Design'}, {value:'Education', name:'Education'},
    {value:'Entertainment', name:'Entertainment'}, {value:'Music', name:'Music'}, {value:'Soft Skill', name:'Soft Skill'}, 
    {value:'Sport', name:'Sport'}, {value:'Music', name:'Music'}];

    const softSkillCategories = [{value:'Communication & Language Skills', name:'Communication & Language Skills'}, {value:'Critical Thinking & Problem Solving', name:'Critical Thinking & Problem Solving'}, {value:'digitalLiteracy', name:'Digital Literacy'},
    {value:'Emotional Intelligence & Teamwork Skills', name:'Emotional Intelligence & Teamwork Skills'}, {value:'Entrepreneur Skills', name:'Entrepreneurship Skills'}, {value:'Leadership Skills', name:'Leadership Skills'},
    {value:'Lifelong Learning & Information Management', name:'Lifelong Learning & Information Management'}, {value:'Moral & Professional Ethics', name:'Moral & Professional Ethics'}];

    // const positionOptions = [{value:'Chairperson', name:'Chairperson'}, {value:'Vice Chairperson', name:'Vice Chairperson'}, {value:'Secretary', name:'Secretary'}, {value:'Vice Secretary', name:'Vice Secretary'},
    //   {value:'Treasurer', name:'Treasurer'}, {value:'Publicity', name:'Publicity'}, {value:'Logistics', name:'Logistics'}, {value:'Editorial', name:'Editorial'}]

    var header;
    var breadCrumb;

    if(this.props.params.type == "society") {
        header = <h1>Create Society Event<span>Create a new event for your society and start to promote it!</span></h1>
        breadCrumb = 
          <Breadcrumb>
            <BreadcrumbItem><Link to={`/home`}>Home</Link></BreadcrumbItem>
            <BreadcrumbItem><Link to={`/society`}>Societies</Link></BreadcrumbItem>
            <BreadcrumbItem><Link to={{pathname:`/perSociety/` + this.props.params.id, state: {societyName: this.props.location.state["societyName"]}}}>{this.props.location.state["societyName"]}</Link></BreadcrumbItem>
            <BreadcrumbItem active>Create Event</BreadcrumbItem>
          </Breadcrumb>
    } else {
      header = <h1>Edit Event<span>Edit your event details and make it better!</span></h1>
      breadCrumb = 
          <Breadcrumb>
            <BreadcrumbItem><Link to={`/home`}>Home</Link></BreadcrumbItem>
            <BreadcrumbItem><Link to={`/event`}>Events</Link></BreadcrumbItem>
            <BreadcrumbItem><Link to={{pathname:`/perEvent/` + this.props.params.id, state: {eventName: this.props.location.state["eventName"]}}}>{this.props.location.state["eventName"]}</Link></BreadcrumbItem>
            <BreadcrumbItem active>Edit Event</BreadcrumbItem>
          </Breadcrumb>
    }

    return (
      <div>
        <MuiThemeProvider>
          <div>
            <NavBar />

            <div style={{ margin: 20 }}>
                {breadCrumb}
            </div>

            {this.props.loading || this.props.retrieveLoading || this.state.positionOptions.length == 0?
            [<LoadingBar />]
            :
            [
              <div className="container">
                <div className="form-style-10">
                  {header}
                  <form>
                      <div class="section"><span>1</span>Name &amp; Category &amp; Description</div>
                      <div class="inner-wrap">
                          <label>Event Name</label>  
                          <input type="text" value={this.state.name} ref="name" onChange={(event) => {
                            this.setState({name:event.target.value});
                            }}/>
                          <br/>
                          <label>Event Category (Eg: Technology)</label>
                          <select value={this.state.category} onChange={this.handleEventCategory}>
                            {eventCategories.map(this.mapItem)}
                          </select>
                          <br/>
                          <label>Event Description</label>
                          <textarea name="desc" value={this.state.desc} onChange={(event) => {
                            this.setState({desc: event.target.value});
                          }}></textarea>
                      </div>

                      <div class="section"><span>2</span>Date &amp; Time &amp; Venue</div>
                      <div class="inner-wrap">
                        <label>Event Start Date &amp; Time </label>
                        <DatePicker
                          selected={this.state.selectedStartDate}
                          onChange={this.handleStart.bind(this)}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={15}
                          dateFormat="YYYY-MM-DD HH:mm:ss"
                          timeCaption="time"
                        />
                        <br/>
                        <label>Event End Date &amp; Time </label>
                        <DatePicker
                          selected={this.state.selectedEndDate}
                          onChange={this.handleEnd.bind(this)}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={15}
                          dateFormat="YYYY-MM-DD HH:mm:ss"
                          timeCaption="time"
                        />
                        <br/>
                        <label>Event Venue</label> 
                        <input type="text" value={this.state.venue} name="venue" onChange={(event) => {this.setState({venue:event.target.value})}}/>
                      </div>

                      <div class="section"><span>3</span>Fee</div>
                          <div class="inner-wrap">
                          <label>Event Fee</label>
                          <input type="number" value={this.state.fee} name="fee" onChange={(event) => {this.setState({fee:event.target.value})}}/>
                      </div>

                      <div class="section"><span>4</span>Organizing Chairperson Information</div>
                      <div class="inner-wrap">
                        <label>Name</label>
                        <input type="text" value={this.state.chairperson} name="chairperson" onChange={(event) => {this.setState({chairperson:event.target.value})}}/>
                        <br/>
                        <label>Contact Number</label> 
                        <input type="number" value={this.state.contact} name="contact" onChange={(event) => {this.setState({contact:event.target.value})}}/>
                      </div>

                      <div class="section"><span>5</span>Soft Skill Points &amp; Category</div>
                      <div class="inner-wrap">
                        <label>Soft Skill Points</label>
                        <input type="number" value={this.state.ssPoint} name="ssPoint" onChange={(event) => {this.setState({ssPoint:event.target.value})}}/>
                        <br/>
                        <label>Soft Skill Category</label> 
                        <select value={this.state.ssCategory} onChange={this.handleSoftskilltCategory}>
                          {softSkillCategories.map(this.mapItem)}
                        </select>
                        <br/>
                      </div>

                      <div class="section"><span>6</span>Logo</div>
                          <div class="inner-wrap">
                          <label>Upload Event Logo</label>
                          <input type="file" onChange={this.handleSelectedFile} />
                          <br/>
                      </div>

                      <div class="section"><span>7</span>Availability</div>
                          <div class="inner-wrap">
                            <label>Total amount of Participants</label>
                            <input type="number" value={this.state.totalParticipant} onChange={(event) => {this.setState({totalParticipant:event.target.value})}}/>
                            <br/>
                            <label>Total amount of Crew</label>
                            <input type="number" value={this.state.totalCrew} onChange={(event) => {this.setState({totalCrew:event.target.value})}}/>
                            <br/>
                      </div>

                      <div class="section"><span>8</span>Crew Departments</div>
                        <div class="inner-wrap">
                          <label>Secretary</label>
                          <Checkbox onCheck={(e, checked) => {
                              if(checked)
                                this.setState({position: this.state.position + 'Secretary,'}); 
                            }}
                          /> 
                          <label>Vice Secretary</label>
                          <Checkbox onCheck={(e, checked) => {
                              if(checked)
                                this.setState({position: this.state.position + 'Vice Secretary,'}); 
                            }}
                          /> 
                          <label>Treasurer</label>
                          <Checkbox onCheck={(e, checked) => {
                              if(checked)
                                this.setState({position: this.state.position + 'Treasurer,'}); 
                            }}
                          /> 
                          <label>Vice Treasurer</label>
                          <Checkbox onCheck={(e, checked) => {
                              if(checked)
                                this.setState({position: this.state.position + 'Vice Treasurer,'}); 
                            }}
                          /> 
                          <label>Programme</label>
                          <Checkbox onCheck={(e, checked) => {
                              if(checked)
                                this.setState({position: this.state.position + 'Program HOD,Program Assistant,'}); 
                            }}
                          /> 
                           <label>Publicity</label>
                          <Checkbox onCheck={(e, checked) => {
                              if(checked)
                                this.setState({position: this.state.position + 'Publicity HOD,Publicity Assistant,'}); 
                            }}
                          /> 
                           <label>Logistics</label>
                          <Checkbox onCheck={(e, checked) => {
                              if(checked)
                                this.setState({position: this.state.position + 'Logistics HOD,Logistics Assistant,'}); 
                            }}
                          /> 
                           <label>Decoration</label>
                          <Checkbox onCheck={(e, checked) => {
                              if(checked)
                                this.setState({position: this.state.position + 'Decoration HOD,Decoration Assistant,'}); 
                            }}
                          /> 
                           <label>Editorial</label>
                          <Checkbox onCheck={(e, checked) => {
                              if(checked)
                                this.setState({position: this.state.position + 'Editorial HOD,Editorial Assistant,'}); 
                            }}
                          /> 
                          <label>Technical</label>
                          <Checkbox onCheck={(e, checked) => {
                              if(checked)
                                this.setState({position: this.state.position + 'Technical HOD,Technical Assistant,'}); 
                            }}
                          /> 
                          <label>Auditor</label>
                          <Checkbox onCheck={(e, checked) => {
                              if(checked)
                                this.setState({position: this.state.position + 'Auditor,'}); 
                            }}
                          />
                      </div>

                      <div class="section"><span>9</span>Authorized Position</div>
                        <div class="inner-wrap">
                          <label>First position</label>
                          <select value={this.state.position1} onChange={(event) => {this.setState({position1:event.target.value})}}>
                            {this.state.positionOptions.map(this.mapItem)}
                          </select>
                          <br/>
                          <label>Second position</label>
                          <select value={this.state.position2} onChange={(event) => {this.setState({position2:event.target.value})}}>
                            {this.state.positionOptions.map(this.mapItem)}
                          </select>
                          <br/>
                          <label>Third position</label>
                          <select value={this.state.position3} onChange={(event) => {this.setState({position3:event.target.value})}}>
                            {this.state.positionOptions.map(this.mapItem)}
                          </select>
                      </div>

                      <div class="button-section">
                        <RaisedButton label="Submit" id="button2" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleClick(event)}/>
                        <RaisedButton label="Back" primary={true} style={RaisedButtonStyle} onClick={(event) => window.history.back()}/>
                      </div>
                  </form>
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
    margin: 15
  }
};

const mapStateToProps = (state, props) => {
  return {
    userId: state.auth.id,
    event: state.data.event,
    loading: state.create.loading,
    retrieveLoading: state.data.loading,
    roles: state.data.roles,
    isAuthenticated: state.auth.isAuthenticated
  };
};

const mapActionsToProps = (dispatch, props) => {
  return bindActionCreators({
    onCreate: create,
    onUpdate: update,
    onRetrieveAll: retrieveAll,
    onUpdateRetrieveLoadingBar: updateLoadingBar,
    onUpdateLoadingBar: updatePostLoadingBar
  }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(CreateEvent);