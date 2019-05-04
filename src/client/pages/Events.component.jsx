/**
 * Events.component.jsx
 * Component for the events page
 */

// Node Modules
import moment from 'moment';
import React, {useEffect} from 'react';

// Components
import {EventCard} from '../components/EventCard';
import {Sidebar} from '../components/Sidebar';

// Constants
import {ACTION, BOOLEAN, EVENTS, STRING} from '../constants/proptypes';

const EventsPage = (props) => {
  // Props
  const {getHostEvents, sessionToken} = props;

  // filters
  const pastEventFilter = (event) => event.time_end < moment();
  const startedEventFilter = (event) =>
    event.time_start <= moment() && event.time_end >= moment();
  const upcomingEventFilter = (event) => event.time_start > moment();
  const filteredEvents = props.hostEvents.filter(
      (event) =>
        (props.showPastEvents && pastEventFilter(event)) ||
      (props.showStartedEvents && startedEventFilter(event)) ||
      (props.showUpcomingEvents && upcomingEventFilter(event)),
  );

  // Effects
  useEffect(() => {
    if (sessionToken) {
      getHostEvents(sessionToken);
    }
  }, [getHostEvents, sessionToken]);

  // Html Elements
  const eventsHtml = props.sessionToken ? (
    <div className="event-cards-wrapper">
      <div className="event-cards-grid">
        {filteredEvents.map((event) => (
          <EventCard event={event} key={event.id} />
        ))}
      </div>
    </div>
  ) : (
    <p>Please login to view events</p>
  );

  return (
    <>
      <Sidebar />
      {eventsHtml}
    </>
  );
};

EventsPage.propTypes = {
  getHostEvents: ACTION,
  hostEvents: EVENTS,
  sessionToken: STRING,
  showPastEvents: BOOLEAN,
  showStartedEvents: BOOLEAN,
  showUpcomingEvents: BOOLEAN,
};

export default EventsPage;
