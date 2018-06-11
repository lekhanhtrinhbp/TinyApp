/* eslint-disable global-require */
import React from "react";
import { Link } from "react-router";
import { Image, Grid, Button, Input, Form, Icon } from "semantic-ui-react";

import Loading from "components/Loading";
import translate from "components/Translate";
import TranslateTag from "components/TranslateTag";
import CardCustom from "../Card";
import styles from "./styles.css";

const Subscription = props => (
  <div className={styles.subscribeSection}>
    <div className={styles.subscribeContainer}>
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <div className={styles.subcribeCol}>
            <div className={styles.subcribeColContent}>
              <span className={styles.subscribeText}>
                <TranslateTag lblKey="subscribe-title" />
              </span>
            </div>
          </div>

          <div className={styles.subcribeCol}>
            <div className={styles.subcribeColContent}>
              <Form.Input
                className={styles.subscribeInput}
                onChange={props.nameOnChange}
                value={props.name}
                placeholder={translate("subscribe-name")}
              />
            </div>
          </div>

          <div className={styles.subcribeCol}>
            <div className={styles.subcribeColContent}>
              <Form.Input
                className={styles.subscribeInput}
                onChange={props.emailOnChange}
                value={props.email}
                placeholder={translate("subscribe-email")}
              />
            </div>
          </div>

          <div className={styles.subcribeCol}>
            <div className={styles.subcribeColContent}>
              <Button className={styles.subscribeBtn}>
                <TranslateTag lblKey="subscribe-send" />
              </Button>
            </div>
          </div>
        </Form.Group>
      </Form>
    </div>
  </div>
);

Subscription.propTypes = {};

export default Subscription;
