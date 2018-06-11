import { connect } from 'react-redux';

import { fetchAboutData } from 'actions/about';
import View from './View';

const mapStateToProps = state => ({
  about: state.about,
});

const mapDispatchToProps = dispatch => ({
  fetchAboutData: () => dispatch(fetchAboutData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
