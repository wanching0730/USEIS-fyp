import React, { Component } from 'react';
import NavBar from './NavBar';
import LoadingBar from './LoadingBar';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import RaisedButton from 'material-ui/RaisedButton';
import { confirmAlert } from 'react-confirm-alert'; 
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router';
import '../style/table.css';
import '../style/alert.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveData, updateLoadingBar } from '../actions/data-action';
import { updateDouble } from '../actions/post-action';
import { deleteParticipation } from '../actions/delete-action';

class ManageParticipant extends Component {

    constructor(props) {
        super(props);

        this.props.onUpdateLoadingBar();
        this.props.onRetrieveData("eventParticipant", this.props.params.eventId);

        this.handleApprove = this.handleApprove.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    handleApprove(event, username) {
        let targetParticipantId = event.target.value;

        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <MuiThemeProvider>
                        <div className='custom-alert'>
                            <h1>Approval Confirmation</h1>
                            <p>Are you sure to approve this participant?</p>
                            <RaisedButton label="Yes" primary={true} onClick={() => {
                                        let data = {
                                            id: targetParticipantId,
                                            eventId: this.props.params.eventId
                                        }
                                        if(username.substring(0,2) === "00") 
                                            this.props.onUpdateData("staffParticipant", data, this.props.location.state["eventName"]);
                                        else 
                                        this.props.onUpdateData("studentParticipant", data, this.props.location.state["eventName"]);
                                    }
                                }/>
                            <RaisedButton label="No" primary={true} onClick={() => onClose()}/>
                        </div>
                    </MuiThemeProvider>
                )
            }
          })
    }

    handleDelete(event, username) {
        let targetParticipantId = event.target.value;
        let targetEventId = this.props.params.eventId;
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <MuiThemeProvider>
                        <div className='custom-alert'>
                            <h1>Delete Confirmation</h1>
                            <p>Are you sure to delete this participant?</p>
                            <RaisedButton label="Yes" primary={true} onClick={() => {    
                                if(username.substring(0,2) === "00") 
                                    this.props.onDeleteParticipation("staffParticipation", targetParticipantId, targetEventId);
                                else 
                                    this.props.onDeleteParticipation("studentParticipation", targetParticipantId, targetEventId);
                            }}/>
                            <RaisedButton label="No" primary={true} onClick={() => onClose()}/>
                        </div>
                    </MuiThemeProvider>
                )
            }
        })
    }

    render() {

        console.log(this.props.studentParticipant);
        console.log(this.props.staffParticipant);

        const { RaisedButtonStyle } = styles;
        let studentParticipants = this.props.studentParticipant;
        let staffParticipants = this.props.staffParticipant;
        var message = studentMessage = staffMessage = <div></div>;
        var studentRows = staffRows = studentHeader = staffHeader = [];

        if(studentParticipants != null || staffParticipants != null) {
            if(studentParticipants.length != 0) {
                for(var i = 0; i < studentParticipants.length; i++) {
                    let studentParticipant = studentParticipants[i];
                    var approvedIcon;

                    if(studentParticipant["participantStatus"] == 1) 
                        approvedIcon = <td><li className="fa fa-check"></li></td>
                    else 
                        approvedIcon = <td><li value={studentParticipant["id"]} onClick={(event) => this.handleApprove(event, studentParticipant["username"])} className="fa fa-plus"></li></td>

                    studentRows.push(
                        <tr> 
                            <td>{i+1}</td>
                            <td>{studentParticipant["name"]}</td>
                            <td>{studentParticipant["ic"]}</td>
                            <td>{studentParticipant["course"]}</td>
                            <td>Y{studentParticipant["year"]}S{studentParticipant["semester"]}</td>
                            <td>{studentParticipant["contact"]}</td>
                            <td>{studentParticipant["email"]}</td>
                            <td>{studentParticipant["vegetarian"]}</td>
                            {approvedIcon}
                            <td><li value={studentParticipant["id"]} onClick={(event) => this.handleDelete(event, studentParticipant["username"])} className="fa fa-trash"></li></td>
                        </tr>
                    )
                }
            } else {
                studentMessage = <div style= {{ margin: "0 auto", marginBottom: "20px", marginTop: "20px"}}>No student participant for this event</div>;
            }

            if(staffParticipants.length != 0) {
                for(var i = 0; i < staffParticipants.length; i++) {
                    let staffParticipant = staffParticipants[i];
                    var approvedIcon;

                    if(staffParticipant["participantStatus"] == 1) 
                        approvedIcon = <td><li className="fa fa-check"></li></td>
                    else 
                        approvedIcon = <td><li value={staffParticipant["id"]} onClick={(event) => this.handleApprove(event, staffParticipant["username"])} className="fa fa-plus"></li></td>

                    staffRows.push(
                        <tr> 
                            <td>{i+1}</td>
                            <td>{staffParticipant["name"]}</td>
                            <td>{staffParticipant["ic"]}</td>
                            <td>{staffParticipant["contact"]}</td>
                            <td>{staffParticipant["email"]}</td>
                            <td>{staffParticipant["vegetarian"]}</td>
                            {approvedIcon}
                            <td><li value={staffParticipant["id"]} onClick={(event) => this.handleDelete(event, staffParticipant["username"])} className="fa fa-trash"></li></td>
                        </tr>
                    )
                }
            } else {
                staffMessage = <div style= {{ margin: "0 auto", marginBottom: "20px", marginTop: "20px"}}>No staff participant for this event</div>;
            } 
        } else {
            message = <div style= {{ margin: "0 auto", marginBottom: "20px", marginTop: "20px"}}>No participant for this event</div>;
        }
        
        return (
            <div id="outerDiv"> 
                <NavBar />

                <div style={{ margin: 20 }}>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to={`/home`}>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to={`/event`}>Events</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to={{pathname:`/perEvent/` + this.props.params.eventId, state: {eventName: this.props.location.state["eventName"]}}}>{this.props.location.state["eventName"]}</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Manage Participants</BreadcrumbItem>
                    </Breadcrumb>
                </div>

                {this.props.loading ?
                    [<LoadingBar />]
                    :
                    [
                        <div>
                            <MuiThemeProvider>
                                <div className="container" id="studentParticipantContainer">
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
                                                    <th>Vegetarian</th>    
                                                    <th  colSpan="2">Actions</th>        
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {studentRows}
                                            </tbody>
                                        </table>    
                                        {studentMessage}  
                                    </div>
                                </div>

                                <div className="container" id="staffParticipantContainer">
                                    <div className="row"> 
                                        <table id="table1" border="1">
                                            <thead>
                                                <tr>
                                                    <th>No.</th>
                                                    <th>Name</th>
                                                    <th>IC Number</th>   
                                                    <th>Phone Number</th>   
                                                    <th>Email Address</th>   
                                                    <th>Vegetarian</th>    
                                                    <th  colSpan="2">Actions</th>        
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {staffRows}
                                            </tbody>
                                        </table>
                                        {staffMessage}
                                    </div>
                                </div>

                                {message}

                                <div style= {{ textAlign: "center", marginTop: "20px" }}>
                                    <RaisedButton label="Back" primary={true} style={RaisedButtonStyle} onClick={(event) => window.history.back()}/>
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
        studentParticipant: state.data.studentParticipant,
        staffParticipant: state.data.staffParticipant,
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

export default connect(mapStateToProps, mapActionsToProps)(ManageParticipant);
