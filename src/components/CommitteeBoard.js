import React, { Component } from 'react';
import NavBar from './NavBar';
import LoadingBar from './LoadingBar';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router';
import moment from "moment";
import '../style/table.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveData, updateLoadingBar } from '../actions/data-action';

class CommitteeBoard extends Component {

    constructor(props) {
        super(props);

        if(!this.props.isAuthenticated) {
            window.location.assign('/');
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);

        this.props.onUpdateLoadingBar();

        let parameter = this.props.params;
        if(parameter.type === "society")
            this.props.onRetrieveData("societyComm", parameter.id);
        else 
            this.props.onRetrieveData("eventComm", parameter.id);
    }

    render() {
        
        const { RaisedButtonStyle } = styles;
        let committee = this.props.comm;
        var rows = [], breadCrumb, termTh, termTd;
        var message = <div></div>;

        if(committee != null && committee.length > 0) {
            for(var i = 0; i < committee.length; i++) {
                let comm = committee[i];

                if(this.props.params.type === "society") {
                    termTh = <th>Term</th>;
                    termTd = <td>{moment(comm["joinDate"]).format("YY") + "/" + parseInt(parseInt(moment(comm["joinDate"]).format("YY")) + 1)}</td>
                } 

                rows.push(
                    <tr> 
                        <td>{i+1}</td>
                        <td>{comm["studentName"]}</td>
                        <td>{comm["ic"]}</td>
                        <td>{comm["course"]}</td>
                        <td>Y{comm["year"]}S{comm["semester"]}</td>
                        <td>{comm["contact"]}</td>
                        <td>{comm["email"]}</td>
                        <td>{comm["roleName"]}</td>
                        {termTd}
                    </tr>
                )
            }
        } else {
            message = <div style= {{ textAlign: "center", marginBottom: "20px"}}>No crew for this event</div>;
        }

        if(this.props.params.type === "society") {
            breadCrumb =
                <Breadcrumb>
                    <BreadcrumbItem><Link to={`/home`}>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to={`/society`}>Societies</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to={{pathname:`/perSociety/` + this.props.params.id, state: {societyName: this.props.location.state["societyName"]}}}>{this.props.location.state["societyName"]}</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Committee Board</BreadcrumbItem>
                </Breadcrumb>
        } else {
            breadCrumb = 
                <Breadcrumb>
                    <BreadcrumbItem><Link to={`/home`}>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to={`/event`}>Events</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to={{pathname:`/perEvent/` + this.props.params.id, state: {eventName: this.props.location.state["eventName"]}}}>{this.props.location.state["eventName"]}</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Committee Board</BreadcrumbItem>
                </Breadcrumb>
        }

        return (
            <div id="outerDiv"> 
                <NavBar />

                <div style={{ margin: 20 }}>
                    {breadCrumb}
                </div>

                {this.props.loading ?
                    [<LoadingBar />]
                    :
                    [
                        <div>
                            <MuiThemeProvider>

                            <div className="container" id="committeeContainer">
                                <div className="row"> 
                                    <table id="table1" border="1">
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
                                                {termTh}
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {rows}
                                        </tbody>
                                    </table>

                                    {message}

                                    <div style= {{ margin: "0 auto" }}>
                                        <RaisedButton label="Back" primary={true} style={RaisedButtonStyle} onClick={(event) => window.history.back()}/>
                                    </div>  
                                </div>
                            </div>
                            </MuiThemeProvider>
                        </div>
                    ]
                }
            </div>
        );
    };
    
};


const styles = {
    RaisedButtonStyle: {
        margin: 15
    }
}

const mapStateToProps = (state) => {
    return {
        comm: state.data.comm,
        loading: state.data.loading,
        isAuthenticated: state.auth.isAuthenticated
    };
};

const mapActionsToProps = (dispatch) => {
    return bindActionCreators({
        onRetrieveData: retrieveData,
        onUpdateLoadingBar: updateLoadingBar
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(CommitteeBoard);

