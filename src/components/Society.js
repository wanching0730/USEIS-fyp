import React, { Component } from 'react';
import NavBar from './NavBar';
import LoadingBar from './LoadingBar';
import RaisedButton from 'material-ui/RaisedButton';
import Tooltip from 'rc-tooltip';
import SearchBar from 'material-ui-search-bar';
import { confirmAlert } from 'react-confirm-alert';
import { Link } from 'react-router';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as FontAwesome from '../../node_modules/react-icons/lib/fa';
import { groupBy } from '../common/common_function';
import '../style/society.css';
import 'rc-tooltip/assets/bootstrap_white.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveAll, updateLoadingBar, searchData } from '../actions/data-action';

class Society extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchWord: ""
        };

        this.props.onUpdateLoadingBar();
        this.props.onRetrieveAll("society");
    }

    async componentDidMount() {
        window.scrollTo(0,0);
    }

    componentWillReceiveProps(nextProps){
        console.log("this props: " + this.props.societiesFound);
        console.log("next props: " + nextProps.societiesFound);

        if((nextProps.societiesFound != this.props.societiesFound) && (nextProps.societiesFound != null)) {
            console.log("found: " + this.props.societiesFound);
            let societiesFound = nextProps.societiesFound;
            var resultRows = [];

            for(var i = 0; i < societiesFound.length; i++) {
                let societyFound = societiesFound[i];
                let toSociety = {
                    pathname: "/perSociety/" + societyFound["societyId"],
                    state: {societyName: societyFound["name"]}
                }

                resultRows.push(
                    <tr>
                        <td key={societyFound["societyId"]}><Link key={societyFound["societyId"]} to={toSociety}>{societyFound["name"]} - {societyFound["category"]}</Link></td>
                    </tr>
                )
            }

            confirmAlert({
                customUI: ({ onClose }) => {
                    return (
                        <MuiThemeProvider>
                            <div className='search-alert'>

                                {societiesFound.length > 0 ?
                                    [
                                        <table id="searchModal">
                                            <thead>
                                                <tr>
                                                    <th>Societies</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {resultRows}
                                            </tbody>
                                        </table>
                                    ]:
                                    [
                                        <div>No result found</div>
                                    ]
                                }
                                <RaisedButton label="Close" primary={true} onClick={() => onClose()} style={{ marginTop: 15 }}/>
                            </div>
                        </MuiThemeProvider>
                    )
                }
            })
        }
    }

    handleSearch() {
        if(this.state.searchWord != "") {
            this.props.onUpdateLoadingBar();
            this.props.onSearchData("society", this.state.searchWord);
            this.setState({searchWord: ""});
        }
    }

    render() {
        let societies = this.props.societies;

        if(societies != null) {
            var rows = [];
            var counter = 1;
            const categories = groupBy(societies, society => society["category"]);
            let mapsort = new Map([...categories.entries()].sort());
            for (const [key, values] of mapsort) {
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
                        <BreadcrumbItem active>Societies</BreadcrumbItem>
                    </Breadcrumb>
                </div>

                {this.props.loading ?
                    [<LoadingBar />]
                    :
                    [
                        <div>
                            <MuiThemeProvider>
                                <h1 style={{ margin: 20, color: '#083477' }}>Society List</h1>

                                <SearchBar
                                    hintText="Search name or category..."
                                    onChange={(newValue) => this.setState({ searchWord: newValue })}
                                    onRequestSearch={this.handleSearch.bind(this)}
                                    style={{
                                        marginLeft: 20,
                                        marginBottom: 20,
                                        maxWidth: 290,
                                        borderRadius: 6
                                    }}
                                />

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

const mapStateToProps = (state, props) => {
    console.log("state in society: " + state.data.societies);
    return {
      societies: state.data.societies,
      societiesFound: state.data.societiesFound,
      loading: state.data.loading
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
      onRetrieveAll: retrieveAll,
      onSearchData: searchData,
      onUpdateLoadingBar: updateLoadingBar
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(Society);
