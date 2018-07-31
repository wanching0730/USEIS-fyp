import React, {Component} from 'react';
import Seatmap from './Seatmap.jsx';
import NavBar from './NavBar';
import { Link } from 'react-router';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import '../style/main.scss';
import '../style/main.css';

class RegisterBooth extends Component {

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const rows = [
      [{ number: 1 }, {number: 2}, {number: '3', isReserved: true}, null, {number: '4'}, {number: 5}, {number: 6}],
      [{ number: 1, isReserved: true }, {number: 2, isReserved: true}, {number: '3', isReserved: true}, null, {number: '4'}, {number: 5}, {number: 6}],
      [{ number: 1 }, {number: 2}, {number: 3, isReserved: true}, null, {number: '4'}, {number: 5}, {number: 6}],
      [{ number: 1 }, {number: 2}, {number: 3}, null, {number: '4'}, {number: 5}, {number: 6}],
      [{ number: 1, isReserved: true }, {number: 2}, {number: '3', isReserved: true}, null, {number: '4'}, {number: 5}, {number: 6, isReserved: true}]
  ];
  
  return (
    <div>
      <NavBar />

      <div style={{ margin: 20 }}>
          <Breadcrumb>
              <BreadcrumbItem><Link to={`/`}>Home</Link></BreadcrumbItem>
              <BreadcrumbItem><Link to={`/society`}>Societies</Link></BreadcrumbItem>
              <BreadcrumbItem><Link to={`/perSociety/1`}>Cardio Night Run</Link></BreadcrumbItem>
              <BreadcrumbItem active>Register Booth</BreadcrumbItem>
          </Breadcrumb>
      </div>

      <h2>Booth Registration</h2>

      <div className="container">
        <Seatmap rows={rows} maxReservableSeats={3} alpha />
      </div>
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

export default RegisterBooth;
