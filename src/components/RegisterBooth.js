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

class RegisterBooth extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleClick() {
    browserHistory.push("/perSociety/1");
  }

  selectedSeat = (dataFromChild) => {
    console.log("data from child: " + dataFromChild);
  }

  render() {

    const { RaisedButtonStyle } = styles;

    const rows = [
      [{ number: 1 }, {number: 2}, {number: '3', isReserved: true}, null, {number: '4'}, {number: 5}, {number: 6}],
      [{ number: 1, isReserved: true }, {number: 2, isReserved: true}, {number: '3', isReserved: true}, null, {number: '4'}, {number: 5}, {number: 6}],
      [{ number: 1 }, {number: 2}, {number: 3, isReserved: true}, null, {number: '4'}, {number: 5}, {number: 6}],
      [{ number: 1 }, {number: 2}, {number: 3}, null, {number: '4'}, {number: 5}, {number: 6}],
      [{ number: 1, isReserved: true }, {number: 2}, {number: '3', isReserved: true}, null, {number: '4'}, {number: 5}, {number: 6, isReserved: true}]
  ];
  
  return (

    <div>
    <MuiThemeProvider>

      <div>
        <NavBar />

        <div style={{ margin: 20 }}>
            <Breadcrumb>
                <BreadcrumbItem><Link to={`/home`}>Home</Link></BreadcrumbItem>
                <BreadcrumbItem><Link to={`/society`}>Societies</Link></BreadcrumbItem>
                <BreadcrumbItem><Link to={`/perSociety/1`}>Cardio Night Run</Link></BreadcrumbItem>
                <BreadcrumbItem active>Register Booth</BreadcrumbItem>
            </Breadcrumb>
        </div>

        <h2>Booth Registration</h2>

        <div className="container">
          <Seatmap rows={rows} maxReservableSeats={3} alpha selected={this.selectedSeat} />
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

export default RegisterBooth;
