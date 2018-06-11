/* eslint-disable global-require */
import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import { Link } from 'react-router';
import MyLoader from 'components/Placeholder';
import CardCustom from '../Card';
import styles from './styles.css';
import TranslateTag from './../../../components/TranslateTag';

const PopularEvents = props =>
  props.popularEvents.loading ? (
    <MyLoader />
  ) : (<div style={{ maxWidth: '80%' }}>
    <h1>
      <TranslateTag lblKey="popular-events" />
    </h1>
    <Grid stackable>
      <Grid.Row columns={4} className={styles.carouselContainer}>
        <div className={styles.btnBackContainer}>
          <Icon
            onClick={props.onBackClick}
            name="chevron left"
            size="large"
          />
        </div>

        {props.popularEvents.events
          .slice(props.popularEvents.from, props.popularEvents.to)
          .map((item, i) => (
            <Grid.Column key={i}>
              <CardCustom {...item} key={item.id} isBookmarked="true" />
            </Grid.Column>
          ))}

        <div className={styles.btnNextContainer}>
          <Icon
            onClick={props.onNextClick}
            name="chevron right"
            size="large"
          />
        </div>
      </Grid.Row>
    </Grid>

    <div className={styles.buttons}>
      <Link className={styles.button} to="/events">
        <TranslateTag lblKey="see-more" />
      </Link>
    </div>
  </div>
    );

PopularEvents.propTypes = {};

export default PopularEvents;
