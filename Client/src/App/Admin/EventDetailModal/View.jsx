/*eslint react/jsx-indent: 0 */
import React from 'react';
import T from 'prop-types';
import Moment from 'moment';
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
} from 'semantic-ui-react';
import renderHTML from 'react-render-html';
import TranslateTag from 'components/TranslateTag';
import styles from './styles.css';

const EventDetailModal = props => {
  return (
    <Modal
      closeIcon
      closeOnDocumentClick
      className={styles.eventModal}
      size="fullscreen"
      open={props.open}
      onClose={props.handleClose}
    >
      <Header icon="eye" content={props.eventInfo.title} color="blue" />
      <Modal.Content>
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column>
              <Card fluid>
                <Card.Content>
                  <Card.Header>
                    <TranslateTag lblKey="event-info" />
                  </Card.Header>

                  <Table striped>
                    <Table.Body>
                      <Table.Row verticalAlign="top">
                        <Table.Cell>
                          <TranslateTag lblKey="event-title" />
                        </Table.Cell>
                        <Table.Cell>{props.eventInfo.title}</Table.Cell>
                      </Table.Row>

                      <Table.Row verticalAlign="top">
                        <Table.Cell>
                          <TranslateTag lblKey="event-from" />
                        </Table.Cell>
                        <Table.Cell>
                          {Moment(props.eventInfo.dateFrom).format(
                            'DD-MM-YYYY'
                          )}
                        </Table.Cell>
                      </Table.Row>

                      <Table.Row verticalAlign="top">
                        <Table.Cell>
                          <TranslateTag lblKey="event-to" />
                        </Table.Cell>
                        <Table.Cell>
                          {Moment(props.eventInfo.dateTo).format('DD-MM-YYYY')}
                        </Table.Cell>
                      </Table.Row>

                      <Table.Row verticalAlign="top">
                        <Table.Cell>
                          <TranslateTag lblKey="capacity" />
                        </Table.Cell>
                        <Table.Cell>
                          <Label circular size="mini" color="pink">
                            {props.eventInfo.capacity}
                          </Label>
                        </Table.Cell>
                      </Table.Row>

                      <Table.Row verticalAlign="top">
                        <Table.Cell>
                          <TranslateTag lblKey="ticket-type" />
                        </Table.Cell>
                        <Table.Cell>
                          <Label tag size="mini" color="green">
                            {props.eventInfo.ticketType}
                          </Label>
                        </Table.Cell>
                      </Table.Row>

                      <Table.Row verticalAlign="top">
                        <Table.Cell>
                          <TranslateTag lblKey="Status" />
                        </Table.Cell>
                        <Table.Cell>
                          {props.eventInfo.approved ? (
                            <Label size="mini" tag color="green">
                              <TranslateTag lblKey="approved" />
                            </Label>
                          ) : (
                            <Label size="mini" tag color="orange">
                              <TranslateTag lblKey="not-approved" />
                            </Label>
                          )}
                        </Table.Cell>
                      </Table.Row>

                      {/* <Table.Row verticalAlign="top">
                        <Table.Cell>Active</Table.Cell>
                        <Table.Cell>
                          {props.eventInfo.published ? (
                            <Label size="mini" tag color="green">
                              Active
                            </Label>) : (
                              <Label size="mini" tag color="orange">
                                Inactive
                              </Label>
                            )}
                        </Table.Cell>
                      </Table.Row> */}

                      <Table.Row verticalAlign="top">
                        <Table.Cell>
                          <TranslateTag lblKey="published" />
                        </Table.Cell>
                        <Table.Cell>
                          {props.eventInfo.published ? (
                            <Label size="mini" tag color="green">
                              <TranslateTag lblKey="published" />
                            </Label>
                          ) : (
                            <Label size="mini" tag color="orange">
                              <TranslateTag lblKey="unpublished" />
                            </Label>
                          )}
                        </Table.Cell>
                      </Table.Row>

                      <Table.Row verticalAlign="top">
                        <Table.Cell>
                          <TranslateTag lblKey="reviewed" />
                        </Table.Cell>
                        <Table.Cell>
                          {props.eventInfo.reviewed ? (
                            <Label size="mini" tag color="green">
                              <TranslateTag lblKey="yes" />
                            </Label>
                          ) : (
                            <Label size="mini" tag color="orange">
                              <TranslateTag lblKey="no" />
                            </Label>
                          )}
                        </Table.Cell>
                      </Table.Row>

                      <Table.Row verticalAlign="top">
                        <Table.Cell>
                          <TranslateTag lblKey="refundable" />
                        </Table.Cell>
                        <Table.Cell>
                          {props.eventInfo.refundable ? (
                            <Label size="mini" tag color="green">
                              <TranslateTag lblKey="yes" />
                            </Label>
                          ) : (
                            <Label size="mini" tag color="orange">
                              <TranslateTag lblKey="no" />
                            </Label>
                          )}
                        </Table.Cell>
                      </Table.Row>

                      <Table.Row verticalAlign="top">
                        <Table.Cell>
                          <TranslateTag lblKey="event-topic" />
                        </Table.Cell>
                        <Table.Cell>
                          <Label tag size="mini" color="blue">
                            {props.eventInfo.eventTopic.value}
                          </Label>
                        </Table.Cell>
                      </Table.Row>

                      <Table.Row verticalAlign="top">
                        <Table.Cell>
                          <TranslateTag lblKey="event-type" />
                        </Table.Cell>
                        <Table.Cell>
                          <Label tag size="mini" color="blue">
                            {props.eventInfo.eventType.value}
                          </Label>
                        </Table.Cell>
                      </Table.Row>

                      <Table.Row verticalAlign="top">
                        <Table.Cell>
                          <TranslateTag lblKey="tag" />
                        </Table.Cell>
                        <Table.Cell>
                          {props.eventInfo.tags
                            ? props.eventInfo.tags.map(tag => (
                                <Label size="mini" color="teal">
                                  {tag.value.substring(1, tag.value.length)}
                                  <Icon name="delete" />
                                </Label>
                              ))
                            : null}
                        </Table.Cell>
                      </Table.Row>

                      <Table.Row verticalAlign="top">
                        <Table.Cell>
                          <TranslateTag lblKey="description" />
                        </Table.Cell>
                        <Table.Cell>{props.eventInfo.description}</Table.Cell>
                      </Table.Row>

                      <Table.Row verticalAlign="top">
                        <Table.Cell>
                          <TranslateTag lblKey="created-date" />
                        </Table.Cell>
                        <Table.Cell>
                          {Moment(props.eventInfo.createdDate).format(
                            'DD-MM-YYYY'
                          )}
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </Card.Content>
              </Card>
            </Grid.Column>

            <Grid.Column>
              <Card fluid>
                <Card.Content>
                  <Card.Header>
                    <TranslateTag lblKey="organization" />
                  </Card.Header>

                  <Table striped>
                    <Table.Body>
                      <Table.Row verticalAlign="top">
                        <Table.Cell>
                          <TranslateTag lblKey="name" />
                        </Table.Cell>
                        <Table.Cell>
                          {props.eventInfo.organizer.name}
                        </Table.Cell>
                      </Table.Row>

                      <Table.Row verticalAlign="top">
                        <Table.Cell>
                          <TranslateTag lblKey="description" />
                        </Table.Cell>
                        <Table.Cell>
                          {props.eventInfo.organizer.description}
                        </Table.Cell>
                      </Table.Row>

                      <Table.Row verticalAlign="top">
                        <Table.Cell>
                          <TranslateTag lblKey="job-title" />
                        </Table.Cell>
                        <Table.Cell>
                          {props.eventInfo.organizer.jobTitle
                            ? props.eventInfo.organizer.jobTitle.value
                            : ''}
                        </Table.Cell>
                      </Table.Row>

                      <Table.Row verticalAlign="top">
                        <Table.Cell>
                          <TranslateTag lblKey="organization-profile" />
                        </Table.Cell>
                        <Table.Cell>
                          {props.eventInfo.organizer.profile}
                        </Table.Cell>
                      </Table.Row>

                      <Table.Row verticalAlign="top">
                        <Table.Cell>Professional Summary</Table.Cell>
                        <Table.Cell>
                          {props.eventInfo.organizer.professionalSummary}
                        </Table.Cell>
                      </Table.Row>

                      <Table.Row verticalAlign="top">
                        <Table.Cell>
                          <TranslateTag lblKey="social" />
                        </Table.Cell>
                        <Table.Cell>
                          <a href={props.eventInfo.organizer.socialUrl}>
                            {props.eventInfo.organizer.socialUrl}
                          </a>
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </Card.Content>
              </Card>

              <Card fluid>
                <Card.Content>
                  <Card.Header>
                    <TranslateTag lblKey="location" />
                  </Card.Header>

                  <Table striped>
                    <Table.Body>
                      <Table.Row verticalAlign="top">
                        <Table.Cell>
                          <TranslateTag lblKey="address" />
                        </Table.Cell>
                        <Table.Cell>
                          {props.eventInfo.location.houseNumber}{' '}
                          {props.eventInfo.location.street}
                        </Table.Cell>
                      </Table.Row>

                      <Table.Row verticalAlign="top">
                        <Table.Cell>
                          <TranslateTag lblKey="ward" />
                        </Table.Cell>
                        <Table.Cell>{props.eventInfo.location.ward}</Table.Cell>
                      </Table.Row>

                      <Table.Row verticalAlign="top">
                        <Table.Cell>
                          <TranslateTag lblKey="city" />
                        </Table.Cell>
                        <Table.Cell>
                          {props.eventInfo.location.city
                            ? props.eventInfo.location.city.value
                            : ''}
                        </Table.Cell>
                      </Table.Row>

                      <Table.Row verticalAlign="top">
                        <Table.Cell>
                          <TranslateTag lblKey="country" />
                        </Table.Cell>
                        <Table.Cell>
                          {props.eventInfo.location.country
                            ? props.eventInfo.location.country.value
                            : ''}
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </Card.Content>
              </Card>
            </Grid.Column>

            <Grid.Column>
              {props.eventInfo.ticketInfo.map(ticket => (
                <Card fluid>
                  <Card.Content>
                    <Card.Header>
                      <TranslateTag lblKey="ticket-info" />
                    </Card.Header>

                    <Table striped>
                      <Table.Body>
                        <Table.Row verticalAlign="top">
                          <Table.Cell>
                            <TranslateTag lblKey="name" />
                          </Table.Cell>
                          <Table.Cell>{ticket.name}</Table.Cell>
                        </Table.Row>

                        <Table.Row verticalAlign="top">
                          <Table.Cell>
                            <TranslateTag lblKey="description" />
                          </Table.Cell>
                          <Table.Cell>{ticket.description}</Table.Cell>
                        </Table.Row>

                        <Table.Row verticalAlign="top">
                          <Table.Cell>
                            <TranslateTag lblKey="quantity" />
                          </Table.Cell>
                          <Table.Cell>
                            <Label circular size="mini" color="blue">
                              {ticket.quantity}
                            </Label>
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row verticalAlign="top">
                          <Table.Cell>
                            <TranslateTag lblKey="booked-quantity" />
                          </Table.Cell>
                          <Table.Cell>
                            <Label circular size="mini" color="green">
                              {ticket.bookedQuantity}
                            </Label>
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row verticalAlign="top">
                          <Table.Cell>
                            <TranslateTag lblKey="remain-quantity" />
                          </Table.Cell>
                          <Table.Cell>
                            <Label circular size="mini" color="orange">
                              {ticket.remainQuantity}
                            </Label>
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row verticalAlign="top">
                          <Table.Cell>
                            <TranslateTag lblKey="sale-start-date" />
                          </Table.Cell>
                          <Table.Cell>
                            <Label tag color="green">
                              {Moment(ticket.saleStartDate).format(
                                'DD-MM-YYYY'
                              )}
                            </Label>
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row verticalAlign="top">
                          <Table.Cell>
                            <TranslateTag lblKey="sale-end-date" />
                          </Table.Cell>
                          <Table.Cell>
                            <Label tag color="green">
                              {Moment(ticket.saleEndDate).format('DD-MM-YYYY')}
                            </Label>
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  </Card.Content>
                </Card>
              ))}
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Grid>
          <Grid.Row>
            <Card fluid>
              <Card.Content>
                <Card.Header>
                  <TranslateTag lblKey="overview" />
                </Card.Header>

                <div fluid>
                  {props.eventInfo.contentOverview
                    ? renderHTML(props.eventInfo.contentOverview)
                    : ''}
                </div>
              </Card.Content>
            </Card>
          </Grid.Row>

          <Grid.Row>
            <Card fluid>
              <Card.Content>
                <Card.Header>
                  <TranslateTag lblKey="poster" />
                </Card.Header>

                <Image src={props.eventInfo.poster} fluid />
              </Card.Content>
            </Card>
          </Grid.Row>
        </Grid>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={props.handleClose} color="orange">
          <Icon name="close" />
          <TranslateTag lblKey="close" />
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

EventDetailModal.propTypes = {
  open: T.bool,
  handleClose: T.func.isRequired,
};

export default EventDetailModal;
