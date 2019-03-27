import React, { Component } from 'react';
import NavBar from './NavBar';
import LoadingBar from './LoadingBar';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { confirmAlert } from 'react-confirm-alert';
import DatePicker from "react-datepicker"; 
import { Link } from 'react-router';
import '../style/form.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { update, updatePostLoadingBar } from '../actions/post-action';
import moment from "moment";

class ManageBooth extends Component {

    constructor(props) {
        super(props);

        if(!this.props.isAuthenticated) {
            window.location.assign('/');
        }

        this.state = {
            boothAmount: 0,
            floorPlanUrl: '',
            selectedBiddingDate: moment(),
            biddingDate: ''
        }

        this.handleDate = this.handleDate.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    handleDate(date) {
        this.setState({
          selectedBiddingDate: date,
          biddingDate: "" + moment(date).format("YYYY-MM-DD HH:mm")
        }), function() {
          this.setState(this.state);
        };
    }

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

            let data = {
                seatMap: JSON.stringify(seatMap),
                floorPlanUrl: this.state.floorPlanUrl,
                biddingDate: this.state.biddingDate
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

                    {this.props.createLoading ?
                    [<LoadingBar />]
                    :
                    [
                        <div className="container">
                            <div className="form-style-10">
                                <h1>Manage Booth<span>Update booth information</span></h1>
                                <form>
                                    <div class="section"><span>1</span>Booth</div>
                                    <div class="inner-wrap">
                                        <label>Booth Amount</label>  
                                        <input type="number" onChange={(event) => {
                                            this.setState({boothAmount:event.target.value});
                                        }}/>
                                    </div>
                                    <br/>
                                    <div class="section"><span>2</span>Floor Plan</div>
                                        <div class="inner-wrap">
                                        <label>Floor Plan URL</label>
                                        <input type="text" onChange={(event) => {this.setState({floorPlanUrl:event.target.value})}}/>
                                    </div>

                                    <div class="section"><span>3</span>Bidding Date</div>
                                    <div class="inner-wrap">
                                        <label>Date &amp; Time </label>
                                        <DatePicker
                                        selected={this.state.selectedBiddingDate}
                                        onChange={this.handleDate.bind(this)}
                                        showTimeSelect
                                        minDate={moment()}
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        dateFormat="YYYY-MM-DD HH:mm:ss"
                                        timeCaption="time"
                                        />
                                    </div>

                                    <div class="button-section">
                                        <RaisedButton label="Submit" id="button2" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleClick(event)}/>
                                        <RaisedButton label="Back" primary={true} style={RaisedButtonStyle} onClick={(event) => window.history.back()}/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    ]}
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
      createLoading: state.create.loading,
      isAuthenticated: state.auth.isAuthenticated
    };
  };
  
  const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
      onUpdate: update,
      onUpdateCreateLoadingBar: updatePostLoadingBar
    }, dispatch);
  };
  
  export default connect(mapStateToProps, mapActionsToProps)(ManageBooth);
