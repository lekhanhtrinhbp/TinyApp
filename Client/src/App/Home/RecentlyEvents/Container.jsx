import T from 'prop-types';
import React from 'react';

import RecentlyEvents from './View';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.onNextClick = this.onNextClick.bind(this);
    this.onBackClick = this.onBackClick.bind(this);
  }

  componentWillMount() {
    this.props.getRecentlyEvents();
  }

  onNextClick() {
    this.props.nextRecentlyEvents();
  }

  onBackClick() {
    this.props.backRecentlyEvents();
  }

  render() {
    return (
      <RecentlyEvents
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
