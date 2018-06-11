import { connect } from 'react-redux';
import { userRegister, getHobbies, clearGuest } from '../../actions/register';
import { getEventTopic } from '../../actions/create';
import { loadGuestInfo } from '../../actions/event';
import Register from './Container';

const mapStateToProps = ({ app, register, create, event }) => ({
  userRegister: app.userRegister,
  userHobbies: register.userHobbies,
  eventTopics: create.eventTopic,
  guestInfo: event.guestInfo,
});

const mapDispatchToProps = dispatch => ({
  register: userInfo => dispatch(userRegister(userInfo)),
  getHobbies: () => dispatch(getHobbies()),
  getEventTopic: () => dispatch(getEventTopic()),
  loadGuestInfo: guestMail => dispatch(loadGuestInfo(guestMail)),
  clearGuest: () => dispatch(clearGuest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
