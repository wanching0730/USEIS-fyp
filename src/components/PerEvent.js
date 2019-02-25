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
import moment from "moment";
import "../style/sidenav.css";
import "../style/display.css";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveDataWithUserId, updateLoadingBar } from '../actions/data-action';

class PerEvent extends Component {

    constructor(props) {
        super(props);
        
        this.props.onUpdateLoadingBar();

        if(parseInt(this.props.userName) != 0)
            this.props.onRetrieveDataWithUserId("studentEvent", this.props.params.eventId, this.props.id);
        else 
            this.props.onRetrieveDataWithUserId("staffEvent", this.props.params.eventId, this.props.id);
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
                state: {eventName: this.props.event.name}
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

        var buttons = <div></div>, message = <div></div>;
        var event, toEditEvent, toManageCrew, toRegisterBooth, toManageParticipant;
        const { RaisedButtonStyle, imageStyle, div1Style } = styles;
        let eventId = this.props.params.eventId;

        if(this.props.event != null) {
            event = this.props.event;
            let eventState = {eventName: event.name};

            toEditEvent = {
                pathname: "/createEvent/event/" + eventId,
                state: eventState
            }

            toManageCrew = {
                pathname: "/manageCrew/event/" + eventId,
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

            // // Handle department HOD and Assistant issue
            // let splitPosition = event["position"].split(" ");
            // if(splitPosition[0] != "Vice")
            //     studentPosition = splitPosition[0];
            // else 
            //     studentPosition = event["position"];

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
        
        if(parseInt(this.props.userName) == 0)  {
            if(event["participated"] || event["currentParticipant"] >= event["totalParticipant"]) {
                buttons =
                    <div id="div3">
                        <RaisedButton id="buttons" label="Committee Board" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleListCommitteeClick(event)}/>
                        <RaisedButton id="buttons" label="Back" primary={true} style={RaisedButtonStyle} onClick={(event) => window.history.back()}/>
                    </div>
            } else {
                buttons =
                    <div id="div3">
                        <RaisedButton id="buttons" label="Join Event" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleEvent(event)}/>
                        <RaisedButton id="buttons" label="Committee Board" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleListCommitteeClick(event)}/>
                        <RaisedButton id="buttons" label="Back" primary={true} style={RaisedButtonStyle} onClick={(event) => window.history.back()}/>
                    </div>
            }
            
        } else {

            if(event["participated"] || (event["currentCrew"] >= event["totalCrew"] && event["currentParticipant"] >= event["totalParticipant"])) {
                buttons =
                    <div id="div3">
                        <RaisedButton id="buttons" label="Committee Board" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleListCommitteeClick(event)}/>
                        <RaisedButton id="buttons" label="Back" primary={true} style={RaisedButtonStyle} onClick={(event) => window.history.back()}/>
                    </div>
            } else {
                if(event["currentParticipant"] >= event["totalParticipant"])
                    buttons =
                        <div id="div3">
                            <RaisedButton id="buttons" label="Join Crew" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleCrew(event)}/>
                            <RaisedButton id="buttons" label="Committee Board" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleListCommitteeClick(event)}/>
                            <RaisedButton id="buttons" label="Back" primary={true} style={RaisedButtonStyle} onClick={(event) => window.history.back()}/>
                        </div>
                else if(event["currentCrew"] >= event["totalCrew"]) 
                    buttons =
                    <div id="div3">
                        <RaisedButton id="buttons" label="Join Event" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleEvent(event)}/>
                        <RaisedButton id="buttons" label="Committee Board" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleListCommitteeClick(event)}/>
                        <RaisedButton id="buttons" label="Back" primary={true} style={RaisedButtonStyle} onClick={(event) => window.history.back()}/>
                    </div>
                else 
                    buttons =
                    <div id="div3">
                        <RaisedButton id="buttons" label="Join Event" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleEvent(event)}/>
                        <RaisedButton id="buttons" label="Join Crew" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleCrew(event)}/>
                        <RaisedButton id="buttons" label="Committee Board" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleListCommitteeClick(event)}/>
                        <RaisedButton id="buttons" label="Back" primary={true} style={RaisedButtonStyle} onClick={(event) => window.history.back()}/>
                    </div>
            }
        }

        if(event["currentCrew"] >= event["totalCrew"] && event["currentParticipant"] >= event["totalParticipant"])
            message = <div style={{ color: "red", fontSize: 20 }}>FULL</div>;

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

                {this.props.loading || this.props.event == null ?
                    [<LoadingBar />]
                    :
                    [
                        <div>
                            {(event["specificAuthorized"]) || (event["authorized"]) ?
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
                                    {message}
                                    <img style={imageStyle} src={event["logoUrl"]} />
                                    <h1>{event["name"]}</h1> 
                                </div>

                                <div className="tableBody">
                                    <div class="smallnav">
                                        <div></div>
                                    </div>
​                               
                                    <div class="row">
                                        <div class="column side">
                                            <h5>Category:</h5>
                                            <p>{event["category"]}</p>
                                            <h5>Organiser:</h5>
                                            <p>{event["organiser"]} Society</p>
                                            <h5>Soft Skill Points:</h5>
                                            <p>{event["ssPoint"]}</p>
                                            <h5>Soft Skill Category:</h5>
                                            <p>{event["ssCategory"]}</p>
                                            <br/><br/>
                                        </div>
                                        <div class="column middle">
                                            <h5>Description:</h5>
                                            <p>
                                                {/* {event["desc"]} */}
                                                The biggest challenge to IT in the future is security. 
                                                Security could negatively impact connectivity to public networks. 
                                                If these problems cannot be successfully addressed, I envision a time of closed, private networks and less information sharing. 
                                                The risks now are so great and getting worse every day that we even see foreign governments 
                                                toppling superpowers the way Russia toppled the US and put its puppet in charge because of weak controls and poor security.
                                            </p>
                                            <br/><br/>
                                            <h5>Start Date:</h5>
                                            <p>{moment(event["startDate"]).format("YYYY-MM-DD HH:mm")}</p>
                                            <h5>End Date:</h5>
                                            <p>{moment(event["endDate"]).format("YYYY-MM-DD HH:mm")}</p>
                                            <h5>Venue:</h5>
                                            <p>{event["venue"]}</p>
                                            <h5>Fee:</h5>
                                            <p>RM{event["fee"]}</p>
                                            <br/><br/>
                                        </div>
                                        <div class="column side">
                                            <h5>Chairperson:</h5>
                                            <p><a href="https://www.facebook.com/ho.m.hm">{event["chairperson"]}</a></p>
                                            <h5>Contact Number:</h5>
                                            <p>{event["contact"]}</p>
                                        </div>
                                    </div>
                                    <div class="smallnav">
                                        <div></div>
                                    </div>
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
        margin: "auto",
        marginTop: "30px"
    }, 
    div1Style: {
        display: "flex",
        flexDirection: "column",
        textAlign: "center"
    }, 
    // div2Style: {
    //     marginLeft: "20px"
    // }, 
    // div3Style: {
    //     justifyContent: "center",
    //     margin: "auto",
    //     overflow: "hidden"
    // }
}

const mapStateToProps = (state, props) => {
    return {
        event: state.data.event,
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
