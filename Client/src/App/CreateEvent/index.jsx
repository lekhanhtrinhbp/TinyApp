import { connect } from 'react-redux';
import { loadEvent } from 'actions/event';
import {
  createEvent,
  getEventTopic,
  getEventType,
  getLocation,
  getCity,
  getCountry,
  publish,
  preview,
  confirmBackFromPreview,
} from 'actions/create';
import CreateEvent from './Container';

const mapStateToProps = ({ create, event }) => ({
  // save
  saveEvent: create.saveEvent,
  // publish
  publishedEvent: create.publishedEvent,
  // location
  locationSuggest: create.locationSuggest,
  citySuggest: create.citySuggest,
  countryOption: create.countryOption,
  // setting
  eventType: create.eventType,
  eventTopic: create.eventTopic,
  //
  eventEdit: event.event,
});

const mapDispatchToProps = dispatch => ({
  // save
  createEvent: eventInfo => dispatch(createEvent(eventInfo)),
  // publish
  publish: eventInfo => dispatch(publish(eventInfo)),
  // location
  getLocation: () => dispatch(getLocation()),
  getCity: () => dispatch(getCity()),
  getCountry: () => dispatch(getCountry()),
  // setting
  getEventTopic: () => dispatch(getEventTopic()),
  getEventType: () => dispatch(getEventType()),
  // edit mode
  loadEvent: id => dispatch(loadEvent(id)),
  // preview mode
  preview: event => dispatch(preview(event)),
  // back from preview mode to continue editting
  confirmBackFromPreview: () => dispatch(confirmBackFromPreview()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);
