import React, {Component} from 'react';
import NavBar from './NavBar';
import { Link } from 'react-router';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import '../style/table.css';

import { connect } from 'react-redux';

class AboutMe extends Component {

    constructor(props){
        super(props);
    }

    render() {
        let user = this.props.user[0];
        const { RaisedButtonStyle } = styles;

        return (
            <div>
                <MuiThemeProvider>
                <div id="outerDiv"> 
                    <NavBar />

                    <div style={{ margin: 20 }}>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to={`/home`}>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>About Me</BreadcrumbItem>
                        </Breadcrumb>
                    </div>

                    <div>
                        <div className="aboutMeContainer">
                        <div className="imageContainer"><img src={ require('../assets/images/profile.png') } alt="profile" /></div>
                            <h2>{user["studentName"]}</h2>
                            <div className="row">
                                <table id="aboutMeTable">
                                        <tr>
                                            <th><i className="fa fa-user"></i>   Full Name</th>
                                            <td>{user["studentName"]}</td>
                                        </tr>
                                        <tr> 
                                            <th><i class="fa fa-id-card"></i>   StudentID</th>
                                            <td>{user["officialId"]}</td>
                                        </tr>
                                        <tr>
                                            <th><i class="fa fa-envelope-open"></i>   Email</th> 
                                            <td>{user["email"]}</td>
                                        </tr>
                                        <tr>
                                            <th><i class="fa fa-phone"></i>   Phone Number</th> 
                                            <td>{user["contact"]}</td>
                                        </tr>
                                        <tr>
                                            <th><i class="fa fa-book"></i>   Course</th>
                                            <td>{user["course"]}</td>
                                        </tr>
                                        <tr>
                                            <th><i class="fa fa-calendar"></i>   Year</th>
                                            <td>{user["year"]}</td>
                                        </tr>
                                        <tr>
                                            <th><i class="fa fa-calendar"></i>  Semester</th> 
                                            <td>{user["semester"]}</td>
                                        </tr>         
                                </table>
                                
                                <div style= {{ margin: "0 auto" }}>
                                    <RaisedButton label="Back" primary={true} style={RaisedButtonStyle} onClick={(event) => window.history.back()}/>
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

const styles = {
    RaisedButtonStyle: {
        margin: 15
    }
}

const mapStateToProps = (state, props) => {
    return {
        user: state.auth.user
    };
};

export default connect(mapStateToProps)(AboutMe);