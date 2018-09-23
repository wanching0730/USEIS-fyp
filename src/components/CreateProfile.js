import React, { Component } from 'react';
import NavBar from './NavBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory} from 'react-router';
import { Link } from 'react-router';
import '../style/form.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { create } from '../actions/post-action';

class CreateProfile extends Component {

  constructor(props){
    super(props);

    this.state = {
      name:'',
      desc:'',
      category: '',
      vision: '',
      mission: ''
    }
  }

  handleClick(event) {
    const { name, desc, venue, chairperson, contact } = this.state;
    
    if(name == '' || desc == '' || venue == '' ||  chairperson == '' || contact == '' ) {
      confirmAlert({
        title: 'Warning',
        message: 'Please fill in all empty fields before proceed',
        buttons: [
            {
                label: 'Close'
            }
        ]
      })
      return false;
    } else {
      let data = this.state
      console.log("event content: " + JSON.stringify(data));
      this.props.onCreate("event", data);
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleClick(event) {
    if(this.props.params.societyId == null) {
      browserHistory.push("/society");
    } else {
      browserHistory.push("/myProfile");
    }
  }

  render() {

    const { RaisedButtonStyle, ContainerStyle } = styles;

    const societyCategories = [{value:'dance', name:'Dance'}, {value:'design', name:'Design'}, {value:'education', name:'Education'},
    {value:'entertainment', name:'Entertainment'}, {value:'music', name:'Music'}, {value:'softskill', name:'Soft Skill'}, 
    {value:'sport', name:'Sport'}, {value:'technology', name:'Technology'}];

    var header;

    if(this.props.params.societyId == null) {
      header = <h1>Create Society Profile<span>Create your own society profile and start to promote it!</span></h1>;
    } else {
      header = <h1>Edit Society Profile<span>Edit your own society profile and make it better!</span></h1>
    }

    return (
      <div>
        <MuiThemeProvider>
          <div>
            <NavBar />

            <div style={{ margin: 20 }}>
              <Breadcrumb>
                <BreadcrumbItem><Link to={`/home`}>Home</Link></BreadcrumbItem>
                <BreadcrumbItem active>Society Profile</BreadcrumbItem>
              </Breadcrumb>
            </div>

            <div className="container" style={ContainerStyle}>
              <div className="form-style-10">
                { header }
                <form>
                    <div class="section"><span>1</span>Name &amp; Category</div>
                    <div class="inner-wrap">
                        <label>Society Name</label>  
                        {/* <TextField onChange = {(event,newValue) => {this.setState({first_name:newValue})}} /> */}
                        <input type="text" onChange={(event) => {
                          this.setState({name:event.target.value});
                          console.log("state value: " + this.state.name);
                          }}/>
                        <br/>
                        <label>Society Category</label>
                        <select value={this.state.category} onChange={this.handleEventCategory}>
                          {societyCategories.map(this.mapItem)}
                        </select>
                    </div>

                    <div class="section"><span>2</span>Vision &amp; Mision</div>
                    <div class="inner-wrap">
                      <label>Society Vision</label>
                      <input type="text" onChange={(event) => {this.setState({vision:event.target.value})}}/>
                      <br/>
                      <label>Society Mision</label> 
                      <input type="text" onChange={(event) => {this.setState({mission:event.target.value})}}/>
                    </div>

                    <div class="section"><span>3</span>Description</div>
                        <div class="inner-wrap">
                        <label>Society Description</label>
                        <textarea id="txtArea" onChange={(event) => {this.setState({desc:event.target.value})}}></textarea>
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
    margin: 45
  }
};

const mapStateToProps = (state, props) => {
  console.log(JSON.stringify(state));
  return {
    createdSocietyId: state.create.createdSocietyId
  };
};

const mapActionsToProps = (dispatch, props) => {
  return bindActionCreators({
    onCreate: create
  }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(CreateProfile);