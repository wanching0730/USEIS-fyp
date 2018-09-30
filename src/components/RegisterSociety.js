import React, { Component } from 'react';
import NavBar from './NavBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {browserHistory} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import ToggleButton from 'react-toggle-button';
import ReactNotifications from 'react-browser-notifications';
import { Link } from 'react-router';
import moment from "moment";
import '../style/form.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { create } from '../actions/post-action';

class RegisterSociety extends Component {

  constructor(props){
    super(props);
    this.state = {
      emailNoti: false,
      webNoti: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleClick(event) {
    let current = moment();
    let data = {
      societyId: this.props.params.societyId,
      studentId: this.props.id,
      position: "member",
      joinDate: moment(current).format("YYYY-MM-DD"),
      emailNoti: this.state.emailNoti,
      webNoti: this.state.webNoti
    };
    this.props.onCreate("registerSociety", data);
    //browserHistory.push("/perSociety/1");
  }

  handleChange(event) {
    this.setState({course: event.target.value});
  }

  // mapItem(item) {
  //   return <option value={item.value}>{item.name}</option>;
  // }
  
  render() {

    const { RaisedButtonStyle, ContainerStyle } = styles;
    // const courses = [{value:'software', name:'Software Engineering'}, {value:'chemical', name:'Chemical Engineering'}, {value:'civil', name:'Civil Engineering'},
    // {value:'mechanical', name:'Mechanical Engineering'}, {value:'mechatronic', name:'Mechatronic Engineering'}, {value:'electronic', name:'Electronic Engineering'},
    // {value:'accounting', name:'Accounting'}, {value:'mbbs', name:'MBBS'}];

    return (
      <div>
        <MuiThemeProvider>
        <div>
            <NavBar />

            <div style={{ margin: 20 }}>
                <Breadcrumb>
                  <BreadcrumbItem><Link to={`/home`}>Home</Link></BreadcrumbItem>
                  <BreadcrumbItem><Link to={`/society`}>Societies</Link></BreadcrumbItem>
                  <BreadcrumbItem><Link to={{pathname:`/perSociety/` + this.props.params.societyId, state: {societyName: this.props.location.state["societyName"]}}}>{this.props.location.state["societyName"]}</Link></BreadcrumbItem>
                  <BreadcrumbItem active>Registration</BreadcrumbItem>
                </Breadcrumb>
            </div>

            <div className="container" style={ContainerStyle}>
              <div className="form-style-10">
                <h1>Register IT Society<span>Register society and looking forward for the upcoming events!</span></h1>
                <form>
                    {/* <div class="section"><span>1</span>Name</div>
                    <div class="inner-wrap">
                        <label>Full Name</label>  
                        <input type="text" onChange={(event) => {
                          this.setState({first_name:event.target.value});
                          console.log("state value: " + this.state.first_name);
                          }}/>
                    </div>

                    <div class="section"><span>2</span>Course &amp; Year</div>
                    <div class="inner-wrap">
                      <label>Course (Eg: Software Engineering)</label>
                      <select value={this.state.course} onChange={this.handleChange}>
                        {courses.map(this.mapItem)}
                      </select>
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
                      <input type="text" onChange={(event) => {this.setState({first_name:event.target.value})}}/>
                    </div> */}

                      <div class="section"><span>1</span>Allow Notification</div>
                      <div class="inner-wrap">
                        <label>Allow Email Notification</label>
                        <ToggleButton
                          value={ this.state.emailNoti || false }
                          onToggle={(value) => {
                              this.setState({
                              emailNoti: !value,
                              })
                          }} />
                        <br/>
                        <label>Allow Web Notification</label>
                        <ToggleButton
                            value={ this.state.webNoti || false }
                            onToggle={(value) => {
                                this.setState({
                                webNoti: !value,
                                })
                            }} />
                        <br/>
                        <ReactNotifications
                          onRef={ref => (this.n = ref)} // Required
                          title="Some Title" // Required
                          body="This is the body!"
                          icon="devices-logo.png"
                          tag="abcdef"
                          timeout="1000"
                          onClick={event => this.handleNotiClick(event)}
                        />
                      </div>

                      <div class="button-section">
                        <RaisedButton label="Submit" id="button2" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleClick(event)}/>
                        <RaisedButton label="Back" primary={true} style={RaisedButtonStyle} onClick={(event) => window.history.back()}/>
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
  }, 
  // FormStyle: {
  //   borderWidth: "3px",
  //   borderStyle: "solid",
  //   borderColor: "#666",
  //   padding: "15px",
  //   backgroundColor: "#ebeef4"
  // }
};

const mapStateToProps = (state, props) => {
  console.log(JSON.stringify(state));
  return {
    id: state.auth.id
  };
};

const mapActionsToProps = (dispatch, props) => {
  return bindActionCreators({
    onCreate: create
  }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(RegisterSociety);