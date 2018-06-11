import React from "react";
import T from "prop-types";
import View from "./View";

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.typeClick = this.typeClick.bind(this);
    this.handlePreviewEvaluate = this.handlePreviewEvaluate.bind(this);
    this.submitEvaluate = this.submitEvaluate.bind(this);
    this.onPagingEventsClick = this.onPagingEventsClick.bind(this);
  }

  componentWillMount() {
    this.props.getEvents();
  }

  onPagingEventsClick(page) {
    this.props.getEvents(page);
  }

  typeClick(type) {
    this.props.changeType(type);
    this.props.getEvents();
  }

  handlePreviewEvaluate(id) {
    this.setState({ isEvaluate: id });
  }

  submitEvaluate(evaluateInfo) {
    this.props.submitEvaluate(evaluateInfo);
    this.handlePreviewEvaluate(-1);
  }
  render() {
    return (
      <View
        {...this.state}
        {...this.props}
        onPagingEventsClick={this.onPagingEventsClick}
        typeClick={this.typeClick}
        handlePreviewEvaluate={this.handlePreviewEvaluate}
        submitEvaluate={this.submitEvaluate}
      />
    );
  }
}

Container.propTypes = {
  getEvent: T.func.isRequired,
  changeEvent: T.func.isRequired,
  handlePreview: T.func.isRequired,
  evaluateInfo: {
    comment: T.string,
    rating: T.number
  }
};

export default Container;
