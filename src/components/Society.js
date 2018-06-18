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

    async componentDidMount() {
        this.listSocieties();
    }

    async listSocieties() {
        const result = await fetch(`http://localhost:5000/puppies`);
        const jsonresult = await result.json();
        await this.setState({society: jsonresult});
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
                                        <th>Status</th>                  
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.society.map(row => {
                                        return (
                                            <tr>
                                                <td><Link to={`/perSociety/`+row[0]}>{row[0]}</Link></td>
                                                <td>{row[1]}</td>
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

export default Society;
