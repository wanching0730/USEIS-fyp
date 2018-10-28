import React, { Component } from 'react';
import NavBar from './NavBar';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as FontAwesome from '../../node_modules/react-icons/lib/fa';
import { groupBy } from '../common/common_function';
import Loader from 'react-loader-spinner'
import '../style/society.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveAll } from '../actions/data-action';
import { AutoComplete } from 'material-ui';

class Society extends Component {

    constructor(props) {
        super(props);

        this.props.onRetrieveAll("society");
    }

    async componentDidMount() {
        window.scrollTo(0,0);
    }

    handleClick(event) {
        console.log("clicked");
    }

    render() {
        const { RaisedButtonStyle } = styles;
        let societies = this.props.societies;

        if(societies != null) {
            var rows = [];
            var counter = 1;
            const categories = groupBy(societies, society => society["category"]);
            for (const [key, values] of categories.entries()) {
                var subRows = [];
                values.forEach(value => {
                    let toSociety = {
                        pathname: "/perSociety/" + value["id"],
                        state: {societyName: value["name"]}
                    }
                    subRows.push(
                        <li><Link to={toSociety}>{value["name"]}</Link></li>
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
                        <BreadcrumbItem active>Societies</BreadcrumbItem>
                    </Breadcrumb>
                </div>

                {this.props.loading ?
                    [
                        <div style={{position: "fixed",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)"}}>
                            <Loader 
                                type="TailSpin"
                                color="#00BFFF"
                                height="70"	
                                width="70"
                            />  
                        </div>
                    ]
                    :
                    [
                        <div>
                            <MuiThemeProvider>
                                <h1 style={{ margin: 20, color: '#083477' }}>Society List</h1>

                                <RaisedButton label="Sort by Category" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleClick(event)}/>
                                <RaisedButton label="Sort by Alphabet" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleClick(event)}/>

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
    console.log("state in society: " + state.data.societies);
    return {
      societies: state.data.societies,
      loading: state.data.loading
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
      onRetrieveAll: retrieveAll
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(Society);
