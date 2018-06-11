import T from 'prop-types';
import React from 'react';
import { Segment, Icon } from 'semantic-ui-react';

import Button from 'components/Button';
import Ticket from './Ticket';
import styles from './styles.css';
import TranslateTag from './../../../components/TranslateTag';

const View = props => {
  console.log(props);
  return (
    <div className={styles.main}>
      <Segment
        style={{
          width: `60%`,
          margin: `0 auto`,
          height: `auto`,
          padding: `12px`,
        }}
        loading={props.isLoading}
      >
        <div className={styles.header}>
          <span
            className={styles.close}
            onClick={props.toggle}
            role="presentation"
          >
            <Icon name="close" />
          </span>
        </div>
        <div className={styles.body}>
          <Ticket {...props} />
        </div>
        <div className={styles.footer}>
          <div className={styles.checkout}>
            <Button
              className={styles.button}
              onClick={props.handleCheckOut}
              disabled={props.disableCheckOut}
            >
              <TranslateTag lblKey="check-out" />
            </Button>
          </div>
        </div>
      </Segment>
    </div>
  );
};

View.propTypes = {
  toggle: T.func.isRequired,
  isGuest: T.bool,
  guestInfo: T.shape(),
  handleCheckOut: T.func.isRequired,
};

export default View;
