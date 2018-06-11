import { connect } from 'react-redux';

import {
  browseCategories,
  updateValue,
} from 'actions/home';

import View from './View';

const mapStateToProps = state => ({
  ...state.home
});

const mapDispatchToProps = dispatch => ({
  browseCategories: () => dispatch(browseCategories()),
  updateValue: value => dispatch(updateValue(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
