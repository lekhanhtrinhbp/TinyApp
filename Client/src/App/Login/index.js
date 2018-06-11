import { connect } from "react-redux";
import { login } from "../../actions/login";
import View from "./View";

const mapStateToProps = ({ app }) => ({
  isAuthorization: app.isAuthorization,
  isLoading: app.isLoading,
  isError: app.isError,
  messageOnTop: app.messageOnTop,
  appUser: app.appUser
});

const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(login(username, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
