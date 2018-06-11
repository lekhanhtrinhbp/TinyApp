/*eslint react/prefer-stateless-function: 0 */
import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import GoogleMapReact from 'google-map-react';

const MyMarkder = ({ text }) => (
  <div>
    <Icon size="big" color="red" name="map marker alternate" />
    {text.split(',')[0]}
  </div>
);

class Map extends Component {
  render() {
    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLEMAP_KEY }}
        defaultCenter={{ lat: this.props.lat, lng: this.props.lng }}
        defaultZoom={12}
      >
        {this.props.result ? (
          this.props.result.map(item => (
            <MyMarkder
              lat={item.location.mapLat}
              lng={item.location.mapLong}
              text={item.location.address}
            />
          ))
        ) : (
          <MyMarkder
            lat={this.props.lat}
            lng={this.props.lng}
            text={this.props.address}
          />
        )}
      </GoogleMapReact>
    );
  }
}

export default Map;
