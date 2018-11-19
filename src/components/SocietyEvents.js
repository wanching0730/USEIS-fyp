import React, { Component } from 'react';
import NavBar from './NavBar';
import LoadingBar from './LoadingBar';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router';
import '../style/society.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveData, updateLoadingBar } from '../actions/data-action';

class SocietyEvents extends Component {

    constructor(props) {
        super(props);

        this.props.onUpdateLoadingBar();
        this.props.onRetrieveData("societyEvent", this.props.params.societyId);
    }

    componentDidMount() {
        window.scrollTo(0,0);
    }

    render() {

        const { imageStyle, RaisedButtonStyle } = styles;

        if(this.props.societyEvents != null) {
            var message = <div></div>;

            if(this.props.societyEvents.length == 0) {
                var rows = [];
                message = <div style= {{ textAlign: "center", marginBottom: "20px"}}>No events for this society</div>;
            } else {
                let societyEvents = this.props.societyEvents;
                var rows = [];
                for(var i = 0; i < societyEvents.length; i++) {
                    let societyEvent = societyEvents[i];

                    let toEvent = {
                        pathname: "/perEvent/" + societyEvent["id"],
                        state: {eventName: societyEvent["name"]}
                    }
                    
                    rows.push(
                        <tr> 
                            <td>{i+1}</td>
                            <td><img style={imageStyle} src={ require('../assets/images/image1.jpg') } /></td>
                            <td><Link to={toEvent}>{societyEvent["name"]}</Link></td>
                            <td>{societyEvent["dateTime"]}</td>
                            <td>???</td>
                            <td>{societyEvent["venue"]}</td>
                            <td>{societyEvent["fee"]}</td>
                            <td>{societyEvent["chairperson"]}</td>
                            <td>{societyEvent["contact"]}</td>
                        </tr>
                    );
                }
            }   
        } 
        
        return (
            
            <div id="outerDiv"> 
                <NavBar />

                <div style={{ margin: 20 }}>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to={`/home`}>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to={`/society`}>Societies</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to={`/perSociety/` + this.props.params.societyId}>{this.props.location.state["societyName"]}</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Events</BreadcrumbItem>
                    </Breadcrumb>
                </div>

                {this.props.loading ?
                    [<LoadingBar />]
                    :
                    [
                        <div> 
                            <MuiThemeProvider>
                                <div className="container" id="tableContainer">
                                    <div className="row">
                                        <div className="panel-body">
                                            <table className="table table-hover table-light" border="1">
                                                <thead>
                                                    <tr>
                                                        <th>No.</th>
                                                        <th>Poster</th>
                                                        <th>Name</th>
                                                        <th>Date</th>   
                                                        <th>Time</th>  
                                                        <th>Venue</th> 
                                                        <th>Fee</th> 
                                                        <th>Chairperson</th>    
                                                        <th>Contact</th>                    
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {rows}
                                                </tbody>
                                            </table>

                                            {message}

                                            <div style= {{ textAlign: "center" }}>
                                                <RaisedButton label="Back" primary={true} style={RaisedButtonStyle} onClick={(event) => window.history.back()}/>
                                            </div>

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
    
}

const styles = {
    imageStyle: {
        height: "50px",
        width: "50px"
    },
    RaisedButtonStyle: {
        marginLeft: 20
    }
}

const mapStateToProps = (state, props) => {
    return {
        societyEvents: state.data.societyEvents,
        loading: state.data.loading
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
      onRetrieveData: retrieveData,
      onUpdateLoadingBar: updateLoadingBar
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(SocietyEvents);
