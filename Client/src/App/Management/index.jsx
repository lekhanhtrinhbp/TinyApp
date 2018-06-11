import { connect } from "react-redux";
import { getEvents, changeType, submitEvaluate } from "actions/management";
import Container from "./Container";

const mapStateToProps = state => ({
  ...state.management
});

const mapDispatchToProps = dispatch => ({
  getEvents: (page, size) => dispatch(getEvents(page, size)),
  changeType: type => dispatch(changeType(type)),
  submitEvaluate: evaluateInfo => dispatch(submitEvaluate(evaluateInfo))
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
