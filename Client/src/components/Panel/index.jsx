import T from 'prop-types';
import React from 'react';

import styles from './styles.css';

const Panel = (props) => (
  <div className={`${styles.main} ${props.className}`}>
    {props.children}
  </div>
);

Panel.propTypes = {
  children: T.node.isRequired,
  className: T.string,
};

Panel.defaultProps = {
  className: '',
};

export default Panel;
