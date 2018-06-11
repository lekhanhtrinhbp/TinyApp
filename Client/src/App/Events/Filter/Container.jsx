import T from 'prop-types';
import React from 'react';
import { browserHistory } from 'react-router';

import { getTime } from 'utils/datetime';
import translate from 'components/Translate';
import View from './View';

const urlUpdate = (name, value) => {
  const url = window.location.href;
  const urlString = new URL(url);
  urlString.searchParams.set(name, value);
  window.history.pushState(null, '', urlString);
}

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.searchOnEnter = this.searchOnEnter.bind(this);
    this.searchOnChange = this.searchOnChange.bind(this);
    this.locationOnChange = this.locationOnChange.bind(this);
    this.locationOnSearchChange = this.locationOnSearchChange.bind(this);
    this.categoryOnChange = this.categoryOnChange.bind(this);
    this.eventTypeOnChange = this.eventTypeOnChange.bind(this);
    this.dateOnChange = this.dateOnChange.bind(this);
    this.priceOnChange = this.priceOnChange.bind(this);
    this.state = {
      price: [
        {
          key: '',
          value: translate('all_price')
        },
        {
          key: 'PAID',
          value: translate('Paid')
        }
      ]
    }
  }

  componentWillMount() {
    this.props.searchEvents();
    this.props.category();
    this.props.eventType();
  }

  searchOnChange(e) {
    this.props.updateValue({
      search: e.target.value,
    });
  }

  locationOnSearchChange(e) {
    this.props.updateValue({
      location: e.target.value,
      locationId: null
    });
    this.props.locationSuggest(e.target.value);
  }

  locationOnChange(e, data) {
    this.props.updateValue({
      locationId: data.value,
      location: ''
    });
    this.props.searchEvents();
  }

  searchOnEnter(e) {
    e.preventDefault();
    if (e.keyCode === 13) {
      this.props.searchEvents();
    }
  }

  categoryOnChange(e) {
    this.props.updateValue({
      topicId: e.target.dataset.value,
    });
    this.props.searchEvents();
  }

  eventTypeOnChange(e) {
    this.props.updateValue({
      eventTypeId: e.target.dataset.value,
    });
    this.props.searchEvents();
  }

  dateOnChange(e) {
    this.props.updateValue({
      ...getTime(e.target.dataset.value),
      timeValue: e.target.dataset.value
    });
    this.props.searchEvents();
  }

  priceOnChange(e) {
    this.props.updateValue({
      ticketType: e.target.dataset.value,
    });
    this.props.searchEvents();
  }

  render() {
    return (<View
      {...this.state}
      {...this.props}
      locationFreeText={this.props.location}
      locationSuggestData={this.props.locationSuggestData}
      searchOnEnter={this.searchOnEnter}
      searchOnChange={this.searchOnChange}
      locationOnSearchChange={this.locationOnSearchChange}
      locationOnChange={this.locationOnChange}
      categoryOnChange={this.categoryOnChange}
      eventTypeOnChange={this.eventTypeOnChange}
      dateOnChange={this.dateOnChange}
      priceOnChange={this.priceOnChange}
    />);
  }
}

export default Container;
