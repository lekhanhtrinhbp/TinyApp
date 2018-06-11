import { connect } from 'react-redux';

import { loadEvent } from 'actions/event';
import { backFromPreview } from 'actions/create';
import { updateBookmarks } from '../../actions/bookmark';
import Container from './Container';

const mapStateToProps = state => ({
  ...state.event,
  ...state.create,
  bookmarks: state.bookmark.bookmarks,
});

const mapDispatchToProps = dispatch => ({
  loadEvent: id => dispatch(loadEvent(id)),
  backFromPreview: () => dispatch(backFromPreview()),
  addNewBookmark: (id, title) => dispatch(updateBookmarks(id, title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
