import React, {Component} from 'react';
import NavBar from './NavBar';
import { Link } from 'react-router';

class Home extends Component {

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
                                        <th>Poster</th>
                                        <th>Event Name</th>                 
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.society.map(row => {
                                        return (
                                            <tr>
                                                <td><Link to={`/perSociety/`+row[0]}>{row[0]}</Link></td>
                                                <td>{row[1]}</td>
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

export default Home;
