import React, { Component } from 'react';
import NavBar from './NavBar';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as FontAwesome from '../../node_modules/react-icons/lib/fa';
import '../style/society.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveAll } from '../actions/data-action';

class Event extends Component {

    constructor(props) {
        super(props);

        this.props.onRetrieveAll("event");
    }

    async componentDidMount() {
        window.scrollTo(0, 0);
    }

    groupBy(list, keyGetter) {
        const map = new Map();
        list.forEach((item) => {
            const key = keyGetter(item);
            const collection = map.get(key);
            if (!collection) {
                map.set(key, [item]);
            } else {
                collection.push(item);
            }
        });
        return map;
    }

    handleClick(event) {
        console.log("clicked");
    }

    render() {
        const { RaisedButtonStyle } = styles;
        let events = this.props.events;

        if(events != null) {
            var rows = [];
            var counter = 1;
            const categories = this.groupBy(events, event => event["category"]);
            for (const [key, values] of categories.entries()) {
                var subRows = [];
                values.forEach(value => {
                    subRows.push(
                        <li><Link to={`/perEvent/` + value["id"]}>{value["name"]}</Link></li>
                    );
                });

                let stringId = "list-item-" + counter;
                rows.push(
                    <li>
                        <input type="checkbox" id={stringId} />
                        <label for={stringId} className="first">{key}   <FontAwesome.FaHandORight /></label>
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

                <div>
                    <MuiThemeProvider>
                        <h1 style={{ margin: 20, color: '#083477' }}>Event List</h1>

                        <RaisedButton label="Sort by Alphabet" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleClick(event)}/>
                        <RaisedButton label="Sort by Category" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleClick(event)}/>
                        <RaisedButton label="Sort by Date" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleClick(event)}/>

                        <div class="wrapper">
                            <ul>
                                {rows}
                            </ul>
                        </div>
                        </MuiThemeProvider>
                    </div>
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
    console.log("state in event: " + state.data.events);
    return {
      events: state.data.events
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
      onRetrieveAll: retrieveAll
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(Event);
