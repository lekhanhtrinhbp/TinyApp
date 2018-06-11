import React from "react";
import T from "prop-types";
import { Table, Header, Button, Icon, Modal } from "semantic-ui-react";
import TranslateTag from "components/TranslateTag";
import UserInfo from "./UserInfo";

const inlineStyle = {
  modal: {
    marginTop: "30px !important",
    marginLeft: "auto",
    marginRight: "auto"
  }
};

export default class UserTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };
    this.onModalOpen = this.onModalOpen.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
  }

  onModalOpen(id) {
    const { getUserDetails } = this.props;
    return () => {
      this.setState({ isModalOpen: true }, () => getUserDetails(id));
    };
  }

  onModalClose() {
    this.setState({
      isModalOpen: false
    });
  }

  renderTable() {
    return (
      <Table celled padded style={{ borderTop: "none" }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{ textAlign: "center" }}>
              <TranslateTag lblKey="user-name" fontWeight="800" />
            </Table.HeaderCell>
            <Table.HeaderCell>
              <TranslateTag lblKey="full-name" fontWeight="800" />
            </Table.HeaderCell>
            <Table.HeaderCell>
              <TranslateTag lblKey="email-address" fontWeight="800" />
            </Table.HeaderCell>
            <Table.HeaderCell>
              <TranslateTag lblKey="action" fontWeight="800" />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.props.registeredUser.allUser.content.map(userInfo => {
            return (
              <Table.Row key={Math.random()}>
                <Table.Cell>
                  <Header textAlign="center">{userInfo.username}</Header>
                </Table.Cell>
                <Table.Cell>
                  {userInfo.guest && userInfo.guest.firstName
                    ? userInfo.guest.firstName
                    : ""}&nbsp;
                  {userInfo.guest && userInfo.guest.lastName
                    ? userInfo.guest.lastName
                    : ""}
                  {(!userInfo.guest ||
                    (userInfo.guest &&
                      !userInfo.guest.firstName &&
                      !userInfo.guest.lastName)) &&
                    "--/--"}
                </Table.Cell>
                <Table.Cell>
                  {userInfo.guest && userInfo.guest.email
                    ? userInfo.guest.email
                    : "--/--"}
                </Table.Cell>
                <Table.Cell>
                  <Button
                    fluid
                    color="teal"
                    size="medium"
                    onClick={this.onModalOpen(userInfo.id)}
                  >
                    <TranslateTag lblKey="view" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    );
  }

  renderUserModal() {
    return (
      <Modal
        open={this.state.isModalOpen}
        style={inlineStyle.modal}
        onClose={this.onModalClose}
      >
        <Header icon="info" color="blue" content="User Informations" />
        <Modal.Content>
          <UserInfo {...this.props.user} />
        </Modal.Content>
        <Modal.Actions>
          <Button color="orange" onClick={this.onModalClose}>
            <Icon name="close" /> Close
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
  render() {
    return (
      <React.Fragment>
        {this.renderTable()}
        {this.renderUserModal()}
      </React.Fragment>
    );
  }
}

UserTable.propTypes = {
  registeredUser: T.shape({
    allUser: T.shape({
      content: T.array
    }),
    isLoading: T.bool
  }),
  currentMenu: T.string,
  activeItem: T.string,
  handleItemClick: T.func.isRequired
};
