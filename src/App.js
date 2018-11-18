import React, { Component } from 'react';
import { Router, browserHistory, Route, Link } from 'react-router';
import Register from '../src/components/Register';
import Login from '../src/components/Login';
import Home from '../src/components/Home';
import NewsFeed from './components/NewsFeed';
import Society from '../src/components/Society';
import Event from '../src/components/Event';
import PerEvent from '../src/components/PerEvent';
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
import ManageBooth from './components/ManageBooth';
import ManageEventBooth from './components/ManageEventBooth';
import ManageMember from './components/ManageMember';
import ManageParticipant from './components/ManageParticipant';
import ManageProposal from './components/ManageProposal';
import ManageCrew from './components/ManageCrew';
import CommitteeBoard from './components/CommitteeBoard';
import SocietyEvents from './components/SocietyEvents';
import RecruitmentBooth from './components/RecruitmentBooth';
import SubmitProposal from './components/SubmitProposal';
import Faq from './components/Faq';
import AboutMe from './components/AboutMe';
import './App.css';

class App extends Component {
  render() {
    return (
      
        <Router history={browserHistory}>
          <Route path="/" component={Login}/>
          <Route path="/home" component={Home}/>
          <Route path="/newsFeed" component={NewsFeed}/>
          <Route path="/society" component={Society}/>
          <Route path="/event" component={Event}/>
          {/* <Route path="/register" component={Register}/> */}
          <Route path="/perSociety/:societyId" component={PerSociety}/>
          <Route path="/perEvent/:eventId" component={PerEvent}/>
          <Route path="/student" component={Student}/>
          <Route path="/feedback/:eventId" component={Feedback}/>
          <Route path="/register_event/:eventId" component={RegisterEvent}/>
          <Route path="/register_society/:societyId" component={RegisterSociety}/>
          <Route path="/register_crew/:eventId" component={RegisterCrew}/>
          {/* optional society id for createProfile */}
          <Route path="/createProfile(/:societyId)" component={CreateProfile}/>
          <Route path="/createEvent/:type(society|event)/:id" component={CreateEvent}/>
          <Route path="/myProfile" component={MyProfile}/>
          <Route path="/myEvents" component={MyEvent}/>
          <Route path="/register_booth/:type(society|event)/:id" component={RegisterBooth}/>
          <Route path="/manageEventBooth" component={ManageEventBooth}/>
          <Route path="/manageBooth" component={ManageBooth}/>
          <Route path="/manageMember/:societyId" component={ManageMember}/>
          <Route path="/manageParticipant/:eventId" component={ManageParticipant}/>
          <Route path="/manageProposal" component={ManageProposal}/>
          <Route path="/manageCrew/:eventId" component={ManageCrew}/>
          <Route path="/commBoard/:type(society|event)/:id" component={CommitteeBoard}/>
          <Route path="/societyEvents/:societyId" component={SocietyEvents}/>
          <Route path="/recruitmentBooth" component={RecruitmentBooth}/>
          <Route path="/submitProposal" component={SubmitProposal}/>
          <Route path="/faq" component={Faq}/>
          <Route path="/aboutMe" component={AboutMe}/>
        </Router>
        
    );
  }
}

export default App;