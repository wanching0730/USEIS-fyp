import React, { Component } from 'react';
import NavBar from './NavBar';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Breadcrumb, BreadcrumbItem, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';
import '../style/newsfeed.css';
import {browserHistory} from 'react-router';
import Modal from 'react-modal';
import RaisedButton from 'material-ui/RaisedButton';
import moment from "moment";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveAll } from '../actions/data-action';

class NewsFeed extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
            inputValue: "",
            status: "all"
        };
    
        this.openModal = this.openModal.bind(this);
        //this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);

        this.props.onRetrieveAll("newsfeeds");
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
        console.log("value:" + this.state.inputValue);
    }

    updateInputValue(event) {
        this.setState({
          inputValue: event.target.value
        });
    }

    handleSocieties(event) {
        this.setState({
            status: "society"
        });
    }

    handleEvents(event) {
        this.setState({
            status: "event"
        });
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {

        const { RaisedButtonStyle, content } = styles;
        let newsfeeds = this.props.newsfeeds;
        let filteredNewsfeeds = [];
        console.log("newsfeedsss: " + newsfeeds);
        
        if(newsfeeds != null) {
            var url = "";
            var type  = "";
            var rows = [];

            if(this.state.status == "society") {
                for(var i = 0; i < newsfeeds.length; i++) 
                    if(newsfeeds[i]["type"] == "s")
                        filteredNewsfeeds.push(newsfeeds[i]);
            } else if(this.state.status == "event") {
                for(var i = 0; i < newsfeeds.length; i++) 
                    if(newsfeeds[i]["type"] == "e")
                        filteredNewsfeeds.push(newsfeeds[i]);
            } else {
                filteredNewsfeeds = newsfeeds;
            }
            
            for(var i = 0; i < filteredNewsfeeds.length; i++) {
                let newsfeed = filteredNewsfeeds[i];
                if(newsfeed["type"] == "s") {
                    url = "/perSociety/" + newsfeed["ownerId"];
                    type = " Society";
                }
                else {
                    url = "/perEvent/" + newsfeed["ownerId"];
                    type = " Event";
                }
                rows.push(
                    <Card>
                        <img className="image" src={ require('../assets/images/its.jpg') } />
                        <CardBody>
                        <CardTitle>{newsfeed["name"]}{type}</CardTitle>
                        <CardSubtitle>| Category: {newsfeed["category"]} |</CardSubtitle>
                        <br/>
                        <CardText>{newsfeed["desc"]}</CardText>
                        <Link to={url}>View</Link>
                        {/* <RaisedButton label="View" primary={true} style={RaisedButtonStyle} onClick={(event) => browserHistory.push(url)}/> */}
                        <CardText>
                            <small className="text-muted">{moment(newsfeed["dateCreate"]).format("MMM DD YYYY hh:mm A")}</small>
                        </CardText>
                        </CardBody>
                    </Card>
                );
            }
        }

        return (
            
            <div>
                <MuiThemeProvider>
                <div id="outerDiv"> 
                    <NavBar />

                    <div style={{ margin: 20 }}>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to={`/home`}>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>NewsFeed</BreadcrumbItem>
                        </Breadcrumb>
                    </div>

                     <div style= {{ textAlign: "center" }}>
                        <RaisedButton label="Societies" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleSocieties(event)}/>
                        <RaisedButton label="Events" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleEvents(event)}/>
                    </div>
                    
                    <div style= {{ textAlign: "left" }}>
                        <RaisedButton label="Create New" primary={false} style={RaisedButtonStyle} onClick={(event) => this.openModal()}/>
                    </div>

                    <Modal
                        isOpen={this.state.modalIsOpen}
                        ariaHideApp={false}
                        //onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={content}
                        contentLabel="Example Modal"
                        >

                        <h2 ref={subtitle => this.subtitle = subtitle}>What's new?</h2>
                        <br/>
                        <br/>
                        <form style={{textAlign:"center"}}>
                            <label>Status</label>
                            <input onChange={this.updateInputValue} />
                            <br/>
                            <RaisedButton label="Save" primary={true} style={RaisedButtonStyle} onClick={(event) => this.closeModal()}/>
                        </form>
                    
                    </Modal>
        
                    <div className="card">
                        {rows}

                        {/* <Card>
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
                        </Card> */}

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
    content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
      }
}

const mapStateToProps = (state, props) => {
    console.log("state in newsfeed: " + state.data.newsfeeds);
    return {
      newsfeeds: state.data.newsfeeds
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
      onRetrieveAll: retrieveAll
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(NewsFeed);
