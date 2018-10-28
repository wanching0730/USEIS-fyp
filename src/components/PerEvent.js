import React, {Component} from 'react';
import NavBar from './NavBar';
import LoadingBar from './LoadingBar';
import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory} from 'react-router';
import { Link } from 'react-router';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as FontAwesome from '../../node_modules/react-icons/lib/fa';
import { confirmAlert } from 'react-confirm-alert'; 
import "../../node_modules/react-confirm-alert/src/react-confirm-alert.css";
import $ from 'jquery';
import "../style/perEvent.css";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveDataWithUserId, updateLoadingBar } from '../actions/data-action';

class PerEvent extends Component {

    constructor(props) {
        super(props);
        
        this.props.onUpdateLoadingBar();

        if(this.props.userName.substring(0,2) != "00") 
            this.props.onRetrieveDataWithUserId("studentEvent", this.props.params.eventId, this.props.id);
        else 
            this.props.onRetrieveDataWithUserId("staffEvent", this.props.params.eventId, this.props.id);

        console.log("event id: " + this.props.params.eventId);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    handleEvent(event) {
        if(this.props.event != null) {
            let toRegisterEvent = {
                pathname: "/register_event/" + this.props.params.eventId,
                state: {eventName: this.props.event.name}
            }
            browserHistory.push(toRegisterEvent);
        }
    }

    handleCrew(event) {
        if(this.props.event != null) {
            let toRegisterCrew = {
                pathname: "/register_crew/" + this.props.params.eventId,
                state: {eventName: this.props.event.name}
            }
            browserHistory.push(toRegisterCrew);
        }
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

    handleListCommitteeClick(event) {
        if(this.props.event != null) {
            let toCommBoard = { 
                pathname: "/commBoard/event/" + this.props.params.eventId, 
                state: {eventName: event.name}
            };
            browserHistory.push(toCommBoard);
        }
    }

    render() {

        $(document).ready(function(){
            $('#zoomBtn').on('click', (function() {
                $('.zoom-btn-sm').toggleClass('scale-out');
                if (!$('.zoom-card').hasClass('scale-out')) {
                $('.zoom-card').toggleClass('scale-out');
                }
            }));
        });

        console.log("loading: " + this.props.loading);

        var buttons = <div></div>, sideNavBar = <div></div>;
        var event, toEditEvent, toManageCrew, toCommBoard, toRegisterBooth, toManageParticipant;
        const { RaisedButtonStyle, imageStyle, div1Style, div2Style, div3Style } = styles;
        let eventId = this.props.params.eventId;

        if(this.props.event != null) {
            event = this.props.event;
            let eventState = {eventName: event.name};

            toEditEvent = {
                pathname: "/createEvent/event/" + eventId,
                state: eventState
            }

            toManageCrew = {
                pathname: "/manageCrew/" + eventId,
                state: eventState
            }

            toRegisterBooth = {
                pathname: "/register_booth/event/" + eventId,
                state: eventState
            };

            toManageParticipant = {
                pathname: "/manageParticipant/" + eventId,
                state: eventState
            };
        } else {
            event = {
                name: null,
                dateTime: null,
                organiser: null,
                desc: null,
                venue: null,
                category: null,
                fee: null,
                ssPoint: null,
                chairperson: null, 
                contact: null, 
                boothId: null,
            };
        }
        
        if(this.props.userName.substring(0,2) == "00") {
            if(event["participated"]) {
                buttons =
                <div style={div3Style}>
                    <RaisedButton label="Committee Board" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleListCommitteeClick(event)}/>
                    <RaisedButton label="Back" primary={true} style={RaisedButtonStyle} onClick={(event) => window.history.back()}/>
                </div>
            } else {
                buttons =
                <div style={div3Style}>
                    <RaisedButton label="Join Event" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleEvent(event)}/>
                    <RaisedButton label="Committee Board" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleListCommitteeClick(event)}/>
                    <RaisedButton label="Back" primary={true} style={RaisedButtonStyle} onClick={(event) => window.history.back()}/>
                </div>
            }
            
        } else {
            console.log("authorized: " + event["authorized"]);
            if(event["participated"]) {
                buttons =
                    <div style={div3Style}>
                        <RaisedButton label="Committee Board" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleListCommitteeClick(event)}/>
                        <RaisedButton label="Back" primary={true} style={RaisedButtonStyle} onClick={(event) => window.history.back()}/>
                    </div>
            } else {
                buttons =
                    <div style={div3Style}>
                        <RaisedButton label="Join Event" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleEvent(event)}/>
                        <RaisedButton label="Join Crew" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleCrew(event)}/>
                        <RaisedButton label="Committee Board" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleListCommitteeClick(event)}/>
                        <RaisedButton label="Back" primary={true} style={RaisedButtonStyle} onClick={(event) => window.history.back()}/>
                    </div>
            }

            // if(event["authorized"]) {
            //     sideNavBar = 
            //         <div id="mySidenav" class="sidenav">
            //             <Link to={toEditEvent} id="editEvent"><FontAwesome.FaEdit /> Edit Event</Link>
            //             <Link onClick={this.handleDelete} id="deleteEvent"><FontAwesome.FaTrash /> Delete Event</Link>
            //             <Link to={toRegisterBooth} id="bidBooth"><FontAwesome.FaAlignJustify /> Register Booth</Link>
            //             <Link to={toManageCrew} id="manageCrew"><FontAwesome.FaBriefcase />  Manage Crew</Link>
            //             <Link to={toManageParticipant} id="manageParticipant"><FontAwesome.FaUser /> Paricipants</Link>
            //             <Link to={toCommBoard} id="commBoard"><FontAwesome.FaGroup /> Committee Board</Link>
            //         </div>
            // } else {
            //     sideNavBar = 
            //         <div id="mySidenav" class="sidenav">
            //             <Link to={toCommBoard} id="commBoard"><FontAwesome.FaGroup /> Committee Board</Link>
            //         </div>
            // }
        }

        return (
            <div>
                <NavBar />

                 <div style={{ margin: 20 }}>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to={`/home`}>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to={`/event`}>Events</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{this.props.location.state["eventName"]}</BreadcrumbItem>
                    </Breadcrumb>
                </div>

                {this.props.loading ?
                    [<LoadingBar />]
                    :
                    [
                        <div>
                            {event["authorized"] ?
                                [
                                    <div className="zoom">
                                        <a className="zoom-fab zoom-btn-large" id="zoomBtn"><FontAwesome.FaCog /></a>
                                        <ul className="zoom-menu">
                                            <li><a className="zoom-fab zoom-btn-sm zoom-btn-person scale-transition scale-out"><Link to={toEditEvent} id="editEvent"><FontAwesome.FaEdit /></Link></a></li>
                                            <li><a className="zoom-fab zoom-btn-sm zoom-btn-doc scale-transition scale-out"><Link onClick={this.handleDelete} id="deleteEvent"><FontAwesome.FaTrash /></Link></a></li>
                                            <li><a className="zoom-fab zoom-btn-sm zoom-btn-tangram scale-transition scale-out"><Link to={toRegisterBooth} id="bidBooth"><FontAwesome.FaAlignJustify /></Link></a></li>
                                            <li><a className="zoom-fab zoom-btn-sm zoom-btn-report scale-transition scale-out"><Link to={toManageCrew} id="manageCrew"><FontAwesome.FaBriefcase /></Link></a></li>
                                            <li><a className="zoom-fab zoom-btn-sm zoom-btn-feedback scale-transition scale-out"><Link to={toManageParticipant} id="manageParticipant"><FontAwesome.FaUser /></Link></a></li> 
                                        </ul> 
                                    </div>
                                ]
                                :
                                [null]
                            }

                            <div>
                                <MuiThemeProvider>
                                    <div style={div1Style}>
                                        <img style={imageStyle} src={ require('../assets/images/cardio.jpg') } />
                                        <h1>{event["name"]}</h1>
                                    </div>
                                    <div style={div2Style}>
                                        <h5>Category:</h5>
                                        <p>{event["category"]}</p>
                                        <h5>Organiser:</h5>
                                        <p>{event["organiser"]} Society</p>
                                        <h5>Description:</h5>
                                        <p>
                                            {event["desc"]}
                                            {/* The biggest challenge to IT in the future is security. 
                                            Security could negatively impact connectivity to public networks. 
                                            If these problems cannot be successfully addressed, I envision a time of closed, private networks and less information sharing. 
                                            The risks now are so great and getting worse every day that we even see foreign governments 
                                            toppling superpowers the way Russia toppled the US and put its puppet in charge because of weak controls and poor security. */}
                                        </p>
                                        <h5>Date:</h5>
                                        <p>{event["dateTime"]}</p>
                                        <h5>Time:</h5>
                                        <p>{event["dateTime"]}</p>
                                        <h5>Venue:</h5>
                                        <p>{event["venue"]}</p>
                                        <h5>Fee:</h5>
                                        <p>RM{event["fee"]}</p>
                                        <h5>Soft Skill Points:</h5>
                                        <p>{event["ssPoint"]}</p>
                                        <h5>Soft Skill Category:</h5>
                                        <p>???</p>
                                        <h5>Chairperson:</h5>
                                        <p><a href="https://www.facebook.com/ho.m.hm">{event["chairperson"]}</a></p>
                                        <h5>Contact Number:</h5>
                                        <p>{event["contact"]}</p>
                                        <br/>
                                    </div>
                                {buttons}
                                </MuiThemeProvider>
                            </div>
                        </div>
                    ]
                }
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
        event: state.data.event,
        userEvents: state.data.userEvents,
        userName: state.auth.userName,
        id: state.auth.id,
        loading: state.data.loading
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
      onRetrieveDataWithUserId: retrieveDataWithUserId,
      onUpdateLoadingBar: updateLoadingBar
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(PerEvent);
