import React, { Component } from 'react';
import NavBar from './NavBar';

class Society extends Component {

    constructor(props) {
        super(props);

        this.state = {society: ""};
    }

    componentDidMount() {
        this.listSocieties();
    }

    listSocieties() {
        // fetch(`http://localhost:5000/puppies`).then(result => result.json()).then(reply => console.log("result: " + reply));
        fetch(`http://localhost:5000/puppies`).then(result => result.json()).then(reply => reply.map(row => console.log("row: " + row)));
    }

    render() {
        return (
            <div> 
                <NavBar />
                <p>{this.state.society}</p>
            </div>
        );
    };
    
};

export default Society;
