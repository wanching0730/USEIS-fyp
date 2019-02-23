import React, {Component} from 'react';
import BigCalendar from 'react-big-calendar';
import LoadingBar from './LoadingBar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {browserHistory} from 'react-router';
import moment from 'moment';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveAll, updateLoadingBar } from '../actions/data-action';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

class Calendar extends Component {

    constructor(props) {
      super(props);

      this.state = {
        calendarEvents: []
      };

      this.props.onRetrieveAll("calendarEvent");

      BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))
  }

  componentWillReceiveProps(nextProps){
    if((nextProps.calendarEvents != this.props.calendarEvents) && (nextProps.calendarEvents != null)) {
        let calendarEvents = nextProps.calendarEvents;
        var customizeEvent = [];

        for(var i = 0; i < calendarEvents.length; i++) {
            let calendarEvent = calendarEvents[i];
            let event = {
                id: calendarEvent["eventId"],
                title: calendarEvent["name"],
                start: calendarEvent["startDate"],
                end: calendarEvent["endDate"]
            }
            customizeEvent.push(event);
        }

        this.setState({ calendarEvents: customizeEvent});
      }
    }

  render() {
    return (
          <div style={{ height: 700 }}>
            {this.props.loading || this.state.calendarEvents.length == 0 ?
          [<LoadingBar />]
          :
          [
            <BigCalendar
              popup
              selectable
              events={this.state.calendarEvents}
              views={{ month: true, week: true }}
              step={60}
              showMultiDayTimes
              defaultDate={new Date()}
              resourceIdAccessor="id"
              resourceTitleAccessor="venue"
              onSelectEvent={event=>browserHistory.push({ pathname: "/perEvent/"+event.id, state: {eventName: event.title}})}
            />
          ]}
          </div>
    );
  };

}

const mapStateToProps = (state, props) => {
  return {
    calendarEvents: state.data.calendarEvents,
    loading: state.data.loading
  };
};

const mapActionsToProps = (dispatch, props) => {
  return bindActionCreators({
    onRetrieveAll: retrieveAll,
    onUpdateLoadingBar: updateLoadingBar
  }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(Calendar);
