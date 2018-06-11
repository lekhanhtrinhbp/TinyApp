import T from 'prop-types';
import React from 'react';

import styles from './styles.css';

const TextInputView = ({ id, className, type, border, ...others }) => (
  <input
    className={`${className} ${styles.main}`}
    type={type}
    id={id}
    {...others}
  />
);

TextInputView.defaultProps = {
  type: 'text',
  id: '',
  className: '',
};

TextInputView.propTypes = {
  type: T.string,
  className: T.string,
  border: T.bool,
  id: T.string,
};

export default TextInputView;
