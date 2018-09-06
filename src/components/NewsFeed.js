import React, { Component } from 'react';
import NavBar from './NavBar';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Breadcrumb, BreadcrumbItem, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';
import '../style/newsfeed.css';
import {browserHistory} from 'react-router';
import Modal from 'react-pop';
import RaisedButton from 'material-ui/RaisedButton';

class NewsFeed extends Component {

    constructor(props) {
        super(props);

        this.state = { isOpen: false };
        this.closeModal = this.closeModal.bind(this);
    }

    toggleModal = event => {
        console.log(event);
        const { isOpen } = this.state;
        this.setState({ isOpen: !isOpen });
    }

    closeModal(event) {
        const { isOpen } = this.state;
        this.setState({ isOpen: !isOpen });
    }

    handleSocieties(event) {
        console.log("click society");
    }

    handleEvents(event) {
        console.log("click event");
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {

        const { isOpen } = this.state;

        const { RaisedButtonStyle } = styles;
        
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

                     <div style= {{ textAlign: "center" }}>
                        <RaisedButton label="Societies" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleSocieties(event)}/>
                        <RaisedButton label="Events" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleEvents(event)}/>
                    </div>

                  
        
                    <div className="card">

                        <Card>
                            <img className="image" src={ require('../assets/images/its.jpg') } />
                            <CardBody>
                            <CardTitle>Card title</CardTitle>
                            <CardSubtitle>Card subtitle</CardSubtitle>
                            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                            <RaisedButton label="View" primary={true} style={RaisedButtonStyle} onClick={(event) => browserHistory.push("/myEvents")}/>
                            </CardBody>
                        </Card>
    
                         <Card>
                            <img className="image" src={ require('../assets/images/its.jpg') } />
                            <CardBody>
                            <CardTitle>Card title</CardTitle>
                            <CardSubtitle>Card subtitle</CardSubtitle>
                            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                            <RaisedButton label="View" primary={true} style={RaisedButtonStyle} onClick={(event) => browserHistory.push("/myEvents")}/>
                            </CardBody>
                        </Card>

                    </div>
                    
                </div>
                </MuiThemeProvider>
            </div>
        );
    };
    
};

const styles = {
    RaisedButtonStyle: {
        margin: 15
    },
}

export default NewsFeed;
