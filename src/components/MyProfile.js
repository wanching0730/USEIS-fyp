import React, { Component } from 'react';
import NavBar from './NavBar';
import LoadingBar from './LoadingBar';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {browserHistory} from 'react-router';
import moment from "moment";
import RaisedButton from 'material-ui/RaisedButton';
import Tooltip from 'rc-tooltip';
import * as FontAwesome from '../../node_modules/react-icons/lib/fa';
import { groupBy } from '../common/common_function';
import '../style/table.css';
import 'rc-tooltip/assets/bootstrap_white.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveAll, updateLoadingBar } from '../actions/data-action';

class MyProfile extends Component {

    constructor(props) {
        super(props);

        this.props.onUpdateLoadingBar();
        this.props.onRetrieveAll("societyEvent");
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    handleSocieties(event) {
        browserHistory.push("/myProfile");
    }

    handleEvents(event) {
        browserHistory.push("/myEvents");
    }

    render() {

        const { imageStyle, RaisedButtonStyle } = styles;
        let societies = this.props.societies;
        let societyEvents = this.props.allSocietyEvents;

        if(societies != null && societyEvents != null) {
            var rows = [];
            for(var i = 0; i < societies.length; i++) {
                var events = [];
                let society = societies[i];
                var editIcon, status;

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

                if(society["position"] == 'chairperson' ||  society["position"] == 'vice_chairperson') {
                    editIcon = 
                        <td>
                            <Tooltip placement="right" trigger={['hover']} overlay={<span>Edit Society Profile</span>}>
                                <Link to={`/createProfile/` + society["societyId"]}><FontAwesome.FaEdit /></Link>
                            </Tooltip>
                        </td>
                } else {
                    editIcon = <td></td>
                }
                
                if(society["memberStatus"] === 0)  
                    status = <td>Pending</td>;
                else if(society["memberStatus"] === 1)
                    status = <td>Approved</td>;
                else if(society["memberStatus"] === 2)
                    status = <td style={{color: "red"}}>Rejected</td>;

                rows.push(
                    <tr>
                        <td>{i+1}</td>
                        <td><img style={imageStyle} src={society["logoUrl"]} /></td>
                        <td><Link to={toSociety}>{society["name"]}</Link></td>
                        <td>
                            {this.props.userName.substring(0,2) != "00" ? 
                                moment(society["joinDate"]).format("DD/MM/YYYY") : society["joinDate"]}
                        </td>
                        <td>{society["position"]}</td>
                        {status}
                        <td>{events}</td>
                        {editIcon}
                    </tr>
                );
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

                    {this.props.loading ?
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
        userName: state.auth.userName,
        societies: state.auth.societies,
        allSocietyEvents: state.data.allSocietyEvents,
        loading: state.data.loading
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
      onRetrieveAll: retrieveAll,
      onUpdateLoadingBar: updateLoadingBar
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(MyProfile);
