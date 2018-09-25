import React, { Component } from 'react';
import NavBar from './NavBar';
import '../style/society.css';
import { Link } from 'react-router';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import $ from 'jquery';
import axios from 'axios';

class Student extends Component {

    constructor(props) {
        super(props);

        this.state = {society: []};
    }

    componentDidMount() {
        window.scrollTo(0,0);
    }

    render() {
        
        return (
            <div id="outerDiv"> 
                <NavBar />

                <div style={{ margin: 20 }}>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to={`/home`}>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Student Profile</BreadcrumbItem>
                    </Breadcrumb>
                </div>

                <div className="container" id="tableContainer">
                <div className="row">
                <div className="panel-body">
                    <table className="table table-hover table-light" border="1">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Society Name</th>
                                <th>Event Name</th>
                                <th>Event Date</th>   
                                <th>Rating Status</th>               
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>IT Society</td>
                                <td>Network Security Workshop</td>
                                <td>28/09/2017</td>
                                <td><Link to={`/feedback`}>&#x2717;</Link></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>First Aid Society</td>
                                <td>First Aid Training</td>
                                <td>28/11/2017</td>
                                <td>&#10004;</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Sport Society</td>
                                <td>Trekathon</td>
                                <td>28/12/2017</td>
                                <td><Link to={`/feedback`}>&#x2717;</Link></td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>Music Society</td>
                                <td>USTAR8</td>
                                <td>21/01/2018</td>
                                <td>&#10004;</td>
                            </tr>
                        {/* {this.state.society.map(row => {
                            return (
                                <tr>
                                    <td>{row[0]}</td>
                                    <td>{row[1]}</td>
                                    <td>{row[3]}</td>
                                    <td><Link to={`/feedback`}>X</Link></td>
                                </tr>
                            );
                        })} */}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
            </div>
        );
    };
    
};

export default Student;
