import React, { Component } from 'react';
import NavBar from './NavBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {RaisedButton } from 'material-ui';
import {browserHistory} from 'react-router';
import { Link } from 'react-router';
import '../style/form.css';

class SubmitProposal extends Component {

  constructor(props){
    super(props);
    this.state={
      first_name:'',
      last_name:'',
      emailNoti: false,
      webNoti: false,
      vegetarian: true,
      course: 'accounting'
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

      const data = Object.keys(this.state).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(this.state[key]);
      }).join('&');

      fetch(`http://localhost:5000/puppies/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
      }).then(function(response) {
        return response;
      });

  }

  handleNotiClick(event) {
    window.focus()
    this.n.close(event.target.tag);
  }

  handleClick(event) {
      this.displayText();
      console.log("course: " + this.state.course);
      browserHistory.push("/perEvent/1");
  }

  handleChange(event) {
    this.setState({course: event.target.value});
  }

  mapItem(item) {
    return <option value={item.value}>{item.name}</option>;
  }

  render() {

    const { RaisedButtonStyle, ContainerStyle } = styles;
    const courses = [{value:'accounting', name:'Accounting'}, {value:'chemical', name:'Chemical Engineering'}, {value:'civil', name:'Civil Engineering'}, 
    {value:'electronic', name:'Electronic Engineering'}, {value:'mechanical', name:'Mechanical Engineering'}, {value:'mechatronic', name:'Mechatronic Engineering'}, 
    {value:'software', name:'Software Engineering'}, {value:'mbbs', name:'MBBS'}];

    return (
      <div>
        <MuiThemeProvider>
          <div>
            <NavBar />

            <div style={{ margin: 20 }}>
              <Breadcrumb>
                <BreadcrumbItem><Link to={`/`}>Home</Link></BreadcrumbItem>
                <BreadcrumbItem><Link to={`/society`}>Societies</Link></BreadcrumbItem>
                <BreadcrumbItem active>Proposal Submission</BreadcrumbItem>
              </Breadcrumb>
            </div>

            <div className="container" style={ContainerStyle}>
              <div className="form-style-10">
                <h1>Submit Event Proposal<span>Submit your proposal event as fast as possible to obtain required resources!</span></h1>
                <form>
                    <div class="section"><span>1</span>Society Name</div>
                    <div class="inner-wrap">
                        <label>Society Name</label>  
                        <input type="text" onChange={(event) => {
                          this.setState({first_name:event.target.value});
                          console.log("state value: " + this.state.first_name);
                          }}/>
                    </div>

                    <div class="section"><span>2</span>Event Name</div>
                    <div class="inner-wrap">
                      <label>Event Name</label>
                      <input type="text" onChange={(event) => {
                          this.setState({first_name:event.target.value});
                          console.log("state value: " + this.state.first_name);
                          }}/>
                    </div>

                    <div class="section"><span>3</span>Event Proposal</div>
                    <div class="inner-wrap">
                      <label>Proposal Submission</label>
                      <input type="file" accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"/>
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
  }, 
  ContainerStyle: {
    margin: "30px",
    position: "absolute",
    width: "100%"
  }
};

export default SubmitProposal;