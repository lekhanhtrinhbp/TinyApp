import React from 'react';
import T from 'prop-types';

import View from './View';

class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRegist: false,
      checkoutMessage: '',
      openCheckoutConfirm: false,
    };

    this.toggle = this.toggle.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    this.handleBackFromPreview = this.handleBackFromPreview.bind(this);
    this.handleOpenCheckoutConfirm = this.handleOpenCheckoutConfirm.bind(this);
    this.handleConfirmCheckout = this.handleConfirmCheckout.bind(this);
  }

  componentWillMount() {
    if (this.props.route && this.props.route.isDetail) {
      this.setState({
        isDetail: this.props.route.isDetail,
      });
      this.props.loadEvent(this.props.params.id);
    } else if (this.props.route && this.props.route.isPreview) {
      this.setState({
        isPreview: this.props.route.isPreview,
      });
      this.handlePreview(this.props.saveEvent.eventInfo);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      eventInfo: nextProps.saveEvent.eventInfo,
      event: nextProps.event,
    });
  }

  handlePreview(eventInfomation) {
    this.setState({
      eventInfo: eventInfomation,
    });
  }

  toggle() {
    this.setState({ isRegist: !this.state.isRegist });
  }

  handleBackFromPreview() {
    this.props.backFromPreview();
  }

  handleOpenCheckoutConfirm(checkoutFail) {
    if (checkoutFail) {
      this.setState({
        openCheckoutConfirm: true,
        checkoutMessage:
          'Something wrong! Please check your infomation & ticket quantity',
      });
    } else {
      this.setState({
        openCheckoutConfirm: true,
        checkoutMessage: 'See you at the event soon!',
      });
    }
  }

  handleConfirmCheckout() {
    this.setState({
      openCheckoutConfirm: false,
    });
  }

  render() {
    return (
      <View
        {...this.props.event}
        {...this.state}
        {...this.props}
        loading={this.props.loading}
        toggle={this.toggle}
        isGuest={this.props.isGuest}
        checkoutSuccess={this.props.checkoutSuccess}
        handleBackFromPreview={this.handleBackFromPreview}
        handleConfirmCheckout={this.handleConfirmCheckout}
        handleOpenCheckoutConfirm={this.handleOpenCheckoutConfirm}
      />
    );
  }
}

Container.propTypes = {
  route: T.shape(),
  loadEvent: T.func.isRequired,
  params: T.shape(),
  saveEvent: T.shape(),
  event: T.shape(),
  loading: T.bool,
  isGuest: T.bool,
  checkoutSuccess: T.bool,
};

export default Container;
