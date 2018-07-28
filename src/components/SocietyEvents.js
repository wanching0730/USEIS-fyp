import React, { Component } from 'react';
import NavBar from './NavBar';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import $ from 'jquery';
import axios from 'axios';
import '../style/society.css';
import { Link } from 'react-router';

class SocietyEvents extends Component {

    constructor(props) {
        super(props);

        this.state = {society: []};
    }

    componentDidMount() {
        this.listSocieties();
    }

    listSocieties() {
        // fetch(`http://localhost:5000/puppies`).then(result => result.json()).then(reply => this.setState({society: reply}));
    }

    render() {

        const { imageStyle } = styles;
        
        return (
            <div id="outerDiv"> 
                <NavBar />

                <div style={{ margin: 20 }}>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to={`/`}>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to={`/society`}>Societies</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to={`/perSociety/1`}>IT Society</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Events</BreadcrumbItem>
                    </Breadcrumb>
                </div>

                <div className="container" id="tableContainer">
                    <div className="row">
                        <div className="panel-body">
                            <table className="table table-hover table-light" border="1">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Poster</th>
                                        <th>Name</th>
                                        <th>Date</th>   
                                        <th>Time</th>  
                                        <th>Venue</th> 
                                        <th>Fee</th> 
                                        <th>Chairperson</th>    
                                        <th>Contact</th>                    
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr> 
                                        <td>1</td>
                                        <td><img style={imageStyle} src={ require('../assets/images/image1.jpg') } /></td>
                                        <td><Link to={`/perEvent/1`}>Sport Carnival</Link></td>
                                        <td>28/09/2018</td>
                                        <td>2pm - 4pm</td>
                                        <td>MPH</td>
                                        <td>RM50</td>
                                        <td>Leong Hao Meng</td>
                                        <td>018-9900990</td>
                                    </tr>
                                    <tr> 
                                        <td>2</td>
                                        <td><img style={imageStyle} src={ require('../assets/images/image1.jpg') } /></td>
                                        <td><Link to={`/perEvent/1`}>First Aid Training</Link></td>
                                        <td>28/10/2018</td>
                                        <td>1pm - 5pm</td>
                                        <td>KB101</td>
                                        <td>RM100</td>
                                        <td>Tang Jie Ying</td>
                                        <td>018-99007877</td>
                                    </tr>
                                    <tr> 
                                        <td>3</td>
                                        <td><img style={imageStyle} src={ require('../assets/images/image1.jpg') } /></td>
                                        <td><Link to={`/perEvent/1`}>KLESF</Link></td>
                                        <td>01/02/2019</td>
                                        <td>10am - 3pm</td>
                                        <td>KB301</td>
                                        <td>RM10</td>
                                        <td>Leong Hao Meng</td>
                                        <td>018-1234567</td>
                                    </tr>
                                    <tr> 
                                        <td>4</td>
                                        <td><img style={imageStyle} src={ require('../assets/images/image1.jpg') } /></td>
                                        <td><Link to={`/perEvent/1`}>Cut For Hope 3.0</Link></td>
                                        <td>30/10/2018</td>
                                        <td>9am - 4pm</td>
                                        <td>MPH</td>
                                        <td>RM3</td>
                                        <td>Lee Lian Tiang</td>
                                        <td>018-4433223</td>
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

const styles = {
    imageStyle: {
        height: "50px",
        width: "50px"
    }
}

export default SocietyEvents;