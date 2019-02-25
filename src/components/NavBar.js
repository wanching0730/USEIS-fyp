import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import { CognitoUserPool } from "amazon-cognito-identity-js";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav,  NavItem, UncontrolledDropdown, 
    DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router';
import '../style/navbar.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logoutAndRedirect } from '../actions/auth-action';

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };

        this.onClick = this.onClick.bind(this);
        this.logout = this.logout.bind(this);
    }

    onClick(event) {
        let clickedTab = event.target.name;

        if(clickedTab == "createProfile") {
            browserHistory.push("/createProfile");
        } else if(clickedTab == "faq") {
            browserHistory.push("/faq");
        } else if(clickedTab == "manageBooth") {
            browserHistory.push("/manageBooth");
        } else if(clickedTab == "manageProposal") {
            browserHistory.push("/manageProposal");
        } else if(clickedTab == "aboutMe") {
            browserHistory.push("/aboutMe");
        }
    }

    logout() {
        this.props.onLogoutUser();
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {

        var dropDownItem;
        var position;
        let societies = this.props.societies;

        var poolData = {
            UserPoolId : 'us-east-2_lcnWhMXnd', 
            ClientId : '32j9lqg5k0sa3q6tts3lel12be' 
        };
        var userPool = new CognitoUserPool(poolData);

        if(societies != null) {
            for(var i = 0; i < societies.length; i++) {
                let p = societies[i]["roleName"];
                if(p == "Chairperson" || p == "Secretary") {
                    position = "committee";
                    break;
                }
                else if(p == "Officer" || p == "Advisor") {
                    position = "staff";
                    break;
                }
                else 
                    position = "student";
            }
        }
        
        if(position == "committee") {
            dropDownItem = 
            <DropdownMenu left="true">
                <DropdownItem name="manageBooth" onClick={this.onClick}>
                    Manage Booth
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem name="faq" onClick={this.onClick}>
                    FAQ
                </DropdownItem>
            </DropdownMenu>
        } else if(position == "staff") {
            dropDownItem = 
            <DropdownMenu left="true">
                <DropdownItem name="manageBooth" onClick={this.onClick}>
                    Manage Booth
                </DropdownItem>
                <DropdownItem name="createProfile" onClick={this.onClick}>
                    Create Society Profile
                </DropdownItem>
                {/* <DropdownItem name="manageProposal" onClick={this.onClick}>
                    Manage Proposal
                </DropdownItem> */}
                <DropdownItem divider />
                <DropdownItem name="faq" onClick={this.onClick}>
                    FAQ
                </DropdownItem>
            </DropdownMenu>
        } else {
            dropDownItem = 
            <DropdownMenu left="true">
                <DropdownItem name="faq" onClick={this.onClick}>
                    FAQ
                </DropdownItem>
            </DropdownMenu>
        }

        return (
            <div>
                {
                    userPool.getCurrentUser() != null ? [
                
                        <Navbar className="topnav" dark expand="md">
                        <NavbarBrand><img src={ require('../assets/images/utar.jpg') } /></NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    <i class="fa fa-home"></i><Link to="/home">Home</Link>
                                </NavItem>
                                &nbsp;
                                <NavItem>
                                    <i class="fa fa-align-left"></i><Link to="/newsFeed">NewsFeed</Link>
                                </NavItem>
                                &nbsp;
                                <NavItem>
                                    <i class="fa fa-globe"></i><Link to="/society">Societies</Link>
                                </NavItem>
                                &nbsp;
                                <NavItem>
                                    <i class="fa fa-calendar"></i><Link to="/event">Events</Link>
                                </NavItem>
                                &nbsp;
                                <NavItem>
                                    <i class="fa fa-compass"></i><Link to="/recruitmentBooth">Booths</Link>
                                </NavItem>
                                &nbsp;
                                <NavItem>
                                    <i class="fa fa-user"></i><Link to="/myProfile">My Profile</Link>
                                </NavItem>
                                &nbsp;
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        <i class="fa fa-cog"></i>  Manage
                                    </DropdownToggle>
                                    {dropDownItem}
                                </UncontrolledDropdown>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        <i class="fa fa-user-circle"></i> {this.props.userName}
                                    </DropdownToggle>
        
                                    {this.props.userName != null && parseInt(this.props.userName) == 0 ? 
                                    [
                                        <DropdownMenu left>
                                            <DropdownItem name="aboutMe" onClick={this.onClick}>
                                                About Me
                                            </DropdownItem>
                                            <DropdownItem name="logout" onClick={this.logout}>
                                                Logout
                                            </DropdownItem>             
                                        </DropdownMenu>
                                    ]
                                    : 
                                    [
                                        <DropdownMenu left>
                                            <DropdownItem name="logout" onClick={this.logout}>
                                                Logout
                                            </DropdownItem>
                                        </DropdownMenu>
                                    ]
                                    }
                                        
                                </UncontrolledDropdown>
                            </Nav>
                        </Collapse>
                        </Navbar>
                    ]:[ 
                        <Navbar className="topnav" dark expand="md">
                        <NavbarBrand><img src={ require('../assets/images/utar.jpg') } /></NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        {/* <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <Link to="/login">Login</Link>
                                </NavItem>
                            </Nav>
                        </Collapse> */}
                        </Navbar>  
                    ]}     
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
      userName: state.auth.userName,
      userId: state.auth.userId,
      id: state.auth.id,
      societies: state.auth.societies,
      isAuthenticated: state.auth.isAuthenticated
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
      onLogoutUser: logoutAndRedirect
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(NavBar);