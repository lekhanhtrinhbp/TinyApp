import T from 'prop-types';
import React from 'react';

import styles from './styles.css';

const Button = ({ type, style, children, ...other }) => {
  return (
    <button type={type} className={`${styles.button} ${style}`} {...other}>
      {children}
    </button>
  );
};

Button.propTypes = {
  type: T.string,
  children: T.node,
  style: T.string,
};

Button.defaultProps = {
  type: 'button',
  style: '',
};

export default Button;
