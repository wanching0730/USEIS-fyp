import React, { Component } from 'react';
import { Link } from 'react-router';
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

        const { imageStyle } = styles;

        return (

            <div className="topnav" ref="myTopnav">

                <img src={ require('../assets/images/utar.jpg') } />
               
                <Link to="/">Home</Link>
                <Link to="/society">Societies</Link>
                <Link to="/event">Events</Link>
                <Link to="/recruitmentBooth">Booths</Link>
                <Link to="/createProfile">Create Society Profile</Link>
                <Link to="/myProfile">My Profile</Link>
                <Link to="/faq">FAQ</Link>
                <Link to="/login">Login</Link>
                {/* <Link to="/register">Register</Link> */}
                
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

const styles = {
    imageStyle: {
        height: "10px",
        width: "20px"
    }
}

export default NavBar;
