import React, {Component} from 'react';
import NavBar from './NavBar';
import LoadingBar from './LoadingBar';
import Calendar from './Calendar';
import Analysis from './Analysis';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import '../style/home.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getFcmToken } from '../actions/auth-action';

class Home extends Component {

    constructor(props) {
        super(props);

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

        setTimeout(() => {
            fetch(`http://useis-env-2.mtaihhapn5.ap-southeast-1.elasticbeanstalk.com/api/v1/notification`);
        }, 11000);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
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
                            {/* <h4>Event Recommendations</h4> */}
                            {/* <table className="table table-hover table-light" border="1">
                                <thead>
                                    <tr>
                                        <th>Events</th>
                                        <th>Organiser</th>
                                        <th>Attendance</th>                  
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>Work Shop</td>
                                        <td>IT Society</td>
                                        <td>45</td>
                                    </tr>
                                    <tr>
                                        <td>USTAR 8</td>
                                        <td>Music Society</td>
                                        <td>40</td>
                                    </tr>
                                    <tr>
                                        <td>Performance</td>
                                        <td>Wushu Society</td>
                                        <td>38</td>
                                    </tr>
                                </tbody>
                            </table>

                            <br/>
                            <br/>

                            <h4>Society Recommendations</h4>
                            <table className="table table-hover table-light" border="1">
                                <thead>
                                    <tr>
                                        <th>Societies</th>             
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>IT Society</td>
                                    </tr>
                                    <tr>
                                        <td>Music Society</td>
                                    </tr>
                                    <tr>
                                        <td>Wushu Society</td>
                                    </tr>
                                </tbody>
                            </table> */}
                            <br/>
                            <Analysis />
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
        isAuthenticated: state.auth.isAuthenticated
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
      onGetFcmToken: getFcmToken
    }, dispatch);
  };
  
export default connect(mapStateToProps, mapActionsToProps)(Home);
