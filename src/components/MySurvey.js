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

class MySurvey extends Component {

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
        this.props.onUpdateCreateLoadingBar();
        let eventInMonth = this.state.eventInMonth;
        let ids = [], ratings = [];
        for(var i = 0; i < eventInMonth.length; i++) {
            ids.push(eventInMonth[i].eventId);
            ratings.push(eventInMonth[i].rating);
        }
        this.props.onCreate("studentEventRating", {ids: ids, ratings: ratings, studentId: this.props.id});
    }

    mapItem(item) {
        return <option value={item.value}>{item.name}</option>;
    }

    render() {
        const { RaisedButtonStyle } = styles;
        let eventInMonth = this.props.eventInMonth;
        var rows = [];
        var message = <div></div>;

        const rates = [{value: 1, name:"1"}, {value: 2, name:"2"}, {value: 3, name:"3"}, {value: 4, name:"4"}, {value: 5, name:"5"},
                        {value: 6, name:"6"}, {value: 7, name:"7"}, {value: 8, name:"8"}, {value: 9, name:"9"}, {value: 10, name:"10"}];

        if(eventInMonth != null && eventInMonth.length > 0) {
            rows = eventInMonth.map((e, index) => 
                <tr key={e.eventId}>
                    <td>{index+1}</td>
                    <td>{e.name}</td>
                    <td>
                        <div>
                        <select onChange={(event) => this.handleChange(event, e.eventId)}>
                            {rates.map(this.mapItem)}
                        </select>
                        </div>
                        {/* <input type="number" onChange={(event) => this.handleChange(event, e.eventId)}/> */}
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
                        <BreadcrumbItem active>My Survey</BreadcrumbItem>
                    </Breadcrumb>
                </div>

                {this.props.loading ?
                    [<LoadingBar />]
                    :
                    [
                        <div>
                            <MuiThemeProvider>

                            <h6 style={{ textAlign: "center" }}>*This is to collect student's preference towards upcoming events for recommender system to provide recommended events to user.</h6>
                            <h6 style={{ textAlign: "center" }}>*The recommendation will be renewed on every Monday.</h6>
                            <div className="container" id="surveyContainer">
                                <div className="row"> 
                                    <table id="table1" border="1">
                                        <thead>
                                            <tr>
                                                <th>No.</th>
                                                <th>Upcoming Events</th>
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

const mapStateToProps = (state) => {
    return {
        eventInMonth: state.data.eventInMonth,
        loading: state.data.loading,
        isAuthenticated: state.auth.isAuthenticated,
        id: state.auth.id
    };
};

const mapActionsToProps = (dispatch) => {
    return bindActionCreators({
        onRetrieveAll: retrieveAll,
        onCreate: create,
        onUpdateLoadingBar: updateLoadingBar,
        onUpdateCreateLoadingBar: updatePostLoadingBar
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(MySurvey);

