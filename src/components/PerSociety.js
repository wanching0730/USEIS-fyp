import React, {Component} from 'react';
import NavBar from './NavBar';

class PerSociety extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <NavBar />
                <div>
                    <h1>{this.props.params.societyId}</h1>
                    <h2>IT Society</h2>
                    <p>Description: It is a very active Society</p>
                    <p>Category: Technology</p>
                    <h3>Events</h3>
                    <p>1. Workshop</p>
                    <p>2. Talk</p>
                </div>
            </div>
        );
    };
}

export default PerSociety;
