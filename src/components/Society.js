import React, { Component } from 'react';
import NavBar from './NavBar';

class Society extends Component {

    constructor(props) {
        super(props);

        this.state = {society: []};
    }

    componentDidMount() {
        this.listSocieties();
    }

    listSocieties() {
        // fetch(`http://localhost:5000/puppies`).then(result => result.json()).then(reply => console.log("result: " + reply));
        // fetch(`http://localhost:5000/puppies`).then(result => result.json()).then(reply => reply.map(row => console.log("row: " + row)));
        fetch(`http://localhost:5000/puppies`).then(result => result.json()).then(reply => this.setState({society: reply}));
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
