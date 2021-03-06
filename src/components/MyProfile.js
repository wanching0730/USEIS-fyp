import React, { Component } from 'react';
import NavBar from './NavBar';
import LoadingBar from './LoadingBar';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { confirmAlert } from 'react-confirm-alert';
import {browserHistory} from 'react-router';
import moment from "moment";
import RaisedButton from 'material-ui/RaisedButton';
import Tooltip from '@material-ui/core/Tooltip';
import { groupBy } from '../common/common_function';
import openSocket from 'socket.io-client';
import { API_BASE_URL } from '../constant';
import '../style/table.css';
import 'rc-tooltip/assets/bootstrap_white.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateDouble } from '../actions/post-action';
import { deleteParticipation, updateDeleteLoadingBar } from '../actions/delete-action';
import { retrieveAll, retrieveData, updateLoadingBar } from '../actions/data-action';

class MyProfile extends Component {

    constructor(props) {
        super(props);

        if(!this.props.isAuthenticated) {
            window.location.assign('/');
        }

        this.state = {
            societies: null
        };

        this.updateList = this.updateList.bind(this);
        this.handleCancelSociety = this.handleCancelSociety.bind(this);
        this.handleRemoveSociety = this.handleRemoveSociety.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);

        this.props.onUpdateLoadingBar();
        this.props.onRetrieveAll("societyEvent");

        if(isNaN(this.props.userName))
            this.props.onRetrieveData("staffSociety", this.props.userId);
        else
            this.props.onRetrieveData("studentSociety", this.props.userId);

            
        const socket = openSocket(API_BASE_URL);
        socket.on('updateParticipation', this.updateList);
    }

    componentWillReceiveProps(nextProps){
        if((nextProps.userSocieties != this.props.userSocieties) || (nextProps.userSocieties != null)) {
            this.setState({
                societies: nextProps.userSocieties
            });
        }
    }

    updateList(data) {
        if(data["type"] === "removeSociety") {
            if(this.state.societies != null) {
                let list = this.state.societies;
                for(var i = 0; i < list.length; i++) {
                    let item = list[i];
                    if(item["societyId"] == data["societyId"] && this.props.userName == data["username"]) {
                        var index = list.indexOf(item);
                        list.splice(index, 1);
                    }
                }
                this.setState({ societies: list });
            }
        }
    }

    handleSocieties(event) {
        browserHistory.push("/myProfile");
    }

    handleEvents(event) {
        browserHistory.push("/myEvents");
    }

    handleCancelSociety(event) {
        let societyId = event.target.value;

        setTimeout(() => {
            confirmAlert({
                customUI: ({ onClose }) => {
                    return (
                        <MuiThemeProvider>
                            <div className='custom-alert'>
                                <h2>Cancel Society Registration Confirmation</h2>
                                <p>Are you sure to cancel joining this society?</p>
                                <RaisedButton label="Yes" primary={true} onClick={() => {

                                            let data = {
                                                id: this.props.userId,
                                                societyId: societyId,
                                                username: this.props.userName
                                            }

                                            if(isNaN(this.props.userName))
                                                this.props.onUpdateData("cancelStaffSociety", data, ""); 
                                            else
                                                this.props.onUpdateData("cancelStudentSociety", data, ""); 

                                            onClose();
                                        }
                                    }/>
                                    &nbsp;&nbsp;&nbsp;
                                <RaisedButton label="No" primary={true} onClick={() => onClose()}/>
                            </div>
                        </MuiThemeProvider>
                    )
                }
            })
        }, 2000);
    }

    handleRemoveSociety(event) {
        let societyId = event.target.value;

        setTimeout(() => {
            confirmAlert({
                customUI: ({ onClose }) => {
                    return (
                        <MuiThemeProvider>
                            <div className='custom-alert'>
                                <h2>Remove Society Registration Confirmation</h2>
                                <p>Are you sure to remove registration of this society?</p>
                                <RaisedButton label="Yes" primary={true} onClick={() => {

                                            this.props.onUpdateDeleteLoadingBar();

                                            if(isNaN(this.props.userName))
                                                this.props.onDeleteParticipation("staffSociety", this.props.userId, societyId);
                                            else
                                                this.props.onDeleteParticipation("studentSociety", this.props.userId, societyId);

                                            onClose();
                                        }
                                    }/>
                                    &nbsp;&nbsp;&nbsp;
                                <RaisedButton label="No" primary={true} onClick={() => onClose()}/>
                            </div>
                        </MuiThemeProvider>
                    )
                }
            })
        }, 2000);
    }

    render() {
        const { imageStyle, RaisedButtonStyle } = styles;
        let societies = this.state.societies;
        let societyEvents = this.props.allSocietyEvents;
        var message = <div></div>;

        if(societies != null && societyEvents != null) {
            if(societies.length != 0) {
                var rows = [];
                for(var i = 0; i < societies.length; i++) {
                    var events = [];
                    let society = societies[i];
                    var action, status;

                    if(society["status"] != 3) {
                        let toSociety = {
                            pathname: "/perSociety/" + society["societyId"],
                            state: {societyName: society["name"]}
                        }
                        
                        const ids = groupBy(societyEvents, societyEvent => societyEvent["societyId"]);
                        for (const [key, values] of ids.entries()) {
                            if(society["societyId"] == key) {
                                values.forEach(value => {
                                    let toEvent = {
                                        pathname: "/perEvent/" + value["eventId"],
                                        state: {eventName: value["eventName"]}
                                    }
                                    events.push(
                                        <li><Link to={toEvent}>{value["eventName"]}</Link></li>
                                    );
                                });
                            }    
                        }

                        if(society["status"] != 1) {
                            if(society["status"] != 2) {
                                action = 
                                    <td>
                                        <Tooltip title="Cancel registration" placement="left">
                                            <li value={society["societyId"]} onClick={(event) => this.handleCancelSociety(event)} className="fa fa-trash"></li>
                                        </Tooltip>
                                    </td>;
                            } else {
                                action = 
                                    <td>
                                       <Tooltip title="Remove Registration" placement="left">
                                            <li value={society["societyId"]} onClick={(event) => this.handleRemoveSociety(event)} className="fa fa-trash"></li>
                                        </Tooltip>
                                    </td>;
                            }
                        } else {
                            action = <td>-</td>;
                        }
                    
                       
                        if(society["status"] === 0)  
                            status = <td>Pending</td>;
                        else if(society["status"] === 1)
                            status = <td>Approved</td>;
                        else if(society["status"] === 2)
                            status = <td style={{color: "red"}}>Rejected</td>; 
                        

                        rows.push(
                            <tr>
                                <td>{i+1}</td>
                                <td><img style={imageStyle} src={society["logoUrl"]} /></td>
                                <td><Link to={toSociety}>{society["name"]}</Link></td>
                                <td>{moment(society["joinDate"]).format("DD/MM/YYYY")}</td>
                                <td>{society["roleName"]}</td>
                                {status}
                                <td>{events}</td>
                                {action}
                            </tr>
                        );
                        
                    }
                } 
            } else {
                message = <div style= {{ textAlign: "center", marginBottom: "20px"}}>No joined societies</div>;
            }
        }
        
        return (
            <div>
                <MuiThemeProvider>
                <div id="outerDiv"> 
                    <NavBar />

                    <div style={{ margin: 20 }}>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to={`/home`}>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>My Societies</BreadcrumbItem>
                        </Breadcrumb>
                    </div>

                    <div style= {{ textAlign: "center" }}>
                        <RaisedButton label="My Societies" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleSocieties(event)}/>
                        <RaisedButton label="My Events" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleEvents(event)}/>
                    </div>

                    {this.props.loading || this.state.societies == null ?
                        [<LoadingBar />]
                        :
                        [
                            <div>
                                <div className="container" id="profileContainer">
                                    <div className="row">  
                                        <table id="table1">
                                            <thead>
                                                <tr>
                                                    <th>No.</th>
                                                    <th>Logo</th>
                                                    <th>Society</th>  
                                                    <th>Joined Date</th>
                                                    <th>Position</th>
                                                    <th>Status</th>
                                                    <th>Events</th>   
                                                    <th>Action</th>           
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
                            </div>
                        ]
                    }
                </div>
                </MuiThemeProvider>
            </div>
        );
    };
};

const styles = {
    imageStyle: {
        height: "50px",
        width: "50px"
    },
    RaisedButtonStyle: {
        margin: 15
    },
}

const mapStateToProps = (state, props) => {
    return {
        userId: state.auth.id,
        userName: state.auth.userName,
        userSocieties: state.data.userSocieties,
        allSocietyEvents: state.data.allSocietyEvents,
        loading: state.data.loading,
        isAuthenticated: state.auth.isAuthenticated
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
      onRetrieveAll: retrieveAll,
      onRetrieveData: retrieveData,
      onUpdateLoadingBar: updateLoadingBar,
      onUpdateData: updateDouble,
      onDeleteParticipation: deleteParticipation,
      onUpdateDeleteLoadingBar: updateDeleteLoadingBar
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(MyProfile);
