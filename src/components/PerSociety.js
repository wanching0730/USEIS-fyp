import React, {Component} from 'react';
import NavBar from './NavBar';
import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory} from 'react-router';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import * as FontAwesome from '../../node_modules/react-icons/lib/fa';
import "../style/perSociety.css";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveDataWithUserId } from '../actions/data-action';

class PerSociety extends Component {

    constructor(props) {
        super(props);

        if(this.props.userName.substring(0,2) != "00") {
            this.props.onRetrieveDataWithUserId("studentSociety", this.props.params.societyId, this.props.id);
        } 
        else {
            this.props.onRetrieveDataWithUserId("staffSociety", this.props.params.societyId, this.props.id);
        }
    }

    handleJoinClick(event) {
        if(this.props.society != null) {
            let toRegisterSociety = {
                pathname: "/register_society/" + this.props.params.societyId,
                state: {societyName: this.props.society.name}
            }
            browserHistory.push(toRegisterSociety);
        }
    }

    handleListEventClick(event) {
        if(this.props.society != null) {
            let toSocietyEvents = {
                pathname: "/societyEvents/" + this.props.params.societyId,
                state: {societyName: this.props.society.name}
            }
            browserHistory.push(toSocietyEvents);
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {

        const { RaisedButtonStyle, imageStyle, div1Style, div2Style, div3Style } = styles;
        var society, toCommBoard, toCreateEvent, toManageMember, toRegisterBooth;
        var buttons = <div></div>, sideNavBar = <div></div>;
        
        if(this.props.society != null) {
            society = this.props.society;
            let societyId = this.props.params.societyId;
            let societyState = {societyName: this.props.society.name};

            toCommBoard = { 
                pathname: "/commBoard/society/" + societyId, 
                state: societyState
            };

            toCreateEvent = {
                pathname: "/createEvent/society/" + societyId,
                state: societyState
            };

            toManageMember = {
                pathname: "/manageMember/" + societyId,
                state: societyState
            };

            toRegisterBooth = {
                pathname: "/register_booth/society/" + societyId,
                state: societyState
            };

            if(this.props.userName.substring(0,2) != "00") { 
                if(society["participated"]) {
                    buttons = 
                        <div>
                            <RaisedButton label="List Events" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleListEventClick(event)}/>
                            <RaisedButton label="Back" primary={true} style={RaisedButtonStyle} onClick={(event) => window.history.back()}/>    
                        </div> 
                } else {
                    buttons = 
                        <div>
                            <RaisedButton label="Join Society" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleJoinClick(event)}/>
                            <RaisedButton label="List Events" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleListEventClick(event)}/>
                            <RaisedButton label="Back" primary={true} style={RaisedButtonStyle} onClick={(event) => window.history.back()}/>
                        </div>
                }

                if(society["authorized"]) {
                    sideNavBar = 
                        <div id="mySidenav" className="sidenav">
                            <Link to={toCreateEvent} id="addEvent"><FontAwesome.FaPlus /> Create Event</Link>
                            <Link to={`/createProfile/` + this.props.params.societyId} id="editProfile"><FontAwesome.FaBook /> Edit Profile</Link>
                            <Link to={toRegisterBooth} id="bidSocietyBooth"><FontAwesome.FaAlignJustify /> Register Booth</Link>
                            <Link to="/submitProposal" id="submitProposal"><FontAwesome.FaFile /> Submit Proposal</Link>
                            <Link to={toManageMember} id="manageMember"><FontAwesome.FaUser /> Manage Member</Link>
                            <Link to={toCommBoard} id="commBoard"><FontAwesome.FaGroup /> Committee Board</Link>
                        </div>;
                } 
            } 
         } else {
            society = {
                name: null,
                category: null,
                vision: null,
                mission: null,
                desc: null,
                boothId: null,
            };
        }

        return (
            <div>
                <NavBar />

                 <div style={{ margin: 20 }}>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to={`/home`}>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to={`/society`}>Societies</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{this.props.location.state["societyName"]}</BreadcrumbItem>
                    </Breadcrumb>
                </div>

                {sideNavBar}

                <div>
                    <MuiThemeProvider>
                        <div style={div1Style}>
                            <img style={imageStyle} src={ require('../assets/images/its.jpg') } />
                            <h1>{society["name"]}</h1>
                        </div>
                        <div style={div2Style}>
                            <h5>Category:</h5>
                            <p>{society["category"]}</p>
                            <h5>Vision</h5>
                            <p>{society["vision"]}</p>
                            <h5>Mision</h5>
                            <p>{society["mission"]}</p>
                            <h5>Description:</h5>
                            <p>
                                {society["desc"]}
                                {/* The biggest challenge to IT in the future is security. 
                                Security could negatively impact connectivity to public networks. 
                                If these problems cannot be successfully addressed, I envision a time of closed, private networks and less information sharing. 
                                The risks now are so great and getting worse every day that we even see foreign governments 
                                toppling superpowers the way Russia toppled the US and put its puppet in charge because of weak controls and poor security. */}
                            </p>
                            <br/>
                        </div>
                        <div style={div3Style}>
                            {buttons}
                        </div>
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
        society: state.data.society,
        id: state.auth.id,
        userName: state.auth.userName
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
        onRetrieveDataWithUserId: retrieveDataWithUserId
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(PerSociety);
