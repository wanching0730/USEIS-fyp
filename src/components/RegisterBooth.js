import React, {Component} from 'react';
import Seatmap from './Seatmap.jsx';
import NavBar from './NavBar';
import LoadingBar from './LoadingBar';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Modal from 'react-responsive-modal';
import openSocket from 'socket.io-client';
import moment from "moment";
import '../style/main.scss';
import '../style/main.css';
import '../style/form.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveAll, retrieveData, updateLoadingBar, updateEndLoadingBar } from '../actions/data-action';
import { updateDouble, updatePostLoadingBar, update} from '../actions/post-action';

class RegisterBooth extends Component {

  constructor(props) {
    super(props);

    // this.state = {
    //   seatMap: [
    //     [{ number: 1 }, {number: 2}, {number: 3}, {number: 4}, {number: 5}, {number: 6}],
    //     [{ number: 1 }, {number: 2}, {number: 3}, {number: 4}, {number: 5}, {number: 6}],
    //     [{ number: 1 }, {number: 2}, {number: 3}, {number: 4}, {number: 5}, {number: 6}],
    //     [{ number: 1 }, {number: 2}, {number: 3}, {number: 4}, {number: 5}, {number: 6}],
    //     [{ number: 1 }, {number: 2}, {number: 3}, {number: 4}]
    //   ], selectedRow: -1, selectedSeat: -1
    // };

    this.state = {
      seatMap: [], selectedRow: -1, selectedSeat: -1, open: false
    };
    
    this.updateList = this.updateList.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectedSeat = this.handleSelectedSeat.bind(this);

    this.props.onUpdateLoadingBar();
    this.props.onRetrieveAll("allBooths");
    this.props.onRetrieveData("totalBooth", 1);
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    const socket = openSocket('http://localhost:5000');
    socket.on('updateList', this.updateList);
  }

  componentWillReceiveProps(nextProps){
    if((nextProps.overallBooth != this.props.overallBooth) && (nextProps.overallBooth != null)) {
      this.setState({seatMap: JSON.parse(nextProps.overallBooth.totalBooth)}, () => {
        if((nextProps.allBooths != null)) {
          for(var i = 0; i < nextProps.allBooths.length; i++) {
            let booth = nextProps.allBooths[i];
            var newSeatMap = this.state.seatMap;
          
            console.log(newSeatMap[booth["row"]][booth["seat"]]);
            newSeatMap[booth["row"]][booth["seat"]]["isReserved"] = true;
            this.setState({seatMap: newSeatMap});
          }
          this.props.onUpdateEndLoadingBar();
        } 
      });
      // let totalBooth = nextProps.totalBooth;
      // let totalRows = Math.trunc(totalBooth / 6);
      // let remainingSeats = totalBooth % 6;
      // let newRow = [{ number: 1 }, {number: 2}, {number: 3}, {number: 4}, {number: 5}, {number: 6}];
      // var lastRow = [];

      // if(totalRows != 0) {
      //   for(var i = 0; i < totalRows; i++) 
      //     this.setState(prevState => ({
      //       seatMap: [...prevState.seatMap, newRow]
      //     }));
      // }

      // if(remainingSeats != 0) {
      //   for(var j = 0; j < remainingSeats; j++) {
      //     let newSeat = { number: j+1 };
      //     lastRow = [...lastRow, newSeat];
      //   }

      //   this.setState(prevState => ({
      //     seatMap: [...prevState.seatMap, lastRow]
      //   }));
      // }
    }
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  updateList(data) {
    var newSeatMap = this.state.seatMap;
    newSeatMap[data["selectedRow"]][data["selectedSeat"]]["isReserved"] = true;

    console.log(data["previousRow"]);
    if(data["previousRow"] != -1 && data["previousSeat"] != -1) {
      delete newSeatMap[data["previousRow"]][data["previousSeat"]].isReserved;
      this.setState({seatMap: newSeatMap});
    } else {
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
    }

    this.props.onUpdateDouble("booth", data, data["name"]);
  }

  handleSelectedSeat(row, seat) {
    this.setState({selectedRow: parseInt(row.charCodeAt(0)) - 65, selectedSeat: seat - 1});
  }

  render() {
    const { RaisedButtonStyle } = styles;
    const { open } = this.state;
    var breadCrumb;
    var bidTime = false;
    var message = <div style={{ color: "red", fontSize: 18, textAlign: "center" }}>Bidding session starts on {this.props.overallBooth == null ? "" : moment(this.props.overallBooth.biddingDate).format("YYYY/MM/DD hh:mm")}</div>

    if(this.props.overallBooth != null) {
      bidTime = moment(this.props.overallBooth.biddingDate).format("YYYY/MM/DD") >= moment(new Date()).format("YYYY/MM/DD") ? true : false;
    }

    
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

          <div>
            <Modal open={open} onClose={this.onCloseModal} center>
              <img id="floorPlanImg" src={this.props.overallBooth != null ? this.props.overallBooth.floorPlanUrl : ""}/>
            </Modal>
          </div>

          {this.props.loading || this.props.postLoading ?
            [<LoadingBar />]
            : bidTime ?
            [message] 
            :
            [
              <div>
                <h2>Booth Registration</h2>
                <br/>

                <div className="container">
                  <Seatmap rows={this.state.seatMap} maxReservableSeats={1} alpha handleSelectedSeat={this.handleSelectedSeat} />
                </div>

                <div class="button-section">
                  <RaisedButton label="Submit" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleSubmit(event)}/>
                  <RaisedButton label="Floor Plan" primary={true} style={RaisedButtonStyle} onClick={this.onOpenModal}/>
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
  imageStyle: {
    height: "350px",
    width: "350px"
  },
  RaisedButtonStyle: {
    margin: 15,
  }
}

const mapStateToProps = (state, props) => {
  return {
    allBooths: state.data.allBooths,
    overallBooth: state.data.overallBooth,
    loading: state.data.loading,
    postLoading: state.create.loading
  };
};

const mapActionsToProps = (dispatch, props) => {
  return bindActionCreators({
    onRetrieveAll: retrieveAll,
    onRetrieveData: retrieveData,
    onUpdateDouble: updateDouble,
    onUpdateLoadingBar: updateLoadingBar,
    onUpdateEndLoadingBar: updateEndLoadingBar,
    onUpdatePostLoadingBar: updatePostLoadingBar
  }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(RegisterBooth);
