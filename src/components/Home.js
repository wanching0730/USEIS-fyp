import React, {Component} from 'react';
import NavBar from './NavBar';
import LoadingBar from './LoadingBar';
import Calendar from './Calendar';
import Analysis from './Analysis';
import {browserHistory} from 'react-router';
import { Snackbar, IconButton, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import '../style/home.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getFcmToken } from '../actions/auth-action';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = { open: false };

        this.handleClick = this.handleClick.bind(this);

        if(!this.props.isAuthenticated) {
            window.location.assign('/');
        }

        if(this.props.fcmToken == null) {
            setTimeout(() => {
                this.props.onGetFcmToken({
                  userId: this.props.userId,
                  fcmToken: ''
                });
            }, 3000);
    
            setTimeout(() => {
                // onMessage is an observable, it only need to be called once to use
                if(this.props.messaging != null) {
                    this.props.messaging.onMessage(function(payload) {
                        alert(payload["notification"]["title"] + ": \n" + payload["notification"]["body"]);
                    });
                }
            }, 9000);
        }

        // setTimeout(() => {
        //     fetch(`https://b2auwy2dql.execute-api.ap-southeast-1.amazonaws.com/v1/notification`);
        // }, 11000);
    }

    componentWillReceiveProps(nextProps){
        if((nextProps.snackBarShow != this.props.snackBarShow) || (this.props.snackBarShow != null)) {
            if(nextProps.snackBarShow)
                this.setState({ open: true });
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    handleClose = (event, reason) => {
        this.setState({ open: false });
    };

    handleClick() {
        browserHistory.push("/myRecommendation");
    }

    render() {
        return (
            <div id="outerDiv"> 
                <NavBar />

                <div style={{ margin: 20 }}>
                    <Breadcrumb>
                        <BreadcrumbItem active>Home</BreadcrumbItem>
                    </Breadcrumb>
                </div>

                {this.props.loading ?
                [<LoadingBar />]
                :
                [
                    <div>
                        <div className="pull-left col-md-8 col-lg-8 col-sm-8" id="col-9" style={{ marginTop: 20}}>
                            <Calendar />
                        </div>

                        <div className="pull-right col-md-4 col-lg-4 col-sm-4" id="col-3" style={{ marginTop: 20}}>
                            <Analysis />
                            <Snackbar
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                open={this.state.open}
                                autoHideDuration={6000}
                                onClose={this.handleClose}
                                ContentProps={{
                                    'aria-describedby': 'message-id',
                                }}
                                message={<span id="message-id">Note archived</span>}
                                action={[
                                    <Button key="undo" color="default" size="small" onClick={this.handleClick}>
                                        Proceed
                                    </Button>,
                                    <IconButton
                                    key="close"
                                    aria-label="Close"
                                    color="inherit"
                                    onClick={this.handleClose}
                                    >
                                    <CloseIcon />
                                    </IconButton>,
                                ]}
                            />
                        </div>
                    </div>
                ]}
            </div>
        );
    };
};

const mapStateToProps = (state, props) => {
    return {
        userId: state.auth.userId,
        messaging: state.auth.messaging,
        fcmToken: state.auth.fcmToken,
        loading: state.auth.loading,
        isAuthenticated: state.auth.isAuthenticated,
        snackBarShow: state.auth.snackBarShow
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
      onGetFcmToken: getFcmToken
    }, dispatch);
  };
  
export default connect(mapStateToProps, mapActionsToProps)(Home);
