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

class PerEvent extends Component {

    constructor(props) {
        super(props);
    }

    handleEvent(event) {
        browserHistory.push("/register_event");
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
                onClick: () => console.log('Click Yes')
              },
              {
                label: 'No',
                onClick: () => console.log('Click No')
              }
            ]
          })
    }

    render() {

        const { RaisedButtonStyle, imageStyle, div1Style, div2Style, div3Style } = styles;

        return (
            <div>
                <NavBar />

                 <div style={{ margin: 20 }}>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to={`/`}>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to={`/society`}>Societies</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Cardio Night Run</BreadcrumbItem>
                    </Breadcrumb>
                </div>

                <div id="mySidenav" class="sidenav">
                    <a href="/createEvent/1" id="editEvent"><FontAwesome.FaEdit /> Edit Event</a>
                    <a href="#" onClick={this.handleDelete} id="deleteEvent"><FontAwesome.FaTrash /> Delete Event</a>
                    <a href="/register_booth" id="bidBooth"><FontAwesome.FaAlignJustify /> Register Booth</a>
                </div>

                <div>
                    <MuiThemeProvider>
                        {/* <h1>{this.props.params.societyId}</h1> */}
                        <div style={div1Style}>
                            <img style={imageStyle} src={ require('../assets/images/image1.jpg') } />
                            <h1>Cardio Night Run</h1>
                        </div>
                        <div style={div2Style}>
                            <h5>Category:</h5>
                            <p>Sport</p>
                            <h5>Description:</h5>
                            <p>
                                The biggest challenge to IT in the future is security. 
                                Security could negatively impact connectivity to public networks. 
                                If these problems cannot be successfully addressed, I envision a time of closed, private networks and less information sharing. 
                                The risks now are so great and getting worse every day that we even see foreign governments 
                                toppling superpowers the way Russia toppled the US and put its puppet in charge because of weak controls and poor security.
                            </p>
                            <h5>Date:</h5>
                            <p>28/09/2018</p>
                            <h5>Time:</h5>
                            <p>7pm - 10pm</p>
                            <h5>Venue:</h5>
                            <p>UTAR</p>
                            <h5>Fee:</h5>
                            <p>RM35</p>
                            <h5>Chairperson:</h5>
                            <p><a href="https://www.facebook.com/ho.m.hm">Leong Hao Meng</a></p>
                            <h5>Contact Number:</h5>
                            <p>018-9900890</p>
                            <br/>
                        </div>
                        <div style={div3Style}>
                        <RaisedButton label="Join Event" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleEvent(event)}/>
                        <RaisedButton label="Join Crew" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleCrew(event)}/>
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

export default PerEvent;
