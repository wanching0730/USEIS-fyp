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
        } else if(clickedTab == "submitProposal") {
            browserHistory.push("/submitProposal");
        } else {
            browserHistory.push("/manageProposal");
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

        let position = this.props.userPosition;
        var dropDownItem;

        if(position == "committee") {
            dropDownItem = 
            <DropdownMenu left>
                <DropdownItem name="createProfile" onClick={this.onClick}>
                    Create Society Profile
                </DropdownItem>
                <DropdownItem name="submitProposal" onClick={this.onClick}>
                    Submit Proposal
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem name="faq" onClick={this.onClick}>
                    FAQ
                </DropdownItem>
            </DropdownMenu>
        } else if(position == "staff") {
            dropDownItem = 
            <DropdownMenu left>
                <DropdownItem name="manageBooth" onClick={this.onClick}>
                    Manage Booth
                </DropdownItem>
                <DropdownItem name="manageProposal" onClick={this.onClick}>
                    Manage Proposal
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem name="faq" onClick={this.onClick}>
                    FAQ
                </DropdownItem>
            </DropdownMenu>
        } else {
            dropDownItem = 
            <DropdownMenu left>
                <DropdownItem name="faq" onClick={this.onClick}>
                    FAQ
                </DropdownItem>
            </DropdownMenu>
        }

        return (
            <div>
                    {
                        this.props.isAuthenticated ?
                    
                        <Navbar className="topnav" dark expand="md">
                    <NavbarBrand href="/"><img src={ require('../assets/images/utar.jpg') } /></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <Link to="/">Home</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/newsFeed">NewsFeed</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/society">Societies</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/event">Events</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/recruitmentBooth">Booths</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/myProfile">My Profile</Link>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Manage
                                </DropdownToggle>
                                {dropDownItem}
                            </UncontrolledDropdown>
                        </Nav>
                        <Nav className="ml-auto" navbar>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    {this.props.userName}
                                </DropdownToggle>
                                <DropdownMenu left>
                                    <DropdownItem name="logout" onClick={this.logout}>
                                        Logout
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                        </Collapse>
                </Navbar>
                        
                        :
                        <Navbar className="topnav" dark expand="md">
                    <NavbarBrand href="/"><img src={ require('../assets/images/utar.jpg') } /></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <Link to="/login">Login</Link>
                                </NavItem>
                            </Nav>
                            </Collapse>
                </Navbar>
                        
                    }
                   
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
      userName: state.auth.userName,
      userPosition: state.auth.userPosition,
      isAuthenticated: state.auth.isAuthenticated
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
      onLogoutUser: logoutAndRedirect
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(NavBar);