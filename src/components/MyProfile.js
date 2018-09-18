import React, { Component } from 'react';
import NavBar from './NavBar';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {browserHistory} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import * as FontAwesome from '../../node_modules/react-icons/lib/fa';
import '../style/society.css';

import { connect } from 'react-redux';

class MyProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {society: []};
    }

    componentDidMount() {
        //this.listSocieties();
        window.scrollTo(0, 0);
    }

    listSocieties() {
        //fetch(`http://localhost:5000/puppies`).then(result => result.json()).then(reply => this.setState({society: reply}));
    }

    handleSocieties(event) {
        browserHistory.push("/myProfile");
    }

    handleEvents(event) {
        browserHistory.push("/myEvents");
    }

    render() {

        const { imageStyle, RaisedButtonStyle } = styles;
        let societies = this.props.societies;
        console.log("societies in profile: " + JSON.stringify(societies));

        var rows = [];
        for(var i = 0; i < societies.length; i++) {
            rows.push(
                <tr>
                    <td>{i}</td>
                    <td><img style={imageStyle} src={ require('../assets/images/sport.jpg') } /></td>
                    <td><Link to={`/perSociety/`+societies[i]["societyId"]}>{societies[i]["name"]}</Link></td>
                    <td>halo</td>
                    <td><Link to={`/createProfile/1`}><FontAwesome.FaEdit /></Link></td>
                </tr>
            )
        }
        
        return (
            
            <div>
                <MuiThemeProvider>
                <div id="outerDiv"> 
                    <NavBar />

                    <div style={{ margin: 20 }}>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to={`/home`}>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>My Societies</BreadcrumbItem>
                        </Breadcrumb>
                    </div>

                    <div style= {{ textAlign: "center" }}>
                        <RaisedButton label="My Societies" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleSocieties(event)}/>
                        <RaisedButton label="My Events" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleEvents(event)}/>
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
                                            <th>Action</th>           
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div style= {{ textAlign: "center" }}>
                        <RaisedButton label="Back" primary={true} style={RaisedButtonStyle} onClick={(event) => window.history.back()}/>
                    </div>

                </div>
                </MuiThemeProvider>
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
        margin: 15
    },
}

const mapStateToProps = (state, props) => {
    return {
      societies: state.auth.societies,
    };
};

export default connect(mapStateToProps)(MyProfile);
