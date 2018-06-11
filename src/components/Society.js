import React, { Component } from 'react';
import NavBar from './NavBar';
import $ from 'jquery';
import axios from 'axios';

class Society extends Component {

    constructor(props) {
        super(props);

        this.state = {society: []};
    }

    componentDidMount() {
        this.listSocieties();
    }

    listSocieties() {
        // fetch(`http://localhost:5000/puppies`).then(result => result.json()).then(reply => reply.map(row => console.log("row: " + row)));
        fetch(`http://localhost:5000/puppies`).then(result => result.json()).then(reply => this.setState({society: reply}));
        // $.ajax({ type: "GET", url:`http://localhost:5000/puppies`, success: function(res) {
        //     this.setState({society:res});
        //  }});
        //axios.get("http://localhost:5000/puppies").then(response => this.setState({society: response.data}));
    }

    render() {
        var list = [];
        for(var i = 0; i < this.state.society.length; i++) {
            list.push(<p>{this.state.society[i]}</p>);
        }
        return (
            <div> 
                <NavBar />
                {list}
            </div>
        );
    };
    
};

export default Society;
