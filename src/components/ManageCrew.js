import React, { Component } from 'react';
import NavBar from './NavBar';
import LoadingBar from './LoadingBar';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import RaisedButton from 'material-ui/RaisedButton';
import Tooltip from 'rc-tooltip';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { confirmAlert } from 'react-confirm-alert'; 
import { Link } from 'react-router';
import openSocket from 'socket.io-client';
import '../style/table.css';
import '../style/alert.css';
import 'rc-tooltip/assets/bootstrap_white.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveData, updateLoadingBar, exportData } from '../actions/data-action';
import { updateDouble } from '../actions/post-action';
import { deleteParticipation, updateDeleteLoadingBar } from '../actions/delete-action';

class ManageCrew extends Component {

    constructor(props) {
        super(props);

        this.state = {
            studentId: -1,
            eventCrew: null,
            societyCrew: null
        };

        this.props.onUpdateLoadingBar();

        if(this.props.params.type === "event")
            this.props.onRetrieveData("eventCrew", this.props.params.id);
        else
            this.props.onRetrieveData("societyCrew", this.props.params.id);

        this.handleApprove = this.handleApprove.bind(this);
        this.handleReject = this.handleReject.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.updateList = this.updateList.bind(this);
        this.exportData = this.exportData.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);

        const socket = openSocket('http://localhost:5000');
        socket.on('updateManage', this.updateList);
    }

    componentWillReceiveProps(nextProps){
        console.log("this props: " + JSON.stringify(this.props.societyCrew));
        console.log("next props: " + JSON.stringify(nextProps.societyCrew));

        if(this.props.params.type === "event") {
            if((nextProps.eventCrew != this.props.eventCrew) && (nextProps.eventCrew != null)) {
                this.setState({
                    eventCrew: nextProps.eventCrew
                });
            }
        } else {
            if((nextProps.societyCrew != this.props.societyCrew) && (nextProps.societyCrew != null)) {
                this.setState({
                    societyCrew: nextProps.societyCrew
                });
            }
        }
    }

    updateList(data) {
        if(this.props.params.type === "event")
            if(this.state.eventCrew != null) {
                let list = this.state.eventCrew;
                for(var i = 0; i < list.length; i++) {
                    let item = list[i];
                    if(item["studentId"] == data["id"] && item["eventId"] == data["eventId"]) {
                        var index = list.indexOf(item);
                        list.splice(index, 1);
                    }
                }
                this.setState({ eventCrew: list });
            }
        else
            if(this.state.societyCrew != null) {
                let list = this.state.societyCrew;
                for(var i = 0; i < list.length; i++) {
                    let item = list[i];
                    if(item["studentId"] == data["id"] && item["societyId"] == data["societyId"]) {
                        var index = list.indexOf(item);
                        list.splice(index, 1);
                    }
                }
                this.setState({ societyCrew: list });
            }
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
                                <h2>Approval Confirmation</h2>
                                <p>Are you sure to approve this crew?</p>
                                <RaisedButton label="Yes" primary={true} onClick={() => {
                                            if(this.props.params.type === "event") {
                                                let data = {
                                                    studentId: this.state.studentId,
                                                    eventId: this.props.params.id
                                                }
                                                this.props.onUpdateData("crew", data, this.props.location.state["eventName"]);
                                            } else {
                                                let data = {
                                                    studentId: this.state.studentId,
                                                    societyId: this.props.params.id
                                                }
                                                this.props.onUpdateData("societyCrew", data, this.props.location.state["societyName"]);
                                            }
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

    handleReject(event) {
        let targetCrewId = event.target.value;
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <MuiThemeProvider>
                        <div className='custom-alert'>
                            <h2>Reject Confirmation</h2>
                            <p>Are you sure to reject this crew?</p>
                            <RaisedButton label="Yes" primary={true} onClick={() => {   
                                if(this.props.params.type === "event") {
                                    let data = {
                                        id: targetCrewId,
                                        eventId: this.props.params.id
                                    }
                                    this.props.onUpdateData("rejectCrew", data, this.props.location.state["eventName"]);
                                } else {
                                    let data = {
                                        id: targetCrewId,
                                        societyId: this.props.params.id
                                    }
                                    this.props.onUpdateData("rejectSocietyCrew", data, this.props.location.state["societyName"]);
                                }

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

    handleRemove(event) {
        let targetCrewId = event.target.value;
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <MuiThemeProvider>
                        <div className='custom-alert'>
                            <h2>Delete Confirmation</h2>
                            <p>Are you sure to remove this crew?</p>
                            <RaisedButton label="Yes" primary={true} onClick={() => {   
                                this.props.onUpdateDeleteLoadingBar(); 
                                if(this.props.params.type === "event") 
                                    this.props.onDeleteParticipation("eventCrew", targetCrewId, this.props.params.id);
                                else 
                                    this.props.onDeleteParticipation("societyCrew", targetCrewId, this.props.params.id);

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

    exportData() {
        this.props.onUpdateLoadingBar();

        if(this.props.params.type === "event") 
            this.props.onExportData("eventCrew", this.props.params.id);
        else
            this.props.onExportData("societyCrew", this.props.params.id);
    }

    render() {
        const { RaisedButtonStyle } = styles;
        var message = <div></div>;
        var rows = [], breadcrumbs, crew;
        
        if(this.props.params.type === "event") {
            crew = this.state.eventCrew;
            breadcrumbs = 
                <div style={{ margin: 20 }}>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to={`/home`}>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to={`/event`}>Events</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to={{pathname:`/perEvent/` + this.props.params.id, state: {eventName: this.props.location.state["eventName"]}}}>{this.props.location.state["eventName"]}</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Manage Crew</BreadcrumbItem>
                    </Breadcrumb>
                </div>
        } else {
            crew = this.state.societyCrew;

            breadcrumbs = 
                <div style={{ margin: 20 }}>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to={`/home`}>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to={`/event`}>Societies</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to={{pathname:`/perSociety/` + this.props.params.id, state: {societyName: this.props.location.state["societyName"]}}}>{this.props.location.state["societyName"]}</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Manage Crew</BreadcrumbItem>
                    </Breadcrumb>
                </div>
        }

        if(crew != null) {
            if(crew.length != 0) {
                for(var i = 0; i < crew.length; i++) {
                    let singleCrew = crew[i];
                    var approvedIcon, deleteIcon;
                    
                    if(singleCrew["status"] != 2) {
                        if(singleCrew["status"] == 1) 
                            approvedIcon = 
                                <td>
                                    <Tooltip placement="left" trigger={['hover']} overlay={<span>Approved</span>}>
                                        <li className="fa fa-check"></li>
                                    </Tooltip>
                                </td>
                        else if(singleCrew["status"] == 0) 
                            approvedIcon = 
                                <td>
                                    <Tooltip placement="left" trigger={['hover']} overlay={<span>Approve this crew</span>}>
                                        <li value={singleCrew["studentId"]} onClick={(event) => this.handleApprove(event)} className="fa fa-plus"></li>
                                    </Tooltip>
                                </td>
                        else 
                            approvedIcon = 
                                <td>
                                    <Tooltip placement="left" trigger={['hover']} overlay={<span>Cancelled</span>}>
                                        <div>-</div>
                                    </Tooltip>
                                </td>

                        if(singleCrew["status"] !=3) {
                            deleteIcon = 
                                <td>
                                    <Tooltip placement="right" trigger={['hover']} overlay={<span>Reject crew</span>}>
                                        <li value={singleCrew["studentId"]} onClick={(event) => this.handleReject(event)} className="fa fa-trash"></li>
                                    </Tooltip>
                                </td>
                        } else {
                            deleteIcon =
                                <td>
                                    <Tooltip placement="right" trigger={['hover']} overlay={<span>Remove crew</span>}>
                                        <li value={singleCrew["studentId"]} onClick={(event) => this.handleRemove(event)} className="fa fa-trash"></li>
                                    </Tooltip>
                                </td>
                        }
                                    

                        rows.push(
                            <tr> 
                                <td>{i+1}</td>
                                <td>{singleCrew["studentName"]}</td>
                                <td>{singleCrew["ic"]}</td>
                                <td>{singleCrew["course"]}</td>
                                <td>Y{singleCrew["year"]}S{singleCrew["semester"]}</td>
                                <td>{singleCrew["contact"]}</td>
                                <td>{singleCrew["email"]}</td>
                                <td>{singleCrew["position"]}</td>
                                {approvedIcon}
                                {deleteIcon}
                            </tr>
                        )
                    }
                }
            } else {
                message = <div style= {{ textAlign: "center", marginBottom: "20px"}}>No crew for this event</div>;
            }
        }
        
        return (
            <div id="outerDiv"> 
                <NavBar />

                {breadcrumbs}

                {this.props.loading || this.props.deleteLoading ?
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
                                            <RaisedButton label="Download" primary={true} style={RaisedButtonStyle} onClick={(event) => this.exportData()}/>
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
        societyCrew: state.data.societyCrew,
        userName: state.auth.userName,
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
      onUpdateDeleteLoadingBar: updateDeleteLoadingBar,
      onExportData: exportData
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(ManageCrew);
