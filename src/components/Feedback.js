import React, { Component } from 'react';
import NavBar from './NavBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import StarRatingComponent from 'react-star-rating-component';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import '../style/form.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { create } from '../actions/post-action';

class Feedback extends Component {

    constructor(props){
      super(props);
      this.state={
        score: 1
      };

      this.handleClick = this.handleClick.bind(this);
    };

    onStarClick(nextValue, prevValue, name) {
        this.setState({score: nextValue});
    }

    handleClick() {
      // browserHistory.push("/student");
      let data = {
        id: this.props.id,
        eventId: this.props.params.eventId,
        score: this.state.score
      };

      this.props.onCreate("rating", data);
    }

    componentDidMount() {
      window.scrollTo(0, 0);
    }
    
    render() {
  
      const { RaisedButtonStyle, ContainerStyle } = styles;
      const { score } = this.state;
  
      return (
        <div>
          <MuiThemeProvider>
            <div>
              <NavBar />

              <div style={{ margin: 20 }}>
                  <Breadcrumb>
                    <BreadcrumbItem><Link to={`/home`}>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to={`/student`}>Student Profile</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Rating Form</BreadcrumbItem>
                  </Breadcrumb>
              </div>

              <div className="container" style={ContainerStyle}>
                <div className="form-style-10">
                  <h1>Rating Form<span>Leave your rating for this event!</span></h1>
                  <form>
                      <div class="section"><span>1</span>Rating</div>
                      <div class="inner-wrap">
                          <label>Select the stars for rating</label>
                          <StarRatingComponent 
                          name="rate1" 
                          starCount={10}
                          value={score}
                          onStarClick={this.onStarClick.bind(this)}
                          />
                          <p>{this.state.score}</p>
                      </div>

                    <RaisedButton label="Submit" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleClick(event)}/>
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
  
  const mapStateToProps = (state, props) => {
    return {
      id: state.auth.id,
    };
  };
  
  const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
      onCreate: create
    }, dispatch);
  };
  
  export default connect(mapStateToProps, mapActionsToProps)(Feedback);

