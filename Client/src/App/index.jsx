import T from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Sidebar, Segment, Menu, Icon } from 'semantic-ui-react';
import { addValidationRule } from 'formsy-react';
import { Link } from 'react-router';

import Header from '../App/Header';
import Footer from '../App/Footer';
import styles from './global.css';
import TranslateTag from './../components/TranslateTag';
import AppConfig from './../commons/config.js';

addValidationRule('isRequire', value => {
  return value.hiddenEmail !== '';
});

addValidationRule('isLessOrEqual', (values, value, remainQuantity) => {
  return value <= remainQuantity;
});

class App extends Component {
  constructor(props) {
    super(props);
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.state = { visible: false };
  }

  toggleVisibility() {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    const { visible } = this.state;
    return window.innerWidth > AppConfig.__MOBILE_BREAKPOINT__ ? (
      <div className={styles.variable}>
        <Header />
        <div className={styles.main}>{this.props.children}</div>
        <Footer />
      </div>
    ) : (
      <div className={styles.variable}>
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation="push"
            width="thin"
            visible={visible}
            icon="labeled"
            vertical
            inverted
          >
            {this.props.appUser &&
            this.props.appUser.userInfo &&
            this.props.appUser.userInfo.adminAccount ? (
              ''
            ) : (
              <Menu.Item name="home">
                <Link to="/create">
                  <TranslateTag lblKey="create-event" />
                </Link>
              </Menu.Item>
            )}

            {this.props.appUser && this.props.appUser.userInfo ? (
              this.props.appUser &&
              this.props.appUser.userInfo &&
              this.props.appUser.userInfo.adminAccount ? (
                <Menu.Item name="home">
                  <Link to="/admin">
                    <TranslateTag lblKey="management" />
                  </Link>
                </Menu.Item>
              ) : (
                <Menu.Item name="home">
                  <Link to="/management">
                    <TranslateTag lblKey="management" />
                  </Link>
                </Menu.Item>
              )
            ) : (
              <Menu.Item name="home">
                <Link to="/register">
                  <TranslateTag lblKey="register" />
                </Link>
              </Menu.Item>
            )}
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div>
                  <Link onClick={this.toggleVisibility}>
                    <Icon name="sidebar" />
                  </Link>
                </div>
                <Header />
              </div>
              <div className={styles.main}>{this.props.children}</div>
              <Footer />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

App.propTypes = {
  children: T.node.isRequired,
};

const mapStateToProps = ({ app }) => ({
  appUser: app.appUser,
});

export default connect(mapStateToProps, null)(App);
