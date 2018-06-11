import T from 'prop-types';
import React from 'react';

import styles from './styles.css';

const Loading = ({ isLoading }) => (<div className={styles.main}>
  <div className={`${styles.loader} ${isLoading ? '' : styles.hide}`} />
</div>);

Loading.propTypes = {
  isLoading: T.oneOfType([
    T.string,
    T.bool
  ]),
};

Loading.defaultProps = {
  isLoading: false,
};

export default Loading;
