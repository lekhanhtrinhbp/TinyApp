import React from "react";
import T from "prop-types";

import View from "./View";

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "event",
      currentMenu: "event",
      isShowDetail: false,
      rejectEventId: 0,
      idApprove: 0,
      currentTab: "Events"
    };
    this.changeTab = this.changeTab.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleApprove = this.handleApprove.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    this.handleClickReject = this.handleClickReject.bind(this);
    this.onPagingEventsClick = this.onPagingEventsClick.bind(this);
  }

  componentDidMount() {
    if (this.props.appUser.userInfo.superAccount) {
      this.props.getAllEventSuperAdmin();
    } else {
      this.props.getAllEvent();
    }
    this.props.getAllUser();
  }

  onPagingEventsClick(page) {
    if (this.props.appUser.userInfo.superAccount) {
      this.props.getAllEventSuperAdmin(page);
    } else {
      this.props.getAllEvent(page);
    }
  }

  //for select admin's menu
  handleItemClick(e, { name }) {
    this.setState({ activeItem: name, currentMenu: name });
  }

  handlePreview(id) {
    this.setState({
      isShowDetail: id
    });
  }

  handleClickReject(id) {
    this.props.openPopupRejectEvent(id);
  }

  changeTab(tabName) {
    this.setState({
      currentTab: tabName
    });
  }

  async handleApprove(eventInfo) {
    this.setState({
      idApprove: eventInfo.id,
      rejectEventId: 0,
      isShowDetail: 0
    });

    await this.props.approve(eventInfo);
    if (this.props.appUser.userInfo.superAccount) {
      await this.props.getAllEventSuperAdmin();
    } else {
      await this.props.getAllEvent();
    }
    return this.props.eventForApproving.isError ||
      this.props.approveEvent.isError
      ? alert("Approve failed!!!")
      : alert("You have approved for this event!!!!!");
  }

  async handleReject(eventInfo) {
    this.setState({ idApprove: eventInfo.id });
    // await this.props.reject(eventInfo);
    if (this.props.appUser.userInfo.superAccount) {
      await this.props.getAllEventSuperAdmin();
    } else {
      await this.props.getAllEvent();
    }
    return this.props.eventForApproving.isError ||
      this.props.approveEvent.isError
      ? alert("Reject failed!!!")
      : alert("You have rejected for this event!!!!!");
  }

  render() {
    return (
      <View
        handleApprove={this.handleApprove}
        handleReject={this.handleReject}
        onPagingEventsClick={this.onPagingEventsClick}
        handleItemClick={this.handleItemClick}
        handlePreview={this.handlePreview}
        handleClickReject={this.handleClickReject}
        eventForApproving={this.props.eventForApproving}
        registeredUser={this.props.registeredUser}
        activeItem={this.state.activeItem}
        currentMenu={this.state.currentMenu}
        changeTab={this.changeTab}
        {...this.state}
        {...this.props}
      />
    );
  }
}

Admin.propTypes = {
  getAllEvent: T.func.isRequired,
  getAllUser: T.func.isRequired,
  approve: T.func.isRequired,
  eventForApproving: T.shape(),
  registeredUser: T.shape(),
  approveEvent: T.shape(),
  rejectEventId: T.number
};

export default Admin;
