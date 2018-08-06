import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav,  NavItem, UncontrolledDropdown, 
    DropdownToggle, DropdownMenu, DropdownItem, NavLink } from 'reactstrap';
import { Link } from 'react-router';
import '../style/navbar.css';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };

        
        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        if(event.target.name == "createProfile") {
            browserHistory.push("/createProfile");
        } else {
            browserHistory.push("/faq");
        }
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
    return (
        <div>
        <Navbar className="topnav" dark expand="md">
            <NavbarBrand href="/"><img src={ require('../assets/images/utar.jpg') } /></NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
                <NavItem>
                <Link to="/">Home</Link>
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
                <DropdownMenu right>
                    <DropdownItem name="createProfile" onClick={this.onClick}>
                        My Profile
                    </DropdownItem>
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
                </UncontrolledDropdown>
            </Nav>
            <Nav className="ml-auto" navbar>
            <NavItem>
                <Link to="/login">Login</Link>
                </NavItem>
            </Nav>
            </Collapse>
        </Navbar>
        </div>
    );
    }
}

export default  NavBar;