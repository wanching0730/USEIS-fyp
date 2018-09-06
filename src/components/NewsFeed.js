import React, { Component } from 'react';
import NavBar from './NavBar';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {browserHistory} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

class NewsFeed extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        
        return (
            
            <div>
                <MuiThemeProvider>
                <div id="outerDiv"> 
                    <NavBar />

                    <div style={{ margin: 20 }}>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to={`/`}>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>NewsFeed</BreadcrumbItem>
                        </Breadcrumb>
                    </div>

                    

                    

                </div>
                </MuiThemeProvider>
            </div>
        );
    };
    
};

export default NewsFeed;
