import React, { Component } from 'react';
import NavBar from './NavBar';
import LoadingBar from './LoadingBar';
import RaisedButton from 'material-ui/RaisedButton';
import Tooltip from 'rc-tooltip';
import { Link } from 'react-router';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as FontAwesome from '../../node_modules/react-icons/lib/fa';
import { groupBy } from '../common/common_function';
import '../style/society.css';
import 'rc-tooltip/assets/bootstrap_white.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveAll, updateLoadingBar } from '../actions/data-action';

class Event extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sortType: "name"
        };

        this.props.onUpdateLoadingBar();
        this.props.onRetrieveAll("event");
    }

    async componentDidMount() {
        window.scrollTo(0, 0);
    }

    handleClick(event) {
        console.log("clicked");
    }

    sort(type, values) {
        if(type === "name") {
            return values.sort(function(a, b){
                if(a["name"] < b["name"]) return -1;
                if(a["name"] > b["name"]) return 1;
                return 0;
            });
        } else {
            return values.sort(function(a, b){
                a = new Date(a["date"]);
                b = new Date(b["date"]);
                if(a < b) return -1;
                if(a > b) return 1;
                return 0;
            });
        }
        
    }

    render() {
        const { RaisedButtonStyle } = styles;
        let events = this.props.events;

        if(events != null) {
            var rows = [];
            var counter = 1;
            const categories = groupBy(events, event => event["category"]);
            let mapsort = new Map([...categories.entries()].sort());
            for (const [key, values] of mapsort) {
                var subRows = [];
                var sortedValues;
                
                if(this.state.sortType === "name")
                    sortedValues = this.sort("name", values);
                else 
                    sortedValues = this.sort("date", values);
                
                sortedValues.forEach(value => {
                    let toEvent = {
                        pathname: "/perEvent/" + value["id"],
                        state: {eventName: value["name"]}
                    }
                    subRows.push(
                        <li><Link to={toEvent}>{value["name"]}</Link></li>
                    );
                });

                let stringId = "list-item-" + counter;
                rows.push(
                    <li>
                        <input type="checkbox" id={stringId} />
                        <Tooltip placement="right" trigger={['hover']} overlay={<span>Click to view more</span>}>
                            <label for={stringId} className="first">{key}   <FontAwesome.FaHandORight /></label>
                        </Tooltip>
                        <ul>
                            {subRows}
                        </ul>
                    </li>
                );

                <hr/>
                counter++;
              }
        }

        return (
            <div id="outerDiv"> 
                <NavBar />

                <div style={{ margin: 20 }}>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to={`/home`}>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Events</BreadcrumbItem>
                    </Breadcrumb>
                </div>

                {this.props.loading ?
                    [<LoadingBar />]
                    :
                    [
                        <div>
                            <MuiThemeProvider>
                                <h1 style={{ margin: 20, color: '#083477' }}>Event List</h1>

                                <RaisedButton className="buttons" label="Sort by Alphabet" primary={true} style={RaisedButtonStyle} onClick={(event) => this.setState({sortType: "name"})}/>
                                <RaisedButton className="buttons" label="Sort by Date" primary={true} style={RaisedButtonStyle} onClick={(event) => this.setState({sortType: "date"})}/>

                                <div className="wrapper">
                                    <ul>
                                        {rows}
                                    </ul>
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
        marginLeft: 20
    }
}

const mapStateToProps = (state, props) => {
    return {
      events: state.data.events,
      loading: state.data.loading
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
      onRetrieveAll: retrieveAll,
      onUpdateLoadingBar: updateLoadingBar
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(Event);
