import T from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Card, Icon } from 'semantic-ui-react';
import {
  FacebookShareButton,
  FacebookShareCount,
  TwitterShareButton,
} from 'react-share';
import translate from 'components/Translate';

import styles from './styles.css';
import newStyles from './newStyles.css';
import { updateBookmarks } from './../../../actions/bookmark.js';

const format = str => {
  const date = new Date(str);
  return date.toLocaleString(
    'en-US',
    {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      // hour: "numeric",
      // minute: "numeric"
    }
  );
};

const formatHour = str => {
  const date = new Date(str);
  return date.toLocaleString(
    'en-US',
    {
      hour: 'numeric',
      minute: 'numeric',
    }
  );
};

const CardCustom = props => (
  <div>
    <Card className={styles.cardItem} fluid>
      <Link to={`/event/${props.id}`}>
        <div
          className={newStyles.image}
          style={{
            backgroundImage: `url(${props.image})`,
            height: '25vh',
          }}
        />
      </Link>
      <Card.Content>
        <Card.Meta className={newStyles.time}>
          June 11 2018 <span>8:00 AM</span>
        </Card.Meta>
        <Card.Header className={styles.title}>{props.name}</Card.Header>
        <Card.Description className={styles.description}>
          {`
              ${props.name}
            `}
        </Card.Description>
      </Card.Content>

      <Card.Content className={newStyles.footer}>
        <div className={newStyles.hastag}>
          {props.tags ? props.tags.map(i => `${i.value} `) : ''}
        </div>
        <div className={styles.actions}>
          <div className={styles.item} style={{ display: 'flex' }}>
            <FacebookShareButton
              url={`${window.location.href}event/${props.id}`}
              quote={props.title}
            >
              <Icon name="facebook f" className={styles.icon} />
            </FacebookShareButton>
            <TwitterShareButton
              url={`${window.location.href}event/${props.id}`}
              quote={props.title}
            >
              <Icon name="twitter" className={styles.icon} />
            </TwitterShareButton>
            {/* <FacebookShareCount
                url={`${window.location.href}event/${props.id}`}
              >
                {count => count}
              </FacebookShareCount> */}
          </div>
          <Link
            className={styles.item}
            onClick={() => props.addNewBookmark(props.id, props.name)}
          >
            <span className={styles.share} title={translate('save')}>
              {props.bookmarks.length > 0 ? (
                <Icon
                  className={styles.icon}
                  name={props.bookmarks.map(b => {
                    return b.id === props.id
                      ? 'bookmark outline'
                      : 'bookmark';
                  })}
                />
              ) : (<Icon className={styles.icon} name="bookmark" />
                )}
            </span>
          </Link>
        </div>
      </Card.Content>
    </Card>
  </div>
);

CardCustom.propTypes = {
  side: T.bool,
};

CardCustom.defaultProps = {
  side: false,
};

const mapStateToProps = ({ bookmark }) => ({
  bookmarks: bookmark.bookmarks,
});

const mapDispatchToProps = dispatch => ({
  addNewBookmark: (id, title) => dispatch(updateBookmarks(id, title)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardCustom);
