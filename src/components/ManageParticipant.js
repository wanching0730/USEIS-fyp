import React, { Component } from 'react';
import NavBar from './NavBar';
import LoadingBar from './LoadingBar';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import RaisedButton from 'material-ui/RaisedButton';
import * as FontAwesome from '../../node_modules/react-icons/lib/fa';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router';
import '../style/table.css';
import '../style/alert.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveData, updateLoadingBar } from '../actions/data-action';
import { updateDouble } from '../actions/post-action';

class ManageParticipant extends Component {

    constructor(props) {
        super(props);

        this.props.onUpdateLoadingBar();
        this.props.onRetrieveData("eventParticipant", this.props.params.eventId);
    }

    componentDidMount() {
        window.scrollTo(0, 0)
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
                            <td>{participant["name"]}</td>
                            <td>{participant["ic"]}</td>
                            <td>{participant["course"]}</td>
                            <td>Y{participant["year"]}S{participant["semester"]}</td>
                            <td>{participant["contact"]}</td>
                            <td>{participant["email"]}</td>
                            <td>{participant["vegetarian"]}</td>
                            {approvedIcon}
                            <td><Link onClick={this.handleDelete}><FontAwesome.FaTrash /></Link></td>
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
                                        <table className="table1" border="1">
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
        loading: state.data.loading
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
      onRetrieveData: retrieveData,
      onUpdateData: updateDouble,
      onUpdateLoadingBar: updateLoadingBar
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(ManageParticipant);
