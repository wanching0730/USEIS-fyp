import React, {Component} from 'react';
import NavBar from './NavBar';
import { Link } from 'react-router';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import '../style/table.css';

import { connect } from 'react-redux';

class AboutMe extends Component {

    constructor(props){
        super(props);
    }

    render() {
        let user = this.props.user[0];
        const { RaisedButtonStyle } = styles;

        console.log("user in about me " + JSON.stringify(user));

        return (
            <div>
                <MuiThemeProvider>
                <div id="outerDiv"> 
                    <NavBar />

                    <div style={{ margin: 20 }}>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to={`/home`}>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>My Events</BreadcrumbItem>
                        </Breadcrumb>
                    </div>

                    <div style= {{ textAlign: "center" }}>
                        <RaisedButton label="My Societies" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleSocieties(event)}/>
                        <RaisedButton label="My Events" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleEvents(event)}/>
                    </div>

                    <div>
                        <div className="container" id="myEventContainer">
                            <div className="row">
                                <table id="table1">
                                    <thead>
                                        <tr>
                                            <th>Full Name</th>
                                            <th>StudentID</th>
                                            <th>Email</th> 
                                            <th>Phone Number</th> 
                                            <th>Course</th>
                                            <th>Year</th>
                                            <th>Semester</th>          
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td>{user["studentName"]}</td>
                                            <td>{user["username"]}</td>
                                            <td>{user["email"]}</td>
                                            <td>{user["contact"]}</td>
                                            <td>{user["course"]}</td>
                                            <td>{user["year"]}</td>
                                            <td>{user["semester"]}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                    

                                <div style= {{ margin: "0 auto" }}>
                                    <RaisedButton label="Back" primary={true} style={RaisedButtonStyle} onClick={(event) => window.history.back()}/>
                                </div>
                            </div>
                        </div>  
                    </div>
                }
                </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

const styles = {
    RaisedButtonStyle: {
        margin: 15
    }
}

const mapStateToProps = (state, props) => {
    return {
        user: state.auth.user
    };
};

export default connect(mapStateToProps)(AboutMe);