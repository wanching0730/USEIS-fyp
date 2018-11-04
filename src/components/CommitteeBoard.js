import React, { Component } from 'react';
import NavBar from './NavBar';
import LoadingBar from './LoadingBar';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router';
import '../style/table.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveData, updateLoadingBar } from '../actions/data-action';

class CommitteeBoard extends Component {

    constructor(props) {
        super(props);

        this.props.onUpdateLoadingBar();

        let parameter = this.props.params;
        if(parameter.type === "society")
            this.props.onRetrieveData("societyComm", parameter.id);
        else 
            this.props.onRetrieveData("eventComm", parameter.id);

        console.log("params location: " + JSON.stringify(this.props.location));
        console.log("params type: " + this.props.params.type);
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        
        const { RaisedButtonStyle } = styles;
        let committee = this.props.comm;
        console.log("comm: " + committee);
        var rows = [], breadCrumb;

        if(committee != null) {
            for(var i = 0; i < committee.length; i++) {
                let comm = committee[i];

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
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {rows}
                                        </tbody>
                                    </table>

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

const mapStateToProps = (state, props) => {
    return {
        comm: state.data.comm,
        loading: state.data.loading
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
        onRetrieveData: retrieveData,
        onUpdateLoadingBar: updateLoadingBar
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(CommitteeBoard);

