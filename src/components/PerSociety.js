import React, {Component} from 'react';
import NavBar from './NavBar';
import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory} from 'react-router';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

class PerSociety extends Component {

    constructor(props) {
        super(props);
    }

    handleJoinClick(event) {
        browserHistory.push("/register_society");
    }

    handleEditClick(event) {
        browserHistory.push("/createProfile/"+this.props.params.societyId);
    }

    handleBiddingClick(event) {
        browserHistory.push("/register_booth");
    }

    handleMemberClick(event) {
        browserHistory.push("/manageMember");
    }

    render() {

        const { RaisedButtonStyle, imageStyle, div1Style, div2Style, div3Style } = styles;

        return (
            <div>
                <NavBar />

                 <div style={{ margin: 20 }}>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to={`/`}>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><a href="#">Societies</a></BreadcrumbItem>
                        <BreadcrumbItem active>IT Society</BreadcrumbItem>
                    </Breadcrumb>
                </div>

                <div>
                    <MuiThemeProvider>
                        {/* <h1>{this.props.params.societyId}</h1> */}
                        <div style={div1Style}>
                            <img style={imageStyle} src={ require('../assets/images/image1.jpg') } />
                            <h1>IT Society</h1>
                        </div>
                        <div style={div2Style}>
                            <h5>Category:</h5>
                            <p>Technology</p>
                            <h5>Mision</h5>
                            <p>To promote IT information in UTAR</p>
                            <h5>Vision</h5>
                            <p>To increase reputation of IT Society in UTAR</p>
                            <h5>Description:</h5>
                            <p>
                                The biggest challenge to IT in the future is security. 
                                Security could negatively impact connectivity to public networks. 
                                If these problems cannot be successfully addressed, I envision a time of closed, private networks and less information sharing. 
                                The risks now are so great and getting worse every day that we even see foreign governments 
                                toppling superpowers the way Russia toppled the US and put its puppet in charge because of weak controls and poor security.
                            </p>
                            <br/>
                        </div>
                        <div style={div3Style}>
                            <RaisedButton label="Join Society" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleJoinClick(event)}/>
                            <RaisedButton label="Edit Profile" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleEditClick(event)}/>
                            <RaisedButton label="Register Booth" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleBiddingClick(event)}/>
                            <RaisedButton label="Manage Member" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleMemberClick(event)}/>
                        </div>
                    </MuiThemeProvider>
                </div>
            </div>
        );
    };
}

const styles = {
    RaisedButtonStyle: {
        margin: 15
    },
    imageStyle: {
        height: "200px",
        width: "200px",
        marginTop: "30px",
        
    }, 
    div1Style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    }, 
    div2Style: {
        marginLeft: "20px"
    }, 
    div3Style: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    }
}

export default PerSociety;
