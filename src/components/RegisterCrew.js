import React, { Component } from 'react';
import NavBar from './NavBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory} from 'react-router';
import { Link } from 'react-router';
import '../style/form.css';

class RegisterCrew extends Component {

  constructor(props){
    super(props);
    this.state={
      first_name:'',
      last_name:'',
      emailNoti: false,
      webNoti: false,
      position: 'secretary'
      // showModal: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  handleClick(event) {
      this.displayText();
      console.log("position: " + this.state.position);
      browserHistory.push("/myProfile");
  }

  handleChange(event) {
    this.setState({position: event.target.value});
  }

  mapItem(item) {
    return <option value={item.value}>{item.name}</option>;
  }
  
  render() {

    const { RaisedButtonStyle } = styles;
    const positions = [{value:'secretary', name:'Secretary'}, {value:'treasurer', name:'Treasurer'}, {value:'programme', name:'Programme HOD'},
    {value:'publicity', name:'Publicity HOD'}, {value:'logistics', name:'Logistics HOD'}, {value:'decoration', name:'Decoration HOD'},
    {value:'editorial', name:'Editorial HOD'}, {value:'technical', name:'Technical HOD'}];
    
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

            <div className="container">
              <div className="form-style-10">
                <h1>Register Crew<span>Register as event crew now and get yourself a chance for more exploration!</span></h1>
                <form>
                    <div class="section"><span>1</span>Full Name &amp; ID</div>
                    <div class="inner-wrap">
                        <label>Full Name</label>  
                        {/* <TextField onChange = {(event,newValue) => {this.setState({first_name:newValue})}} /> */}
                        <input type="text" onChange={(event) => {
                          this.setState({first_name:event.target.value});
                          console.log("state value: " + this.state.first_name);
                          }}/>
                        <br/>
                        <label>Student ID (Eg: 15UEB02834)</label>
                        <input type="text" onChange={(event) => {this.setState({first_name:event.target.value})}}/>
                    </div>

                    <div class="section"><span>2</span>Email &amp; Phone</div>
                    <div class="inner-wrap">
                      <label>Email Address</label>
                      <input type="text" onChange={(event) => {this.setState({first_name:event.target.value})}}/>
                      <label>Phone Number</label> 
                      <input type="text" onChange={(event) => {this.setState({first_name:event.target.value})}}/>
                    </div>

                    <div class="section"><span>3</span>Position</div>
                      <div class="inner-wrap">
                        <label>Position (Eg: Logistics HOD)</label>
                        <select value={this.state.position} onChange={this.handleChange}>
                          {positions.map(this.mapItem)}
                        </select>
                        
                        {/* <ButtonToolbar>{this.renderDropdownButton}</ButtonToolbar> */}
                    </div>
                    <div class="button-section">
                      <RaisedButton label="Submit" id="button2" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleClick(event)}/>
                      <RaisedButton label="Back" primary={true} style={RaisedButtonStyle} onClick={(event) => window.history.back()}/>
                    </div>
                </form>
                </div>
          </div>
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

export default RegisterCrew;