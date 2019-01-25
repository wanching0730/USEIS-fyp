import React, {Component} from 'react';
import Seatmap from './Seatmap.jsx';
import NavBar from './NavBar';
import LoadingBar from './LoadingBar';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import openSocket from 'socket.io-client';
import '../style/main.scss';
import '../style/main.css';
import '../style/form.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveAll, updateLoadingBar, updateEndLoadingBar } from '../actions/data-action';
import { updateDouble, updatePostLoadingBar, update} from '../actions/post-action';

class RegisterBooth extends Component {

  constructor(props) {
    super(props);

    this.state = {
      seatMap: [
        [{ number: 1 }, {number: 2}, {number: 3}, {number: 4}, {number: 5}, {number: 6}],
        [{ number: 1}, {number: 2}, {number: 3}, {number: 4}, {number: 5}, {number: 6}],
        [{ number: 1 }, {number: 2}, {number: 3}, {number: 4}, {number: 5}, {number: 6}],
        [{ number: 1 }, {number: 2}, {number: 3}, {number: 4}, {number: 5}, {number: 6}]
      ], selectedRow: -1, selectedSeat: -1
    };
    
    this.updateList = this.updateList.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectedSeat = this.handleSelectedSeat.bind(this);

    this.props.onUpdateLoadingBar();
    this.props.onRetrieveAll("allBooths");
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    const socket = openSocket('http://localhost:5000');
    socket.on('updateList', this.updateList);
  }

  componentWillReceiveProps(nextProps){
    // console.log("this props: " + JSON.stringify(this.props.allBooths));
    // console.log("next props: " + JSON.stringify(nextProps.allBooths));
    if((nextProps.allBooths != this.props.allBooths) && (nextProps.allBooths != null)) {
      for(var i = 0; i < nextProps.allBooths.length; i++) {
        let booth = nextProps.allBooths[i];
        var newSeatMap = this.state.seatMap;
        // console.log(booth["row"] + " " + booth["seat"]);
        // console.log(newSeatMap[booth["row"]][booth["seat"]]);
        
        newSeatMap[booth["row"]][booth["seat"]]["isReserved"] = true;
        this.setState({seatMap: newSeatMap});
      }
      this.props.onUpdateEndLoadingBar();
    }
  }

  updateList(data) {
    var newSeatMap = this.state.seatMap;
    newSeatMap[data["selectedRow"]][data["selectedSeat"]]["isReserved"] = true;

    console.log(data["previousRow"]);
    if(data["previousRow"] != -1 && data["previousSeat"] != -1) {
      delete newSeatMap[data["previousRow"]][data["previousSeat"]].isReserved;
      this.setState({seatMap: newSeatMap});
    }
  }

  handleSubmit() {
    this.props.onUpdatePostLoadingBar();

    let data = {
      type: this.props.params.type,
      id: this.props.params.id,
      name: this.props.params.type == "society" ? this.props.location.state["societyName"] : this.props.location.state["eventName"],
      selectedRow: this.state.selectedRow,
      selectedSeat: this.state.selectedSeat
      // previousRow: this.state.currentRow,
      // previousSeat: this.state.currentSeat
    }

    this.props.onUpdateDouble("booth", data, data["name"]);
  }

  handleSelectedSeat(row, seat) {
    console.log("row: " + row.charCodeAt(0) + " seat: " + seat);
    this.setState({selectedRow: parseInt(row.charCodeAt(0)) - 65, selectedSeat: seat - 1});
  }

  render() {
    console.log(this.props.loading);
    // console.log(this.state.selectedRow + "," + this.state.selectedSeat);

    const { RaisedButtonStyle } = styles;
    var breadCrumb;

    if(this.props.params.type === "society") {
      breadCrumb = 
        <Breadcrumb>
            <BreadcrumbItem><Link to={`/home`}>Home</Link></BreadcrumbItem>
            <BreadcrumbItem><Link to={`/society`}>Societies</Link></BreadcrumbItem>
            <BreadcrumbItem><Link to={{pathname:`/perSociety/` + this.props.params.id, state: {societyName: this.props.location.state["societyName"]}}}>{this.props.location.state["societyName"]}</Link></BreadcrumbItem>
            <BreadcrumbItem active>Register Booth</BreadcrumbItem>
        </Breadcrumb>
    } else {
      breadCrumb = 
        <Breadcrumb>
            <BreadcrumbItem><Link to={`/home`}>Home</Link></BreadcrumbItem>
            <BreadcrumbItem><Link to={`/event`}>Events</Link></BreadcrumbItem>
            <BreadcrumbItem><Link to={{pathname:`/perEvent/` + this.props.params.id, state: {eventName: this.props.location.state["eventName"]}}}>{this.props.location.state["eventName"]}</Link></BreadcrumbItem>
            <BreadcrumbItem active>Register Booth</BreadcrumbItem>
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

          {this.props.loading || this.props.postLoading ?
            [<LoadingBar />]
            :
            [
              <div>
                <h2>Booth Registration</h2>
                <br/>

                <div className="container">
                  <Seatmap rows={this.state.seatMap} maxReservableSeats={1} alpha handleSelectedSeat={this.handleSelectedSeat} />
                </div>

                <div class="button-section">
                  <RaisedButton label="Submit" id="button2" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleSubmit(event)}/>
                  <RaisedButton label="Back" primary={true} style={RaisedButtonStyle} onClick={(event) => window.history.back()}/>
                </div>
              </div>
            ]
          }

        </div>
      </MuiThemeProvider>
    </div>
    );
    
  // if (module.hot) {
  //     require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
  //     getRootInstances: function () {
  //       // Help React Hot Loader figure out the root component instances on the page:
  //       return [rootInstance];
  //     }
  //   });
  // }

  }

}

const styles = {
  RaisedButtonStyle: {
    margin: 15,
    // display: "flex",
    // justifyContent: "center"
  }
}

const mapStateToProps = (state, props) => {
  return {
    allBooths: state.data.allBooths,
    loading: state.data.loading,
    postLoading: state.create.loading
  };
};

const mapActionsToProps = (dispatch, props) => {
  return bindActionCreators({
    onRetrieveAll: retrieveAll,
    onUpdateDouble: updateDouble,
    onUpdateLoadingBar: updateLoadingBar,
    onUpdateEndLoadingBar: updateEndLoadingBar,
    onUpdatePostLoadingBar: updatePostLoadingBar
  }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(RegisterBooth);
