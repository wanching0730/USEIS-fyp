import React, { Component } from 'react';
import { Router, browserHistory, Route, Link } from 'react-router';
import Register from '../src/components/Register';
import Login from '../src/components/Login';
import Home from '../src/components/Home';
import Society from '../src/components/Society';
import './App.css';

// props is 'title'
// const Template = ( { title }) => (
//   <div>
//     <NavBar />
//     <p className="page-info">
//       This is the {title} page.
//     </p>
//   </div>
// );

// const Feed = (props) => (
//   <Template title="Feed" />
// );

// const Profile = (props) => (
//   <Template title = "Profile"/>
// );

// const NavBar = () => (
//       <div className="navbar">
//       <Link to="/">Home</Link>
//       <Link to="/society">Societies</Link>
//       <Link to="/login">Login</Link>
//       <Link to="/register">Register</Link>
//   </div>

// );
class App extends Component {
  render() {
    return (

        <Router history={browserHistory}>
          <Route path="/" component={Home}/>
          <Route path="/society" component={Society}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
        </Router>
        

    );
  }
}

export default App;