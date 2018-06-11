import React from 'react';
import T from 'prop-types';
import { Segment, Label } from 'semantic-ui-react';
import { Form } from 'formsy-semantic-ui-react';
import translate from 'components/Translate';
import styles from './styles.css';
import TranslateTag from './../../../../components/TranslateTag';

const format = str => {
  const date = new Date(str);
  return date.toLocaleString(
    'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );
};

const errorLabel = <Label color="red" />;

const View = props => {
  return (
    <div>
      {props.ticketInfo.map(i => (
        <Segment>
          <div>
            <label className={styles.description}>{i.description}</label>
            <div className={styles.count}>
              {i.remainQuantity === 0
                ? translate('sold-out')
                : translate('tickets-left', [i.remainQuantity])}
            </div>
            <div className={styles.price}>
              <span className={styles.price}>{`$${
                i.price ? i.price.toFixed(2) : i.ticketType
              }`}</span>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <div className={styles.date}>{`${translate('sale-end')} ${format(
              i.saleEndDate
            )}`}</div>
            <Form onValid={props.handleMailValid}>
              <Form.Input
                type="hidden"
                name="hiddenEmail"
                value={props.email}
                validations={{ isEmail: true, isRequire: true }}
              />
            </Form>
            <Form
              onValid={() => props.handleOnValid(i.id)}
              onInvalid={props.handleOnInvalid}
            >
              <Form.Input
                name="quantityOrder"
                style={{ width: `30%` }}
                label={<TranslateTag lblKey="quantity" />}
                type="text"
                errorLabel={errorLabel}
                required
                validations={{
                  isNumeric: true,
                  isLessOrEqual: i.remainQuantity,
                }}
                validationErrors={{
                  isDefaultRequiredValue: <TranslateTag lblKey="be-empty" />,
                  isNumeric: <TranslateTag lblKey="not-contain-character" />,
                  isLessOrEqual: <TranslateTag lblKey="less-than" />,
                }}
                onChange={props.onChange}
                instantValidation
              />
              <hr />
              <Form.Input
                name="email"
                type="text"
                label={<TranslateTag lblKey="email" />}
                validations="isEmail"
                validationErrors={{
                  isEmail: <TranslateTag lblKey="not-valid-mail" />,
                  isDefaultRequiredValue: <TranslateTag lblKey="be-empty" />,
                }}
                errorLabel={errorLabel}
                required
                onChange={props.onChange}
                value={props.email !== '' ? props.email : ''}
                disabled={props.disableEdit}
                instantValidation
              />
              <Form.Input
                name="firstName"
                type="text"
                label={<TranslateTag lblKey="first-name" />}
                onChange={props.onChange}
                validationErrors={{
                  isDefaultRequiredValue: <TranslateTag lblKey="be-empty" />,
                }}
                errorLabel={errorLabel}
                required
                value={props.firstName}
                loading={props.guestInfo.isLoading}
                disabled={props.disableEdit}
                instantValidation
              />
              <Form.Input
                name="lastName"
                type="text"
                label={<TranslateTag lblKey="last-name" />}
                onChange={props.onChange}
                validationErrors={{
                  isDefaultRequiredValue: <TranslateTag lblKey="be-empty" />,
                }}
                errorLabel={errorLabel}
                required
                value={props.lastName}
                loading={props.guestInfo.isLoading}
                disabled={props.disableEdit}
                instantValidation
              />
            </Form>
          </div>
        </Segment>
      ))}
    </div>
  );
};

View.propTypes = {
  ticketInfo: T.arrayOf(),
  errorTicket: T.shape(),
};

export default View;
