import React from 'react';
import { Grid, Button } from 'semantic-ui-react';

import TranslateTag from '../../../components/TranslateTag';
import styles from './styles.css';

const SelectTicketType = props => {
  return (
    <Grid.Column>
      <Button
        onClick={props.handleTicketType}
        value="FREE"
        className={styles.ticketType}
      >
        <TranslateTag lblKey="free-ticket" />
        <i className="fa fa-plus" />
      </Button>
      <Button
        disabled
        onClick={props.handleTicketType}
        value="PAID"
        className={styles.ticketType}
      >
        <TranslateTag lblKey="paid-ticket" />
        <i className="fa fa-plus" />
      </Button>
      <Button
        disabled
        onClick={props.handleTicketType}
        value="DONATE"
        className={styles.ticketType}
      >
        <TranslateTag lblKey="donation" />
        <i className="fa fa-plus" />
      </Button>
    </Grid.Column>
  );
};

export default SelectTicketType;
