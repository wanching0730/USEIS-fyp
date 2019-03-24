import React, { Component } from 'react';
import NavBar from './NavBar';
import LoadingBar from './LoadingBar';
import { Link } from 'react-router';
import SearchBar from 'material-ui-search-bar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Breadcrumb, BreadcrumbItem, Card, CardText, CardBody,
    CardTitle, CardSubtitle } from 'reactstrap';
import Modal from 'react-modal';
import RaisedButton from 'material-ui/RaisedButton';
import { confirmAlert } from 'react-confirm-alert';
import moment from "moment";
import openSocket from 'socket.io-client';
import { API_BASE_URL } from '../constant';
import '../style/newsfeed.css';
import '../style/alert.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveAll, retrieveData, updateLoadingBar } from '../actions/data-action';
import { create, updatePostLoadingBar } from '../actions/post-action';
import { deleteData, updateDeleteLoadingBar } from '../actions/delete-action';

class NewsFeed extends Component {

    constructor(props) {
        super(props);

        if(!this.props.isAuthenticated) {
            window.location.assign('/');
        }

        this.state = {
            modalIsOpen: false,
            inputValue: "",
            searchWord: "",

            status: "all",
            owner: "s",
            ownerId: null,
            ownerName: null,
            ownerCategory: null,

            societyOptions: null,
            eventOptions: null,

            newsfeeds: null
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
        this.updateAddedNewsfeeds = this.updateAddedNewsfeeds.bind(this);
        this.updateDeletedNewsfeeds = this.updateDeletedNewsfeeds.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handleOwner = this.handleOwner.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.clickSave = this.clickSave.bind(this);

        this.props.onUpdateLoadingBar();
        this.props.onRetrieveAll("newsfeeds");

        if(isNaN(this.props.userName))
            this.props.onRetrieveData("staffEvent", this.props.userId);
        else 
            this.props.onRetrieveData("studentEvent", this.props.userId);
       

        setTimeout(() => {
            this.setState({
                newsfeeds: this.props.newsfeeds
            });
        }, 6000);
    }

    componentDidMount() {
        window.scrollTo(0, 0);

        const socket = openSocket(API_BASE_URL);
        socket.on('updateAddedNewsfeed', this.updateAddedNewsfeeds);
        socket.on('updateDeletedNewsfeed', this.updateDeletedNewsfeeds);

        if(this.props.societies != null) {
            let societies = this.props.societies;
            let options = [];
            for(var i = 0; i < societies.length; i++) {
                let society = societies[i];
                if([2,3,9].includes(society["sRoleId"])) {
                    options.push({
                        value: society["societyId"],
                        name: society["name"]
                    });
                }
            }
            this.setState({
                societyOptions: options
            }, () => {
                this.setDefault();
                this.setState(this.state);
            });
        } 
    }

    componentWillReceiveProps(nextProps){
        if((nextProps.newsfeeds != this.props.newsfeeds) || (this.props.newsfeeds == null)) {
          this.setState({newsfeeds: nextProps.newsfeeds });
        }

        if((nextProps.userEvents != this.props.userEvents) || (this.props.userEvents != null)) {
            if(this.props.userEvents != null) {
                let events = this.props.userEvents;
                let options = [];
                for(var i = 0; i < events.length; i++) {
                    let event = events[i];
                    if([2,3,10].includes(event["eRoleId"])) {
                        options.push({
                            value: event["eventId"],
                            name: event["name"]
                        });
                    }
                }
                this.setState({
                    eventOptions: options
                }, () => this.setDefault());
            }
        }
    }

    updateAddedNewsfeeds(newsfeedItem) {
        this.setState({ newsfeeds: [newsfeedItem, ...this.state.newsfeeds] }, function() {
            this.setState(this.state);
        });
    }

    updateDeletedNewsfeeds(newsfeedItem) {
        let list = this.state.newsfeeds;
        for(var i = 0; i < list.length; i++) {
            let item = list[i];
            if(item["newsfeedId"] == newsfeedItem["newsfeedId"] && item["type"] == newsfeedItem["type"]) {
                var index = list.indexOf(item);
                list.splice(index, 1);
            }
        }
        this.setState({ newsfeeds: list });
    }

    openModal() {
        this.setState({modalIsOpen: true});
        this.setDefault();
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    clickSave() {
        this.setState({modalIsOpen: false});

        if(this.state.inputValue == "") {
            confirmAlert({
                customUI: ({ onClose }) => {
                    return (
                        <MuiThemeProvider>
                            <div className='custom-alert'>
                                <h1>Warning</h1>
                                <p>Please fill in status description before proceed</p>
                                <RaisedButton label="Close" primary={true} onClick={() => onClose()}/>
                            </div>
                        </MuiThemeProvider>
                    )
                }
            })
            return false;
          } else {
            this.props.onUpdatePostLoadingBar();
            
            if(this.state.owner == "s") {
                let societies = this.props.societies;
                for(var i = 0; i < societies.length; i++) {
                    let society = societies[i];
                    if(society["societyId"] == this.state.ownerId) {
                        // call submit() method after the state is set completely
                        this.setState({
                            ownerName: society["name"],
                            ownerCategory: society["category"]
                        }, () => {
                            this.submitData();
                        })
                        return;
                    }
                }
            } else {
                let events = this.props.userEvents;
                for(var i = 0; i < events.length; i++) {
                    let event = events[i];
                    if(event["eventId"] == this.state.ownerId) {
                        this.setState({
                            ownerName: event["name"],
                            ownerCategory: event["category"]
                        }, () => {
                            this.submitData();
                        })
                        return;
                    }
                }
            }
          }
    }

    submitData() {
        let current = moment();
        let data = {
            ownerId: this.state.ownerId,
            name: this.state.ownerName,
            category: this.state.ownerCategory,
            desc: this.state.inputValue,
            dateCreate: moment(current).format("YYYY-MM-DD hh:mm:ss A"),
            type: this.state.owner
        };

        this.props.onCreate("newsfeeds", data);

        this.setState({
            status: "all",
            owner: "s",
            ownerId: null,
            ownerName: null,
            ownerCategory: null
        });
    }

    handleDelete(targetNewsfeedId, type) {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <MuiThemeProvider>
                        <div className='custom-alert'>
                            <h2>Delete Confirmation</h2>
                            <p>Are you sure to delete this newsfeed?</p>
                            <RaisedButton label="Yes" primary={true} onClick={() => {   
                                this.props.onUpdateDeleteLoadingBar(); 

                                if(type == "s")
                                    this.props.onDeleteData("sNewsfeed", targetNewsfeedId);
                                else 
                                this.props.onDeleteData("eNewsfeed", targetNewsfeedId);

                                onClose();
                            }}/>
                            &nbsp;&nbsp;&nbsp;
                            <RaisedButton label="No" primary={true} onClick={() => onClose()}/>
                        </div>
                    </MuiThemeProvider>
                )
            }
        })
    }

    updateInputValue(event) {
        this.setState({
          inputValue: event.target.value
        });
    }

    handleOptionChange(event) {
        this.setState({
            owner: event.target.value
        }, () => this.setDefault());
    }

    setDefault() {
        if(this.state.owner == "s") {
            let first = this.state.societyOptions;
            if(first.length != 0) {
                this.setState({
                    ownerId: first[0]["value"]
                });
            }
        } else {
            let first = this.state.eventOptions;
            if(first.length != 0) {
                this.setState({
                    ownerId: first[0]["value"]
                });
            }
        }
    }

    handleOwner(event) {
        this.setState({
            ownerId: event.target.value
        });
    }

    mapItem(item) {
        return <option value={item.value}>{item.name}</option>;
    }

    render() {
        const { RaisedButtonStyle, content, CreateButtonStyle } = styles;
        let newsfeeds = this.state.newsfeeds;
        let filteredNewsfeeds = [];
        var dropdown,createButton;
            
        if(this.state.owner == "s") {
            if(this.state.societyOptions != null) {
                if(this.state.societyOptions.length != 0)
                    dropdown = <select value={this.state.ownerId} onChange={this.handleOwner}>
                                    {this.state.societyOptions.map(this.mapItem)}
                                </select>;
                else 
                    dropdown = "No societies available";
            } 
        } else {
            if(this.state.eventOptions != null) {
                if(this.state.eventOptions.length != 0)
                    dropdown = <select value={this.state.ownerId} onChange={this.handleOwner}>
                                    {this.state.eventOptions.map(this.mapItem)}
                                </select>
                else 
                    dropdown = "No events available";
            }
        }

        if(this.state.societyOptions != null && this.state.eventOptions != null) {
            if(this.state.societyOptions.length != 0 || this.state.eventOptions.length != 0)
                createButton = <div style= {{ textAlign: "left" }}>
                                    <RaisedButton label="Create New" primary={false} style={CreateButtonStyle} onClick={(event) => this.openModal()}/>
                                </div>;
        }
        
        if(newsfeeds != null) {
            var toView;
            var type  = "";
            var rows = [];

            if(this.state.status == "s") {
                for(var i = 0; i < newsfeeds.length; i++) 
                    if(newsfeeds[i]["type"] == "s")
                        filteredNewsfeeds.push(newsfeeds[i]);
            } else if(this.state.status == "e") {
                for(var i = 0; i < newsfeeds.length; i++) 
                    if(newsfeeds[i]["type"] == "e")
                        filteredNewsfeeds.push(newsfeeds[i]);
            } else {
                filteredNewsfeeds = newsfeeds;
            }
            
            for(var i = 0; i < filteredNewsfeeds.length; i++) {
                if(this.state.searchWord == "" || filteredNewsfeeds[i]["name"].toLowerCase().includes(this.state.searchWord.toLowerCase())) {
                    let newsfeed = filteredNewsfeeds[i];
                    if(newsfeed["type"] == "s") {
                        // url = "/perSociety/" + newsfeed["ownerId"];
                        toView = {
                            pathname: "/perSociety/" + newsfeed["ownerId"],
                            state: {societyName: newsfeed["name"]}
                        }
                        type = " Society";
                    }
                    else {
                        // url = "/perEvent/" + newsfeed["ownerId"];
                        toView = {
                            pathname: "/perEvent/" + newsfeed["ownerId"],
                            state: {eventName: newsfeed["name"]}
                        }
                        type = " Event";
                    }

                    rows.push(
                        <Card>
                            <img className="image" src={newsfeed["logoUrl"]} />
                            <CardBody>
                            <CardTitle>{newsfeed["name"]}{type}</CardTitle>
                            <CardSubtitle>| Category: {newsfeed["category"]} |</CardSubtitle>
                            <br/>
                            <CardText>{newsfeed["description"]}</CardText>
                            <Link to={toView}>View</Link>&nbsp;&nbsp;&nbsp;<a href="#" onClick={() => this.handleDelete(newsfeed["newsfeedId"], newsfeed["type"])}>Delete</a>
                            <CardText>
                                <small className="text-muted">{moment(newsfeed["dateCreate"]).format("MMM DD YYYY hh:mm A")}</small>
                            </CardText>
                            </CardBody>
                        </Card>
                    );
                } else {
                    continue;
                }
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
                        <RaisedButton label="All" primary={true} style={RaisedButtonStyle} onClick={(event) => this.setState({status: "a"})}/>
                        <RaisedButton label="Societies" primary={true} style={RaisedButtonStyle} onClick={(event) => this.setState({status: "s"})}/>
                        <RaisedButton label="Events" primary={true} style={RaisedButtonStyle} onClick={(event) => this.setState({status: "e"})}/>
                    </div>

                    <SearchBar 
                        hintText="Search society or event..."
                        onChange={(newValue) => this.setState({ searchWord: newValue })}
                        style={{
                            marginLeft: 20,
                            marginBottom: 20,
                            maxWidth: 290,
                            borderRadius: 6,
                            margin: "auto"
                        }}
                    />
    
                    {createButton}

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
                        <form style={{textAlign:"center"}}>
                            <label><strong>Choose: </strong></label>
                            <br/>
                            <input type="radio" value="s" 
                                checked={this.state.owner === 's'} 
                                onChange={this.handleOptionChange} /> Society 
                            &nbsp;
                            <input type="radio" value="e" 
                                checked={this.state.owner === 'e'} 
                                onChange={this.handleOptionChange} /> Event
                            <br/><br/>
                            <label><strong>Post From: </strong></label>
                            <br/>
                            {dropdown}
                            <br/><br/>
                            <label><strong>Status: </strong></label>
                            <br/>
                            <textarea onChange={this.updateInputValue}></textarea>
                            <br/><br/>
                            <RaisedButton label="Save" primary={true} style={RaisedButtonStyle} onClick={(event) => this.clickSave()}/>
                        </form>
                    
                    </Modal>
        
                    {this.props.retrieveLoading || this.props.postLoading || this.props.deleteLoading || this.state.newsfeeds == null ? 
                        [<LoadingBar />]
                        :
                        [
                            <div className="cardlist">
                                {rows}
                            </div>
                        ]
                    }
                    
                </div>
                </MuiThemeProvider>
            </div>
        );
    };
    
};

const styles = {
    RaisedButtonStyle: {
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 15
    },
    content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }, 
    CreateButtonStyle: {
        marginLeft: 145,
        marginBottom: 15
    }
}

const mapStateToProps = (state, props) => {
    return {
        userId: state.auth.id,
        userName: state.auth.userName,
        isAuthenticated: state.auth.isAuthenticated,
        newsfeeds: state.data.newsfeeds,
        societies: state.auth.societies,
        userEvents: state.data.userEvents,
        retrieveLoading: state.data.loading,
        postLoading: state.create.loading,
        deleteLoading: state.delete.loading
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
        onRetrieveAll: retrieveAll,
        onRetrieveData: retrieveData,
        onCreate: create,
        onUpdateLoadingBar: updateLoadingBar,
        onUpdatePostLoadingBar: updatePostLoadingBar,
        onDeleteData: deleteData,
        onUpdateDeleteLoadingBar: updateDeleteLoadingBar
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(NewsFeed);
