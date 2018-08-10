import React, {Component} from 'react';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {browserHistory} from 'react-router';
import moment from 'moment';

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
    fetch(`http://localhost:5000/puppies`).then(result => result.json()).then(reply => {
            console.log(reply);
            reply.forEach(element => {
                this.societies.push({
                    id: element[0],
                    title: element[1],
                    allDay: element[2],
                    start: new Date(element[3]),
                    end: new Date(element[4]),
                });

                console.log("start: " + element[3]);
            });
      });
  }

  render() {

    console.log("calender: " + this.societies);

    const venues = [
      { id: 1, venue: 'Board room' },
      { id: 2, venue: 'Training room' },
      { id: 3, venue: 'Meeting room 1' }
    ]
    
    return (
      <div style={{ height: 800 }}>
        <BigCalendar
          popup
          selectable
          events={this.societies}
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