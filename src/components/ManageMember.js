import React, { Component } from 'react';
import NavBar from './NavBar';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import $ from 'jquery';
import axios from 'axios';
import '../style/society.css';
import { confirmAlert } from 'react-confirm-alert'; 
import * as FontAwesome from '../../node_modules/react-icons/lib/fa';
import { Link } from 'react-router';

class ManageMember extends Component {

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

    handleApprove() {
        confirmAlert({
            title: 'Approval Confirmation',
            message: 'Are you sure to approve this member?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    console.log('Click Yes');
                }
              },
              {
                label: 'No',
                onClick: () => console.log('Click No')
              }
            ]
          })
    }

    render() {
        
        return (
            <div id="outerDiv"> 
                <NavBar />

                <div style={{ margin: 20 }}>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to={`/`}>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to={`/society`}>Societies</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to={`/perSociety/1`}>IT Society</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Manage Member</BreadcrumbItem>
                    </Breadcrumb>
                </div>

                <div className="container" id="tableContainer">
                    <div className="row">
                        <div className="panel-body">
                            <table className="table table-hover table-light" border="1">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Name</th>
                                        <th>IC Number</th>   
                                        <th>Course</th>  
                                        <th>Year and Sem</th> 
                                        <th>Phone Number</th>   
                                        <th>Email Address</th>   
                                        <th>Action</th>                 
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr> 
                                        <td>1</td>
                                        <td>Lim Heng Hao</td>
                                        <td>999999-99-9999</td>
                                        <td>Software Engineering</td>
                                        <td>Y1S3</td>
                                        <td>018-9900990</td>
                                        <td>henghao@hotmail.com</td>
                                        <td><Link onClick={this.handleApprove}><FontAwesome.FaPlus /></Link></td>
                                    </tr>
                                    <tr> 
                                        <td>2</td>
                                        <td>Toh Chi Meng</td>
                                        <td>777777-77-7777</td>
                                        <td>Mechanical Engineering</td>
                                        <td>Y1S3</td>
                                        <td>018-9900990</td>
                                        <td>chimeng@hotmail.com</td>
                                        <td><Link onClick={this.handleApprove}><FontAwesome.FaPlus /></Link></td>
                                    </tr>
                                    <tr> 
                                        <td>3</td>
                                        <td>Lim Keng Huat</td>
                                        <td>888888-88-8888</td>
                                        <td>Civil Engineering</td>
                                        <td>Y1S3</td>
                                        <td>018-8989898</td>
                                        <td>kenghuat@hotmail.com</td>
                                        <td><FontAwesome.FaCheck /></td>
                                    </tr>
                                    <tr> 
                                        <td>4</td>
                                        <td>Kenneth Teng</td>
                                        <td>333333-33-3333</td>
                                        <td>Electrical Engineering</td>
                                        <td>Y3S3</td>
                                        <td>012-2930560</td>
                                        <td>kenneth@hotmail.com</td>
                                        <td><FontAwesome.FaCheck /></td>
                                    </tr>
                                    {/* {this.state.society.map(row => {
                                        return (
                                            <tr>
                                                <td><Link to={`/perSociety/`+row[0]}>{row[0]}</Link></td>
                                                <td>{row[1]}</td>
                                                <td>{row[3]}</td>
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

export default ManageMember;
