import React, { Component } from 'react';
import { Router, browserHistory, Route, Link } from 'react-router';
import Register from '../src/components/Register';
import Login from '../src/components/Login';
import Home from '../src/components/Home';
import Society from '../src/components/Society';
import Event from '../src/components/Event';
import perEvent from '../src/components/PerEvent';
import PerSociety from '../src/components/PerSociety';
import Student from '../src/components/Student';
import Feedback from '../src/components/Feedback';
import RegisterEvent from '../src/components/RegisterEvent';
import RegisterSociety from './components/RegisterSociety';
import RegisterCrew from './components/RegisterCrew';
import CreateProfile from './components/CreateProfile';
import CreateEvent from './components/CreateEvent';
import RegisterBooth from './components/RegisterBooth';
import MyProfile from './components/MyProfile';
import MyEvent from './components/MyEvent';
import ManageMember from './components/ManageMember';
import ManageParticipant from './components/ManageParticipant';
import ManageCrew from './components/ManageCrew';
import CommitteeBoard from './components/CommitteeBoard';
import SocietyEvents from './components/SocietyEvents';
import Faq from './components/Faq';
import './App.css';

class App extends Component {
  render() {
    return (

        <Router history={browserHistory}>
          <Route path="/" component={Home}/>
          <Route path="/society" component={Society}/>
          <Route path="/event" component={Event}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/perSociety/:societyId" component={PerSociety}/>
          <Route path="/perEvent/:eventId" component={perEvent}/>
          <Route path="/student" component={Student}/>
          <Route path="/feedback" component={Feedback}/>
          <Route path="/register_event" component={RegisterEvent}/>
          <Route path="/register_society" component={RegisterSociety}/>
          <Route path="/register_crew" component={RegisterCrew}/>
          {/* optional society id for createProfile */}
          <Route path="/createProfile(/:societyId)" component={CreateProfile}/>
          <Route path="/createEvent(/:eventId)" component={CreateEvent}/>
          <Route path="/myProfile" component={MyProfile}/>
          <Route path="/myEvents" component={MyEvent}/>
          <Route path="/register_booth" component={RegisterBooth}/>
          <Route path="/manageMember" component={ManageMember}/>
          <Route path="/manageParticipant" component={ManageParticipant}/>
          <Route path="/manageCrew" component={ManageCrew}/>
          <Route path="/commBoard" component={CommitteeBoard}/>
          <Route path="/societyEvents" component={SocietyEvents}/>
          <Route path="/faq" component={Faq}/>
        </Router>
        
    );
  }
}

export default App;