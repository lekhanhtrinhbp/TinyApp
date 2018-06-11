import React from "react";
import T from "prop-types";

import View from "./View";

class Evaluate extends React.Component {
  constructor(props) {
    super(props);
    this.getRating = this.getRating.bind(this);
    this.onChange = this.onChange.bind(this);
    this.submitEvaluate = this.submitEvaluate.bind(this);
    this.cancelFunc = this.cancelFunc.bind(this);
  }

  onChange(e) {
    let s = this.state;
    if (s) {
      s.comment = e.target.value;
    } else {
      s = { comment: e.target.value };
    }
    this.setState(s);
  }
  getRating(rating, label, event) {
    let s = this.state;
    if (s) {
      s.rating = rating;
    } else {
      s = { rating };
    }
    this.setState(s);
  }
  submitEvaluate(evaluateInfo) {
    this.props.submitEvaluate(evaluateInfo);
  }
  cancelFunc() {
    this.props.cancelFunc(-1);
  }
  render() {
    return (
      <View
        {...this.state}
        {...this.props}
        getRating={this.getRating}
        onChange={this.onChange}
        submitEvaluate={this.submitEvaluate}
        cancelFunc={this.cancelFunc}
      />
    );
  }
}

Evaluate.propTypes = {
  eventId: T.number,
  rating: T.number,
  comment: T.string,
  cancelFunc: T.func,
  submitEvaluate: T.func.isRequired
};

export default Evaluate;
