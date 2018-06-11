import React from "react";
import {
  Button,
  Form,
  Message,
  Icon,
  Modal,
  Container
} from "semantic-ui-react";
import { browserHistory, Link } from "react-router";
import TranslateTag from "./../../components/TranslateTag";
import Colors from "./../../commons/common-colors";
import styles from "./styles.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.state = {
      username: "",
      password: "",
      isLoading: false,
      open: true,
      isError: false
    };
  }

  handleClose() {
    this.setState({ open: false });
    browserHistory.goBack();
  }

  handleOpen() {
    this.setState({ open: true });
  }

  login() {
    this.props.login(this.state.username, this.state.password).then(() => {
      this.setState({ open: false, isError: false });
      if (this.props.isAuthorization) {
        if (this.props.appUser.userInfo.superAccount) {
          browserHistory.push("/admin");
        } else {
          browserHistory.push("/home");
        }
      } else {
        this.setState({
          open: true,
          username: "",
          password: "",
          isError: true
        });
      }
    });
  }

  render() {
    const messageOnTop =
      this.props.isError && this.state.isError ? (
        <Message negative>
          <p>{this.props.messageOnTop}</p>
        </Message>
      ) : (
        ""
      );
    return (
      <Modal
        open={this.state.open}
        onClose={this.handleClose}
        closeOnEscape={this.handleClose}
        closeOnRootNodeClick={this.handleClose}
        closeIcon
        size="mini"
      >
        <Modal.Content>
          {messageOnTop}
          <Container textAlign="center">
            <p>
              <TranslateTag lblKey="enter-your-detail-below" />
            </p>
            <Form>
              <Form.Field>
                <Form.Input
                  placeholder="Email address"
                  onChange={event =>
                    this.setState({ username: event.target.value })
                  }
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  type="password"
                  placeholder="Enter your password"
                  onChange={event =>
                    this.setState({ password: event.target.value })
                  }
                />
              </Form.Field>
              <Form.Group style={{ margin: "0 0 1em" }}>
                <Link to="/" className={styles.signUp}>
                  <TranslateTag lblKey="forgot-password" />
                </Link>
              </Form.Group>
              <Button
                loading={this.props.isLoading}
                onClick={this.login}
                style={{
                  backgroundColor: Colors.darkGrassGreen,
                  color: Colors.mainGrey
                }}
                disabled={
                  this.state.username === "" || this.state.password === ""
                }
              >
                <TranslateTag lblKey="get-started" />
              </Button>
              <div>
                <div>
                  <TranslateTag lblKey="no-account" />
                </div>
                <Link
                  to="/register"
                  style={{ color: Colors.darkGrassGreen }}
                  className={styles.signUp}
                >
                  <TranslateTag lblKey="sign-up" />
                </Link>
              </div>
            </Form>
          </Container>
        </Modal.Content>
        <Modal.Actions>
          <Button color="facebook" onClick={this.handleClose} disabled>
            Facebook
          </Button>
          <Button color="google plus" onClick={this.handleClose} disabled>
            <Icon name="google" /> Google
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default Login;
