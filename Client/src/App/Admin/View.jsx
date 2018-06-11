import React from 'react';
import T from 'prop-types';
import {
  Container,
  Table,
  Header,
  Button,
  Label,
  Menu,
  Icon,
} from 'semantic-ui-react';
import Loading from 'components/Loading';
import TranslateTag from 'components/TranslateTag';
import MyLoader from 'components/Placeholder';
import EventDetailModal from './EventDetailModal';
import UsersView from './Users/index';
import EventRejectModal from './EventRejectModal';
import styles from './styles.css';

const format = str => {
  const date = new Date(str);
  return date.toLocaleString(
    'en-US',
    {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }
  );
};

const EventTable = props => {
  return (
    <Table celled padded style={{ borderTop: 'none' }}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell singleLine style={{ textAlign: 'center' }}>
            <TranslateTag lblKey="event-id" fontWeight="800" />
          </Table.HeaderCell>
          <Table.HeaderCell>
            <TranslateTag lblKey="event-name" fontWeight="800" />
          </Table.HeaderCell>
          <Table.HeaderCell>
            <TranslateTag lblKey="status" fontWeight="800" />
          </Table.HeaderCell>
          <Table.HeaderCell>
            <TranslateTag lblKey="action" fontWeight="800" />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.eventForApproving.allEvent.content &&
          props.eventForApproving.allEvent.content.map(eventInfo => {
            return eventInfo.published ? (
              <Table.Row key={Math.random()}>
                <Table.Cell>
                  <Header textAlign="center">{eventInfo.id}</Header>
                </Table.Cell>
                <Table.Cell singleLine>
                  <div style={{ fontWeight: '800' }}>{eventInfo.title}</div>
                  <div>
                    {eventInfo.dateTo ? format(eventInfo.dateTo) : '--/--/----'}
                  </div>
                </Table.Cell>
                <Table.Cell singleLine>
                  {eventInfo.approved ? (
                    <Label size="medium" tag color="green">
                      <TranslateTag lblKey="approved" />
                    </Label>
                  ) : (
                    <Label size="medium" tag color="orange">
                      <TranslateTag lblKey="not-approved" />
                    </Label>
                  )}
                </Table.Cell>

                <Table.Cell>
                  <Button
                    color="teal"
                    size="medium"
                    onClick={() => {
                      props.handlePreview(eventInfo.id);
                    }}
                  >
                    <TranslateTag lblKey="view" />
                  </Button>

                  {eventInfo.id === props.isShowDetail && (
                    <EventDetailModal
                      eventInfo={eventInfo}
                      handlePreview={props.handlePreview}
                    />
                  )}

                  {!eventInfo.approved && (
                    <Button
                      color="orange"
                      size="medium"
                      onClick={() => {
                        props.handleApprove(eventInfo);
                      }}
                      loading={
                        props.approveEvent.isLoading &&
                        props.idApprove === eventInfo.id
                      }
                    >
                      <TranslateTag lblKey="approve" />
                    </Button>
                  )}

                  {!eventInfo.approved && (
                    <Button
                      color="yellow"
                      size="medium"
                      onClick={() => {
                        props.handleClickReject(eventInfo.id);
                      }}
                    >
                      <TranslateTag lblKey="reject" />
                    </Button>
                  )}

                  {eventInfo.id === props.rejectEventId && (
                    <EventRejectModal eventInfo={eventInfo} />
                  )}
                </Table.Cell>
              </Table.Row>
            ) : null;
          })}
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan="4">
            <Menu floated="right" pagination>
              {!props.eventForApproving.allEvent.first && (
                <Menu.Item
                  as="a"
                  icon
                  onClick={() =>
                    props.onPagingEventsClick(
                      props.eventForApproving.allEvent.number - 1
                    )
                  }
                >
                  <Icon name="chevron left" />
                </Menu.Item>
              )}

              {Array.from(
                Array(props.eventForApproving.allEvent.totalPages).keys()
              ).map(i => (
                <Menu.Item
                  key={i}
                  as="a"
                  onClick={() => props.onPagingEventsClick(i)}
                  active={props.eventForApproving.allEvent.number === i}
                >
                  {i + 1}
                </Menu.Item>
              ))}

              {!props.eventForApproving.allEvent.last && (
                <Menu.Item
                  as="a"
                  icon
                  onClick={() =>
                    props.onPagingEventsClick(
                      props.eventForApproving.allEvent.number + 1
                    )
                  }
                >
                  <Icon name="chevron right" />
                </Menu.Item>
              )}
            </Menu>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

const Admin = props => {
  return (
    <div style={{ maxWidth: '80%', margin: '30px auto 50px auto' }}>
      <Container>
        <div className={styles.title}>
          <h1>
            <TranslateTag lblKey="management-dashboard" />
          </h1>
        </div>
      </Container>
      <Container>
        <div className={styles.tabs} style={{ display: 'flex' }}>
          <div
            className={`${styles.item} ${
              props.currentTab === 'Events' ? styles.active : styles.inactive
            }`}
            onClick={() => {
              props.changeTab('Events');
            }}
            role="presentation"
            style={{ flex: '1' }}
          >
            <TranslateTag lblKey="events" />
          </div>
          <div
            className={`${styles.item} ${
              props.currentTab === 'Users' ? styles.active : styles.inactive
            }`}
            onClick={() => {
              props.changeTab('Users');
            }}
            role="presentation"
            style={{ flex: '1' }}
          >
            <TranslateTag lblKey="users" />
          </div>
        </div>
      </Container>
      {props.eventForApproving.isLoading ? (
        <div>
          <MyLoader />
        </div>
      ) : (
        <Container style={{ margin: '0px 0px 30px 0px' }}>
          {props.currentTab === 'Events' ? (
            <EventTable
              eventForApproving={props.eventForApproving}
              handleApprove={props.handleApprove}
              {...props}
            />
          ) : (
            <UsersView registeredUser={props.registeredUser} {...props} />
          )}
        </Container>
      )}
    </div>
  );
};

Admin.propTypes = {
  eventForApproving: T.shape({
    allEvent: T.shape({
      content: T.array,
    }),
    isLoading: T.bool,
  }),
  currentMenu: T.string,
  activeItem: T.string,
  handleItemClick: T.func.isRequired,
  handleApprove: T.func.isRequired,
};

EventTable.propTypes = {
  eventForApproving: T.shape({
    allEvent: T.shape({
      content: T.array,
    }),
    isLoading: T.bool,
  }),
  currentMenu: T.string,
  activeItem: T.string,
  handleItemClick: T.func.isRequired,
  handleApprove: T.func.isRequired,
  approveEvent: T.shape(),
  isShowDetail: T.bool,
  // idApprove: T.string
};

export default Admin;
