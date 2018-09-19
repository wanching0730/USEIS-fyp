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
import { retrieveData } from '../actions/data-action';

class PerSociety extends Component {

    constructor(props) {
        super(props);

        this.props.onRetrieveData("society", this.props.params.societyId);
        console.log("society id: " + this.props.params.societyId);
    }

    handleJoinClick(event) {
        browserHistory.push("/register_society");
    }

    handleListEventClick(event) {
        browserHistory.push("/societyEvents");
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    // handleEditClick(event) {
    //     browserHistory.push("/createProfile/"+this.props.params.societyId);
    // }

    // handleBiddingClick(event) {
    //     browserHistory.push("/register_booth");
    // }

    // handleMemberClick(event) {
    //     browserHistory.push("/manageMember");
    // }

    render() {

        const { RaisedButtonStyle, imageStyle, div1Style, div2Style, div3Style } = styles;
        const { name, category, vision, mission, desc } = this.props;

        console.log("society vision: " + this.props.vision);
        console.log("society mission: " + this.props.mission);

        return (
            <div>
                <NavBar />

                 <div style={{ margin: 20 }}>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to={`/home`}>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to={`/society`}>Societies</Link></BreadcrumbItem>
                        <BreadcrumbItem active>IT Society</BreadcrumbItem>
                    </Breadcrumb>
                </div>

                <div id="mySidenav" className="sidenav">
                    <Link to="/createEvent" id="addEvent"><FontAwesome.FaPlus /> Create Event</Link>
                    <Link to="/createProfile/{this.props.params.societyId}" id="editProfile"><FontAwesome.FaBook /> Edit Profile</Link>
                    <Link to="/register_booth" id="bidSocietyBooth"><FontAwesome.FaAlignJustify /> Register Booth</Link>
                    <Link to="/submitProposal" id="submitProposal"><FontAwesome.FaFile /> Submit Proposal</Link>
                    <Link to="/manageMember" id="manageMember"><FontAwesome.FaUser /> Manage Member</Link>
                </div>

                <div>
                    <MuiThemeProvider>
                        {/* <h1>{this.props.params.societyId}</h1> */}
                        <div style={div1Style}>
                            <img style={imageStyle} src={ require('../assets/images/its.jpg') } />
                            <h1>{name}</h1>
                        </div>
                        <div style={div2Style}>
                            <h5>Category:</h5>
                            <p>{category}</p>
                            <h5>Vision</h5>
                            <p>{vision}</p>
                            <h5>Mision</h5>
                            <p>{mission}</p>
                            <h5>Description:</h5>
                            <p>
                                {desc}
                                {/* The biggest challenge to IT in the future is security. 
                                Security could negatively impact connectivity to public networks. 
                                If these problems cannot be successfully addressed, I envision a time of closed, private networks and less information sharing. 
                                The risks now are so great and getting worse every day that we even see foreign governments 
                                toppling superpowers the way Russia toppled the US and put its puppet in charge because of weak controls and poor security. */}
                            </p>
                            <br/>
                        </div>
                        <div style={div3Style}>
                            <RaisedButton label="Join Society" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleJoinClick(event)}/>
                            <RaisedButton label="List Events" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleListEventClick(event)}/>
                            <RaisedButton label="Back" primary={true} style={RaisedButtonStyle} onClick={(event) => window.history.back()}/>
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
      name: state.data.societyName,
      category: state.data.societyCategory,
      vision: state.data.societyVision,
      mission: state.data.societyMission,
      desc: state.data.societyDesc
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
      onRetrieveData: retrieveData
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(PerSociety);
