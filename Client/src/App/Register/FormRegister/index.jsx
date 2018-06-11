import React from 'react';
import { Grid, Segment, Label, Button } from 'semantic-ui-react';
import { Form } from 'formsy-semantic-ui-react';

import TranslateTag from '../../../components/TranslateTag';
import styles from './styles.css';

const errorLabel = <Label color="red" pointing />;

const ResgisterForm = props => {
  const { userRegister, widthResponse, guestInfo } = props;
  return (
    <Grid.Column width={widthResponse}>
      <Form onValid={props.handleOnValid} onInvalid={props.handleInvalid}>
        <Segment loading={userRegister.isLoading}>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <div className={styles.header}>
                  <h3>
                    <TranslateTag lblKey="forgot-password" />
                  </h3>
                </div>
                <div className={styles.content}>
                  <p>
                    <TranslateTag lblKey="reset-password" />
                  </p>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Form.Input
            name="mail"
            label={<TranslateTag lblKey="email" />}
            validations="isEmail"
            placeholder="Sschool@lucitree.com"
            validationErrors={{
              isEmail: <TranslateTag lblKey="not-valid-mail" />,
              isDefaultRequiredValue: <TranslateTag lblKey="be-empty" />,
            }}
            errorLabel={errorLabel}
            onChange={props.handleChange}
            required
          />
          <Grid.Row style={{ display: `flex`, marginBottom: `6px` }}>
            <Grid.Column style={{ flex: '1', paddingRight: '2px' }}>
              <Form.Input
                name="firstName"
                label={<TranslateTag lblKey="first-name" />}
                placeholder="Tree"
                validationErrors={{
                  isDefaultRequiredValue: <TranslateTag lblKey="be-empty" />,
                }}
                errorLabel={errorLabel}
                onChange={props.handleChange}
                required
                value={props.guestInfo.guest.firstName || ''}
                loading={guestInfo.isLoading}
              />
            </Grid.Column>
            <Grid.Column style={{ flex: '1', paddingLeft: '8px' }}>
              <Form.Input
                name="lastName"
                label={<TranslateTag lblKey="last-name" />}
                placeholder="Luci"
                validationErrors={{
                  isDefaultRequiredValue: <TranslateTag lblKey="be-empty" />,
                }}
                errorLabel={errorLabel}
                onChange={props.handleChange}
                required
                value={props.guestInfo.guest.lastName || ''}
                loading={guestInfo.isLoading}
              />
            </Grid.Column>
          </Grid.Row>
          <Form.Input
            name="phoneNumber"
            label={<TranslateTag lblKey="phone-number" />}
            placeholder="090-*******"
            validations={{ maxLength: 11, isNumeric: true }}
            validationErrors={{
              isDefaultRequiredValue: <TranslateTag lblKey="be-empty" />,
              maxLength: <TranslateTag lblKey="less-than-11" />,
              isNumeric: <TranslateTag lblKey="not-contain-character" />,
            }}
            errorLabel={errorLabel}
            onChange={props.handleChange}
            required
          />
          <Form.Input
            name="job"
            label={<TranslateTag lblKey="job" />}
            placeholder="your job..."
            validationErrors={{
              isDefaultRequiredValue: <TranslateTag lblKey="be-empty" />,
            }}
            errorLabel={errorLabel}
            onChange={props.handleChange}
            required
          />
          <Form.Dropdown
            name="hobbies"
            label={<TranslateTag lblKey="hobby" />}
            selection
            multiple
            options={props.userHobbies.hobbies}
            placeholder="Hobby"
            validations={{ minLength: 3 }}
            validationErrors={{
              isDefaultRequiredValue: <TranslateTag lblKey="be-empty" />,
              minLength: <TranslateTag lblKey="3-hobby" />,
            }}
            errorLabel={errorLabel}
            onChange={props.handleChange}
            required
          />
          <Form.Dropdown
            name="eventTopics"
            label={<TranslateTag lblKey="event-topic" />}
            selection
            multiple
            options={props.eventTopics.topic}
            placeholder="Topic"
            validations={{ minLength: 3 }}
            validationErrors={{
              isDefaultRequiredValue: <TranslateTag lblKey="be-empty" />,
              minLength: <TranslateTag lblKey="3-topic" />,
            }}
            errorLabel={errorLabel}
            onChange={props.handleChange}
            required
          />
          <Form.Input
            name="password"
            label={<TranslateTag lblKey="password" />}
            type="password"
            placeholder="******"
            validations={{ minLength: 6 }}
            validationErrors={{
              minLength: <TranslateTag lblKey="pw-min-length" />,
              isDefaultRequiredValue: <TranslateTag lblKey="be-empty" />,
            }}
            errorLabel={errorLabel}
            onChange={props.handleChange}
            required
          />
          <Form.Input
            name="repassword"
            label={<TranslateTag lblKey="repassword" />}
            type="password"
            placeholder="******"
            validations={{ minLength: 6, equalsField: 'password' }}
            validationErrors={{
              minLength: <TranslateTag lblKey="pw-min-length" />,
              isDefaultRequiredValue: <TranslateTag lblKey="be-empty" />,
              equalsField: <TranslateTag lblKey="pw-not-equal" />,
            }}
            errorLabel={errorLabel}
            onChange={props.handleChange}
            required
          />
          <div
            style={{
              display: `flex`,
              justifyContent: `center`,
              marginTop: `12px`,
            }}
          >
            <Button
              className={styles.register}
              onClick={props.handleRegister}
              disabled={props.disableSubmit}
            >
              <TranslateTag lblKey="register" />
            </Button>
            <Button onClick={props.handleCancel}>
              <TranslateTag lblKey="cancel" />
            </Button>
          </div>
        </Segment>
      </Form>
      <Form onValid={props.handleGuestInfo}>
        <Form.Input
          name="hiddenEmail"
          type="hidden"
          validations={{ isEmail: true, isRequire: true }}
          value={props.mail}
          style={{ height: '0px' }}
        />
      </Form>
    </Grid.Column>
  );
};

export default ResgisterForm;
