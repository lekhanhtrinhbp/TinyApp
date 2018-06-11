import { connect } from "react-redux";
import { getUserDetail } from "actions/admin";
import UserTable from "./UserTable";

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.admin.userDetail
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserDetails: userId => {
      dispatch(getUserDetail(userId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
