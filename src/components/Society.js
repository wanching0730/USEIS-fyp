import React, { Component } from 'react';
import NavBar from './NavBar';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as FontAwesome from '../../node_modules/react-icons/lib/fa';
import '../style/society.css';
import $ from 'jquery';
import axios from 'axios';

class Society extends Component {

    constructor(props) {
        super(props);

        this.state = {society: []};
    }

    async componentDidMount() {
        //this.listSocieties();
        window.scrollTo(0,0);
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

    handleClick(event) {
        console.log("clicked");
    }

    render() {
        // var list = [];
        // for(var i = 0; i < this.state.society.length; i++) {
        //     list.push(<p>{this.state.society[i]}</p>);
        // }

        const { imageStyle, RaisedButtonStyle } = styles;
        
        return (
            <div id="outerDiv"> 
                <NavBar />

                <div style={{ margin: 20 }}>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to={`/`}>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Societies</BreadcrumbItem>
                    </Breadcrumb>
                </div>

                <div>
                    <MuiThemeProvider>
                        <h1 style={{ margin: 20, color: '#083477' }}>Society List</h1>

                        <RaisedButton label="Sort by Category" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleClick(event)}/>
                        <RaisedButton label="Sort by Alphabet" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleClick(event)}/>

                        <div class="wrapper">
                            <ul>
                                <li>
                                    <input type="checkbox" id="list-item-1" />
                                    <label for="list-item-1" class="first">Dance   <FontAwesome.FaHandORight /></label>
                                    <ul>
                                        <li><Link to={`/perEvent/1`}>WorkShop</Link></li>
                                        <li><Link to={`/perEvent/1`}>KLESF</Link></li>
                                        <li><Link to={`/perEvent/1`}>Easy Parcel Talk</Link></li>
                                    </ul>
                                </li>
                                <hr/>
                                <li>
                                    <input type="checkbox" id="list-item-2"/>
                                    <label for="list-item-2">Entertainment   <FontAwesome.FaHandORight /></label>
                                    <ul>
                                        <li><Link to={`/perEvent/1`}>Cardio Night Run</Link></li>
                                        <li><Link to={`/perEvent/1`}>Blood Donation</Link></li>
                                        <li><Link to={`/perEvent/1`}>Adventure Camp</Link></li>
                                    </ul>
                                </li>
                                <hr/>
                                <li>
                                    <input type="checkbox" id="list-item-3"/>
                                    <label for="list-item-3">Engineering   <FontAwesome.FaHandORight /></label>
                                    <ul>
                                        <li><Link to={`/perEvent/1`}>ES Camp</Link></li>
                                        <li><Link to={`/perEvent/1`}>Engineering Fiesta</Link></li>
                                        <li><Link to={`/perEvent/1`}>Annual General Meeting</Link></li>
                                    </ul>
                                </li>
                                <hr/>
                                <li>
                                    <input type="checkbox" id="list-item-4" />
                                    <label for="list-item-4">Information Technology   <FontAwesome.FaHandORight /></label>
                                    <ul>
                                        <li><Link to={`/perEvent/1`}>ES Camp</Link></li>
                                        <li><Link to={`/perEvent/1`}>Engineering Fiesta</Link></li>
                                        <li><Link to={`/perEvent/1`}>Annual General Meeting</Link></li>
                                    </ul>
                                </li>
                                <hr/>
                                <li>
                                    <input type="checkbox" id="list-item-5"/>
                                    <label for="list-item-5">Music   <FontAwesome.FaHandORight /></label>
                                    <ul>
                                        <li><Link to={`/perEvent/1`}>Night Run</Link></li>
                                        <li><Link to={`/perEvent/1`}>Colour Run</Link></li>
                                        <li><Link to={`/perEvent/1`}>Sport Carnival</Link></li>
                                    </ul>
                                </li>
                                <hr/>
                                <li>
                                    <input type="checkbox" id="list-item-6"/>
                                    <label for="list-item-6">Political   <FontAwesome.FaHandORight /></label>
                                    <ul>
                                        <li>Inconsolata</li>
                                        <li>Source Code Pro</li>
                                        <li>Droid Sans Mono</li>
                                        <li>Ubuntu Mono</li>
                                        <li>Cousine</li>
                                    </ul>
                                </li>
                                <hr/>
                                <li>
                                    <input type="checkbox" id="list-item-7" />
                                    <label for="list-item-7">Special Interest   <FontAwesome.FaHandORight /></label>
                                    <ul>
                                        <li>Slabo</li>
                                        <li>Droid Serif</li>
                                        <li>Roboto Serif</li>
                                        <li>Lora</li>
                                        <li>Meriweather</li>
                                    </ul>
                                </li>
                                <hr/>
                                <li>
                                    <input type="checkbox" id="list-item-8"/>
                                    <label for="list-item-8">Spiritual   <FontAwesome.FaHandORight /></label>
                                    <ul>
                                        <li>Open Sans</li>
                                        <li>Roboto</li>
                                        <li>Lato</li>
                                        <li>Stabo</li>
                                        <li>Oswald</li>
                                    </ul>
                                </li>
                                <hr/>
                                <li>
                                    <input type="checkbox" id="list-item-9"/>
                                    <label for="list-item-9" class="last">Sport   <FontAwesome.FaHandORight /></label>
                                    <ul>
                                        <li>Inconsolata</li>
                                        <li>Source Code Pro</li>
                                        <li>Droid Sans Mono</li>
                                        <li>Ubuntu Mono</li>
                                        <li>Cousine</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        </MuiThemeProvider>
                    </div>

                {/* <div className="container" id="tableContainer">
                    <div className="row">
                        <div className="panel-body">
                            <table className="table table-hover table-light" border="1">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Society Logos</th>
                                        <th>Societies</th>  
                                        <th>Events</th>               
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
                                    </tr>
                                   
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
                </div> */}
            </div>
        );
    };
    
};

const styles = {
    imageStyle: {
        height: "50px",
        width: "50px"
    },
    RaisedButtonStyle: {
        marginLeft: 20
    }
}

export default Society;
