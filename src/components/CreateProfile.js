import React, { Component } from 'react';
import NavBar from './NavBar';
import LoadingBar from './LoadingBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import RaisedButton from 'material-ui/RaisedButton';
import { confirmAlert } from 'react-confirm-alert'; 
import { Link } from 'react-router';
import '../style/form.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { create, update, updatePostLoadingBar } from '../actions/post-action';
import { retrieveData, retrieveAll, updateLoadingBar } from '../actions/data-action';

class CreateProfile extends Component {

  constructor(props){
    super(props);

    if(!this.props.isAuthenticated) {
      window.location.assign('/');
    }

    this.state = {
      name:'',
      desc:'',
      category: 'Dance',
      vision: '',
      mission: '',
      logoUrl: '',
      userId: this.props.userId,
      positionOptions: [],
      position1: 2, position2: 3, position3: 0,
      selectedFile: null,
      selectedFileName: ''
    }

    if(this.props.params.societyId) {
      this.props.onUpdateRetrieveLoadingBar();
      this.props.onRetrieveData("society", this.props.params.societyId);
    }

    this.props.onRetrieveAll("societyRole");

    this.handleClick = this.handleClick.bind(this);
    this.handleSocietyCategory = this.handleSocietyCategory.bind(this);
    this.handleSelectedFile = this.handleSelectedFile.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    if(this.props.params.societyId) {
      setTimeout(function() { 
        let society = this.props.society;

        this.setState({
          name: society["name"],
          category: society["category"],
          vision: society["vision"],
          mission: society["mission"], 
          desc: society["desc"]
        });

        if(society["roles"].length > 0) {
          let authorizedPositions = society["roles"];
          if(authorizedPositions[0] != null)
            this.setState({ position1: authorizedPositions[0]["sRoleId"]});
          if(authorizedPositions[1] != null)
            this.setState({ position2: authorizedPositions[1]["sRoleId"]});
          if(authorizedPositions[2] != null)
            this.setState({ position3: authorizedPositions[2]["sRoleId"]});
        }
      }.bind(this), 5000)
    }
  }

  componentWillReceiveProps(nextProps){
    if((nextProps.roles != this.props.roles) || (this.props.roles != null)) {
      var positionOptions = [];
      var positions = nextProps.roles;

      for(var i = 0; i < positions.length; i++) {
        if(positions[i] != null) {
          let position = positions[i];

          if(position["sRoleId"] == 1) {
            positionOptions.push({
              value: 0,
              name: "None"
            });
          } else {
            positionOptions.push({
              value: position["sRoleId"],
              name: position["roleName"]
            });
          }
        }
      }
      this.setState({positionOptions: positionOptions});
    }
  }

  handleClick(event) {
    const { name, desc, vision, mission, selectedFileName, position1, position2, position3, selectedFile } = this.state;

    if(name == '' || desc == '' || vision == '' ||  mission == '') {
      confirmAlert({
        title: 'Warning',
        message: 'Please fill in all empty fields to proceed',
        buttons: [
            {
                label: 'Close'
            }
        ]
      })
      return false;
    } else if (position1 == 1 && position2 == 1 && position3 == 1) {
      confirmAlert({
        title: 'Warning',
        message: 'Please select authorized positions for this society to proceed',
        buttons: [
            {
                label: 'Close'
            }
        ]
      })
    } else if(!selectedFile) {
      confirmAlert({
        title: 'Warning',
        message: 'Please upload poster for this society to proceed',
        buttons: [
            {
                label: 'Close'
            }
        ]
      })
    }
    else  {
      this.props.onUpdateCreateLoadingBar();

      var bucketName = process.env.REACT_APP_S3_BUCKET_NAME;
      var bucketRegion = process.env.REACT_APP_S3_BUCKET_REGION;
      var IdentityPoolId = process.env.REACT_APP_AWS_IDENTITY_POOL_ID;
      var AWS = require('aws-sdk');
      var fileKey = encodeURIComponent(this.state.selectedFileName);
      var file = this.state.selectedFile;
      
      AWS.config.update({
        region: bucketRegion,
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: IdentityPoolId
        })
      });

      var s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        params: {Bucket: bucketName}
      });
      
      s3.upload({ Key: fileKey, Body: file, ACL: 'public-read'}, function(err, data) {
        if (err) {
          return alert('There was an error uploading your photo: ', err.message);
        }
      });

      var authorizedPositions = [];
      if(this.state.position1 != 0)
        authorizedPositions.push(this.state.position1);
      if(this.state.position2 != 0)
        authorizedPositions.push(this.state.position2);
      if(this.state.position3 != 0)
        authorizedPositions.push(this.state.position3);

      let societyId = this.props.params.societyId;
      let data = this.state;
      let societyName = data["name"];

      data["authorizedPositions"] = authorizedPositions
      data["logoUrl"] = "https://" + bucketName + ".s3." + bucketRegion + ".amazonaws.com/" + selectedFileName;
      
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

  handleSelectedFile (event) {
    this.setState({
      selectedFile: event.target.files[0],
      selectedFileName: event.target.files[0].name
    });
  }

  mapItem(item) {
    return <option value={item.value}>{item.name}</option>;
  }

  render() {
    const { RaisedButtonStyle } = styles;

    const societyCategories = [{value:'Dance', name:'Dance'}, {value:'Design', name:'Design'}, {value:'Education', name:'Education'},
    {value:'Entertainment', name:'Entertainment'}, {value:'Music', name:'Music'}, {value:'Soft Skill', name:'Soft Skill'}, 
    {value:'Sport', name:'Sport'}, {value:'Technology', name:'Technology'}];

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
          <BreadcrumbItem><Link to={{pathname:`/perSociety/` + this.props.params.societyId, state: {societyName: name}}}>{name}</Link></BreadcrumbItem>
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

            {this.props.createLoading || this.props.retrieveLoading || this.state.positionOptions.length == 0 ?
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

                      <div class="section"><span>4</span>Logo</div>
                          <div class="inner-wrap">
                          <label>Upload Society Logo</label>
                          <input type="file" onChange={this.handleSelectedFile} />
                          {/* <input type="text" value={this.state.logoUrl} onChange={(event) => {this.setState({logoUrl:event.target.value})}}/> */}
                      </div>

                      <div class="section"><span>5</span>Authorized Position</div>
                        <div class="inner-wrap">
                          <label>First position</label>
                          <select value={this.state.position1} onChange={(event) => {this.setState({position1:event.target.value})}}>
                            {this.state.positionOptions.map(this.mapItem)}
                          </select>
                          <br/>
                          <label>Second position</label>
                          <select value={this.state.position2} onChange={(event) => {this.setState({position2:event.target.value})}}>
                            {this.state.positionOptions.map(this.mapItem)}
                          </select>
                          <br/>
                          <label>Third position</label>
                          <select value={this.state.position3}  onChange={(event) => {this.setState({position3:event.target.value})}}>
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
    userId: state.auth.id,
    society: state.data.society,
    createLoading: state.create.loading,
    retrieveLoading: state.data.loading,
    roles: state.data.roles,
    isAuthenticated: state.auth.isAuthenticated
  };
};

const mapActionsToProps = (dispatch, props) => {
  return bindActionCreators({
    onCreate: create,
    onUpdate: update,
    onRetrieveData: retrieveData,
    onRetrieveAll: retrieveAll,
    onUpdateRetrieveLoadingBar: updateLoadingBar,
    onUpdateCreateLoadingBar: updatePostLoadingBar
  }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(CreateProfile);