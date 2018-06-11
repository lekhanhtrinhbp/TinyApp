import React from 'react';
import T from 'prop-types';
import { Link } from 'react-router';
import { Button, Modal } from 'semantic-ui-react';
import translate from 'components/Translate';
import styles from './styles.css';
import TranslateTag from './../../../components/TranslateTag';
import Evaluate from '../Evaluate/Container';

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

const inlineStyle = {
  modal: {
    marginTop: '0px !important',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};

export default class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
    this.onCloseModalClick = this.onCloseModalClick.bind(this);
    this.onOpenModalClick = this.onOpenModalClick.bind(this);
  }

  onOpenModalClick() {
    this.setState({
      modalOpen: true,
    });
  }

  onCloseModalClick() {
    this.setState({
      modalOpen: false,
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
        header={translate('Evaluate')}
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
      <div className={styles.main}>
        <div className={styles.title}>{this.props.title}</div>
        <div className={styles.time}>
          {this.props.dateTo ? format(this.props.dateTo) : '--/--/----'}
        </div>
        <div className={styles.actions}>
          <div className={styles.item}>
            <Link to={`/event/${this.props.id}/edit`}>
              <i className="fa fa-edit" />
              <TranslateTag lblKey="edit" />
            </Link>
          </div>
          <div className={styles.item}>
            <Link to={`/event/${this.props.id}`}>
              <i className="fa fa-eye" />
              <TranslateTag lblKey="view" />
            </Link>
          </div>
          {!this.props.reviewed &&
            this.props.isRegisteredEvent &&
            new Date() > new Date(this.props.dateFrom) &&
            this.renderReviewAction()}
        </div>
      </div>
    );
  }
}

Event.propTypes = {
  title: T.string,
  dateTo: T.string,
  id: T.number,
};
