import React, { Component } from 'react';
import { Router, browserHistory, Route, Link } from 'react-router';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import Society from './Society';
import '../App.css';

const NavBar = () => {
    return (
        <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/society">Societies</Link>
            <Link to="/createProfile">Create Society Profile</Link>
            <Link to="/myProfile">My Profile</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link>Logout</Link>
        </div>
    );
};

export default NavBar;
