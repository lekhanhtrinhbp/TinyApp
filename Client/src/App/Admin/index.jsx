import { connect } from "react-redux";
import {
  getAllEvent,
  approve,
  getAllUser,
  getAllEventSuperAdmin,
  openPopupRejectEvent,
  closePopupRejectEvent
} from "actions/admin";
import Admin from "./Container";

const mapStateToProps = ({ admin, app }) => ({
  eventForApproving: admin.eventForApproving,
  approveEvent: admin.approveEvent,
  registeredUser: admin.registeredUser,
  appUser: app.appUser,
  rejectEventId: admin.rejectEventId
});

const mapDispatchToProps = dispatch => ({
  getAllEvent: (page, size) => dispatch(getAllEvent(page, size)),
  approve: event => dispatch(approve(event)),
  getAllUser: () => dispatch(getAllUser()),
  getAllEventSuperAdmin: (page, size) => dispatch(getAllEventSuperAdmin(page, size)),
  openPopupRejectEvent: eventId => dispatch(openPopupRejectEvent(eventId)),
  closePopupRejectEvent: () => dispatch(closePopupRejectEvent())
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
