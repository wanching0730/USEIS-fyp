import React, { Component } from 'react';
import NavBar from './NavBar';
import LoadingBar from './LoadingBar';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router';
import Tooltip from '@material-ui/core/Tooltip';
import '../style/society.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveAll, updateLoadingBar } from '../actions/data-action';
import { updateDouble, updatePostLoadingBar, update} from '../actions/post-action';

class RecruitmentBooth extends Component {

    constructor(props) {
        super(props);

        if(!this.props.isAuthenticated) {
            window.location.assign('/');
        }

        this.state = {
            type: "society"
        }

        this.props.onUpdateLoadingBar();

        this.handleRemove = this.handleRemove.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);

        this.props.onRetrieveAll("societyBooth");
        this.props.onRetrieveAll("eventBooth");
    }

    handleRemove(event) {
        this.props.onUpdatePostLoadingBar();

        let data = {
          type: this.state.type,
          id: event.target.value
        }
    
        this.props.onUpdateDouble("removeBooth", data, "");
    }

    render() {
        const { RaisedButtonStyle } = styles;
        var message = <div></div>;

        if(this.state.type === "society") {
            let societyBooths = this.props.societyBooths;
            console.log(societyBooths)
            if(societyBooths != null) {
                
                var header = 
                    <tr>
                        <th>No.</th>
                        <th>Society</th>
                        <th>Booth Number</th>   
                        {this.props.role == "dsa" ? <th>Action</th> : null}      
                    </tr>

                if(societyBooths.length > 0) {
                    var body = [];
                    for(var i = 0; i < societyBooths.length; i++) {
                        let societyBooth = societyBooths[i];

                        let toSociety = {
                            pathname: "/perSociety/" + societyBooth["societyId"],
                            state: {societyName: societyBooth["name"]}
                        }

                        body.push(
                            <tr>
                                <td>{i+1}</td>
                                <td><Link to={toSociety}>{societyBooth["name"]}</Link></td>
                                <td>{societyBooth["location"]}</td>
                                {this.props.role == "dsa" ? 
                                    <td>
                                        <Tooltip title="Remove" placement="right">
                                            <li value={societyBooth["societyId"]} onClick={(event) => this.handleRemove(event)} className="fa fa-trash"></li>
                                        </Tooltip>
                                    </td> 
                                : null}   
                            </tr>
                        );
                    }
                } else {
                    message = <div style= {{ textAlign: "center", marginBottom: "20px"}}>No registered booth</div>;
                }
            } 
        } else {
            let eventBooths = this.props.eventBooths;

            if(eventBooths != null) {
               
                var header = 
                    <tr>
                        <th>No.</th>
                        <th>Event</th>
                        <th>Booth Number</th>     
                        {this.props.role == "dsa" ? <th>Action</th> : null}
                    </tr>

                 if(eventBooths.length > 0) {
                    var body = [];
                    for(var i = 0; i < eventBooths.length; i++) {
                        let eventBooth = eventBooths[i];

                        let toEvent = {
                            pathname: "/perEvent/" + eventBooth["eventId"],
                            state: {eventName: eventBooth["name"]}
                        }

                        body.push(
                            <tr>
                                <td>{i+1}</td>
                                <td><Link to={toEvent}>{eventBooth["name"]}</Link></td>
                                <td>{eventBooth["location"]}</td>
                                {this.props.role == "dsa" ? 
                                    <td>
                                        <Tooltip title="Remove" placement="right">
                                            <li value={eventBooth["eventId"]} onClick={(event) => this.handleRemove(event)} className="fa fa-trash"></li>
                                        </Tooltip>
                                    </td> 
                                : null}   
                            </tr>
                        );
                    }
                } else {
                    message = <div style= {{ textAlign: "center", marginBottom: "20px"}}>No registered booth</div>;
                }
            } 
        }
        
        return (

            <div>
                <MuiThemeProvider>
                <div id="outerDiv"> 
                    <NavBar />

                    <div style={{ margin: 20 }}>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to={`/home`}>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Registered Booths</BreadcrumbItem>
                        </Breadcrumb>
                    </div>

                    <div style= {{ textAlign: "center" }}>
                        <RaisedButton label="Societies" primary={true} style={RaisedButtonStyle} onClick={(event) => {this.setState({type: "society"})}}/>
                        <RaisedButton label="Events" primary={true} style={RaisedButtonStyle} onClick={(event) => {this.setState({type: "event"})}}/>
                    </div>

                    {this.props.loading || this.props.societyBooths == null || this.props.eventBooths == null ?
                    [<LoadingBar />]
                    :
                    [
                        <div>
                            <div className="container" id="tableContainer">
                                <div className="row">
                                    <div className="panel-body">
                                        <table className="table table-hover table-light" border="1">
                                            <thead>
                                                {header}
                                            </thead>

                                            <tbody>
                                                {body}
                                            </tbody>
                                        </table>
                                        
                                        {message}

                                        <div style= {{ textAlign: "center" }}>
                                            <RaisedButton label="Back" primary={true} style={RaisedButtonStyle} onClick={(event) => window.history.back()}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ]}
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
    return {
        societyBooths: state.data.societyBooths,
        eventBooths: state.data.eventBooths,
        loading: state.data.loading,
        isAuthenticated: state.auth.isAuthenticated,
        role: state.auth.role
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
      onRetrieveAll: retrieveAll,
      onUpdateDouble: updateDouble,
      onUpdateLoadingBar: updateLoadingBar,
      onUpdatePostLoadingBar: updatePostLoadingBar
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(RecruitmentBooth);
