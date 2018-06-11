import T from 'prop-types';
import React from 'react';

import PopularEvents from './View';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.onNextClick = this.onNextClick.bind(this);
    this.onBackClick = this.onBackClick.bind(this);
  }

  componentWillMount() {
    this.props.getPopularEvents();
  }

  onNextClick() {
    this.props.nextPopularEvents();
  }

  onBackClick() {
    this.props.backPopularEvents();
  }

  render() {
    return (
      <PopularEvents
        {...this.state}
        {...this.props}
        onNextClick={this.onNextClick}
        onBackClick={this.onBackClick}
      />
    );
  }
}

Container.propTypes = {
};

export default Container;
