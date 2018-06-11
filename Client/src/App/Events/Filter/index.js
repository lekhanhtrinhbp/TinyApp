import { connect } from 'react-redux';
import {
  searchEvents,
  updateValue,
  category,
  eventType,
  locationSuggest
} from 'actions/home';

import Container from './Container';

const mapStateToProps = state => ({
  ...state.home,
  locationSuggestData: state.home.locationSuggest
});

const mapDispatchToProps = dispatch => ({
  searchEvents: () => dispatch(searchEvents()),
  updateValue: value => dispatch(updateValue(value)),
  locationSuggest: value => dispatch(locationSuggest(value)),
  category: () => dispatch(category()),
  eventType: () => dispatch(eventType())
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
