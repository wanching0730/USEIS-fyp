import React, { Component } from 'react';
import NavBar from './NavBar';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { confirmAlert } from 'react-confirm-alert'; 
import { Link } from 'react-router';
import '../style/form.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { update, updatePostLoadingBar } from '../actions/post-action';

class ManageBooth extends Component {

    constructor(props) {
        super(props);

        this.state = {
            boothAmount: 0,
            floorPlanUrl: ''
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    // handleSocieties(event) {
    //     browserHistory.push("/manageBooth");
    // }

    // handleEvents(event) {
    //     browserHistory.push("/manageEventBooth");
    // }

    handleClick(event) {
        const { boothAmount, floorPlanUrl } = this.state;
    
        if(boothAmount == '' || floorPlanUrl == '') {
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
            let totalRows = Math.trunc(this.state.boothAmount / 6);
            let remainingSeats = this.state.boothAmount % 6;
            let newRow = [{ number: 1 }, {number: 2}, {number: 3}, {number: 4}, {number: 5}, {number: 6}];
            var lastRow = [];
            var seatMap = [];

            if(totalRows != 0) {
                for(var i = 0; i < totalRows; i++) 
                seatMap = [...seatMap, newRow];
            }

            if(remainingSeats != 0) {
                for(var j = 0; j < remainingSeats; j++) {
                let newSeat = { number: j+1 };
                lastRow = [...lastRow, newSeat];
                }

                seatMap = [...seatMap, lastRow]
            }

            console.log(JSON.stringify(seatMap));
            let data = {
                seatMap: JSON.stringify(seatMap),
                floorPlanUrl: this.state.floorPlanUrl
            }

            this.props.onUpdateCreateLoadingBar();
            this.props.onUpdate("totalBooth", 1, "", data);
        }
      }

    render() {
        const { RaisedButtonStyle } = styles;
        
        return (
            <div id="outerDiv"> 
                <NavBar />

                <div style={{ margin: 20 }}>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to={`/home`}>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Manage Booth</BreadcrumbItem>
                    </Breadcrumb>
                </div>

                <div>
                    <MuiThemeProvider>

                    <div className="container">
                        <div className="form-style-10">
                            <form>
                                <div class="section"><span>1</span>Name &amp; Category</div>
                                <div class="inner-wrap">
                                    <label>Booth Amount</label>  
                                    <input type="text" onChange={(event) => {
                                        this.setState({boothAmount:event.target.value});
                                    }}/>
                                    <br/>
                                    <label>Floor Plan URL</label>
                                    <input type="text" onChange={(event) => {this.setState({floorPlanUrl:event.target.value})}}/>
                                </div>

                                <div class="button-section">
                                    <RaisedButton label="Submit" id="button2" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleClick(event)}/>
                                    <RaisedButton label="Back" primary={true} style={RaisedButtonStyle} onClick={(event) => window.history.back()}/>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* <div style= {{ textAlign: "center" }}>
                        <RaisedButton label="My Societies" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleSocieties(event)}/>
                        <RaisedButton label="My Events" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleEvents(event)}/>
                    </div>

                    <div className="container" id="tableContainer">
                        <div className="row">
                            <div className="panel-body">
                                <table className="table table-hover table-light" border="1">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Societies</th>
                                            <th>Booth Number</th>     
                                            <th>Action</th>                 
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr> 
                                            <td>1</td>
                                            <td>IT Society</td>
                                            <td>21</td>
                                            <td><Link onClick={this.handleApprove}><FontAwesome.FaPlus /></Link></td>
                                        </tr>
                                        <tr> 
                                            <td>4</td>
                                            <td>Music Club</td>
                                            <td>5</td>
                                            <td><FontAwesome.FaCheck /></td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div style= {{ textAlign: "center" }}>
                                    <RaisedButton label="Back" primary={true} style={RaisedButtonStyle} onClick={(event) => window.history.back()}/>
                                </div>

                            </div>
                        </div> */}
                    {/* </div> */}
                </MuiThemeProvider>
            </div>
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
      createLoading: state.create.loading
    };
  };
  
  const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
      onUpdate: update,
      onUpdateCreateLoadingBar: updatePostLoadingBar
    }, dispatch);
  };
  
  export default connect(mapStateToProps, mapActionsToProps)(ManageBooth);
