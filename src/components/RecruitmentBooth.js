import React, { Component } from 'react';
import NavBar from './NavBar';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../style/society.css';
import { Link } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveAll } from '../actions/data-action';

class RecruitmentBooth extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }
    
    render() {

        const { RaisedButtonStyle } = styles;
        
        return (

            <div>
                <MuiThemeProvider>
                <div id="outerDiv"> 
                    <NavBar />

                    <div style={{ margin: 20 }}>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to={`/home`}>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>View Booths</BreadcrumbItem>
                        </Breadcrumb>
                    </div>

                    <div style= {{ textAlign: "center" }}>
                        <RaisedButton label="Societies" primary={true} style={RaisedButtonStyle} onClick={(event) => console.log("clicked")}/>
                        <RaisedButton label="Events" primary={true} style={RaisedButtonStyle} onClick={(event) => console.log("clicked")}/>
                    </div>

                    <div>
                        <MuiThemeProvider>

                        <div className="container" id="tableContainer">
                            <div className="row">
                                <div className="panel-body">
                                    <table className="table table-hover table-light" border="1">
                                        <thead>
                                            <tr>
                                                <th>No.</th>
                                                <th>Society</th>
                                                <th>Booth Number</th>                 
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr> 
                                                <td>1</td>
                                                <td>IT Society</td>
                                                <td>21</td>
                                            </tr>
                                            {/* <tr> 
                                                <td>2</td>
                                                <td>Music Club</td>
                                                <td>12</td>
                                            </tr>
                                            <tr> 
                                                <td>3</td>
                                                <td>Zumba Club</td>
                                                <td>08</td>
                                            </tr> */}
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

                                    <div style= {{ textAlign: "center" }}>
                                        <RaisedButton label="Back" primary={true} style={RaisedButtonStyle} onClick={(event) => window.history.back()}/>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </MuiThemeProvider>
                </div>
            </div>
        </MuiThemeProvider>
        </div>
        );
    };
    
};

const styles = {
    RaisedButtonStyle: {
        marginTop: 15,
        marginRight: 15, 
        marginLeft: 15
    }
}

const mapStateToProps = (state, props) => {
    console.log("state in society: " + state.data.societies);
    return {
        societyBooths: state.data.societyBooths
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
      onRetrieveAll: retrieveAll
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(RecruitmentBooth);
