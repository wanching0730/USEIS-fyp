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
import { create, updatePostLoadingBar } from '../actions/post-action';
import { retrieveAll, updateLoadingBar } from '../actions/data-action';

class CommitteeBoard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            eventInMonth: []
        }

        if(!this.props.isAuthenticated) {
            window.location.assign('/');
        }

        this.props.onUpdateLoadingBar();
        this.props.onRetrieveAll("eventInMonth");

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    componentWillReceiveProps(nextProps){
        if((nextProps.eventInMonth != this.props.eventInMonth) && (nextProps.eventInMonth != null)) {
            this.setState({
                eventInMonth: nextProps.eventInMonth
            });
        }
    }

    handleChange(event, eventId) {
       for(var i = 0; i < this.state.eventInMonth.length; i++) {
           if(this.state.eventInMonth[i].eventId == eventId) {
               this.state.eventInMonth[i].rating = event.target.value;
           }
       }
    }

    handleClick() {
        let eventInMonth = this.state.eventInMonth;
        console.log(eventInMonth);
        console.log(this.state.eventInMonth);
        this.props.onCreate("studentEventRating", eventInMonth);
    }

    render() {
        console.log(this.props.eventInMonth);
        const { RaisedButtonStyle } = styles;
        let eventInMonth = this.props.eventInMonth;
        var rows = [];
        var message = <div></div>;

        if(eventInMonth != null && eventInMonth.length > 0) {
            rows = eventInMonth.map((e, index) => 
                <tr key={e.eventId}>
                    <td>{index+1}</td>
                    <td>{e.name}</td>
                    <td>
                        <input type="number" onChange={(event) => this.handleChange(event, e.eventId)}/>
                    </td>
                </tr>
            )
        } else {
            message = <div style= {{ textAlign: "center", marginBottom: "20px"}}>No crew for this event</div>;
        }

        return (
            <div id="outerDiv"> 
                <NavBar />

                <div style={{ margin: 20 }}>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to={`/home`}>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>My Recommendation</BreadcrumbItem>
                    </Breadcrumb>
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
                                                <th>Events</th>
                                                <th>Rating</th>   
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {rows}
                                        </tbody>
                                    </table>

                                    {message}

                                    <div style= {{ margin: "0 auto" }}>
                                        <RaisedButton label="Submit" id="button2" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleClick(event)}/>
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
        eventInMonth: state.data.eventInMonth,
        loading: state.data.loading,
        isAuthenticated: state.auth.isAuthenticated
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
        onRetrieveAll: retrieveAll,
        onCreate: create,
        onUpdateLoadingBar: updateLoadingBar,
        onUpdateCreateLoadingBar: updatePostLoadingBar
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(CommitteeBoard);

