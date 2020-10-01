import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import '../styles/Mapa.css';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class Mapa extends Component {
  static defaultProps = {
    center: {
      lat: 4,
      lng: -74
    },
    zoom: 11
  };
 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div className="Mapa">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDhsvsEHAbP4WIea6w7U4uXtnDQ9TmFooI' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={4}
            lng={-74}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default Mapa;