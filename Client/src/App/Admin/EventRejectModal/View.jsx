import React from "react";
import T from "prop-types";
import Moment from "moment";
import {
  Header,
  Button,
  Icon,
  Label,
  Modal,
  ModalContent,
  ModalActions,
  Card,
  Grid,
  Feed,
  List,
  Table,
  Image,
  Form,
  TextArea
} from "semantic-ui-react";
import renderHTML from "react-render-html";
import TranslateTag from "components/TranslateTag";
import translate from "components/Translate";
import styles from "./styles.css";

const EventRejectModal = props => {
  return (
    <Modal
      closeIcon
      closeOnDocumentClick
      className={styles.eventModal}
      open={props.open}
      onClose={props.handleClose}
    >
      <Header icon="eye" content={props.eventInfo.title} color="blue" />
      <Modal.Content>
        <Form>
          <Form.Field>
            <label><TranslateTag lblKey="reject-reason" /></label>
            <TextArea
              value={props.reason}
              onChange={props.handleChange}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={props.onClickOk} color="green">
          <Icon name="checkmark" />
          <TranslateTag lblKey="ok" />
        </Button>

        <Button onClick={props.handleClose} color="orange">
          <Icon name="close" />
          <TranslateTag lblKey="cancel" />
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

EventRejectModal.propTypes = {
  open: T.bool,
  handleClose: T.func.isRequired
};

export default EventRejectModal;
