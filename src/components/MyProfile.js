import React, { Component } from 'react';
import NavBar from './NavBar';
import { Link } from 'react-router';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import * as FontAwesome from '../../node_modules/react-icons/lib/fa';
import '../style/society.css';

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

        const { imageStyle } = styles;
        
        return (
            
            <div id="outerDiv"> 
                <NavBar />

                <div style={{ margin: 20 }}>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to={`/`}>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>My Profile</BreadcrumbItem>
                    </Breadcrumb>
                </div>

                <div className="container" id="tableContainer">
                    <div className="row">
                        <div className="panel-body">
                            <table className="table table-hover table-light" border="1">
                            <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Logo</th>
                                        <th>Society</th>  
                                        <th>Events</th>  
                                        <th>Feedback Status</th>  
                                        <th>Action</th>           
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td><img style={imageStyle} src={ require('../assets/images/image1.jpg') } /></td>
                                        <td><Link to={`/perSociety/1`}>IT Society</Link></td>
                                        <td> 
                                            <li><Link to={`/perEvent/1`}>WorkShop</Link></li>
                                            <li><Link to={`/perEvent/1`}>KLESF</Link></li>
                                            <li><Link to={`/perEvent/1`}>Easy Parcel Talk</Link></li>
                                        </td>
                                        <td>
                                            <li>Done</li>
                                            <li><Link to={`/feedback`}>Undone</Link></li>
                                            <li><Link to={`/feedback`}>Undone</Link></li>
                                        </td>
                                        <td><Link to={`/createProfile/1`}><FontAwesome.FaEdit /></Link></td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td><img style={imageStyle} src={ require('../assets/images/image1.jpg') } /></td>
                                        <td><Link to={`/perSociety/1`}>First Aid Society</Link></td>
                                        <td> 
                                            <li><Link to={`/perEvent/1`}>Cardio Night Run</Link></li>
                                            <li><Link to={`/perEvent/1`}>Blood Donation</Link></li>
                                            <li><Link to={`/perEvent/1`}>Adventure Camp</Link></li>
                                        </td>
                                        <td>
                                            <li>Done</li>
                                            <li><Link to={`/feedback`}>Undone</Link></li>
                                            <li>Done</li>
                                        </td>
                                        <td><Link to={`/createProfile`}><FontAwesome.FaEdit /></Link></td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td><img style={imageStyle} src={ require('../assets/images/image1.jpg') } /></td>
                                        <td><Link to={`/perSociety/1`}>Engineering Society</Link></td>
                                        <td> 
                                            <li><Link to={`/perEvent/1`}>ES Camp</Link></li>
                                            <li><Link to={`/perEvent/1`}>Engineering Fiesta</Link></li>
                                            <li><Link to={`/perEvent/1`}>Annual General Meeting</Link></li>
                                        </td>
                                        <td>
                                            <li>Done</li>
                                            <li>Done</li>
                                            <li>Done</li>
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td><img style={imageStyle} src={ require('../assets/images/image1.jpg') } /></td>
                                        <td><Link to={`/perSociety/1`}>Sport Society</Link></td>
                                        <td> 
                                            <li><Link to={`/perEvent/1`}>Night Run</Link></li>
                                            <li><Link to={`/perEvent/1`}>Colour Run</Link></li>
                                            <li><Link to={`/perEvent/1`}>Sport Carnival</Link></li>
                                        </td>
                                        <td>
                                            <li><Link to={`/feedback`}>Undone</Link></li>
                                            <li><Link to={`/feedback`}>Undone</Link></li>
                                            <li><Link to={`/feedback`}>Undone</Link></li>
                                        </td>
                                        <td><Link to={`/createProfile`}><FontAwesome.FaEdit /></Link></td>
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

export default MyProfile;
