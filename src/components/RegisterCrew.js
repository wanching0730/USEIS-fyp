import React, { Component } from 'react';
import NavBar from './NavBar';
import LoadingBar from './LoadingBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { RaisedButton, Checkbox } from 'material-ui';
import ToggleButton from 'react-toggle-button';
import { Link } from 'react-router';
import moment from "moment";
import '../style/form.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { create, updatePostLoadingBar} from '../actions/post-action';

class RegisterCrew extends Component {

  constructor(props){
    super(props);
    this.state={
      emailNoti: false,
      webNoti: false,
      position: 'secretary',
      vegetarian: 0
      // showModal: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  displayText() {
      if(this.state.webNoti) {
        if(this.n.supported()) 
          this.n.show();
      }
  }

  handleNotiClick(event) {
    window.focus()
    this.n.close(event.target.tag);
  }

  handleSubmit(event) {
      this.displayText();
      
      this.props.onUpdateLoadingBar();
      let current = moment();
      let data = {
        eventId: this.props.params.eventId,
        eventName: this.props.location.state["eventName"],
        id: this.props.id,
        position: this.state.position,
        joinDate: moment(current).format("YYYY-MM-DD"),
        crewStatus: 0,
        vegetarian: this.state.vegetarian,
        emailNoti: this.state.emailNoti ? 1 : 0,
        webNoti: this.state.webNoti ? 1 : 0
      };

      this.props.onCreate("registerEventCrew", data);
  }

  handleChange(event) {
    this.setState({position: event.target.value});
  }

  mapItem(item) {
    return <option value={item.value}>{item.name}</option>;
  }
  
  render() {

    const { RaisedButtonStyle } = styles;
    const positions = [{value:'Secretary', name:'Secretary'}, {value:'Treasurer', name:'Treasurer'}, {value:'Programme', name:'Programme HOD'},
    {value:'Publicity', name:'Publicity HOD'}, {value:'Logistics', name:'Logistics HOD'}, {value:'Decoration', name:'Decoration HOD'},
    {value:'Editorial', name:'Editorial HOD'}, {value:'Technical', name:'Technical HOD'}];
    
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
                <BreadcrumbItem active>Crew Registration</BreadcrumbItem>
              </Breadcrumb>
            </div>

            {this.props.loading ?
            [<LoadingBar />]
            :
            [
              <div className="container">
                <div className="form-style-10">
                  <h1>Register Crew<span>Register as event crew now and get yourself a chance for more exploration!</span></h1>
                  <form>
                      <div class="section"><span>3</span>Position</div>
                        <div class="inner-wrap">
                          <label>Position (Eg: Logistics HOD)</label>
                          <select value={this.state.position} onChange={this.handleChange}>
                            {positions.map(this.mapItem)}
                          </select>
                          
                          {/* <ButtonToolbar>{this.renderDropdownButton}</ButtonToolbar> */}
                      </div>
                      <div class="section"><span>1</span>Vegetarian</div>
                      <div class="inner-wrap">
                      Vegetarian
                      <Checkbox onCheck={(e, checked) => {
                          if(checked)
                            this.setState({vegetarian: 1});
                          else 
                            this.setState({vegetarian: 0});
                          console.log("vegetarian checked: " + this.state.vegetarian);
                        }}
                      /> 
                      </div>

                      <div class="section"><span>2</span>Allow Notification</div>
                      <div class="inner-wrap">
                        <label>Allow Email Notification</label>
                        <ToggleButton
                          value={ this.state.emailNoti || false }
                          onToggle={(value) => {
                              this.setState({
                              emailNoti: !value,
                              })
                          }} />
                        <br/>
                        <label>Allow Web Notification</label>
                        <ToggleButton
                            value={ this.state.webNoti || false }
                            onToggle={(value) => {
                                this.setState({
                                webNoti: !value,
                                })
                            }} />
                        <br/>
                      </div>
                      <div class="button-section">
                        <RaisedButton label="Submit" id="button2" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleSubmit(event)}/>
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
    loading: state.create.loading
  };
};

const mapActionsToProps = (dispatch, props) => {
  return bindActionCreators({
    onCreate: create,
    onUpdateLoadingBar: updatePostLoadingBar
  }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(RegisterCrew);