import React from 'react';
import T from 'prop-types';
import { browserHistory } from 'react-router';
import View from './View';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      job: '',
      hobbies: [],
      eventTopics: [],
      password: '',
      repassword: '',
      disableSubmit: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleOnValid = this.handleOnValid.bind(this);
    this.handleInvalid = this.handleInvalid.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleGuestInfo = this.handleGuestInfo.bind(this);
  }

  componentWillMount() {
    this.props.getHobbies();
    this.props.getEventTopic();
    this.props.clearGuest();
  }

  componentWillReceiveProps(nextProps) {
    const { guest } = nextProps.guestInfo;
    this.setState({ firstName: guest.firstName, lastName: guest.lastName });
  }

  async handleRegister() {
    await this.props.register(this.state);
    const { userInfo } = this.props.userRegister;
    if (userInfo) {
      browserHistory.push('/login');
    } else {
      alert('Sign up fail!');
    }
  }

  handleChange(event, { name, value }) {
    this.setState({ [name]: value });
  }

  handleOnValid() {
    this.setState({ disableSubmit: false });
  }

  handleInvalid() {
    this.setState({ disableSubmit: true });
  }

  handleCancel() {
    browserHistory.push('/');
  }

  handleGuestInfo() {
    this.props.loadGuestInfo(this.state.mail);
  }

  render() {
    return (
      <View
        handleOnValid={this.handleOnValid}
        handleInvalid={this.handleInvalid}
        handleChange={this.handleChange}
        handleRegister={this.handleRegister}
        handleCancel={this.handleCancel}
        handleGuestInfo={this.handleGuestInfo}
        {...this.state}
        {...this.props}
      />
    );
  }
}

Register.propTypes = {
  register: T.func.isRequired,
};

export default Register;
