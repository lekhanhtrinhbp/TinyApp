import T from 'prop-types';
import React from 'react';

import Input from 'components/Input';
import { Dropdown } from 'semantic-ui-react';
import translate from 'components/Translate';
import { TIME_OPTIONS_2 } from 'utils/datetime';

import Accordion from './Accordion';
import styles from './styles.css';
import TranslateTag from './../../../components/TranslateTag';
import MyMapComponent from './../../CreateEvent/GoogleMap';

const View = props => (
  <div className={styles.main}>
    {/* <div>Map goes here</div> */}
    <div style={{ height: `30vh`, width: `100%` }}>
      {props.loading || props.emptyResult || props.searchResult.length === 0 ? (
        <MyMapComponent
          lat={10.795695}
          lng={106.707885}
          address="LuciTree Office"
        />
      ) : (
        <MyMapComponent
          result={props.searchResult}
          lat={props.searchResult[0].location.mapLat}
          lng={props.searchResult[0].location.mapLong}
          address={props.searchResult[0].location.address}
        />
      )}
    </div>
    <Input
      className={styles.search}
      value={props.search}
      placeholder={translate('search-placehoder')}
      onChange={props.searchOnChange}
      onKeyUp={props.searchOnEnter}
    />
    <Dropdown
      search={value => value}
      selection
      className={styles.dropdown}
      placeholder={translate('city-location')}
      options={props.locationSuggestData}
      value={props.locationId || props.locationFreeText}
      onClick={() =>
        props.updateValue({
          locationId: null,
          location: '',
        })
      }
      onSearchChange={props.locationOnSearchChange}
      onChange={props.locationOnChange}
      onKeyUp={props.searchByEnter}
      selectOnBlur={false}
      text={
        props.locationId
          ? props.locationSuggestData.filter(
              item => item.id === props.locationId
            )[0]
          : props.locationFreeText
      }
    />
    <div className={styles.accordion}>
      <Accordion
        header={<TranslateTag lblKey="category" />}
        data={props.categoryList}
        onChange={props.categoryOnChange}
        value={props.topicId}
        key="category"
      />
    </div>
    <div className={styles.accordion}>
      <Accordion
        header={<TranslateTag lblKey="event-type" />}
        data={props.eventTypeList}
        onChange={props.eventTypeOnChange}
        value={props.eventTypeId}
        key="type"
      />
    </div>
    <div className={styles.accordion}>
      <Accordion
        header={<TranslateTag lblKey="date" />}
        data={TIME_OPTIONS_2}
        onChange={props.dateOnChange}
        value={props.timeValue}
        key="date"
      />
    </div>
    <div className={styles.accordion}>
      <Accordion
        header={<TranslateTag lblKey="price" />}
        data={props.price}
        onChange={props.priceOnChange}
        value={props.ticketType}
        key="price"
      />
    </div>
  </div>
);

export default View;
