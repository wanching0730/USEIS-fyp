import React, { Component } from 'react';
import NavBar from './NavBar';
import LoadingBar from './LoadingBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import { confirmAlert } from 'react-confirm-alert';
import '../style/form.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { create, update, updatePostLoadingBar } from '../actions/post-action';
import { retrieveData } from '../actions/data-action';

class CreateProfile extends Component {

  constructor(props){
    super(props);

    this.state = {
      name:'',
      desc:'',
      category: 'dance',
      vision: '',
      mission: ''
    }

    console.log("societyid: " + this.props.params.societyId);

    if(this.props.params.societyId != null) 
      this.props.onRetrieveData("society", this.props.params.societyId);

    //console.log("nammeeee: " + this.props.society["name"]);

    this.handleClick = this.handleClick.bind(this);
    this.handleSocietyCategory = this.handleSocietyCategory.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    if(this.props.params.societyId != null) {
      setTimeout(function() { 
        let society = this.props.society;
        this.setState({
          name: society["name"],
          category: society["category"],
          vision: society["vision"],
          mission: society["mission"], 
          desc: society["desc"]
        })   
      }.bind(this), 3000)
    }
  }

  handleClick(event) {
    this.props.onUpdateLoadingBar();

    const { name, desc, vision, mission } = this.state;

    if(name == '' || desc == '' || vision == '' ||  mission == '') {
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
      let societyId = this.props.params.societyId;
      let data = this.state
      let societyName = data["name"];
      console.log("society content: " + JSON.stringify(data));
      if(societyId == null) {
        this.props.onCreate("society", data);
      } else {
        this.props.onUpdate("society", societyId, societyName, data);
      }
    }
  }

  handleSocietyCategory(event) {
    this.setState({category: event.target.value});
  }

  mapItem(item) {
    return <option value={item.value}>{item.name}</option>;
  }

  render() {
    console.log("loading flag: " + this.props.loading);

    const { RaisedButtonStyle } = styles;

    const societyCategories = [{value:'dance', name:'Dance'}, {value:'design', name:'Design'}, {value:'education', name:'Education'},
    {value:'entertainment', name:'Entertainment'}, {value:'music', name:'Music'}, {value:'softskill', name:'Soft Skill'}, 
    {value:'sport', name:'Sport'}, {value:'technology', name:'Technology'}];

    var header, breadCrumb;

    if(this.props.params.societyId == null) {
      header = <h1>Create Society Profile<span>Create your own society profile and start to promote it!</span></h1>;
      breadCrumb = 
        <Breadcrumb>
          <BreadcrumbItem><Link to={`/home`}>Home</Link></BreadcrumbItem>
          <BreadcrumbItem active>Create Society Profile</BreadcrumbItem>
        </Breadcrumb>
    } else {
      var name;
      if(this.props.society != null) {
        name = this.props.society["name"];
      }
      header = <h1>Edit Society Profile<span>Edit your own society profile and make it better!</span></h1>;
      breadCrumb = 
        <Breadcrumb>
          <BreadcrumbItem><Link to={`/home`}>Home</Link></BreadcrumbItem>
          <BreadcrumbItem><Link to={`/society`}>Societies</Link></BreadcrumbItem>
          <BreadcrumbItem><Link to={`/perSociety/` + this.props.params.societyId}>{name}</Link></BreadcrumbItem>
          <BreadcrumbItem active>Edit Society Profile</BreadcrumbItem>
        </Breadcrumb>
    }

    return (
      <div>
        <MuiThemeProvider>
          <div>
            <NavBar />

            <div style={{ margin: 20 }}>
              {breadCrumb}
            </div>

            {this.props.loading ?
            [<LoadingBar />]
            :
            [
              <div className="container">
                <div className="form-style-10">
                  { header }
                  <form>
                      <div class="section"><span>1</span>Name &amp; Category</div>
                      <div class="inner-wrap">
                          <label>Society Name</label>  
                          <input type="text" value={this.state.name} onChange={(event) => {
                            this.setState({name:event.target.value});
                            console.log("state value: " + this.state.name);
                            }}/>
                          <br/>
                          <label>Society Category (Eg: Technology)</label>
                          <select value={this.state.category} onChange={this.handleSocietyCategory}>
                            {societyCategories.map(this.mapItem)}
                          </select>
                      </div>

                      <div class="section"><span>2</span>Vision &amp; Mision</div>
                      <div class="inner-wrap">
                        <label>Society Vision</label>
                        <input type="text" value={this.state.vision} onChange={(event) => {this.setState({vision:event.target.value})}}/>
                        <br/>
                        <label>Society Mision</label> 
                        <input type="text" value={this.state.mission} onChange={(event) => {this.setState({mission:event.target.value})}}/>
                      </div>

                      <div class="section"><span>3</span>Description</div>
                          <div class="inner-wrap">
                          <label>Society Description</label>
                          <textarea id="txtArea" value={this.state.desc} onChange={(event) => {this.setState({desc:event.target.value})}}></textarea>
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
    createdSocietyId: state.create.createdSocietyId,
    society: state.data.society,
    loading: state.create.loading
  };
};

const mapActionsToProps = (dispatch, props) => {
  return bindActionCreators({
    onCreate: create,
    onUpdate: update,
    onRetrieveData: retrieveData,
    onUpdateLoadingBar: updatePostLoadingBar
  }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(CreateProfile);