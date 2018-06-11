import { connect } from 'react-redux';
import { loadAuthenticationData } from '../../actions/app';
import View from './View';
import { getNotifies, seenNotifies } from '../../actions/header';
import { loadEvent } from '../../actions/event';
import { logout } from '../../actions/login';
import { loadBookmarks } from '../../actions/bookmark';

const mapStateToProps = ({ app }) => ({
  appUser: app.appUser,
});

const mapDispatchToProps = dispatch => ({
  loadAuthenticationData: () => dispatch(loadAuthenticationData()),
  getNotifies: () => dispatch(getNotifies()),
  logout: () => dispatch(logout()),
  seenNotifies: () => dispatch(seenNotifies()),
  loadEvent: (id) => dispatch(loadEvent(id)),
  loadBookmarks: () => dispatch(loadBookmarks())
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
