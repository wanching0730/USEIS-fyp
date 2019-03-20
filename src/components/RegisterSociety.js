import React, { Component } from 'react';
import NavBar from './NavBar';
import LoadingBar from './LoadingBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import RaisedButton from 'material-ui/RaisedButton';
import ToggleButton from 'react-toggle-button';
import ReactNotifications from 'react-browser-notifications';
import { Link } from 'react-router';
import moment from "moment";
import '../style/form.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { create, updatePostLoadingBar, updateDouble } from '../actions/post-action';
import { retrieveDataWithUserId, retrieveAll } from '../actions/data-action';

class RegisterSociety extends Component {

  constructor(props){
    super(props);

    if(!this.props.isAuthenticated) {
      window.location.assign('/');
    }

    this.state = {
      sRoleId: 1,
      positionOptions: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    this.props.onRetrieveDataWithUserId("checkIsSocietyRegistered", this.props.params.societyId, this.props.id);
    this.props.onRetrieveAll("societyRole");
  }

  componentWillReceiveProps(nextProps){
    if((nextProps.roles != this.props.roles) || (this.props.roles != null)) {
      var positionOptions = [];
      var positions = nextProps.roles;

      for(var i = 0; i < positions.length; i++) {
        if(positions[i] != null) {
          let position = positions[i];
          positionOptions.push({
            value: position["sRoleId"],
            name: position["roleName"]
          });
        }
      }
      this.setState({positionOptions: positionOptions});
    }
  }

  handleClick(event) {
    this.props.onUpdateLoadingBar();

    let current = moment();
    let data = {
      societyId: this.props.params.societyId,
      societyName: this.props.location.state["societyName"],
      studentId: this.props.id,
      sRoleId: this.state.sRoleId,
      joinDate: moment(current).format("YYYY-MM-DD")
    };

    if(isNaN(this.props.userName)) {
      if(!this.props.isRegistered)
        this.props.onCreate("staffRegisterSociety", data);
      else
        this.props.onUpdateData("resubmitAdvisorRegistration", data, this.props.location.state["societyName"]);
    } else {
      if(!this.props.isRegistered)
        this.props.onCreate("studentRegisterSociety", data);
      else
        this.props.onUpdateData("resubmitMemberRegistration", data, this.props.location.state["societyName"]);
    }
    
  }

  handleChange(event) {
    this.setState({sRoleId: event.target.value});
  }

  mapItem(item) {
    return <option value={item.value}>{item.name}</option>;
  }
  
  render() {
    const { RaisedButtonStyle } = styles;
    // const positionOptions = [{value:'Chairperson', name:'Chairperson'}, {value:'Vice Chairperson', name:'Vice Chairperson'}, {value:'Secretary', name:'Secretary'}, {value:'Vice Secretary', name:'Vice Secretary'},
    //   {value:'Treasurer', name:'Treasurer'}, {value:'Publicity', name:'Publicity'}, {value:'Logistics', name:'Logistics'}, {value:'Auditor', name:'Auditor'}, {value:'Member', name:'Member'}]

    return (
      <div>
        <MuiThemeProvider>
        <div>
            <NavBar />

            <div style={{ margin: 20 }}>
                <Breadcrumb>
                  <BreadcrumbItem><Link to={`/home`}>Home</Link></BreadcrumbItem>
                  <BreadcrumbItem><Link to={`/society`}>Societies</Link></BreadcrumbItem>
                  <BreadcrumbItem><Link to={{pathname:`/perSociety/` + this.props.params.societyId, state: {societyName: this.props.location.state["societyName"]}}}>{this.props.location.state["societyName"]}</Link></BreadcrumbItem>
                  <BreadcrumbItem active>Registration</BreadcrumbItem>
                </Breadcrumb>
            </div>

            {this.props.loading || this.state.positionOptions.length == 0 ?
            [<LoadingBar />]
            :
            [
              <div className="container">
                <div className="form-style-10">
                  <h1>Register {this.props.location.state["societyName"]}<span>Register society and looking forward for the upcoming events!</span></h1>
                  <form>
                      {/* <div class="section"><span>1</span>Allow Notification</div>
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
                      </div> */}

                      <div class="section"><span>1</span>Position</div>
                        <div class="inner-wrap">
                          <label>Position</label>
                          <select onChange={this.handleChange}>
                            {this.state.positionOptions.map(this.mapItem)}
                          </select>
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
    roles: state.data.roles,
    isAuthenticated: state.auth.isAuthenticated
  };
};

const mapActionsToProps = (dispatch, props) => {
  return bindActionCreators({
    onCreate: create,
    onUpdateLoadingBar: updatePostLoadingBar,
    onRetrieveAll: retrieveAll,
    onRetrieveDataWithUserId: retrieveDataWithUserId,
    onUpdateData: updateDouble
  }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(RegisterSociety);