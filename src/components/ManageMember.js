import React, { Component } from 'react';
import NavBar from './NavBar';
import LoadingBar from './LoadingBar';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { confirmAlert } from 'react-confirm-alert'; 
import Tooltip from '@material-ui/core/Tooltip';
import { CSVLink } from "react-csv";
import { Link } from 'react-router';
import openSocket from 'socket.io-client';
import { API_BASE_URL } from '../constant';
import '../style/table.css';
import '../style/alert.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveData, updateLoadingBar } from '../actions/data-action';
import { updateDouble } from '../actions/post-action';
import { deleteParticipation, updateDeleteLoadingBar } from '../actions/delete-action';

class ManageMember extends Component {

    constructor(props) {
        super(props);

        if(!this.props.isAuthenticated) {
            window.location.assign('/');
        }

        this.state = {
            studentId: -1,
            societyMembers: null,
            headers: [
                { label: "No.", key: "number" },
                { label: "Name", key: "name" },
                { label: "IC", key: "ic" },
                { label: "Course", key: "course" },
                { label: "Year and Sem", key: "year" },
                { label: "Phone Number", key: "phone" },
                { label: "Email Address", key: "email" },
                { label: "Vegetarian", key: "vegetarian" }
            ], data: []
        };

        this.props.onUpdateLoadingBar();
        this.props.onRetrieveData("societyMember", this.props.params.societyId);

        this.updateList = this.updateList.bind(this);
        this.handleApprove = this.handleApprove.bind(this);
        this.handleReject = this.handleReject.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);

        const socket = openSocket(API_BASE_URL);
        socket.on('updateManage', this.updateList);
    }


    componentWillReceiveProps(nextProps){
        if((nextProps.societyMembers != this.props.societyMembers) && (nextProps.societyMembers != null)) {
            this.setState({
                societyMembers: nextProps.societyMembers
            });

            this.setState({ data: [] });
            let sm = nextProps.societyMembers;
            let data = []

            for(var i = 0; i < sm.length; i++) {
                if(sm[i]["status"] == 1) {
                    data.push({
                        number: i+1, name: sm[i]["name"], ic: sm[i]["ic"], course: sm[i]["course"],
                        year: "Y"+sm[i]["year"]+"S"+sm[i]["semester"], phone: sm[i]["contact"],
                        email: sm[i]["email"], vegetarian: sm[i]["vegetarian"] ? "Yes" : "No"
                    })
                }
            }
            this.setState({ data: data });
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
        } else if(data["type"] == "approveSociety") {
            if(this.state.societyMembers != null) {
                let list = this.state.societyMembers;
                for(var i = 0; i < list.length; i++) {
                    let item = list[i];
                    if(item["username"] == data["username"] && this.props.params.societyId == data["societyId"]) {
                        item["status"] = 1;
                    }
                }
                this.setState({ societyMembers: list });
            }
        }
    }

    handleApprove(event,name) {
        let studentId = event.target.value;

        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <MuiThemeProvider>
                        <div className='custom-alert'>
                            <h1>Approval Confirmation</h1>
                            <p>Are you sure to approve this member?</p>
                            <RaisedButton label="Yes" primary={true} onClick={() => {
                                        let data = {
                                            studentId: studentId,
                                            societyId: this.props.params.societyId,
                                            username: name
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
                                        <li value={member["studentId"]} onClick={(event) => this.handleApprove(event,member["username"])} className="fa fa-plus"></li>
                                    </Tooltip>
                                </td>
                        else 
                            approvedIcon = 
                                <td>
                                    <Tooltip title="Cancelled by member" placement="left">
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
                                            <CSVLink data={this.state.data} headers={this.state.headers}>Download</CSVLink>
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
        deleteLoading: state.delete.loading,
        isAuthenticated: state.auth.isAuthenticated
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
      onRetrieveData: retrieveData,
      onUpdateData: updateDouble,
      onUpdateLoadingBar: updateLoadingBar,
      onDeleteParticipation: deleteParticipation,
      onUpdateDeleteLoadingBar: updateDeleteLoadingBar
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(ManageMember);
