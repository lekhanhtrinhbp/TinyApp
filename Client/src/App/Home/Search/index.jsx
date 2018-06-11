import { connect } from 'react-redux';

import {
  homeEvents,
  getRecentlyEvents,
  getPopularEvents,
  updateValue,
  locationSuggest,
  searchEvents,
  backRecentlyEvents,
  nextRecentlyEvents,
  backPopularEvents,
  nextPopularEvents
} from 'actions/home';
import Container from './Container';

const mapStateToProps = state => ({
  home: state.home
});

const mapDispatchToProps = dispatch => ({
  homeEvents: () => dispatch(homeEvents()),
  getRecentlyEvents: () => dispatch(getRecentlyEvents()),
  getPopularEvents: () => dispatch(getPopularEvents()),
  backRecentlyEvents: () => dispatch(backRecentlyEvents()),
  nextRecentlyEvents: () => dispatch(nextRecentlyEvents()),
  backPopularEvents: () => dispatch(backPopularEvents()),
  nextPopularEvents: () => dispatch(nextPopularEvents()),
  searchEvents: () => dispatch(searchEvents()),
  updateValue: value => dispatch(updateValue(value)),
  locationSuggest: value => dispatch(locationSuggest(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
