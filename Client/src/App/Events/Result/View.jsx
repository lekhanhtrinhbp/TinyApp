/*eslint no-mixed-operators: 0 */
import T from 'prop-types';
import React from 'react';
import { TIME_OPTIONS_2 } from 'utils/datetime';
import ReactPlaceholder from 'react-placeholder';
import translate from 'components/Translate';
import Card from 'App/Home/Card';
import styles from './styles.css';
import TranslateTag from './../../../components/TranslateTag';

const value = (input, key) => {
  const result = input.find(i => i.key.toString() === key);
  return result ? result.value : key;
};
const View = props => (
  <div className={styles.main}>
    <h1 className={styles.title}>
      <TranslateTag lblKey="events-for-you" />
    </h1>
    <div className={styles.params}>
      {props.topicId && (
        <div
          className={styles.tag}
          onClick={e => props.remove(e, 'topicId')}
          role="presentation"
        >
          {value(props.categoryList, props.topicId)}
          <span className={styles.close}>x</span>
        </div>
      )}
      {props.eventTypeId && (
        <div
          className={styles.tag}
          onClick={e => props.remove(e, 'eventTypeId')}
          role="presentation"
        >
          {value(props.eventTypeList, props.eventTypeId)}
          <span className={styles.close}>x</span>
        </div>
      )}
      {props.timeValue && (
        <div
          className={styles.tag}
          onClick={e => props.remove(e, 'timeValue')}
          role="presentation"
        >
          {value(TIME_OPTIONS_2, props.timeValue)}
          <span className={styles.close}>x</span>
        </div>
      )}
      {props.ticketType && (
        <div
          className={styles.tag}
          onClick={e => props.remove(e, 'ticketType')}
          role="presentation"
        >
          {translate(props.ticketType)}
          <span className={styles.close}>x</span>
        </div>
      )}
    </div>
    {props.emptyResult &&
      !props.loading && (
        <div className={styles.noresult}>
          <TranslateTag lblKey="no-result" />
        </div>
      )}
    {props.loading ? (
      <div className={styles.loading}>
        <ReactPlaceholder type="media" rows={4} ready={!props.loading} />
        <ReactPlaceholder type="media" rows={4} ready={!props.loading} />
        <ReactPlaceholder type="media" rows={4} ready={!props.loading} />
      </div>
    ) : (
      props.searchResult.map(item => (
        <div className={styles.item}>
          <Card {...item} key={Math.random()} side />
        </div>
      ))
    )}
    {props.emptyResult === false &&
      !props.loading && (
        <div className={styles.pagination}>
          <span>
            {20 * props.page + 1} - {20 * props.page + props.numberOfElements}{' '}
            of {props.totalElements}
          </span>
          <div>
            <a
              className={props.firstPage ? styles.disabled : styles.page}
              onClick={props.previousPage}
              role="presentation"
            >
              <i className="angle left icon" />
            </a>
            {/* page starts from 0, so have to plus 1 to sho current page */}
            <a className={styles.number}>{props.page + 1}</a>
            <a
              className={props.lastPage ? styles.disabled : styles.page}
              onClick={props.nextPage}
              role="presentation"
            >
              <i className="angle right icon" />
            </a>
          </div>
        </div>
      )}
  </div>
);

View.propTypes = {
  nextPage: T.func.isRequired,
  previousPage: T.func.isRequired,
  searchResult: T.arrayOf(T.object).isRequired,
};

export default View;
