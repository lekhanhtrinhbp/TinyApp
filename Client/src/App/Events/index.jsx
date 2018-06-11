import React from 'react';

import Filter from './Filter';
import Result from './Result';
import styles from './styles.css';

const Events = () => (
  <div className={styles.main}>
    <div className={styles.filter}>
      <Filter />
    </div>
    <div className={styles.result}>
      <Result />
    </div>
  </div>
);

export default Events;
