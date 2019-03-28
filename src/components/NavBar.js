import React, { Component } from 'react';
import {browserHistory} from 'react-router';
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

        this.state = {
            isOpen: false,
        };

        this.toggle = this.toggle.bind(this);
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
        } else if(clickedTab == "myProfile") {
            browserHistory.push("/myProfile");
        } else if(clickedTab == "mySurvey") {
            browserHistory.push("/mySurvey");
        }
    }

    logout() {
        this.props.onLogoutUser();
        browserHistory.push("/");
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        var dropDownItem;
        var position;

        if(this.props.role == "dsa") {
            position = "staff";
        } else {
            position = "student"
        }
        
        if(position == "staff") {
            dropDownItem = 
            <DropdownMenu left="true">
                <DropdownItem name="manageBooth" onClick={this.onClick}>
                    Manage Booth
                </DropdownItem>
                <DropdownItem name="createProfile" onClick={this.onClick}>
                    Create Society Profile
                </DropdownItem>
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
                    this.props.userName ? [
                
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
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        <i class="fa fa-cog"></i>  Manage
                                    </DropdownToggle>
                                    {dropDownItem}
                                </UncontrolledDropdown>
                                &nbsp;
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        <i class="fa fa-user-circle"></i> {this.props.userName}
                                    </DropdownToggle>
        
                                    {this.props.userName != null && !isNaN(this.props.userName) ? 
                                    [
                                        <DropdownMenu left>
                                            <DropdownItem name="myProfile" onClick={this.onClick}>
                                                My Profile
                                            </DropdownItem>
                                            <DropdownItem name="mySurvey" onClick={this.onClick}>
                                                *My Survey
                                            </DropdownItem>
                                            <DropdownItem name="aboutMe" onClick={this.onClick}>
                                                About Me
                                            </DropdownItem>
                                            <DropdownItem divider />
                                            <DropdownItem name="logout" onClick={this.logout}>
                                                Logout
                                            </DropdownItem>             
                                        </DropdownMenu>
                                    ]
                                    : 
                                    [
                                        <DropdownMenu left>
                                            <DropdownItem name="myProfile" onClick={this.onClick}>
                                                My Profile
                                            </DropdownItem>
                                            <DropdownItem divider />
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
                            <h4 style={{ marginLeft: "230px" }}>UTAR Societies and Event's Information System</h4>
                        </Navbar>  
                         
                    ]}     
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        userName: state.auth.userName,
        role: state.auth.role
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
      onLogoutUser: logoutAndRedirect
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(NavBar);