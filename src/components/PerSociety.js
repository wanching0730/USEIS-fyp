import React, {Component} from 'react';
import NavBar from './NavBar';
import LoadingBar from './LoadingBar';
import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory} from 'react-router';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import * as FontAwesome from '../../node_modules/react-icons/lib/fa';
import $ from 'jquery';
import "../style/sidenav.css";
import "../style/display.css";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveDataWithUserId, updateLoadingBar } from '../actions/data-action';

class PerSociety extends Component {

    constructor(props) {
        super(props);

        this.props.onUpdateLoadingBar();

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

    handleListCommitteeClick(event) {
        if(this.props.society != null) {
            let toCommBoard = { 
                pathname: "/commBoard/society/" + this.props.params.societyId, 
                state: {societyName: this.props.society.name}
            };
            browserHistory.push(toCommBoard);
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        $(document).ready(function(){
            $('#zoomBtn').on('click', (function() {
                $('.zoom-btn-sm').toggleClass('scale-out');
                if (!$('.zoom-card').hasClass('scale-out')) {
                $('.zoom-card').toggleClass('scale-out');
                }
            }));

            // $("#div2").hover(function () {
            //     $(this).find("span").text("HOVERING!!!!!");
            // }, function () {
            //     $(this).find("span").text("");
            // });
        
            // $('.zoom-btn-sm').on('click', (function() {
            //     var btn = $(this);
            //     var card = $('.zoom-card');
            //     if ($('.zoom-card').hasClass('scale-out')) {
            //         $('.zoom-card').toggleClass('scale-out');
            //     }
            //     if (btn.hasClass('zoom-btn-person')) {
            //         card.css('background-color', '#d32f2f');
            //     } else if (btn.hasClass('zoom-btn-doc')) {
            //         card.css('background-color', '#fbc02d');
            //     } else if (btn.hasClass('zoom-btn-tangram')) {
            //         card.css('background-color', '#388e3c');
            //     } else if (btn.hasClass('zoom-btn-report')) {
            //         card.css('background-color', '#1976d2');
            //     } else {
            //         card.css('background-color', '#7b1fa2');
            //     }
            // }));
        });

        const { RaisedButtonStyle, imageStyle, div1Style, div2Style, div3Style } = styles;
        var society, toCreateEvent, toManageMember, toRegisterBooth;
        var buttons = <div></div>;
        
        if(this.props.society != null) {
            society = this.props.society;
            let societyId = this.props.params.societyId;
            let societyState = {societyName: this.props.society.name};

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
                            <RaisedButton label="Committee Board" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleListCommitteeClick(event)}/>
                            <RaisedButton label="Back" primary={true} style={RaisedButtonStyle} onClick={(event) => window.history.back()}/>    
                        </div> 
                } else {
                    buttons = 
                        <div>
                            <RaisedButton label="Join Society" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleJoinClick(event)}/>
                            <RaisedButton label="List Events" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleListEventClick(event)}/>
                            <RaisedButton label="Committee Board" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleListCommitteeClick(event)}/>
                            <RaisedButton label="Back" primary={true} style={RaisedButtonStyle} onClick={(event) => window.history.back()}/>
                        </div>
                }
            } else {
                buttons = 
                    <div>
                        <RaisedButton label="List Events" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleListEventClick(event)}/>
                        <RaisedButton label="Back" primary={true} style={RaisedButtonStyle} onClick={(event) => window.history.back()}/>    
                    </div> 
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

                {this.props.loading ?
                    [<LoadingBar />]
                    :
                    [
                        <div>
                            {society["authorized"] || this.props.userName.substring(0,2) == "00" ?
                                [
                                    <div className="zoom">
                                        <a className="zoom-fab zoom-btn-large" id="zoomBtn"><FontAwesome.FaCog /></a>
                                        <ul className="zoom-menu">
                                            <li><a className="zoom-fab zoom-btn-sm zoom-btn-person scale-transition scale-out"><Link to={toCreateEvent} id="addEvent"><FontAwesome.FaPlus /></Link></a></li>
                                            <li><a className="zoom-fab zoom-btn-sm zoom-btn-doc scale-transition scale-out"><Link to={`/createProfile/` + this.props.params.societyId} id="editProfile"><FontAwesome.FaEdit /></Link></a></li>
                                            <li><a className="zoom-fab zoom-btn-sm zoom-btn-tangram scale-transition scale-out"><Link to={toRegisterBooth} id="bidSocietyBooth"><FontAwesome.FaAlignJustify /></Link></a></li>
                                            <li><a className="zoom-fab zoom-btn-sm zoom-btn-report scale-transition scale-out"><Link to="/submitProposal" id="submitProposal"><FontAwesome.FaFile /></Link></a></li>
                                            <li><a className="zoom-fab zoom-btn-sm zoom-btn-feedback scale-transition scale-out"><Link to={toManageMember} id="manageMember"><FontAwesome.FaUser /></Link></a></li> 
                                        </ul> 
                                    </div>
                                ]
                                : 
                                [null]
                            }

                            <div>
                                <MuiThemeProvider>
                                    <div style={div1Style}>
                                        <img style={imageStyle} src={society["logoUrl"]} />
                                        <h1>{society["name"]}</h1>
                                    </div>

                                    <div className="tableBody">
                                        <div class="smallnav">
                                            <div></div>
                                        </div>

                                        <div class="row">
                                            <div class="column side">
                                                <h5>Category:</h5>
                                                <p>{society["category"]}</p>
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
                                            </div>
                                            <div class="column side">
                                                <h5>Vision</h5>
                                                <p>{society["vision"]}</p>
                                                <h5>Mision</h5>
                                                <p>{society["mission"]}</p>
                                            </div>
                                        </div>
                                        <div class="smallnav">
                                            <div></div>
                                        </div>
                                    </div>
                                    <div style={div3Style}>
                                        {buttons}
                                    </div>
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
        marginTop: "20px",
        
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
        userName: state.auth.userName,
        loading: state.data.loading
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
        onRetrieveDataWithUserId: retrieveDataWithUserId,
        onUpdateLoadingBar: updateLoadingBar
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(PerSociety);
