import React, { Component } from 'react';
import NavBar from './NavBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import StarRatingComponent from 'react-star-rating-component';

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
     
    
    render() {
  
      const { RaisedButtonStyle, ContainerStyle } = styles;
      const { rating } = this.state;
  
      return (
        <div>
          <MuiThemeProvider>
            <div>
              <NavBar />
              <div className="container" style={ContainerStyle}>
              <form>
              <TextField
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

               <div>
                  <h2>Rate this event!</h2>
                  <StarRatingComponent 
                  name="rate1" 
                  starCount={10}
                  value={rating}
                  onStarClick={this.onStarClick.bind(this)}
                  />
              </div>

              <p>{this.state.rating}</p>
            
              <RaisedButton label="Submit" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleClick(event)}/>
              </form>
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

