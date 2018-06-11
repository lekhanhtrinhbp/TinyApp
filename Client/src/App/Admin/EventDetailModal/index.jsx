import { connect } from "react-redux";
import EventDetailModal from "./Container";

const mapStateToProps = ({ admin }) => ({
  // open: true
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailModal);
