import T from "prop-types";
import React from "react";
import { browserHistory } from "react-router";
import { getTime } from "utils/datetime";

import Search from "./View";

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.searchByEnter = this.searchByEnter.bind(this);
    this.searchClick = this.searchClick.bind(this);
    this.searchOnChange = this.searchOnChange.bind(this);
    this.locationOnChange = this.locationOnChange.bind(this);
    this.locationOnSearchChange = this.locationOnSearchChange.bind(this);
    this.timeOnChange = this.timeOnChange.bind(this);
  }

  componentWillMount() {
    this.props.updateValue({
      search: "",
      locationId: null,
      location: "",
      searchResult: [],
      eventTypeId: null,
      timeValue: null,
      topicId: null,
      ticketType: null,
      fromDate: "",
      toDate: ""
    });
    this.props.locationSuggest();
  }

  searchOnChange(e) {
    this.props.updateValue({
      search: e.target.value
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
      location: ""
    });
  }

  timeOnChange(e, d) {
    e.preventDefault();
    this.props.updateValue({ ...getTime(d.value), timeValue: d.value });
  }

  searchByEnter(e) {
    if (e.keyCode === 13) {
      this.props.searchEvents();
      browserHistory.push("/events");
    }
  }

  searchClick() {
    this.props.searchEvents();
    browserHistory.push("/events");
  }

  render() {
    return (
      <Search
        {...this.state}
        locationId={this.props.home.locationId}
        updateValue={this.props.updateValue}
        locationFreeText={this.props.home.location}
        locationSuggest={this.props.home.locationSuggest}
        searchByEnter={this.searchByEnter}
        searchClick={this.searchClick}
        searchOnChange={this.searchOnChange}
        locationOnSearchChange={this.locationOnSearchChange}
        locationOnChange={this.locationOnChange}
        timeOnChange={this.timeOnChange}
      />
    );
  }
}

Container.propTypes = {
  searchEvents: T.func.isRequired,
  home: T.shape({
    locationSuggest: T.array
  })
};

export default Container;
