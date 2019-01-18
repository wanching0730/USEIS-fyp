import React, {Component} from 'react';
import Seatmap from './Seatmap.jsx';
import NavBar from './NavBar';
import { Link } from 'react-router';
import {browserHistory} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import '../style/main.scss';
import '../style/main.css';
import '../style/form.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveAll, updateLoadingBar } from '../actions/data-action';

class RegisterBooth extends Component {

  constructor(props) {
    super(props);

    this.state = {
      seatMap: [
        [{ number: 1 }, {number: 2}, {number: '3'}, null, {number: '4'}, {number: 5}, {number: 6}],
        [{ number: 1}, {number: 2}, {number: '3'}, null, {number: '4'}, {number: 5}, {number: 6}],
        [{ number: 1 }, {number: 2}, {number: 3}, null, {number: '4'}, {number: 5}, {number: 6}],
        [{ number: 1 }, {number: 2}, {number: 3}, null, {number: '4'}, {number: 5}, {number: 6}],
        [{ number: 1}, {number: 2}, {number: '3'}, null, {number: '4'}, {number: 5}, {number: 6,}],
        [{ number: 1}, {number: 2}, {number: '3'}, null, {number: '4'}, {number: 5}, {number: 6}],
        [{ number: 1}, {number: 2}, {number: '3'}, null, {number: '4'}, {number: 5}, {number: 6}]
      ]
    };
    
    this.handleClick = this.handleClick.bind(this);

    this.props.onUpdateLoadingBar();
    this.props.onRetrieveAll("allBooths");
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps){
    console.log("this props: " + JSON.stringify(this.props.allBooths));
    console.log("next props: " + JSON.stringify(nextProps.allBooths));
    if((nextProps.allBooths != this.props.allBooths) && (nextProps.allBooths != null)) {
      for(var i = 0; i < nextProps.allBooths.length; i++) {
        let booth = nextProps.allBooths[i];
        var newSeatMap = this.state.seatMap;
        console.log(newSeatMap);
        console.log(newSeatMap[booth["row"]][booth["seat"]]);
        
        newSeatMap[booth["row"]][booth["seat"]]["isReserved"] = true;
        console.log(newSeatMap);
        this.setState({seatMap: newSeatMap});
      }
    }
  }

  handleClick() {
    browserHistory.push("/perSociety/1");
  }

  selectedSeat = (dataFromChild) => {
    console.log("data from child: " + dataFromChild);
  }

  render() {
    console.log(this.state.seatMap);

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

          <h2>Booth Registration</h2>

          <div className="container">
            <Seatmap rows={this.state.seatMap} maxReservableSeats={3} alpha selected={this.selectedSeat} />
          </div>

          <div class="button-section">
            <RaisedButton label="Submit" id="button2" primary={true} style={RaisedButtonStyle} onClick={(event) => this.handleClick(event)}/>
            <RaisedButton label="Back" primary={true} style={RaisedButtonStyle} onClick={(event) => window.history.back()}/>
          </div>

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
    allBooths: state.data.allBooths
  };
};

const mapActionsToProps = (dispatch, props) => {
  return bindActionCreators({
    onRetrieveAll: retrieveAll,
    onUpdateLoadingBar: updateLoadingBar
  }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(RegisterBooth);
