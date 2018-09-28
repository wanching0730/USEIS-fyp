import React, { Component } from 'react';
import NavBar from './NavBar';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { confirmAlert } from 'react-confirm-alert';
import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory} from 'react-router';
import * as FontAwesome from '../../node_modules/react-icons/lib/fa';
import '../style/society.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteParticipation } from '../actions/delete-action';
import { retrieveData } from '../actions/data-action';

class MyEvent extends Component {

    constructor(props) {
        super(props);

        this.state = {eventId: -1};

        if(this.props.userName.substring(0,2) === "00") 
            this.props.onRetrieveData("staffEvent", this.props.userId);
        else 
            this.props.onRetrieveData("studentEvent", this.props.userId);

        this.handleCancelEvent = this.handleCancelEvent.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }
    
    handleSocieties(event) {
        browserHistory.push("/myProfile");
    }

    handleEvents(event) {
        browserHistory.push("/myEvents");
    }

    handleCancelCrew() {
        confirmAlert({
            title: 'Cancel Crew Registration Confirmation',
            message: 'Are you sure to cancel joining as crew for this event?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    console.log('Click Yes');
                }
              },
              {
                label: 'No',
                onClick: () => console.log('Click No')
              }
            ]
          })
    }

    handleCancelEvent(event) {
        let eventId = event.target.value;
        this.setState({eventId: eventId})
        console.log("event to delete: " + this.state.eventId);

        // console.log("event to delete: " + JSON.stringify(name));
        // console.log("event to delete: " + name);
        setTimeout(() => {
            confirmAlert({
                title: 'Cancel Participation Confirmation',
                message: 'Are you sure to cancel participating this event?',
                buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        if(this.props.userName.substring(0,2) === "00") 
                            this.props.onDeleteParticipation("staffEvent", this.props.userId, this.state.eventId);
                        else 
                        this.props.onDeleteParticipation("studentEvent", this.props.userId, this.state.eventId);
                    }
                },
                {
                    label: 'No',
                    onClick: () => console.log('Click No')
                }
                ]
            })
        }, 2000);
    }
    
    render() {

        const { imageStyle, RaisedButtonStyle } = styles;

        if(this.props.userEvents != null) {
            var message = <div></div>;
            var rows = [];

            if(this.props.userEvents.length != 0) {
                let events = this.props.userEvents;
                console.log("events in profile: " + events.length);

                var position, crewStatus, isVege;
                
                for(var i = 0; i < events.length; i++) {
                    if(events[i]["position"] == "participant"){
                        position = <td>Participant</td>;
                        crewStatus = <td>-</td>;
                    } else {
                        if(events[i]["crewStatus"] == 0) {
                            position = <td>-</td>;
                            crewStatus = <td>Pending</td>;
                        } else {
                            position = <td>{events[i]["position"]}</td>;
                            crewStatus = <td>Approved</td>;
                        }
                    }

                    if(events[i]["vegetarian"] == 0)
                        isVege = <td>No</td>;
                    else 
                        isVege = <td>Yes</td>;

                    rows.push(
                        <tr>
                            <td>{i+1}</td>
                            <td><img style={imageStyle} src={ require('../assets/images/sport.jpg') } /></td>
                            <td><Link to={`/perEvent/`+events[i]["eventId"]}>{events[i]["name"]}</Link></td>
                            <td><Link to={`/perSociety/1`}>{events[i]["organiser"]}</Link></td>
                            <td>{events[i]["joinDate"]}</td>
                            {position}
                            {crewStatus}
                            {isVege}
                            <td><Link to={`/feedback`}>Undone</Link></td>
                            <td><li value={events[i]["eventId"]} onClick={(event) => this.handleCancelEvent(event)} className="fa fa-trash"></li></td>
                            {/* <td><FontAwesome.FaTrash value={events[i]["eventId"]} onClick={this.handleCancelEvent}/></td> */}
                            {/* <td><Link onClick={this.handleCancelEvent}><FontAwesome.FaTrash /></Link></td> */}
                            <td><Link onClick={this.handleCancelCrew}><FontAwesome.FaTimesCircle /></Link></td>
                        </tr>
                    )
                }
            } else {
                message = <div style= {{ textAlign: "center", marginBottom: "20px"}}>No events participated</div>;
            }
        }
        
        return (
            <div>
                <MuiThemeProvider>
                <div id="outerDiv"> 
                    <NavBar />

                    <div style={{ margin: 20 }}>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to={`/home`}>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>My Events</BreadcrumbItem>
                        </Breadcrumb>
                    </div>

                    <div style= {{ textAlign: "center" }}>
                        <RaisedButton label="My Societies" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleSocieties(event)}/>
                        <RaisedButton label="My Events" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleEvents(event)}/>
                    </div>

                    <div className="container" id="tableContainer">
                        <div className="row">
                            <div className="panel-body">
                                <table className="table table-hover table-light" border="1">
                                <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Logo</th>
                                            <th>Events</th> 
                                            <th>Organisers</th> 
                                            <th>Joined Date</th>
                                            <th>Position</th>
                                            <th>Crew Status</th>
                                            <th>Vegetarian</th>
                                            <th>Rating Status</th>    
                                            <th colSpan="2">Actions</th>           
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {/* <tr>
                                            <td>4</td>
                                            <td><img style={imageStyle} src={ require('../assets/images/carnival.jpg') } /></td>
                                            <td><Link to={`/perEvent/1`}>Sport Carnival</Link></td>
                                            <td><Link to={`/perSociety/1`}>Sport Club</Link></td>
                                            <td>17/01/2018</td>
                                            <td><Link to={`/feedback`}>Undone</Link></td>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr> */}

                                        {rows}

                                    </tbody>
                                </table>
                                {message}
                            </div>
                        </div>
                    </div>

                    <div style= {{ textAlign: "center" }}>
                        <RaisedButton label="Back" primary={true} style={RaisedButtonStyle} onClick={(event) => window.history.back()}/>
                    </div>

                </div>
                </MuiThemeProvider>
            </div>
        );
    };
    
};

const styles = {
    RaisedButtonStyle: {
        margin: 15
    },
    imageStyle: {
        height: "50px",
        width: "50px"
    }
}

const mapStateToProps = (state, props) => {
    return {
        userEvents: state.data.userEvents,
        userId: state.auth.id,
        userName: state.auth.userName,
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
        onRetrieveData: retrieveData,
        onDeleteParticipation: deleteParticipation
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(MyEvent);
