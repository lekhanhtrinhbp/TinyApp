import { connect } from 'react-redux';

import {
  getPopularEvents,
  backPopularEvents,
  nextPopularEvents
} from 'actions/home';
import Container from './Container';

const mapStateToProps = state => ({
  popularEvents: state.home.popularEvents
});

const mapDispatchToProps = dispatch => ({
  getPopularEvents: () => dispatch(getPopularEvents()),
  backPopularEvents: () => dispatch(backPopularEvents()),
  nextPopularEvents: () => dispatch(nextPopularEvents())
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
