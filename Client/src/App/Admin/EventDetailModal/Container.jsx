import React from 'react';
import T from 'prop-types';

import View from './View';

class EventDetailModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      eventInfo: {},
    };
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillMount() {
    this.setState({
      eventInfo: this.props.eventInfo,
    });
  }

  handleClose() {
    this.setState({ open: false });
    this.props.handlePreview(-1);
  }

  render() {
    return (
      <View handleClose={this.handleClose} {...this.state} {...this.props} />
    );
  }
}

EventDetailModal.propTypes = {
  open: T.bool,
  // eventInfo: T.any
};

export default EventDetailModal;
