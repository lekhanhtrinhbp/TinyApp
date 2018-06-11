import { connect } from "react-redux";

import View from "./View";

const mapStateToProps = state => ({
  home: state.home,
  popularEvents: state.popularEvents
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, {})(View);
