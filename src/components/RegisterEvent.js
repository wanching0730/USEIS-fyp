import React, { Component } from 'react';
import NavBar from './NavBar';
import LoadingBar from './LoadingBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { RaisedButton, Checkbox } from 'material-ui';
import { Link } from 'react-router';
import ToggleButton from 'react-toggle-button';
import ReactNotifications from 'react-browser-notifications';
import moment from "moment";
import '../style/form.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { create, updatePostLoadingBar, updateDouble} from '../actions/post-action';
import { retrieveDataWithUserId } from '../actions/data-action';

class RegisterEvent extends Component {

  constructor(props){
    super(props);

    if(!this.props.isAuthenticated) {
      window.location.assign('/');
    }

    this.state={
      webNoti: false,
      vegetarian: 0
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    if(parseInt(this.props.userName) == 0) 
      this.props.onRetrieveDataWithUserId("checkIsStaffRegistered", this.props.params.eventId, this.props.id);
    else
      this.props.onRetrieveDataWithUserId("checkIsStudentRegistered", this.props.params.eventId, this.props.id);
  }

  handleNotiClick(event) {
    window.focus()
    this.n.close(event.target.tag);
  }

  handleClick(event) {
    this.props.onUpdateLoadingBar();

    let current = moment();
    let data = {
      eventId: this.props.params.eventId,
      eventName: this.props.location.state["eventName"],
      id: this.props.id,
      position: "Participant",
      joinDate: moment(current).format("YYYY-MM-DD"),
      crewStatus: 0,
      vegetarian: this.state.vegetarian,
      webNoti: this.state.webNoti ? 1 : 0
    };

    if(parseInt(this.props.userName) == 0) {
      if(!this.props.isRegistered)
        this.props.onCreate("staffRegisterEvent", data);
      else
        this.props.onUpdateData("resubmitStaffParticipant", data, this.props.location.state["eventName"]);
    } else {
      if(!this.props.isRegistered)
        this.props.onCreate("studentRegisterEvent", data);
      else
        this.props.onUpdateData("resubmitStudentParticipant", data, this.props.location.state["eventName"]);
    }
  }

  handleChange(event) {
    this.setState({position: event.target.value});
  }

  mapItem(item) {
    return <option value={item.value}>{item.name}</option>;
  }

  // handle multiple input
  // handleInputChange(event) {
  //   const target = event.target;
  //   const value = target.type === 'checkbox' ? target.checked : target.value;
  //   const name = target.name;
  
  render() {

    const { RaisedButtonStyle } = styles;

    return (

      <div>
        <MuiThemeProvider>
          <div>
            <NavBar />

            <div style={{ margin: 20 }}>
              <Breadcrumb>
                <BreadcrumbItem><Link to={`/home`}>Home</Link></BreadcrumbItem>
                <BreadcrumbItem><Link to={`/event`}>Events</Link></BreadcrumbItem>
                <BreadcrumbItem><Link to={{pathname:`/perEvent/` + this.props.params.eventId, state: {eventName: this.props.location.state["eventName"]}}}>{this.props.location.state["eventName"]}</Link></BreadcrumbItem>
                <BreadcrumbItem active>Event Registration</BreadcrumbItem>
              </Breadcrumb>
            </div>

            {this.props.loading ?
            [<LoadingBar />]
            :
            [
              <div className="container">
                <div className="form-style-10">
                  <h1>Register {this.props.location.state["eventName"]}<span>Register the event now and get yourself a seat!</span></h1>
                  <form>
                      <div class="section"><span>1</span>Vegetarian</div>
                      <div class="inner-wrap">
                      Vegetarian
                      <Checkbox onCheck={(e, checked) => {
                          if(checked)
                            this.setState({vegetarian: 1});
                          else 
                            this.setState({vegetarian: 0});
                        }}
                      /> 
                      </div>

                      <div class="section"><span>2</span>Allow Notification</div>
                      <div class="inner-wrap">
                        <label>Allow Web Notification</label>
                        <ToggleButton
                            value={ this.state.webNoti || false }
                            onToggle={(value) => {
                                this.setState({
                                  webNoti: !value,
                                })
                            }} />
                        <br/>

                        <ReactNotifications
                          onRef={ref => (this.n = ref)} // Required
                          title="Some Title" // Required
                          body="This is the body!"
                          icon="devices-logo.png"
                          tag="abcdef"
                          timeout="1000"
                          onClick={event => this.handleNotiClick(event)}
                        />
                      </div>

                      <div class="button-section">
                        <RaisedButton label="Submit" id="button2" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleClick(event)}/>
                        <RaisedButton label="Back" primary={true} style={RaisedButtonStyle} onClick={(event) => window.history.back()}/>

                      </div>
                    </form>
                  </div>
                </div>
              ]}
          </div>
          </MuiThemeProvider>
        </div>
      );
    }
}

const styles = {
  RaisedButtonStyle: {
    margin: 15
  }
};

const mapStateToProps = (state, props) => {
  return {
    id: state.auth.id,
    userName: state.auth.userName,
    loading: state.create.loading,
    isRegistered: state.data.isRegistered,
    isAuthenticated: state.auth.isAuthenticated
  };
};

const mapActionsToProps = (dispatch, props) => {
  return bindActionCreators({
    onCreate: create,
    onUpdateLoadingBar: updatePostLoadingBar,
    onRetrieveDataWithUserId: retrieveDataWithUserId,
    onUpdateData: updateDouble,
  }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(RegisterEvent);