import React from "react";
import T from "prop-types";

import View from "./View";

class EventRejectModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      reason: "",
      eventInfo: {}
    };
    this.onClickOk = this.onClickOk.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillMount() {
    this.setState({
      eventInfo: this.props.eventInfo
    });
  }

  onClickOk() {
    this.props.rejectEventConfirmed(this.state.eventInfo.id, this.state.reason);
    this.setState({ open: false });
  }

  handleChange(e) {
    this.setState({ reason: e.target.value });
  }

  handleClose() {
    this.props.closePopupRejectEvent();
    this.setState({ open: false });
  }

  render() {
    return (
      <View
        onClickOk={this.onClickOk}
        handleChange={this.handleChange}
        handleClose={this.handleClose}
        {...this.state}
        {...this.props}
      />
    );
  }
}

EventRejectModal.propTypes = {
  open: T.bool
  // eventInfo: T.any
};

export default EventRejectModal;
