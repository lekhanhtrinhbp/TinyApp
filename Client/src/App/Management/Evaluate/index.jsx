import { connect } from "react-redux";
// import { submitEvaluate } from "src/actions/management";
import Evaluate from "./Container";

const mapStateToProps = ({ state }) => ({
  ...state
});
// const mapDispatchToProps = dispatch => ({
//   submitEvaluate: evaluateInfo => dispatch(submitEvaluate(evaluateInfo))
// });

export default connect(mapStateToProps, null)(Evaluate);
