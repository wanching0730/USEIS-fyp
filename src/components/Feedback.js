import React, { Component } from 'react';
import NavBar from './NavBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory} from 'react-router';
import { Link } from 'react-router';
import TextField from 'material-ui/TextField';
import StarRatingComponent from 'react-star-rating-component';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

class Feedback extends Component {

    constructor(props){
      super(props);
      this.state={
        first_name:'',
        last_name:'',
        email:'',
        password:'',
        rating: 1
      };
    };

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }

    handleClick() {
      browserHistory.push("/student");
    }
     
    
    render() {
  
      const { RaisedButtonStyle, ContainerStyle } = styles;
      const { rating } = this.state;
  
      return (
        <div>
          <MuiThemeProvider>
            <div>
              <NavBar />

              <div style={{ margin: 20 }}>
                  <Breadcrumb>
                    <BreadcrumbItem><Link to={`/`}>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem><a href="#">Student Profile</a></BreadcrumbItem>
                    <BreadcrumbItem active>Rating Form</BreadcrumbItem>
                  </Breadcrumb>
              </div>

              <div className="container" style={ContainerStyle}>
                <div className="form-style-10">
                  <h1>Rating Form<span>Leave your rating for this event!</span></h1>
                  <form>

                    <div class="section"><span>1</span>Name &amp; ID</div>
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

                      <div class="section"><span>2</span>Course &amp; Year</div>
                      <div class="inner-wrap">
                        <label>Course (Eg: Software Engineering)</label>
                        <input type="text" onChange={(event) => {this.setState({first_name:event.target.value})}}/>
                        <br/>
                        <label>Year and Semester (Eg: Y1S1)</label> 
                        <input type="text" onChange={(event) => {this.setState({first_name:event.target.value})}}/>
                      </div>

                      <div class="section"><span>3</span>Contact Number &amp; Email</div>
                      <div class="inner-wrap">
                        <label>Contact Number</label>
                        <input type="text" onChange={(event) => {this.setState({first_name:event.target.value})}}/>
                        <br/>
                        <label>Email Address (Eg: abc@hotmail.com)</label> 
                        <input type="text" onChange={(event) => {this.setState({first_name:event.target.value})}}/>
                        <br/> 
                      </div>

                      <div class="section"><span>4</span>Rating</div>
                      <div class="inner-wrap">
                          <label>Select the stars for rating</label>
                          <StarRatingComponent 
                          name="rate1" 
                          starCount={10}
                          value={rating}
                          onStarClick={this.onStarClick.bind(this)}
                          />
                          <p>{this.state.rating}</p>
                      </div>

                      <RaisedButton label="Submit" id="button2" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleClick(event)}/>
                      {/* <input type="text" onChange={(event) => {this.setState({first_name:event.target.value})}}/> */}
                    {/* <TextField
                      hintText="Enter your First Name"
                      floatingLabelText="First Name"
                      onChange = {(event,newValue) => this.setState({first_name:newValue})}
                      />
                    <br/>
                    <TextField
                      hintText="Enter your Last Name"
                      floatingLabelText="Last Name"
                      onChange = {(event,newValue) => this.setState({last_name:newValue})}
                      />
                    <br/>
                    <TextField
                      hintText="Enter your Email"
                      type="email"
                      floatingLabelText="Email"
                      onChange = {(event,newValue) => this.setState({email:newValue})}
                      />
                    <br/>
                    <TextField
                      type = "password"
                      hintText="Enter your Password"
                      floatingLabelText="Password"
                      onChange = {(event,newValue) => this.setState({password:newValue})}
                      />
                    <br/>
                    <br/>

                    
                  
                    <RaisedButton label="Submit" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleClick(event)}/> */}
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
      margin: 60
    }
  };
  
  export default Feedback;

