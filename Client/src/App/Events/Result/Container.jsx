import T from 'prop-types';
import React from 'react';

import View from './View';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.remove = this.remove.bind(this);
    this.selectPage = this.selectPage.bind(this);
  }

  nextPage() {
    if (!this.props.lastPage) {
      this.props.updateValue({
        page: this.props.page + 1
      });
      this.props.searchEvents();
    }
  }

  previousPage() {
    if (!this.props.firstPage) {
      this.props.updateValue({
        page: this.props.page - 1
      });
      this.props.searchEvents();
    }
  }

  selectPage(num) {
    this.props.updateValue({
      page: num
    });
    this.props.searchEvents();
  }

  remove(e, name) {
    if (name === 'timeValue') {
      this.props.remove('fromDate');
      this.props.remove('toDate');
      this.props.remove('timeValue');
    } else {
      this.props.remove(name);
    }
    this.props.searchEvents();
  }

  render() {
    return (<View
      {...this.props}
      nextPage={this.nextPage}
      previousPage={this.previousPage}
      remove={this.remove}
      selectPage={this.selectPage}
    />);
  }
}

export default Container;
