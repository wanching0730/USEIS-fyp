import React, { Component } from 'react';
import { Router, browserHistory, Route, Link } from 'react-router';
import Register from '../src/components/Register';
import Login from '../src/components/Login';
import Home from '../src/components/Home';
import Society from '../src/components/Society';
import './App.css';

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