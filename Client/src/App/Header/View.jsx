/* eslint-disable global-require */
import React, { Component } from 'react';
import { Link, browserHistory, withRouter } from 'react-router';
import T from 'prop-types';
import { Menu, Image } from 'semantic-ui-react';

import UserProfile from './UserProfile';
import LangSelection from './LangSelection';
import Bookmarks from './Bookmarks';
import TranslateTag from './../../components/TranslateTag';
import AppConfig from './../../commons/config';
import Colors from './../../commons/common-colors';

import styles from './styles.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSeenNotifies = this.handleSeenNotifies.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);

    this.state = {
      prevPath: '',
      eventID: '',
    };
  }

  componentWillMount() {
    this.props.loadAuthenticationData();
  }

  componentWillReceiveProps(nextProps) {
    const { location } = nextProps.router;
    this.setState({ prevPath: location.pathname });
    if (nextProps.params) {
      this.setState({ eventID: nextProps.params.id });
    }
  }

  handleLogout() {
    this.props.logout();
    browserHistory.push('/');
  }

  handleSeenNotifies() {
    this.props.seenNotifies();
    this.props.getNotifies();
  }

  async handleItemClick(id) {
    await this.props.loadEvent(id);
    browserHistory.push(`/event/${id}`);
  }

  render() {
    return window.innerWidth > AppConfig.__MOBILE_BREAKPOINT__ ? (
      <div>
        <div className={`ui secondary pointing menu ${styles.greenHeaderTop}`}>
          &nbsp;
        </div>
        <div className="ui secondary menu" style={{ margin: 0 }}>
          <Menu
            fluid
            style={{
              border: 'none',
              boxShadow: '0px 5px 5px 0px rgba(176,169,176,1)',
              borderRadius: '0px',
            }}
          >
            <Menu.Item>&nbsp;</Menu.Item>
            <Menu.Item>&nbsp;</Menu.Item>
            <Menu.Item name="home">
              <Link to="/">
                <Image
                  src={require('../../images/sschool.png')}
                  style={{ width: '100px' }}
                />
              </Link>
            </Menu.Item>

            <Menu.Menu position="right">

              <Menu.Item>
                {this.props.appUser && this.props.appUser.userInfo ? (
                  <UserProfile
                    handleLogout={this.handleLogout}
                    handleSeenNotifies={this.handleSeenNotifies}
                    incommingEvents={this.props.getNotifies()}
                    handleItemClick={this.handleItemClick}
                  />
                ) : (<UserProfile />
                  )}
              </Menu.Item>

              {this.props.appUser && this.props.appUser.userInfo &&
                <Menu.Item>
                  <Link to="/admin">
                    <TranslateTag lblKey="management" />
                  </Link>
                </Menu.Item>
              }

            </Menu.Menu>
            <Menu.Item>&nbsp;</Menu.Item>
            <Menu.Item>&nbsp;</Menu.Item>
          </Menu>
        </div>
      </div>
    ) : (<div
      className="ui secondary pointing menu"
      style={{ flex: 1, marginTop: 0, border: 'none' }}
    >
      <div className={`ui item ${styles.item}`}>
        <Link to="/">Sschool</Link>
      </div>
      <div className="right menu">
        <div className={`ui item ${styles.item}`}>
          {this.props.appUser && this.props.appUser.userInfo ? (
            <UserProfile
              handleLogout={this.handleLogout}
              handleSeenNotifies={this.handleSeenNotifies}
              incommingEvents={this.props.getNotifies()}
              handleItemClick={this.handleItemClick}
              isMobile="true"
            />
          ) : (<UserProfile isMobile="true" />
            )}
        </div>
      </div>
    </div>
      );
  }
}

Header.propTypes = {
  loadAuthenticationData: T.func.isRequired,
  bookmarks: T.string,
  logout: T.func.isRequired,
  seenNotifies: T.func.isRequired,
  getNotifies: T.func.isRequired,
  loadEvent: T.func.isRequired,
  appUser: T.shape({
    userInfo: T.shape({
      adminAccount: T.bool,
    }),
  }),
};

export default withRouter(Header);
