import T from 'prop-types';
import React from 'react';

import View from './View';

class TextInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  onChange(event) {
    if (!this.props.onChange) {
      return;
    }
    this.props.onChange(event);
  }
  render() {
    return <View {...this.props} onChange={this.onChange} />;
  }
}

TextInput.propTypes = {
  onChange: T.func,
};

export default TextInput;
