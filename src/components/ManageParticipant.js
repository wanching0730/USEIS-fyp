import React, { Component } from 'react';
import NavBar from './NavBar';
import LoadingBar from './LoadingBar';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import RaisedButton from 'material-ui/RaisedButton';
import { confirmAlert } from 'react-confirm-alert'; 
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router';
import openSocket from 'socket.io-client';
import '../style/table.css';
import '../style/alert.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveData, updateLoadingBar } from '../actions/data-action';
import { updateDouble } from '../actions/post-action';
import { deleteParticipation, updateDeleteLoadingBar } from '../actions/delete-action';

class ManageParticipant extends Component {

    constructor(props) {
        super(props);

        this.state = {
            studentParticipant: null,
            staffParticipant: null
        };

        this.props.onUpdateLoadingBar();
        this.props.onRetrieveData("eventParticipant", this.props.params.eventId);

        this.handleApprove = this.handleApprove.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.updateList = this.updateList.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);

        const socket = openSocket('http://localhost:5000');
        socket.on('updateParticipation', this.updateList);
    }

    componentWillReceiveProps(nextProps){
        console.log("this props: " + JSON.stringify(this.props.studentParticipant));
        console.log("next props: " + JSON.stringify(nextProps.studentParticipant));
        if((nextProps.studentParticipant != this.props.studentParticipant) && (nextProps.studentParticipant != null)) {
            this.setState({
                studentParticipant: nextProps.studentParticipant
            });
        }
    }

    updateList(data) {
        let list = this.state.studentParticipant;
        console.log("state in update list: " + JSON.stringify(this.state.studentParticipant));
        for(var i = 0; i < list.length; i++) {
            let item = list[i];
            if(item["id"] == data["studentId"] && item["eventId"] == data["eventId"]) {
                var index = list.indexOf(item);
                list.splice(index, 1);
            }
        }
        this.setState({ studentParticipant: list });
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
                                this.props.onUpdateDeleteLoadingBar();

                                if(username.substring(0,2) === "00") 
                                    this.props.onDeleteParticipation("staffParticipant", targetParticipantId, targetEventId);
                                else 
                                    this.props.onDeleteParticipation("studentParticipant", targetParticipantId, targetEventId);

                                onClose();
                            }}/>
                            &nbsp;&nbsp;&nbsp;
                            <RaisedButton label="No" primary={true} onClick={() => onClose()}/>
                        </div>
                    </MuiThemeProvider>
                )
            }
        })
    }

    render() {
        console.log("loading in render: " + this.props.deleteLoading);
        const { RaisedButtonStyle } = styles;
        let studentParticipants = this.state.studentParticipant;
        let staffParticipants = this.props.staffParticipant;
        var studentMessage = <div></div>;
        var staffMessage = <div></div>;
        var studentRows = [];
        var staffRows = [];

        if(studentParticipants != null) {
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
        }

        if(staffParticipants != null) {
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

                {this.props.loading || this.props.deleteLoading ?
                    [<LoadingBar />]
                    :
                    [
                        <div>
                            <MuiThemeProvider>
                                <div style= {{ textAlign: "center", marginTop: "20px"}}><strong>Student Participants</strong></div>
                                {window.screen.availWidth < 768 && this.props.studentParticipant == null ?
                                [
                                    <div style= {{ textAlign: "center", marginTop: "20px"}}>{studentMessage}</div>
                                ]
                                :
                                [
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
                                ]}
                                
                                <br/>
                                <div style= {{ textAlign: "center", marginTop: "50px"}}><strong>Staff Participants</strong></div>
                                {window.screen.availWidth < 768 && this.props.staffParticipant == null ?
                                [
                                    <div style= {{ textAlign: "center", marginTop: "20px"}}>{staffMessage}</div>
                                ]
                                :
                                [
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
                                ]}

                                <div style= {{ textAlign: "center", marginTop: "40px" }}>
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
        loading: state.data.loading,
        deleteLoading: state.delete.loading
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
      onRetrieveData: retrieveData,
      onUpdateData: updateDouble,
      onDeleteParticipation: deleteParticipation,
      onUpdateLoadingBar: updateLoadingBar,
      onUpdateDeleteLoadingBar: updateDeleteLoadingBar
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(ManageParticipant);
