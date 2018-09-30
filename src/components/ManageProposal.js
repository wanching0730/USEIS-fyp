import React, { Component } from 'react';
import NavBar from './NavBar';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {browserHistory} from 'react-router';
import $ from 'jquery';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; 
import * as FontAwesome from '../../node_modules/react-icons/lib/fa';
import { Link } from 'react-router';
import '../style/society.css';

class ManageProposal extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    handleSocieties(event) {
        browserHistory.push("/manageBooth");
    }

    handleEvents(event) {
        browserHistory.push("/manageEventBooth");
    }

    handleApprove() {
        confirmAlert({
            title: 'Approval Confirmation',
            message: 'Are you sure to approve this proposal?',
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
                        <BreadcrumbItem active>Manage Proposal</BreadcrumbItem>
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
                                            <th>Societies</th>
                                            <th>Events</th>
                                            <th>File</th>
                                            <th>Action</th>                 
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr> 
                                            <td>1</td>
                                            <td>Sport Club</td>
                                            <td>Sport Festival</td>
                                            <td>
                                                <RaisedButton label="Download" primary={false} style={RaisedButtonStyle} />
                                            </td>
                                            <td><Link onClick={this.handleApprove}><FontAwesome.FaPlus /></Link></td>
                                        </tr> 
                                        <tr> 
                                            <td>3</td>
                                            <td>Music Club</td>
                                            <td>USTAR 8</td>
                                            <td>
                                                <RaisedButton label="Download" primary={false} style={RaisedButtonStyle} />
                                            </td>
                                            <td><FontAwesome.FaCheck /></td>
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

export default ManageProposal;
