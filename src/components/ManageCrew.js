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
import { deleteParticipation } from '../actions/delete-action';
import { retrieveData } from '../actions/data-action';

class ManageCrew extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    handleApprove() {
        confirmAlert({
            title: 'Approval Confirmation',
            message: 'Are you sure to approve this crew?',
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
                                        <tr> 
                                            <td>1</td>
                                            <td>Lim Heng Hao</td>
                                            <td>999999-99-9999</td>
                                            <td>Software Engineering</td>
                                            <td>Y1S3</td>
                                            <td>018-9900990</td>
                                            <td>henghao@hotmail.com</td>
                                            <td>Secretary</td>
                                            <td><Link onClick={this.handleApprove}><FontAwesome.FaPlus /></Link></td>
                                            <td><Link onClick={this.handleDelete}><FontAwesome.FaTrash /></Link></td>
                                        </tr>
                                    </tbody>
                                </table>

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

export default ManageCrew;
