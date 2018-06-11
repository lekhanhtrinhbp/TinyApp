import { connect } from 'react-redux';
import React from 'react';
import { loadGuestInfo, checkout } from 'actions/event';
import View from './View';

class Ticket extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disableCheckOut: true,
    };

    this.handleCheckOut = this.handleCheckOut.bind(this);
    this.handleValidCheckout = this.handleValidCheckout.bind(this);
    this.handleInvalidCheckout = this.handleInvalidCheckout.bind(this);
  }

  async handleCheckOut() {
    await this.props.checkout();
    this.props.toggle();
    this.props.handleOpenCheckoutConfirm(this.props.checkoutFail);
  }

  handleValidCheckout() {
    this.setState({ disableCheckOut: false });
  }

  handleInvalidCheckout() {
    this.setState({ disableCheckOut: true });
  }

  render() {
    return (
      <View
        {...this.props}
        {...this.state}
        handleCheckOut={this.handleCheckOut}
        handleValidCheckout={this.handleValidCheckout}
        handleInvalidCheckout={this.handleInvalidCheckout}
      />
    );
  }
}

const mapStateToProps = state => ({
  isGuest: state.event.isGuest,
  guestInfo: state.event.guestInfo,
  checkoutFail: state.event.checkoutFail,
  isLoading: state.event.isLoading,
});

const mapDispatchToProps = dispatch => ({
  loadGuestInfo: email => dispatch(loadGuestInfo(email)),
  checkout: () => dispatch(checkout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Ticket);
