import React, { Component } from 'react';
import NavBar from './NavBar';
import '../styles/society.css';
import { Link } from 'react-router';

class MyProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {society: []};
    }

    componentDidMount() {
        this.listSocieties();
    }

    listSocieties() {
        fetch(`http://localhost:5000/puppies`).then(result => result.json()).then(reply => this.setState({society: reply}));
    }

    render() {
        
        return (
            <div id="outerDiv"> 
                <NavBar />
                <div className="container" id="tableContainer">
                    <div className="row">
                        <div className="panel-body">
                            <table className="table table-hover table-dark" border="1">
                                <thead>
                                    <tr>
                                        <th>Societies</th>
                                        <th>Events</th>
                                        <th>Status</th>   
                                        <th>Booth Reservation</th>                  
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.society.map(row => {
                                        return (
                                            <tr>
                                                <td><Link to={`/perSociety/`+row[0]}>{row[0]}</Link></td>
                                                <td>{row[1]}</td>
                                                <td>{row[2]}</td>
                                                <td>{row[3]}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    
};

export default MyProfile;
