import React, { Component } from 'react';
import NavBar from './NavBar';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { confirmAlert } from 'react-confirm-alert'; 
import * as FontAwesome from '../../node_modules/react-icons/lib/fa';
import { Link } from 'react-router';
import '../style/society.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveData } from '../actions/data-action';
import { updateDouble } from '../actions/post-action';

class ManageCrew extends Component {

    constructor(props) {
        super(props);

        this.state = {studentId: -1};

        this.props.onRetrieveData("eventCrew", this.props.params.eventId);
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    handleApprove(event) {
        let studentId = event.target.value;
        this.setState({studentId: studentId})

        setTimeout(() => {
            confirmAlert({
                title: 'Approval Confirmation',
                message: 'Are you sure to approve this crew?',
                buttons: [
                  {
                    label: 'Yes',
                    onClick: () => {
                        
                        let data = {
                            studentId: this.state.studentId,
                            eventId: this.props.params.eventId
                        }
                        this.props.onUpdateData("crew", data);
                    }
                  },
                  {
                    label: 'No',
                    onClick: () => console.log('Click No')
                  }
                ]
              })
        }, 2000);
    }

    handleDelete() {
        confirmAlert({
            title: 'Delete Confirmation',
            message: 'Are you sure to delete this crew?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    console.log('Click Yes');
                }
              },
              {
                label: 'No',
                onClick: () => console.log('Click No')
              }
            ]
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
                            <td>Lim Heng Hao</td>
                            <td>{crew["ic"]}</td>
                            <td>{crew["course"]}</td>
                            <td>Y{crew["year"]}S{crew["semester"]}</td>
                            <td>{crew["contact"]}</td>
                            <td>{crew["email"]}</td>
                            <td>{crew["position"]}</td>
                            {approvedIcon}
                            <td><Link onClick={this.handleDelete}><FontAwesome.FaTrash /></Link></td>
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
                        <BreadcrumbItem><Link to={`/perEvent/1`}>Cardio Night Run</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Manage Crew</BreadcrumbItem>
                    </Breadcrumb>
                </div>

                <div>
                    <MuiThemeProvider>

                    <div className="container" id="tableContainer">
                        <div className="row">
                            <div className="panel-body">
                                <table className="table table-hover table-light" border="1">
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

                                <div style= {{ textAlign: "center" }}>
                                    <RaisedButton label="Back" primary={true} style={RaisedButtonStyle} onClick={(event) => window.history.back()}/>
                                </div>

                            </div>
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
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
        eventCrew: state.data.eventCrew
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
      onRetrieveData: retrieveData,
      onUpdateData: updateDouble
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(ManageCrew);
