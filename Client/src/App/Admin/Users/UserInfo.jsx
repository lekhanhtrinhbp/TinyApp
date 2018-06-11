import React from "react";
import { Tab } from "semantic-ui-react";
import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";
import translate from "components/Translate";
import UserInfoEvents from "./UserInfoEvents";
import UserInfoGeneral from "./UserInfoGeneral";
import UserInfoRegisteredEvents from "./UserInfoRegisteredEvents";
import styles from "./styles.css";

const UserInfo = props => {
  const panes = [
    {
      menuItem: "General",
      render: () => (
        <ReactPlaceholder rows={15} ready={!props.isLoading} type="text">
          <Tab.Pane style={{ minHeight: 200 }}>
            <UserInfoGeneral {...props.userInfo} />
          </Tab.Pane>
        </ReactPlaceholder>
      )
    },
    {
      menuItem: translate("events"),
      render: () => (
        <Tab.Pane style={{ minHeight: 200 }} className="userinfo-tab">
          <UserInfoEvents {...props.userInfo} />
        </Tab.Pane>
      )
    },
    {
      menuItem: translate("registered-events"),
      render: () => (
        <Tab.Pane style={{ minHeight: 200 }} className="userinfo-tab">
          <UserInfoRegisteredEvents {...props.userInfo} />
        </Tab.Pane>
      )
    }
  ];
  return <Tab panes={panes} />;
};
export default UserInfo;
