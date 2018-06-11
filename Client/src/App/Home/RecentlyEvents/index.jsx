import { connect } from 'react-redux';

import {
  getRecentlyEvents,
  backRecentlyEvents,
  nextRecentlyEvents
} from 'actions/home';
import Container from './Container';

const mapStateToProps = state => ({
  recentlyEvents: state.home.recentlyEvents
});

const mapDispatchToProps = dispatch => ({
  getRecentlyEvents: () => dispatch(getRecentlyEvents()),
  backRecentlyEvents: () => dispatch(backRecentlyEvents()),
  nextRecentlyEvents: () => dispatch(nextRecentlyEvents())
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
