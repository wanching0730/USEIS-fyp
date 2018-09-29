import React, { Component } from 'react';
import NavBar from './NavBar';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../style/society.css';
import { Link } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveData } from '../actions/data-action';

class CommitteeBoard extends Component {

    constructor(props) {
        super(props);

        this.props.onRetrieveData("societyComm", this.props.params.id);

        console.log("params type: " + this.props.params.type);
        console.log("params id: " + this.props.params.id);
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        
        const { RaisedButtonStyle } = styles;
        let societyComm = this.props.societyComm;
        console.log("society comm: " + societyComm);
        var rows = [];

        if(societyComm != null) {
            for(var i = 0; i < societyComm.length; i++) {
                let comm = societyComm[i];

                rows.push(
                    <tr> 
                        <td>{i+1}</td>
                        <td>{comm["name"]}</td>
                        <td>{comm["ic"]}</td>
                        <td>{comm["course"]}</td>
                        <td>Y{comm["year"]}S{comm["semester"]}</td>
                        <td>{comm["contact"]}</td>
                        <td>{comm["email"]}</td>
                        <td>{comm["position"]}</td>
                    </tr>
                )
            }
        }

        return (
            <div id="outerDiv"> 
                <NavBar />

                <div style={{ margin: 20 }}>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to={`/home`}>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to={`/event`}>Events</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to={`/perEvent/1`}>Cardio Night Run</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Committee Board</BreadcrumbItem>
                    </Breadcrumb>
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
                                            <th>Name</th>
                                            <th>IC Number</th>   
                                            <th>Course</th>  
                                            <th>Year and Sem</th> 
                                            <th>Phone Number</th>   
                                            <th>Email Address</th>   
                                            <th>Position</th>                 
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {rows}
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
        );
    };
    
};


const styles = {
    RaisedButtonStyle: {
        margin: 15
    }
}

const mapStateToProps = (state, props) => {
    return {
        societyComm: state.data.societyComm,
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
        onRetrieveData: retrieveData
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(CommitteeBoard);

