import React, { Component } from 'react';
import NavBar from './NavBar';
import $ from 'jquery';
import axios from 'axios';
import '../style/society.css';
import { Link } from 'react-router';

class Society extends Component {

    constructor(props) {
        super(props);

        this.state = {society: []};
    }

    componentDidMount() {
        this.listSocieties();
    }

    listSocieties() {
        fetch(`http://localhost:5000/puppies`).then(result => result.json()).then(reply => this.setState({society: reply}));
        // $.ajax({ type: "GET", url:`http://localhost:5000/puppies`, success: function(res) {
        //     this.setState({society:res});
        //  }});
        //axios.get("http://localhost:5000/puppies").then(response => this.setState({society: response.data}));
    }

    render() {
        // var list = [];
        // for(var i = 0; i < this.state.society.length; i++) {
        //     list.push(<p>{this.state.society[i]}</p>);
        // }
        
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
                                <th>XXX</th>   
                                <th>Status</th>               
                            </tr>
                        </thead>

                        <tbody>
                        {this.state.society.map(row => {
                            return (
                                <tr>
                                    <td>{row[0]}</td>
                                    <td>{row[1]}</td>
                                    <td>{row[3]}</td>
                                    <td><Link to={`/feedback`}>X</Link></td>
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

export default Society;
