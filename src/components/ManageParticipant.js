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

    handleApprove(event) {
        let studentId = event.target.value;
        this.setState({studentId: studentId})

        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <MuiThemeProvider>
                        <div className='custom-alert'>
                            <h1>Approval Confirmation</h1>
                            <p>Are you sure to approve this participant?</p>
                            <RaisedButton label="Yes" primary={true} onClick={() => {
                                        let data = {
                                            studentId: this.state.studentId,
                                            eventId: this.props.params.eventId
                                        }
                                        this.props.onUpdateData("participant", data, this.props.location.state["eventName"]);
                                    }
                                }/>
                            <RaisedButton label="No" primary={true} onClick={() => onClose()}/>
                        </div>
                    </MuiThemeProvider>
                )
            }
          })
    }

    handleDelete(event) {
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
                                if(this.props.userName.substring(0,2) === "00") 
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

        const { RaisedButtonStyle } = styles;
        let eventParticipant = this.props.eventParticipant;
        var message = <div></div>;
        var rows = [];

        if(eventParticipant != null) {
            if(eventParticipant.length != 0) {
                for(var i = 0; i < eventParticipant.length; i++) {
                    let participant = eventParticipant[i];
                    var approvedIcon;

                    if(participant["participantStatus"] == 1) 
                        approvedIcon = <td><li className="fa fa-check"></li></td>
                    else 
                        approvedIcon = <td><li value={participant["studentId"]} onClick={(event) => this.handleApprove(event)} className="fa fa-plus"></li></td>

                    rows.push(
                        <tr> 
                            <td>{i+1}</td>
                            <td>{participant["studentName"]}</td>
                            <td>{participant["ic"]}</td>
                            <td>{participant["course"]}</td>
                            <td>Y{participant["year"]}S{participant["semester"]}</td>
                            <td>{participant["contact"]}</td>
                            <td>{participant["email"]}</td>
                            <td>{participant["vegetarian"]}</td>
                            {approvedIcon}
                            <td><li value={participant["studentId"]} onClick={(event) => this.handleDelete(event)} className="fa fa-trash"></li></td>
                        </tr>
                    )
                }
            } else {
                message = <div style= {{ textAlign: "center", marginBottom: "20px"}}>No participant for this event</div>;
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

                {this.props.loading ?
                    [<LoadingBar />]
                    :
                    [
                        <div>
                            <MuiThemeProvider>

                                <div className="container" id="participantContainer">
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
                                                {rows}
                                            </tbody>
                                        </table>

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
        eventParticipant: state.data.eventParticipant,
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

export default connect(mapStateToProps, mapActionsToProps)(ManageParticipant);
