import T from 'prop-types';
import React from 'react';

import View from './View';

class Accordion extends React.Component {
  constructor(props) {
    super(props);
    this.expand = this.expand.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      isExpand: this.props.isExpand,
      selectItem: undefined,
    };
  }

  onChange(event) {
    this.props.onChange(event);
    this.setState({ selectItem: event.target.dataset.value });
  }

  expand() {
    this.setState({
      isExpand: !this.state.isExpand,
    });
  }

  render() {
    return (
      <View
        {...this.props}
        {...this.state}
        expand={this.expand}
        onChange={this.onChange}
      />
    );
  }
}

Accordion.defaultProps = {
  header: '',
  isExpand: false,
  value: '',
  onChange: () => {},
  data: [],
};

View.propTypes = {
  Accordion: T.string,
  isExpand: T.bool,
  value: T.oneOfType([T.string, T.number]),
  onChange: T.func,
  data: T.arrayOf(T.object),
};

export default Accordion;
