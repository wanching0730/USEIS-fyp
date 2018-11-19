import React, {Component} from 'react';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {browserHistory} from 'react-router';
import moment from 'moment';
import events from './events';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))
let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])


class Calendar extends Component {

    events = [];
    societies = [];

    constructor(props) {
      super(props);

      
      console.log("event: " + JSON.stringify(this.props.events));

      BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))
      let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])
  }

  componentDidMount() {
  }

  render() {

    console.log("calender: " + this.societies);

    const venues = [
      { id: 1, venue: 'Board room' },
      { id: 2, venue: 'Training room' },
      { id: 3, venue: 'Meeting room 1' }
    ]
    
    return (
      <div style={{ height: 700 }}>
        <BigCalendar
          popup
          selectable
         // events={this.societies}
          events={events}
          views={{ month: true, week: true }}
          step={60}
          showMultiDayTimes
          defaultDate={new Date()}
          resources={venues}
          resourceIdAccessor="id"
          resourceTitleAccessor="venue"
          onSelectEvent={event=>browserHistory.push("/perEvent/"+event.id)}
        />
      </div>
    );
  };

}

export default Calendar;