import React, { Component } from 'react';
import NavBar from './NavBar';
import '../style/society.css';
import { Link } from 'react-router';
import { red400 } from 'material-ui/styles/colors';

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
                <div className="container" id="tableContainer">
                    <div className="row">
                        <div className="panel-body">
                            <table className="table table-hover table-dark" border="1">
                            <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Logo</th>
                                        <th>Society</th>  
                                        <th>Events</th>  
                                        <th>Feedback Status</th>             
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
