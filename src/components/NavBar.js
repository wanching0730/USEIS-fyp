import React, { Component } from 'react';
import { Router, browserHistory, Route, Link } from 'react-router';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import Society from './Society';
import '../App.css';
import '../style/navbar.css';

class NavBar extends Component {

    myFunction() {
        var x = this.refs.myTopnav;
        if(x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    }

    render() {
        return (

            <div class="topnav" ref="myTopnav">
                <div className="pull-left" style={{ marginLeft: "5px" }}>
                    <Link to="/">Home</Link>
                    <Link to="/society">Societies</Link>
                    <Link to="/createProfile">Create Society Profile</Link>
                    <Link to="/myProfile">My Profile</Link>
                </div>
                <div className="pull-right" style={{ marginRight: "5px" }}>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                    <Link>Logout</Link>
                </div>
                <a href="javascript:void(0);" class="icon" onClick={() => this.myFunction()}>
                    <i class="fa fa-bars"></i>
                </a>
            </div>

            // <div className="navbar">
                // <Link to="/">Home</Link>
                // <Link to="/society">Societies</Link>
                // <Link to="/createProfile">Create Society Profile</Link>
                // <Link to="/myProfile">My Profile</Link>
                // <Link to="/login">Login</Link>
                // <Link to="/register">Register</Link>
                // <Link>Logout</Link>
            // </div>
        );
    }
}

export default NavBar;
