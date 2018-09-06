import React, { Component } from 'react';
import NavBar from './NavBar';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Breadcrumb, BreadcrumbItem, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';
import '../style/newsfeed.css';
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

                    <div className="card">
                        <Card>
                            <CardImg top width="40px" height="300px" src={ require('../assets/images/its.jpg') } alt="Card image cap" />
                            <CardBody>
                            <CardTitle>Card title</CardTitle>
                            <CardSubtitle>Card subtitle</CardSubtitle>
                            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                            <Button>Button</Button>
                            </CardBody>
                        </Card>
                    </div>
                    
                </div>
                </MuiThemeProvider>
            </div>
        );
    };
    
};

export default NewsFeed;
