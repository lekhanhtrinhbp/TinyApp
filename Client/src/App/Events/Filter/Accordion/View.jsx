/*eslint eqeqeq: 0 */
import T from 'prop-types';
import React from 'react';

import styles from './styles.css';

const View = props => {
  return (
    <div>
      <div className={styles.header} onClick={props.expand} role="presentation">
        {props.header}
        <i
          className={`fa ${props.isExpand ? 'fa-angle-up' : 'fa-angle-down'} ${
            styles.right
          }`}
        />
      </div>
      <div className={`${styles.select} ${props.isExpand ? '' : styles.hide}`}>
        {props.data.map(item => {
          return (
            <div
              className={
                item.key == props.selectItem ? styles.active : styles.options
              }
              data-value={item.key}
              onClick={props.onChange}
              role="presentation"
              key={Math.random()}
            >
              {item.value}
            </div>
          );
        })}
      </div>
    </div>
  );
};

View.propTypes = {
  selectItem: T.oneOfType([T.string, T.number]).isRequired,
  header: T.string.isRequired,
  expand: T.func.isRequired,
  isExpand: T.bool.isRequired,
  onChange: T.func.isRequired,
  data: T.arrayOf(T.object),
  value: T.oneOfType([T.string, T.number]).isRequired,
};

export default View;
