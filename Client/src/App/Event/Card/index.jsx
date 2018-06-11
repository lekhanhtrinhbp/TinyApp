import React from 'react';
import { connect } from 'react-redux';
import {
  Card,
  Image,
  Icon,
  Divider,
  Button,
  Label,
  Segment,
} from 'semantic-ui-react';
import { Link } from 'react-router';
import ReactHtmlParser from 'react-html-parser';
import TranslateTag from 'components/TranslateTag';
import translate from 'components/Translate';
import { updateBookmarks } from '../../../actions/bookmark';
import MyMapComponent from '../../CreateEvent/GoogleMap';
import styles from './styles.css';

const bgImage = require('../../../images/no-image.png');

const format = str => {
  let date;
  if (str === 'now') {
    date = new Date();
  } else {
    date = new Date(str);
  }
  return date.toLocaleString(
    'en-US',
    {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }
  );
};

const formatHour = str => {
  let date;
  if (str === 'now') {
    date = new Date();
  } else {
    date = new Date(str);
  }
  return date.toLocaleString(
    'en-US',
    {
      hour: 'numeric',
      minute: 'numeric',
    }
  );
};

const CardEvent = props => {
  const { location, dateFrom, description } = props;
  return (
    <div>
      <Card fluid className={styles.card}>
        <div className={styles.image}>
          <Label
            tag
            size={props.priceTagSize}
            content={props.ticketType ? props.ticketType : 'FREE'}
            className={
              props.mobileMode ? styles.priceTagMobile : styles.priceTag
            }
          />
          {props.poster === '' || props.imgSrc === '' ? (
            <Image src={bgImage} float="left" />
          ) : (
            <Image src={props.imgSrc || props.poster} float="left" />
          )}
        </div>
        <Card
          className={props.mobileMode ? styles.contentMobile : styles.content}
        >
          <Card.Content>
            <Card.Header
              className={styles.title}
              style={{ paddingTop: '18px' }}
            >
              {props.title ? props.title : 'Create An Event'}
            </Card.Header>
            <Divider />
            <div
              style={
                props.isPreview
                  ? { minHeight: '250px' }
                  : { minHeight: '190px' }
              }
            >
              <Card.Meta className={styles.location}>
                <Icon name="map marker alternate" />
                <p>{location.address ? location.address : ""}</p>
                {/* <p>
                  {`
                  ${location.title ? location.title : 'Văn phòng LuciTree'}
                  ${location.houseNumber ? location.houseNumber : '32/10'}
                  ${location.street ? location.street : 'Nguyễn Cửu B'}
                  `}
                </p> */}
              </Card.Meta>
              {/* <Card.Meta style={{ margin: '12px 22px 0px' }}>
                {location.country === undefined ||
                location.city === undefined ? (
                  <p>phường 17, quận Bình Thạnh, Hồ Chí Minh, Việt Nam</p>
                ) : (
                  <p>
                    {`
                    ${props.location.ward ? props.location.ward : 'phường XX'},
                    ${
                      props.location.district
                        ? props.location.district
                        : 'quận XX'
                    },
                    ${
                      props.location.city && props.location.city.value
                        ? props.location.city.value
                        : 'Hồ Chí Minh'
                    },
                    ${
                      props.location.country && props.location.country.value
                        ? props.location.country.value
                        : 'Việt Nam'
                    }
                    `}
                  </p>
                )}
              </Card.Meta> */}
              <Card.Meta className={styles.time}>
                <Icon name="calendar" />
                {dateFrom ? (
                  <p>{format(props.dateFrom)}</p>
                ) : (
                  <p>{format('now')}</p>
                )}
              </Card.Meta>
              <Card.Meta className={styles.time}>
                <Icon name="clock" />
                {dateFrom ? (
                  <p>{formatHour(props.dateFrom)}</p>
                ) : (
                  <p>{formatHour('now')}</p>
                )}
              </Card.Meta>
            </div>
            <Divider />
            <div style={{ justifyContent: 'flex-end' }}>
              <div className={styles.hastag}>
                <Link
                  onClick={() => props.addNewBookmark(props.id, props.title)}
                >
                  <span className={styles.share} title={translate('save')}>
                    {props.bookmarks.length > 0 ? (
                      <Icon
                        size="big"
                        className={styles.icon}
                        name={props.bookmarks.map(b => {
                          return b.id === props.id
                            ? 'bookmark outline'
                            : 'bookmark';
                        })}
                      />
                    ) : (
                      <Icon
                        className={styles.icon}
                        name="bookmark"
                        size="big"
                      />
                    )}
                  </span>
                </Link>
              </div>
              <div className={styles.actions}>
                <Button
                  className={
                    props.mobileMode ? styles.buttonMobile : styles.button
                  }
                  onClick={props.toggle}
                  disabled={props.isPreview}
                >
                  <TranslateTag lblKey="register" />
                </Button>
              </div>
            </div>
          </Card.Content>
        </Card>
      </Card>
      <div
        className={
          props.mobileMode ? styles.descriptionMobile : styles.description
        }
      >
        <h2>
          <TranslateTag lblKey="description" />
        </h2>
        <div style={{ textAlign: 'justify' }}>
          {ReactHtmlParser(description)}
        </div>
        <h2>
          <TranslateTag lblKey="location" />
        </h2>
        <Segment className={styles.mapLocation}>
          {props.location.mapLat ||
          props.location.mapLong ||
          props.location.address ? (
            <MyMapComponent
              lat={props.location.mapLat}
              lng={props.location.mapLong}
              address={props.location.address}
            />
          ) : (
            <MyMapComponent
              lat={10.795695}
              lng={106.707885}
              address="LuciTree Office"
            />
          )}
        </Segment>
      </div>
      {props.isPreview ? (
        <div className={styles.back}>
          <Link to="create">
            <Button
              className={styles.backButton}
              onClick={props.handleBackFromPreview}
            >
              <Icon name="arrow left" size="small" />
              <TranslateTag lblKey="back" />
            </Button>
          </Link>
        </div>
      ) : null}
    </div>
  );
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
)(CardEvent);
