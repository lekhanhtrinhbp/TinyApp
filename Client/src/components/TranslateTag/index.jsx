import React from "react";
import T from "prop-types";
import { connect } from "react-redux";

import vi from "./../Translate/vi.json";
import en from "./../Translate/en.json";

const language = {
  vi,
  en
};

const translate = (lang, key, template) => {
  const values = language[lang];
  const text = values[key];
  if (!template) return values[key] ? text : key;
  return template.map((t, i) => text.replace(new RegExp(`{{ ${i} }}`, "g"), t));
};

const TranslateTag = props => (
  <span
    style={{
      color: props.color,
      fontWeight: props.fontWeight ? props.fontWeight : "normal"
    }}
  >
    {translate(props.user.lang, props.lblKey)}
  </span>
);

const mapStateToProps = ({ user }) => ({
  user
});

TranslateTag.propTypes = {
  user: T.shape(),
  lblKey: T.string
};

export default connect(mapStateToProps, null)(TranslateTag);
