import React, { Component } from 'react';
import NavBar from './NavBar';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {browserHistory, Router} from 'react-router';
import { confirmAlert } from 'react-confirm-alert';
import RaisedButton from 'material-ui/RaisedButton';
import * as FontAwesome from '../../node_modules/react-icons/lib/fa';
import '../style/society.css';

import { connect } from 'react-redux';

class MyEvent extends Component {

    constructor(props) {
        super(props);

        this.state = {society: []};
    }

    componentDidMount() {
        //this.listSocieties();
        window.scrollTo(0, 0);
    }

    // listSocieties() {
    //     fetch(`http://localhost:5000/puppies`).then(result => result.json()).then(reply => this.setState({society: reply}));
    // }

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

    handleCancelEvent() {
        confirmAlert({
            title: 'Cancel Participation Confirmation',
            message: 'Are you sure to cancel participating this event?',
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
    
    render() {

        const { imageStyle, RaisedButtonStyle } = styles;
        let events = this.props.events;
        console.log("events in profile: " + JSON.stringify(events));

        var rows = [];
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
                    <td>{i}</td>
                    <td><img style={imageStyle} src={ require('../assets/images/sport.jpg') } /></td>
                    <td><Link to={`/perEvent/`+events[i]["eventId"]}>{events[i]["name"]}</Link></td>
                    <td><Link to={`/perSociety/1`}>{events[i]["organiser"]}</Link></td>
                    <td>{events[i]["joinDate"]}</td>
                    <td>-</td>
                    {position}
                    {crewStatus}
                    {isVege}
                    <td><Link onClick={this.handleCancelEvent}><FontAwesome.FaTrash /></Link></td>
                    <td><Link onClick={this.handleCancelCrew}><FontAwesome.FaTimesCircle /></Link></td>
                </tr>
            )
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
      events: state.auth.events,
    };
};

export default connect(mapStateToProps)(MyEvent);
