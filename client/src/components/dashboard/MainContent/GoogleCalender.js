import React, { Component } from "react";
import "./MainContent.scss";
import "./Dashboard.scss";
import ReactDOM from 'react-dom';

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
// import { getEvents } from './gcal'

const localizer = momentLocalizer(moment)


class GoogleCalender extends Component {
    constructor () {
        super()
        this.state = {
          events: []
        }
      }
      componentDidMount () {
        getEvents((events) => {
          this.setState({events})
        })
      }
      render () {
        return (
          // React Components in JSX look like HTML tags
          <Calendar
            style={{height: '420px'}}
            events={this.state.events}
            localizer={localizer}
          />
        )
      }
}

export default GoogleCalender