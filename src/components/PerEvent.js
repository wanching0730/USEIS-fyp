import React, {Component} from 'react';
import NavBar from './NavBar';
import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory} from 'react-router';
import { Link } from 'react-router';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as FontAwesome from '../../node_modules/react-icons/lib/fa';
import { confirmAlert } from 'react-confirm-alert'; 
import "../../node_modules/react-confirm-alert/src/react-confirm-alert.css";
import "../style/perEvent.css";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveData } from '../actions/data-action';

class PerEvent extends Component {

    constructor(props) {
        super(props);

        this.props.onRetrieveData("event", this.props.params.eventId);
        console.log("event id: " + this.props.params.eventId);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    handleEvent(event) {
        browserHistory.push("/register_event/" + this.props.params.eventId);
    }

    handleCrew(event) {
        browserHistory.push("/register_crew");
    }

    handleDelete() {
        confirmAlert({
            title: 'Delete Confirmation',
            message: 'Are you sure to delete this event?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    console.log('Click Yes');
                    browserHistory.push("/event");
                }
              },
              {
                label: 'No',
                onClick: () => console.log('Click No')
              }
            ]
          })
    }

    render() {

        var buttons;
        const { RaisedButtonStyle, imageStyle, div1Style, div2Style, div3Style } = styles;
        const { name, dateTime, organiser, desc, venue, category, fee, points, chairperson, contact } = this.props;

        if(this.props.userName.substring(0,2) == "00") {
            buttons =
                <div style={div3Style}>
                    <RaisedButton label="Join Event" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleEvent(event)}/>
                    <RaisedButton label="Back" primary={true} style={RaisedButtonStyle} onClick={(event) => window.history.back()}/>
                </div>
        } else {
            buttons =
                <div style={div3Style}>
                    <RaisedButton label="Join Event" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleEvent(event)}/>
                    <RaisedButton label="Join Crew" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleCrew(event)}/>
                    <RaisedButton label="Back" primary={true} style={RaisedButtonStyle} onClick={(event) => window.history.back()}/>
                </div>
        }

        return (
            <div>
                <NavBar />

                 <div style={{ margin: 20 }}>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to={`/home`}>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to={`/event`}>Events</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Cardio Night Run</BreadcrumbItem>
                    </Breadcrumb>
                </div>

                <div id="mySidenav" class="sidenav">
                    <Link to={`/createEvent/event/` + this.props.params.eventId} id="editEvent"><FontAwesome.FaEdit /> Edit Event</Link>
                    <Link onClick={this.handleDelete} id="deleteEvent"><FontAwesome.FaTrash /> Delete Event</Link>
                    <Link to="/register_booth" id="bidBooth"><FontAwesome.FaAlignJustify /> Register Booth</Link>
                    <Link to="/manageCrew" id="manageCrew"><FontAwesome.FaBriefcase />  Manage Crew</Link>
                    <Link to="/manageParticipant" id="manageParticipant"><FontAwesome.FaUser /> Paricipants</Link>
                    <Link to="/commBoard" id="commBoard"><FontAwesome.FaGroup /> Committee Board</Link>
                </div>

                <div>
                    <MuiThemeProvider>
                        {/* <h1>{this.props.params.societyId}</h1> */}
                        <div style={div1Style}>
                            <img style={imageStyle} src={ require('../assets/images/cardio.jpg') } />
                            <h1>{name}</h1>
                        </div>
                        <div style={div2Style}>
                            <h5>Category:</h5>
                            <p>{category}</p>
                            <h5>Organiser:</h5>
                            <p>{organiser} Society</p>
                            <h5>Description:</h5>
                            <p>
                                {desc}
                                {/* The biggest challenge to IT in the future is security. 
                                Security could negatively impact connectivity to public networks. 
                                If these problems cannot be successfully addressed, I envision a time of closed, private networks and less information sharing. 
                                The risks now are so great and getting worse every day that we even see foreign governments 
                                toppling superpowers the way Russia toppled the US and put its puppet in charge because of weak controls and poor security. */}
                            </p>
                            <h5>Date:</h5>
                            <p>{dateTime}</p>
                            <h5>Time:</h5>
                            <p>{dateTime}</p>
                            <h5>Venue:</h5>
                            <p>{venue}</p>
                            <h5>Fee:</h5>
                            <p>RM{fee}</p>
                            <h5>Soft Skill Points:</h5>
                            <p>{points}</p>
                            <h5>Soft Skill Category:</h5>
                            <p>???</p>
                            <h5>Chairperson:</h5>
                            <p><a href="https://www.facebook.com/ho.m.hm">{chairperson}</a></p>
                            <h5>Contact Number:</h5>
                            <p>{contact}</p>
                            <br/>
                        </div>
                       {buttons}
                    </MuiThemeProvider>
                </div>
            </div>
        );
    };
}

const styles = {
    RaisedButtonStyle: {
        margin: 15
    },
    imageStyle: {
        height: "200px",
        width: "200px",
        marginTop: "30px",
        
    }, 
    div1Style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    }, 
    div2Style: {
        marginLeft: "20px"
    }, 
    div3Style: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    }
}

const mapStateToProps = (state, props) => {
    return {
      name: state.data.eventName,
      dateTime: state.data.eventDateTime,
      organiser: state.data.organiser,
      desc: state.data.eventDesc,
      venue: state.data.eventVenue,
      category: state.data.eventCategory,
      fee: state.data.eventFee,
      points: state.data.eventPoints,
      chairperson: state.data.eventChairperson,
      contact: state.data.eventContact,
      userName: state.auth.userName
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
      onRetrieveData: retrieveData
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(PerEvent);
