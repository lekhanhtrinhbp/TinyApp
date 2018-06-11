import T from 'prop-types';
import React from 'react';

import styles from './styles.css';

const Image = props => (
  <div className={props.className}>
    <img src={props.src} alt={props.alt} className={styles.img} />
  </div>
);

Image.propTypes = {
  src: T.string.isRequired,
  className: T.string,
  alt: T.string,
};

Image.defaultProps = {
  className: '',
  alt: '',
};

export default Image;
