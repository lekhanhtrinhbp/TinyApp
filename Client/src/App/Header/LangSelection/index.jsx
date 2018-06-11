import React from "react";
import { Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import { changeLang } from "./../../../actions/header.js";

const options = [
  { key: "en", text: "EN", value: "en", flag: "us" },
  { key: "vi", text: "VI", value: "vi", flag: "vn" }
];

const LangSelection = props => (
  <div>
    <Dropdown
      options={options}
      fluid
      value={props.lang}
      onChange={(e, { value }) => props.changeLang(value)}
      style={{ border: "none", background: "transparent" }}
    />
  </div>
);

const mapStateToProps = ({ user }) => ({
  lang: user.lang
});

const mapDispatchToProps = dispatch => ({
  changeLang: lang => dispatch(changeLang(lang))
});

export default connect(mapStateToProps, mapDispatchToProps)(LangSelection);
