import React, { Component } from 'react';
import NavBar from './NavBar';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {browserHistory, Router} from 'react-router';
import { confirmAlert } from 'react-confirm-alert';
import RaisedButton from 'material-ui/RaisedButton';
import * as FontAwesome from '../../node_modules/react-icons/lib/fa';
import '../style/society.css';
import { colors } from 'material-ui/styles';

class MyProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {society: []};
    }

    componentDidMount() {
        this.listSocieties();
    }

    listSocieties() {
        fetch(`http://localhost:5000/puppies`).then(result => result.json()).then(reply => this.setState({society: reply}));
    }

    handleSocieties(event) {
        browserHistory.push("/myProfile");
    }

    handleEvents(event) {
        browserHistory.push("/myEvents");
    }

    handleCancelCrew() {
        confirmAlert({
            title: 'Cancel Crew Registration Confirmation',
            message: 'Are you sure to cancel joining as crew for this event?',
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

    handleCancelEvent() {
        confirmAlert({
            title: 'Cancel Participation Confirmation',
            message: 'Are you sure to cancel participating this event?',
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

        const { imageStyle, RaisedButtonStyle } = styles;
        
        return (
            <div>
                <MuiThemeProvider>
                <div id="outerDiv"> 
                    <NavBar />

                    <div style={{ margin: 20 }}>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to={`/`}>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>My Events</BreadcrumbItem>
                        </Breadcrumb>
                    </div>

                    <div style= {{ textAlign: "center" }}>
                        <RaisedButton label="My Societies" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleSocieties(event)}/>
                        <RaisedButton label="My Events" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleEvents(event)}/>
                    </div>

                    <div className="container" id="tableContainer">
                        <div className="row">
                            <div className="panel-body">
                                <table className="table table-hover table-light" border="1">
                                <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Logo</th>
                                            <th>Events</th> 
                                            <th>Organisers</th> 
                                            <th>Date</th>
                                            <th>Rating Status</th>    
                                            <th colSpan="2">Actions</th>           
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td><img style={imageStyle} src={ require('../assets/images/image1.jpg') } /></td>
                                            <td> <Link to={`/perEvent/1`}>WorkShop</Link></td>
                                            <td><Link to={`/perSociety/1`}>IT Society</Link></td>
                                            <td>01/12/2018</td>
                                            <td>-</td>
                                            <td><Link onClick={this.handleCancelEvent}><FontAwesome.FaTrash /></Link></td>
                                            <td><Link onClick={this.handleCancelCrew}><FontAwesome.FaTimesCircle /></Link></td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td><img style={imageStyle} src={ require('../assets/images/image1.jpg') } /></td>
                                            <td><Link to={`/perEvent/1`}>Cardio Night Run</Link></td>
                                            <td><Link to={`/perSociety/1`}>First Aid Society</Link></td>
                                            <td>21/10/2018</td>
                                            <td>-</td>
                                            <td><Link onClick={this.handleCancelEvent}><FontAwesome.FaTrash /></Link></td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td><img style={imageStyle} src={ require('../assets/images/image1.jpg') } /></td>
                                            <td><Link to={`/perEvent/1`}>ES Camp</Link></td>
                                            <td><Link to={`/perSociety/1`}>Engineering Society</Link></td>
                                            <td>01/05/2018</td>
                                            <td>Done</td>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td><img style={imageStyle} src={ require('../assets/images/image1.jpg') } /></td>
                                            <td><Link to={`/perEvent/1`}>Sport Carnival</Link></td>
                                            <td><Link to={`/perSociety/1`}>Sport Club</Link></td>
                                            <td>17/01/2018</td>
                                            <td><Link to={`/feedback`}>Undone</Link></td>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr>
                                    
                                        {/* {this.state.society.map(row => {
                                            return (
                                                <tr>
                                                    <td><Link to={`/perSociety/`+row[0]}>{row[0]}</Link></td>
                                                    <td>{row[1]}</td>
                                                    <td>{row[3]}</td>
                                                </tr>
                                            );
                                        })} */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div style= {{ textAlign: "center" }}>
                        <RaisedButton label="Back" primary={true} style={RaisedButtonStyle} onClick={(event) => window.history.back()}/>
                    </div>

                </div>
                </MuiThemeProvider>
            </div>
        );
    };
    
};

const styles = {
    RaisedButtonStyle: {
        margin: 15
    },
    imageStyle: {
        height: "50px",
        width: "50px"
    }
}

export default MyProfile;
