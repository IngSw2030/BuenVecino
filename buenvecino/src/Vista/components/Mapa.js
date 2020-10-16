import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import '../styles/Mapa.css';
import Controlador from '../../Controlador/Controlador' 
 
const AnyReactComponent = ({ text }) => <div className="marcador" onMouseOver={(e)=>mostrarTexto(e,this)}> <p>{text}</p><button><i class="fas fa-map-marker-alt"></i> </button></div>;
 
class Mapa extends Component {
  /*static defaultProps = {
    coordenadas: {
      lat: 4.641055,
      lng: -74.086925
    },
    zoom: 12
  };*/
 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div className="Mapa">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDhsvsEHAbP4WIea6w7U4uXtnDQ9TmFooI' }}
          center={this.props.centrar}
          zoom={this.props.zoom}
        >
        {
          this.props.infoInmuebles.map( (obj, index) =>{
            return <AnyReactComponent
                lat={obj.ubicacion.latitud}
                lng={obj.ubicacion.longitud}
                
                text="My Marker"
                
              />
          } )
        }          
        </GoogleMapReact>
      </div>
    );
  }

  constructor(props){
    super()
  }

  
  
}

function mostrarTexto(e,props){
  console.log(" gonorrea")
  console.log(e)
  console.log(props)
  
}

export default Mapa;