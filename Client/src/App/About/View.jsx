import T from 'prop-types';
import React from 'react';

import Button from 'components/Button';
import Input from 'components/Input';

class About extends React.Component {
  constructor(props) {
    super(props);
    this.load = this.load.bind(this);
    this.change = this.change.bind(this);
    this.state = { localState: 'This text will be change base on input' };
  }

  load() {
    this.props.fetchAboutData();
  }

  change(value) {
    this.setState({ localState: value });
  }

  render() {
    return (
      <div>
        {this.props.about.message};
        <Button onClick={this.load}>Click on this button to load data</Button>
        <span>Input change goes here: {this.state.localState}</span>
        <Input value={this.state.localState} onChange={this.change} />
      </div>
    );
  }
}

About.propTypes = {
  fetchAboutData: T.func.isRequired,
  about: T.shape({
    message: T.string,
  }),
};

export default About;
