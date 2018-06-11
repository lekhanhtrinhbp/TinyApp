import { connect } from "react-redux";
import { closePopupRejectEvent, rejectEventConfirmed } from "actions/admin";
import EventRejectModal from "./Container";

const mapStateToProps = ({ admin }) => ({
  // open: true
});

const mapDispatchToProps = dispatch => ({
  rejectEventConfirmed: (eventId, reason) => dispatch(rejectEventConfirmed(eventId, reason)),
  closePopupRejectEvent: () => dispatch(closePopupRejectEvent())
});

export default connect(mapStateToProps, mapDispatchToProps)(EventRejectModal);
