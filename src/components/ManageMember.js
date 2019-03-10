import React, { Component } from 'react';
import NavBar from './NavBar';
import LoadingBar from './LoadingBar';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { confirmAlert } from 'react-confirm-alert'; 
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router';
import openSocket from 'socket.io-client';
import '../style/table.css';
import '../style/alert.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveData, updateLoadingBar, exportData } from '../actions/data-action';
import { updateDouble } from '../actions/post-action';
import { deleteParticipation, updateDeleteLoadingBar } from '../actions/delete-action';

class ManageMember extends Component {

    constructor(props) {
        super(props);

        this.state = {
            studentId: -1,
            societyMembers: null
        };

        this.props.onUpdateLoadingBar();
        this.props.onRetrieveData("societyMember", this.props.params.societyId);

        this.updateList = this.updateList.bind(this);
        this.handleApprove = this.handleApprove.bind(this);
        this.handleReject = this.handleReject.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.exportData = this.exportData.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);

        const socket = openSocket('http://localhost:5000');
        socket.on('updateManage', this.updateList);
    }

    componentWillReceiveProps(nextProps){
        console.log("this props: " + JSON.stringify(this.props.societyMembers));
        console.log("next props: " + JSON.stringify(nextProps.societyMembers));

        if((nextProps.societyMembers != this.props.societyMembers) && (nextProps.societyMembers != null)) {
            this.setState({
                societyMembers: nextProps.societyMembers
            });
        }
    }

    updateList(data) {
        if(data["type"] == "rejectSociety") {
            if(this.state.societyMembers != null) {
                let list = this.state.societyMembers;
                for(var i = 0; i < list.length; i++) {
                    let item = list[i];
                    if(item["username"] == data["username"] && this.props.params.societyId == data["societyId"]) {
                        var index = list.indexOf(item);
                        list.splice(index, 1);
                    }
                }
                this.setState({ societyMembers: list });
            }
        }
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
                            <p>Are you sure to approve this member?</p>
                            <RaisedButton label="Yes" primary={true} onClick={() => {
                                        let data = {
                                            studentId: this.state.studentId,
                                            societyId: this.props.params.societyId
                                        }
                                        this.props.onUpdateData("member", data, this.props.location.state["societyName"]);
                                    }
                                }/>
                            <RaisedButton label="No" primary={true} onClick={() => onClose()}/>
                        </div>
                    </MuiThemeProvider>
                )
            }
          })
    }

    handleReject(event,name) {
        let targetMemberId = event.target.value;
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <MuiThemeProvider>
                        <div className='custom-alert'>
                            <h1>Reject Confirmation</h1>
                            <p>Are you sure to reject this member?</p>
                            <RaisedButton label="Yes" primary={true} onClick={() => {    
                                
                                let data = {
                                    id: targetMemberId,
                                    societyId: this.props.params.societyId,
                                    username: name
                                }

                                this.props.onUpdateData("rejectStudentSociety", data, this.props.location.state["societyName"]);

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
        let targetMemberId = event.target.value;
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <MuiThemeProvider>
                        <div className='custom-alert'>
                            <h1>Delete Confirmation</h1>
                            <p>Are you sure to remove this member?</p>
                            <RaisedButton label="Yes" primary={true} onClick={() => {    
                                
                                this.props.onUpdateDeleteLoadingBar();
                                this.props.onDeleteParticipation("studentSociety", targetMemberId, this.props.params.societyId);

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
        this.props.onExportData("societyMember", this.props.params.societyId);
    }

    render() {

        const { RaisedButtonStyle } = styles;
        let societyMembers = this.state.societyMembers;
        var message = <div></div>;
        var rows = [];

        if(societyMembers != null) {
            if(societyMembers.length != 0) {
                for(var i = 0; i < societyMembers.length; i++) {
                    let member = societyMembers[i];
                    var approvedIcon, deleteIcon;

                    if(member["status"] != 2) {
                        if(member["status"] == 1) 
                            approvedIcon = 
                                <td>
                                    <Tooltip title="Approved" placement="left">
                                        <li className="fa fa-check"></li>
                                    </Tooltip>
                                </td>
                        else if(member["status"] == 0)
                            approvedIcon = 
                                <td>
                                    <Tooltip title="Approve Member" placement="left">
                                        <li value={member["studentId"]} onClick={(event) => this.handleApprove(event)} className="fa fa-plus"></li>
                                    </Tooltip>
                                </td>
                        else 
                            approvedIcon = 
                                <td>
                                    <Tooltip title="Cancelled" placement="left">
                                        <div>-</div>
                                    </Tooltip>
                                </td>

                        if(member["status"] != 3) {
                            deleteIcon = 
                                <td>
                                    <Tooltip title="Reject Member" placement="right">
                                        <li value={member["studentId"]} onClick={(event) => this.handleReject(event,member["username"])} className="fa fa-trash"></li>
                                    </Tooltip>
                                </td>
                        } else {
                            deleteIcon = 
                                <td>
                                    <Tooltip title="Remove Member" placement="right">
                                        <li value={member["studentId"]} onClick={(event) => this.handleRemove(event)} className="fa fa-trash"></li>
                                    </Tooltip>
                                </td>
                        }

                        rows.push(
                            <tr> 
                                <td>{i+1}</td>
                                <td>{member["studentName"]}</td>
                                <td>{member["ic"]}</td>
                                <td>{member["course"]}</td>
                                <td>Y{member["year"]}S{member["semester"]}</td>
                                <td>{member["contact"]}</td>
                                <td><span>{member["email"]}</span></td>
                                {approvedIcon}
                                {deleteIcon}
                            </tr>
                        )
                    }
                }
            } else {
                message = <div style= {{ textAlign: "center", marginBottom: "20px"}}>No member for this society</div>;
            }
        }

        return (
            <div id="outerDiv"> 
                <NavBar />

                <div style={{ margin: 20 }}>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to={`/home`}>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to={`/society`}>Societies</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to={{pathname:`/perSociety/` + this.props.params.societyId, state: {societyName: this.props.location.state["societyName"]}}}>{this.props.location.state["societyName"]}</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Manage Member</BreadcrumbItem>
                    </Breadcrumb>
                </div>

                {this.props.loading || this.props.deleteLoading ?
                    [<LoadingBar />]
                    :
                    [
                        <div>
                            <MuiThemeProvider>
                                <div className="container" id="memberContainer">
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
                                                    <th  colSpan="2">Action</th>                 
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {rows}                                       
                                            </tbody>
                                        </table>

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
        societyMembers: state.data.societyMembers,
        loading: state.data.loading,
        deleteLoading: state.delete.loading
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
      onRetrieveData: retrieveData,
      onUpdateData: updateDouble,
      onUpdateLoadingBar: updateLoadingBar,
      onDeleteParticipation: deleteParticipation,
      onUpdateDeleteLoadingBar: updateDeleteLoadingBar,
      onExportData: exportData
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(ManageMember);
