import React, { Component } from 'react';
import NavBar from './NavBar';
import LoadingBar from './LoadingBar';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { confirmAlert } from 'react-confirm-alert'; 
import * as FontAwesome from '../../node_modules/react-icons/lib/fa';
import { Link } from 'react-router';
import '../style/table.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveData, updateLoadingBar } from '../actions/data-action';
import { updateDouble } from '../actions/post-action';

class ManageMember extends Component {

    constructor(props) {
        super(props);

        this.state = {studentId: -1};

        this.props.onUpdateLoadingBar();
        this.props.onRetrieveData("societyMember", this.props.params.societyId);
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    handleApprove(event) {
        let studentId = event.target.value;
        this.setState({studentId: studentId})

        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <MuiThemeProvider>
                        <div className='custom-alert'>
                            <h1>Approval Confirmation</h1>
                            <p>Are you sure to approve this member?</p>
                            <RaisedButton label="Yes" primary={true} onClick={() => {
                                        let data = {
                                            studentId: this.state.studentId,
                                            societyId: this.props.params.societyId
                                        }
                                        this.props.onUpdateData("member", data, this.props.location.state["societyName"]);
                                    }
                                }/>
                            <RaisedButton label="No" primary={true} onClick={() => onClose()}/>
                        </div>
                    </MuiThemeProvider>
                )
            }
          })
    }

    handleDelete() {
        confirmAlert({
            title: 'Delete Confirmation',
            message: 'Are you sure to delete this crew?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    console.log('Click Yes');
                }
              },
              {
                label: 'No',
                onClick: () => console.log('Click No')
              }
            ]
          })
    }

    render() {

        const { RaisedButtonStyle } = styles;
        let societyMembers = this.props.societyMembers;
        var message = <div></div>;
        var rows = [];

        if(societyMembers != null) {
            if(societyMembers.length != 0) {
                for(var i = 0; i < societyMembers.length; i++) {
                    let member = societyMembers[i];
                    var approvedIcon;

                    if(member["memberStatus"] == 1) 
                        approvedIcon = <td><li className="fa fa-check"></li></td>
                    else 
                        approvedIcon = <td><li value={member["studentId"]} onClick={(event) => this.handleApprove(event)} className="fa fa-plus"></li></td>

                    rows.push(
                        <tr> 
                            <td>{i+1}</td>
                            <td>{member["name"]}</td>
                            <td>{member["ic"]}</td>
                            <td>{member["course"]}</td>
                            <td>Y{member["year"]}S{member["semester"]}</td>
                            <td>{member["contact"]}</td>
                            <td><span>{member["email"]}</span></td>
                            {approvedIcon}
                            <td><Link onClick={this.handleDelete}><FontAwesome.FaTrash /></Link></td>
                        </tr>
                    )
                }
            } else {
                message = <div style= {{ textAlign: "center", marginBottom: "20px"}}>No member for this society</div>;
            }
        }

        return (
            <div id="outerDiv"> 
                <NavBar />

                <div style={{ margin: 20 }}>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to={`/home`}>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to={`/society`}>Societies</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to={{pathname:`/perSociety/` + this.props.params.societyId, state: {societyName: this.props.location.state["societyName"]}}}>{this.props.location.state["societyName"]}</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Manage Member</BreadcrumbItem>
                    </Breadcrumb>
                </div>

                {this.props.loading ?
                    [<LoadingBar />]
                    :
                    [
                        <div>
                            <MuiThemeProvider>
                                <div className="container" id="memberContainer">
                                    <div className="row">  
                                        <table id="table1" border="1">
                                            <thead>
                                                <tr>
                                                    <th>No.</th>
                                                    <th>Name</th>
                                                    <th>IC Number</th>   
                                                    <th>Course</th>  
                                                    <th>Year and Sem</th> 
                                                    <th>Phone Number</th>   
                                                    <th>Email Address</th>   
                                                    <th  colSpan="2">Action</th>                 
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {rows}                                       
                                            </tbody>
                                        </table>

                                        <div style= {{ margin: "0 auto" }}>
                                            <RaisedButton label="Back" primary={true} style={RaisedButtonStyle} onClick={(event) => window.history.back()}/>
                                        </div>
                                    </div>
                                </div>
                            </MuiThemeProvider>
                        </div>
                    ]
                }
            </div>
        );
    };
};

const styles = {
    RaisedButtonStyle: {
        margin: 15
    }
}

const mapStateToProps = (state, props) => {
    return {
        societyMembers: state.data.societyMembers,
        loading: state.data.loading
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
      onRetrieveData: retrieveData,
      onUpdateData: updateDouble,
      onUpdateLoadingBar: updateLoadingBar
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(ManageMember);
