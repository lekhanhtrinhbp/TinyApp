import T from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import {
  ticketSelect,
  loadTickets,
  loadCurrentUserInfo,
  updateGuestInfo,
} from 'actions/event';

import View from './View';

class Ticket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantityOrder: '',
      email: '',
      firstName: '',
      lastName: '',
      disableEdit: false,
    };
    this.onChange = this.onChange.bind(this);
    this.handleMailValid = this.handleMailValid.bind(this);
    this.handleOnValid = this.handleOnValid.bind(this);
    this.handleOnInvalid = this.handleOnInvalid.bind(this);
  }

  componentWillMount() {
    this.props.loadTickets();
    this.props.loadCurrentUserInfo();
  }

  componentWillReceiveProps(nextProps) {
    const { currentUser, guestInfo } = nextProps;
    if (currentUser && currentUser.user && currentUser.user.guest) {
      this.setState({
        email: currentUser.user.email,
        firstName: currentUser.user.guest.firstName,
        lastName: currentUser.user.guest.lastName,
        disableEdit: true,
      });
    } else if (guestInfo && guestInfo.guest) {
      this.setState({
        firstName: guestInfo.guest.firstName,
        lastName: guestInfo.guest.lastName,
        disableEdit: false,
      });
    }
  }

  onChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    this.props.updateGuestInfo(name, value);
  }

  handleOnValid(id) {
    this.props.ticketSelect({ key: id, value: this.state.quantityOrder });
    this.props.handleValidCheckout();
  }

  handleOnInvalid() {
    this.props.handleInvalidCheckout();
  }

  handleMailValid() {
    this.props.loadGuestInfo(this.state.email);
  }

  render() {
    return (
      <View
        {...this.props}
        {...this.state}
        onChange={this.onChange}
        handleMailValid={this.handleMailValid}
        handleOnValid={this.handleOnValid}
        handleOnInvalid={this.handleOnInvalid}
      />
    );
  }
}

const mapStateToProps = state => ({
  ...state.event,
  guestInfo: state.event.guestInfo,
  currentUser: state.event.currentUser,
  appUser: state.app.appUser,
});

const mapDispatchToProps = dispatch => ({
  ticketSelect: value => dispatch(ticketSelect(value)),
  loadTickets: () => dispatch(loadTickets()),
  loadCurrentUserInfo: () => dispatch(loadCurrentUserInfo()),
  updateGuestInfo: (name, value) => dispatch(updateGuestInfo(name, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ticket);
