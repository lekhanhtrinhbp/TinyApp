import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import {
  Segment,
  Grid,
  Form,
  Search,
  Icon,
  Input,
  Dropdown
} from "semantic-ui-react";
import translate from "components/Translate";

import TranslateTag from "../../../components/TranslateTag";
import MyMapComponent from "../GoogleMap";
import styles from "./styles.css";

const Location = props => {
  const {
    locationSearch,
    locationName,
    houseNumber,
    street,
    ward,
    district,
    citySearch,
    country,
    address,
    errorMessage,
    latitude,
    longitude,
    isGeocoding
  } = props;
  return (
    <div>
      <Grid.Row>
        <Grid.Column>
          <Form>
            <Form.Field>
              <PlacesAutocomplete
                value={props.locationAddress ? props.locationAddress : address}
                onChange={props.handleLocationPlacesChange}
                onSelect={props.handleLocationPlacesSelect}
              >
                {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                  <div>
                    <input
                      {...getInputProps({
                        placeholder: translate("select-for-a-venue-or-address"),
                        className: styles.inputSearch
                      })}
                    />
                    {props.locationAddress ? null :
                    <div className="autocomplete-dropdown-container">
                      {suggestions.map(suggestion => {
                        const className = suggestion.active
                          ? "suggestion-item--active"
                          : "suggestion-item";
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? { backgroundColor: "#fafafa", cursor: "pointer" }
                          : { backgroundColor: "#ffffff", cursor: "pointer" };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>}
                  </div>
                )}
              </PlacesAutocomplete>
              {/* <Search
                className={styles.input}
                placeholder={translate('select-for-a-venue-or-address')}
                loading={props.locationSearch.isSearching}
                onResultSelect={props.handleLocationSelect}
                onSearchChange={props.handleLocationSearch}
                results={props.locationSearch.results}
                value={locationSearch.value}
              /> */}
              {/* <a
                href="#"
                onClick={props.handleAddAddress}
                className={styles.link}
              >
                <Icon name="map marker alternate" />
                <TranslateTag lblKey="enter-address" />
              </a> */}
            </Form.Field>
          </Form>
        </Grid.Column>
      </Grid.Row>
      <Grid columns={1}>
        <Grid.Row>
          {/* <Grid.Column>
            <a
              href="#"
              onClick={props.handleAddAddress}
              className={styles.link}
            >
              <Icon name="map marker alternate" />
              <TranslateTag lblKey="enter-address" />
            </a>
          </Grid.Column> */}
          <Grid.Column>
            <a
              href="#"
              onClick={props.handleLocationPlacesCloseClick}
              className={styles.link}
            >
              <Icon name="delete" />
              <TranslateTag lblKey="clear-address" />
            </a>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <br />
      {props.isMobile ? null : (
        <Grid.Row>
          <Grid.Column>
            <Segment className={styles.mapLocation}>
              <MyMapComponent
                lat={latitude !== null ? latitude : 10.795695}
                lng={longitude !== null ? longitude : 106.707885}
                address={props.locationAddress ? props.locationAddress : "LuciTree Office"}
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      )}
    </div>
    // <div>
    //   <Grid.Row>
    //     <Grid.Column>
    //       <Form>
    //         <Form.Field className={styles.addLocation}>
    //           <Input
    //             className={styles.input}
    //             placeholder={translate("location-name")}
    //             name="locationName"
    //             onChange={props.handleChange}
    //             value={locationName}
    //           />
    //           <Input
    //             className={styles.input}
    //             placeholder={translate("address")}
    //             name="houseNumber"
    //             onChange={props.handleChange}
    //             value={houseNumber}
    //           />
    //           <Input
    //             className={styles.input}
    //             placeholder={translate("street")}
    //             name="street"
    //             onChange={props.handleChange}
    //             value={street}
    //           />
    //           <Input
    //             className={styles.input}
    //             placeholder={translate("ward")}
    //             name="ward"
    //             onChange={props.handleChange}
    //             value={ward}
    //           />
    //           <Input
    //             className={styles.input}
    //             placeholder={translate("district")}
    //             name="district"
    //             onChange={props.handleChange}
    //             value={district}
    //           />
    //           {/* <Search
    //             className={styles.input}
    //             placeholder={translate("City")}
    //             icon="load"
    //             loading={props.citySearch.isSearching}
    //             onResultSelect={props.handleCitySelect}
    //             onSearchChange={props.handleCitySearch}
    //             results={props.citySearch.results}
    //             value={citySearch.value || props.city.value}
    //           /> */}
    //           <Dropdown
    //             className={styles.dropdown}
    //             fluid
    //             name="countryKey"
    //             placeholder={translate("select-your-country")}
    //             selection
    //             search
    //             options={props.countryOption.countries}
    //             onChange={props.handleSelect}
    //             text={country.value || props.country.value}
    //           />
    //           <a
    //             href="#"
    //             onClick={props.handleAddAddress}
    //             className={styles.link}
    //           >
    //             <TranslateTag lblKey="reset-location" />
    //           </a>
    //         </Form.Field>
    //       </Form>
    //     </Grid.Column>
    //   </Grid.Row>
    //   <br />
    //   {props.isMobile ? null : (
    //     <Grid.Row>
    //       <Grid.Column>
    //         <Segment style={{ height: `48vh`, width: `100%` }}>
    //           <MyMapComponent
    //             lat={latitude !== null ? latitude : props.mapLat}
    //             lng={longitude !== null ? longitude : props.mapLong}
    //             address={address !== "" ? address : props.locationAddress}
    //           />
    //         </Segment>
    //       </Grid.Column>
    //     </Grid.Row>
    //   )}
    // </div>
  );
};

export default Location;
