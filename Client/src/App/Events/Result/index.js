import { connect } from 'react-redux';
import {
  searchEvents,
  updateValue,
  remove,
} from 'actions/home';

import Container from './Container';

const mapStateToProps = state => ({
  ...state.home,
});

const mapDispatchToProps = dispatch => ({
  searchEvents: () => dispatch(searchEvents()),
  updateValue: value => dispatch(updateValue(value)),
  remove: name => dispatch(remove(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
