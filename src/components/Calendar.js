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
                    start: element[3],
                    end: element[4]
                });
            });
      });
  }

  render() {

    console.log("calender: " + this.societies);
    
    return (
      <BigCalendar
        selectable
        events={this.societies}
        views={allViews}
        step={60}
        showMultiDayTimes
        defaultDate={new Date(2015, 3, 1)}
        onSelectEvent={event=>browserHistory.push("/perEvent/"+event.id)}
      />
    );
  };

}

export default Calendar;