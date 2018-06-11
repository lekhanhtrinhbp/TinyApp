import React from 'react';
import { Segment, Grid, Input, Form } from 'semantic-ui-react';

import TranslateTag from '../../../components/TranslateTag';
import styles from './styles.css';

const TicketType = props => {
  const { ticketName, capacity, ticketPrice } = props;
  return (
    <div>
      {props.isMobile === 'false' ? (
        <Segment>
          <Grid>
            <Grid.Row textAlign="left">
              <Grid.Column width="4">
                <div>
                  <TranslateTag lblKey="ticket-name" />
                </div>
                <Input
                  className={styles.input}
                  onChange={props.handleChange}
                  placeholder="Early Bird, RSVP..."
                  name="ticketName"
                  value={ticketName || ''}
                />
              </Grid.Column>
              <Grid.Column width="4">
                <div>
                  <TranslateTag lblKey="quantity-available" />
                </div>
                <Input
                  className={styles.input}
                  onChange={props.handleChange}
                  placeholder="100"
                  name="capacity"
                  value={capacity || ''}
                />
              </Grid.Column>
              {props.ticketType === 'FREE' ? null : props.ticketType ===
              'PAID' ? (
                <Grid.Column width="4">
                  <div>
                    <TranslateTag lblKey="price" />
                  </div>
                  <Input
                    className={styles.input}
                    onChange={props.handleChange}
                    placeholder="15.00$"
                    name="ticketPrice"
                    value={ticketPrice || ''}
                  />
                </Grid.Column>
              ) : (
                <Grid.Column width="4">
                  <div>
                    <TranslateTag lblKey="price" />
                  </div>
                  <Input
                    className={styles.input}
                    disabled
                    onChange={props.handleChange}
                    placeholder="Donation"
                    name="ticketPrice"
                  />
                </Grid.Column>
              )}
            </Grid.Row>
          </Grid>
        </Segment>
      ) : (
        <Segment>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <div>
                    <TranslateTag lblKey="ticket-name" />
                  </div>
                  <Input
                    fluid
                    className={styles.input}
                    onChange={props.handleChange}
                    placeholder="Early Bird, RSVP..."
                    name="ticketName"
                    value={ticketName || ''}
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ display: `flex`, flexDirection: `row` }}>
              <Grid.Column width="6">
                <Form.Field>
                  <div>
                    <TranslateTag lblKey="quantity" />
                  </div>
                  <Input
                    className={styles.input}
                    onChange={props.handleChange}
                    placeholder="10"
                    name="capacity"
                    value={capacity || ''}
                  />
                </Form.Field>
              </Grid.Column>
              {props.ticketType === 'FREE' ? null : props.ticketType ===
              'PAID' ? (
                <Grid.Column width="6" style={{ marginLeft: `12px` }}>
                  <Form.Field>
                    <div>
                      <TranslateTag lblKey="price" />
                    </div>
                    <Input
                      className={styles.input}
                      onChange={props.handleChange}
                      placeholder="15.00$"
                      name="ticketPrice"
                      value={ticketPrice || ''}
                    />
                  </Form.Field>
                </Grid.Column>
              ) : (
                <Grid.Column width="6" style={{ marginLeft: `12px` }}>
                  <Form.Field>
                    <div>
                      <TranslateTag lblKey="price" />
                    </div>
                    <Input
                      className={styles.input}
                      disabled
                      onChange={props.handleChange}
                      placeholder="Donation"
                      name="ticketPrice"
                    />
                  </Form.Field>
                </Grid.Column>
              )}
            </Grid.Row>
          </Grid>
        </Segment>
      )}
    </div>
  );
};

export default TicketType;
