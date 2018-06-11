import React from "react";
import T from "prop-types";
import { browserHistory } from "react-router";
import translate from "components/Translate";
import Loading from "components/Loading";
import {
  Container,
  Table,
  Header,
  Button,
  Label,
  Modal,
  Icon,
  Menu
} from "semantic-ui-react";
import styles from "./styles.css";
import Evaluate from "./Evaluate/Container";
import TranslateTag from "./../../components/TranslateTag";

const inlineStyle = {
  modal: {
    marginTop: "0px !important",
    marginLeft: "auto",
    marginRight: "auto"
  }
};

const format = str => {
  const date = new Date(str);
  return date.toLocaleString(
    "en-US",
    {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric"
    }
  );
};

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
    this.onCloseModalClick = this.onCloseModalClick.bind(this);
    this.onOpenModalClick = this.onOpenModalClick.bind(this);
  }

  onOpenModalClick() {
    this.setState({
      modalOpen: true
    });
  }

  onCloseModalClick() {
    this.setState({
      modalOpen: false
    });
  }

  renderReviewAction() {
    return (
      <Modal
        trigger={
          <div
            onClick={() => this.onOpenModalClick()}
            className={styles.item}
            role="button"
            tabIndex={0}
          >
            <i className="fa fa-star" />
            <TranslateTag lblKey="Evaluate" />
          </div>
        }
        style={inlineStyle.modal}
        onClose={this.onCloseModalClick}
        size="small"
        open={this.state.modalOpen}
        header={translate("Evaluate")}
        content={
          <Evaluate
            eventId={this.props.id}
            cancelFunc={this.onCloseModalClick}
            submitEvaluate={this.props.submitEvaluate}
          />
        }
      />
    );
  }

  render() {
    return (
      <div style={{ maxWidth: "80%", margin: "30px auto 50px auto" }}>
        <Container>
          <div className={styles.title}>
            <h1>
              <TranslateTag lblKey="management-dashboard" />
            </h1>
          </div>
        </Container>
        <Container>
          <div className={styles.tabs} style={{ display: "flex" }}>
            <div
              className={`${styles.item} ${
                this.props.status === "Events" ? styles.active : styles.inactive
                }`}
              onClick={() => {
                this.props.typeClick("Events");
              }}
              role="presentation"
              style={{ flex: "1" }}
            >
              <TranslateTag lblKey="events" />
            </div>
            <div
              className={`${styles.item} ${
                this.props.status === "RegisteredEvents"
                  ? styles.active
                  : styles.inactive
                }`}
              onClick={() => {
                this.props.typeClick("RegisteredEvents");
              }}
              role="presentation"
              style={{ flex: "1" }}
            >
              <TranslateTag lblKey="registered-events" />
            </div>
          </div>
        </Container>
        {this.props.loading ? (
          <Loading isLoading />
        ) : this.props.events.content.length === 0 ? (
          <Container style={{ margin: "12px 0px 12px 0px" }}>
            {this.props.status === "Events" ? (
              <h3>
                <TranslateTag lblKey="no-event" />
              </h3>
            ) : (<h3>
              <TranslateTag lblKey="no-register-event" />
            </h3>
              )}
          </Container>
        ) : (<Container style={{ margin: "0px 0px 30px 0px" }}>
          <Table celled padded style={{ borderTop: "none" }}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell singleLine style={{ textAlign: "center" }}>
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
              {this.props.events.content.map((item, i) => (
                <Table.Row key={Math.random()}>
                  <Table.Cell>
                    <Header as="h2" textAlign="center">
                      {item.id}
                    </Header>
                  </Table.Cell>
                  <Table.Cell singleLine>
                    <div style={{ fontWeight: "800" }}>{item.title}</div>
                    <div>
                      {item.dateTo ? format(item.dateTo) : "--/--/----"}
                    </div>
                  </Table.Cell>
                  <Table.Cell singleLine>
                    {item.approved ? (
                      <Label size="medium" tag color="green">
                        <TranslateTag lblKey="approved" />
                      </Label>
                    ) : (<Label size="medium" tag color="orange">
                      <TranslateTag lblKey="not-approved" />
                    </Label>
                      )}
                  </Table.Cell>

                  <Table.Cell>
                    <Button
                      color="green"
                      size="medium"
                      onClick={() => {
                        browserHistory.push(`/event/${item.id}/edit`);
                      }}
                    >
                      <TranslateTag lblKey="edit" />
                    </Button>
                    <Button
                      color="teal"
                      size="medium"
                      onClick={() => {
                        browserHistory.push(`/event/${item.id}`);
                      }}
                    >
                      <TranslateTag lblKey="view" />
                    </Button>

                    {!item.reviewed &&
                      item.status === "RegisteredEvents" &&
                      new Date() > new Date(item.dateFrom) &&
                      this.renderReviewAction()}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan='4'>
                  <Menu floated='right' pagination>
                    {!this.props.events.first &&
                      <Menu.Item as='a' icon
                        onClick={() => this.props.onPagingEventsClick(this.props.events.number - 1)}>
                        <Icon name='chevron left' />
                      </Menu.Item>
                    }

                    {Array.from(Array(this.props.events.totalPages).keys()).map(i => (
                      <Menu.Item key={i} as='a'
                        onClick={() => this.props.onPagingEventsClick(i)}
                        active={this.props.events.number === i}
                      >
                        {i + 1}
                      </Menu.Item>
                    ))}

                    {!this.props.events.last &&
                      <Menu.Item as='a' icon
                        onClick={() => this.props.onPagingEventsClick(this.props.events.number + 1)}
                      >
                        <Icon name='chevron right' />
                      </Menu.Item>
                    }
                  </Menu>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Container>
            )}
      </div>
    );
  }
}

View.propTypes = {
  typeClick: T.func.isRequired,
  status: T.string,
  loading: T.bool,
  events: T.arrayOf()
};

export default View;
