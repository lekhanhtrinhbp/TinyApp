/* eslint-disable global-require */
import React from "react";
import T from "prop-types";
import { Dropdown, Icon } from "semantic-ui-react";
import { TIME_OPTIONS_1 } from "utils/datetime";
import Button from "components/Button";
import Input from "components/Input";
import translate from "components/Translate";
import styles from "./styles.css";
import TranslateTag from "./../../../components/TranslateTag";

const bgImage = require("../../../images/search-background.png");

const Search = props => (
  <div
    className={styles.main}
    style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center"
    }}
  >
    {/* <Image className={styles.banner} src={bgImage} /> */}

    <div className={styles.searchSection}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>
          <TranslateTag lblKey="find-next" />
        </h1>
      </div>

      <div className={styles.subTitleContainer}>
        <h3 className={styles.subTitle}>
          <TranslateTag lblKey="sub-find-next" />
        </h3>
      </div>

      <div className={styles.field}>
        <Input
          className={styles.search}
          onKeyUp={props.searchByEnter}
          onChange={props.searchOnChange}
          value={props.search}
          placeholder={translate("search-placehoder")}
        />
        <Dropdown
          search={value => value}
          selection
          className={styles.dropdown}
          placeholder={translate("city-location")}
          options={props.locationSuggest}
          onSearchChange={props.locationOnSearchChange}
          onChange={props.locationOnChange}
          onClick={() =>
            props.updateValue({
              locationId: null,
              location: ""
            })
          }
          onKeyUp={props.searchByEnter}
          selectOnBlur={false}
          value={props.locationId || props.locationFreeText}
          text={
            props.locationId
              ? props.locationSuggest.filter(
                  item => item.id === props.locationId
                )[0]
              : props.locationFreeText
          }
        />
        <Dropdown
          className={styles.dropdown}
          defaultValue="ALL_DAY"
          selection
          options={TIME_OPTIONS_1}
          onChange={props.timeOnChange}
        />
        <Button onClick={props.searchClick} className={styles.button}>
          <Icon name="search" />
        </Button>
      </div>
    </div>
  </div>
);

Search.propTypes = {
  searchByEnter: T.func.isRequired,
  searchClick: T.func.isRequired,
  searchOnChange: T.func.isRequired,
  locationOnChange: T.func.isRequired,
  locationOnSearchChange: T.func.isRequired,
  timeOnChange: T.func.isRequired,
  search: T.string,
  location: T.string,
  locationSuggest: T.arrayOf(T.object)
};

export default Search;
