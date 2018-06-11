import T from "prop-types";
import React from "react";
import { browserHistory } from "react-router";
import MyLoader from "components/Placeholder";
import TranslateTag from "./../../../components/TranslateTag";

import styles from "./styles.css";

const Item = props => (
  <div
    className={styles.item}
    onClick={e => props.onClick(e, props.id)}
    role="presentation"
  >
    <div
      className={styles.background}
      style={{
        backgroundImage: `url(${props.bannerUrl})`,
        backgroundPosition: props.id === 7 ? "bottom" : "center"
      }}
    >
      <h2 className={styles.name}>{props.name}</h2>
    </div>
  </div>
);

Item.propTypes = {
  name: T.string.isRequired,
  img: T.string.isRequired
};

class View extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  componentWillMount() {
    this.props.browseCategories();
  }

  onClick(e, value) {
    this.props.updateValue({
      topicId: value
    });
    browserHistory.push("/events");
  }

  render() {
    const { topCategories } = this.props;
    return (
      <div>
        <h1 className={styles.title}>
          <TranslateTag lblKey="categories" />
        </h1>
        {topCategories.length === 0 ? (
          <MyLoader />
        ) : (
          <div className={styles.content}>
            {topCategories.map(item => (
              <Item {...item} key={Math.random()} onClick={this.onClick} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

Item.propTypes = {
  onClick: T.func.isRequired,
  bannerUrl: T.string
};

View.propTypes = {
  browseCategories: T.func.isRequired,
  updateValue: T.func.isRequired
  // topCategories: T.shape(),
};

Item.propTypes = {
  id: T.number
};

export default View;
