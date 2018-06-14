// import React, { Component } from 'react';
// import NavBar from './NavBar';

// class RegisterBooth extends Component {

//     constructor(props){
//       super(props);
      
//     };

//     render() {
  
//       return (
//         <div>
//             <NavBar />
//             <p>Hello</p>
//         </div>
//       );
//     }
//   }
  
//   export default RegisterBooth;

import React, {Component} from 'react';
import Seatmap from './Seatmap.jsx';
import NavBar from './NavBar';
import '../style/main.scss';
import '../style/main.css';

class RegisterBooth extends Component {

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
      <Seatmap rows={rows} maxReservableSeats={3} alpha />
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
