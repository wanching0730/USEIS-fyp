import React, { Component } from 'react';
import NavBar from './NavBar';
import LoadingBar from './LoadingBar';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { confirmAlert } from 'react-confirm-alert'; 
import { Link } from 'react-router';
import '../style/table.css';
import '../style/alert.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveData, updateLoadingBar } from '../actions/data-action';
import { updateDouble } from '../actions/post-action';
import { deleteParticipation } from '../actions/delete-action';

class ManageCrew extends Component {

    constructor(props) {
        super(props);

        this.state = {
            studentId: -1
        };

        this.props.onUpdateLoadingBar();
        this.props.onRetrieveData("eventCrew", this.props.params.eventId);

        this.handleApprove = this.handleApprove.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    handleApprove(event) {
        let studentId = event.target.value;
        this.setState({studentId: studentId})

        setTimeout(() => {
            confirmAlert({
                customUI: ({ onClose }) => {
                    return (
                        <MuiThemeProvider>
                            <div className='custom-alert'>
                                <h1>Approval Confirmation</h1>
                                <p>Are you sure to approve this crew?</p>
                                <RaisedButton label="Yes" primary={true} onClick={() => {
                                            let data = {
                                                studentId: this.state.studentId,
                                                eventId: this.props.params.eventId
                                            }
                                            this.props.onUpdateData("crew", data, this.props.location.state["eventName"]);
                                        }
                                    }/>
                                <RaisedButton label="No" primary={true} onClick={() => onClose()}/>
                            </div>
                        </MuiThemeProvider>
                    )
                }
              })
        }, 2000);
    }

    handleDelete(event) {
        let targetCrewId = event.target.value;
        let targetEventId = this.props.params.eventId;
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <MuiThemeProvider>
                        <div className='custom-alert'>
                            <h1>Delete Confirmation</h1>
                            <p>Are you sure to delete this crew?</p>
                            <RaisedButton label="Yes" primary={true} onClick={() => {    
                                this.props.onDeleteParticipation("eventCrew", targetCrewId, targetEventId);
                            }}/>
                            <RaisedButton label="No" primary={true} onClick={() => onClose()}/>
                        </div>
                    </MuiThemeProvider>
                )
            }
        })
    }

    render() {

        const { RaisedButtonStyle } = styles;
        let eventCrew = this.props.eventCrew;
        var message = <div></div>;
        var rows = [];
        console.log("event's crew: " + JSON.stringify(this.props.eventCrew));

        if(eventCrew != null) {
            if(eventCrew.length != 0) {
                for(var i = 0; i < eventCrew.length; i++) {
                    let crew = eventCrew[i];
                    console.log("student id: " + crew["studentId"]);
                    var approvedIcon;

                    if(crew["crewStatus"] == 1) 
                        approvedIcon = <td><li className="fa fa-check"></li></td>
                    else 
                        approvedIcon = <td><li value={crew["studentId"]} onClick={(event) => this.handleApprove(event)} className="fa fa-plus"></li></td>

                    rows.push(
                        <tr> 
                            <td>{i+1}</td>
                            <td>{crew["studentName"]}</td>
                            <td>{crew["ic"]}</td>
                            <td>{crew["course"]}</td>
                            <td>Y{crew["year"]}S{crew["semester"]}</td>
                            <td>{crew["contact"]}</td>
                            <td>{crew["email"]}</td>
                            <td>{crew["position"]}</td>
                            {approvedIcon}
                            <td><li value={crew["studentId"]} onClick={(event) => this.handleDelete(event)} className="fa fa-trash"></li></td>
                        </tr>
                    )
                }
            } else {
                message = <div style= {{ textAlign: "center", marginBottom: "20px"}}>No crew for this event</div>;
            }
        }
        
        return (
            <div id="outerDiv"> 
                <NavBar />

                <div style={{ margin: 20 }}>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to={`/home`}>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to={`/event`}>Events</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to={{pathname:`/perEvent/` + this.props.params.eventId, state: {eventName: this.props.location.state["eventName"]}}}>{this.props.location.state["eventName"]}</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Manage Crew</BreadcrumbItem>
                    </Breadcrumb>
                </div>

                {this.props.loading ?
                    [<LoadingBar />]
                    :
                    [
                        <div>
                            <MuiThemeProvider>

                                <div className="container" id="crewContainer">
                                    <div className="row">           
                                        <table id="table1" border="1">
                                            <thead>
                                                <tr>
                                                    <th>No.</th>
                                                    <th>Name</th>
                                                    <th>IC Number</th>   
                                                    <th>Course</th>  
                                                    <th>Year and Sem</th> 
                                                    <th>Phone Number</th>   
                                                    <th>Email Address</th>   
                                                    <th>Position</th>  
                                                    <th colSpan="2">Actions</th>               
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {rows}
                                            </tbody>
                                        </table>

                                        {message}

                                        <div style= {{ margin: "0 auto" }}>
                                            <RaisedButton label="Back" primary={true} style={RaisedButtonStyle} onClick={(event) => window.history.back()}/>
                                        </div> 
                                    </div>
                                </div>
                            </MuiThemeProvider>
                        </div>
                    ]
                }
        </div>
        );
    };
    
};

const styles = {
    RaisedButtonStyle: {
        margin: 15
    }
}

const mapStateToProps = (state, props) => {
    return {
        eventCrew: state.data.eventCrew,
        userName: state.auth.userName,
        loading: state.data.loading
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
      onRetrieveData: retrieveData,
      onUpdateData: updateDouble,
      onDeleteParticipation: deleteParticipation,
      onUpdateLoadingBar: updateLoadingBar
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(ManageCrew);
