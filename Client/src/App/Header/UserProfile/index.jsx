import React from "react";
import faker from "faker";
import { connect } from "react-redux";
import { Link } from "react-router";
import { Image, Dropdown, Icon } from "semantic-ui-react";
import translate from "components/Translate";
import { seenNotifies } from "../../../actions/header";
import TranslateTag from "./../../../components/TranslateTag";

const UserProfile = props => {
  let incommingEvents = props.notification;
  return props.appUser && props.appUser.userInfo ? (
    <Dropdown
      onClick={
        incommingEvents.hasNewNotification ? props.handleSeenNotifies : null
      }
      trigger={
        <span>
          <Image avatar src={faker.internet.avatar()} />
          {props.isMobile ? "" : <TranslateTag lblKey="hello" />}
          {props.isMobile ? "" : `, ${props.appUser.userInfo.username}`}

          {incommingEvents.hasNewNotification ? (
            <a className="ui red circular label" style={{ marginLeft: "5px" }}>
              {incommingEvents.event.length}
            </a>
          ) : (
            ""
          )}
        </span>
      }
    >
      {incommingEvents.hasNewNotification ||
      incommingEvents.event !== undefined ? (
        <Dropdown.Menu>
          {props.isMobile ? (
            <Dropdown.Item>
              <TranslateTag lblKey="hello" />, {props.appUser.userInfo.username}
            </Dropdown.Item>
          ) : (
            ""
          )}
          {props.isMobile ? <Dropdown.Divider /> : ""}
          <Dropdown.Item>
            {translate("incoming-event", [incommingEvents.event.length])}
          </Dropdown.Item>
          <Dropdown.Divider />
          {incommingEvents.event.map((event, index) => {
            return (
              <Dropdown.Item
                key={index}
                onClick={() => props.handleItemClick(event.key)}
              >
                {event.value}
              </Dropdown.Item>
            );
          })}
          <Dropdown.Divider />
          <Dropdown.Item onClick={props.handleLogout}>
            <Link>
              <TranslateTag lblKey="sign-out" />
            </Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      ) : (
        <Dropdown.Menu>
          {props.isMobile ? (
            <Dropdown.Item>
              <TranslateTag lblKey="hello" />, {props.appUser.userInfo.username}
            </Dropdown.Item>
          ) : (
            ""
          )}
          {props.isMobile ? <Dropdown.Divider /> : ""}
          <Dropdown.Item>
            <TranslateTag lblKey="no-incoming-event" />
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={props.handleLogout}>
            <Link>
              <TranslateTag lblKey="sign-out" />
            </Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      )}
    </Dropdown>
  ) : (
    <Link to="/login">
      {props.isMobile ? (
        <Icon name="sign in" />
      ) : (
        <TranslateTag lblKey="sign-in" />
      )}
    </Link>
  );
};

const mapStateToProps = ({ app, header }) => ({
  appUser: app.appUser,
  notification: header.notification
});

const mapDispatchToProps = dispatch => ({
  seenNotifies: () => dispatch(seenNotifies())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
