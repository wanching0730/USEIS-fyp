import React from 'react';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import events from './events';
import moment from 'moment';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))
let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

let Calendar = () => (
  <BigCalendar
    selectable
    events={events}
    views={allViews}
    step={60}
    showMultiDayTimes
    defaultDate={new Date(2015, 3, 1)}
    onSelectEvent={event=>alert(event.title)}
  />
)

export default Calendar