import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import '../styles/Mapa.css';
import Controlador from '../../Controlador/Controlador' 
 
const AnyReactComponent = ({ text }) => <div> <button><i class="fas fa-map-marker-alt"></i> </button></div>;
 
class Mapa extends Component {
  static defaultProps = {
    center: {
      lat: 4.641055,
      lng: -74.086925
    },
    zoom: 12
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
        {
          this.state.infoInmuebles.map( (obj, index) =>{
            console.log(obj.ubicacion.latitud)
            console.log("JAJAJ")
            return <AnyReactComponent
                lat={obj.ubicacion.latitud}
                lng={obj.ubicacion.longitud}
                text="My Marker"
              />
          } )
        }
          {/*<AnyReactComponent
            lat={4.641055}
            lng={-74.086925}
            // text="My Marker"
          />*/}
          
        </GoogleMapReact>
      </div>
    );
  }

  constructor(props){
    super()
    this.state = {
      infoInmuebles : []
    }
    
  }

  componentDidMount(){
    this.cargarInmueblesIniciales()
  }
  async cargarInmueblesIniciales(){
    let controlador = Controlador.getControlador()
    let inmIniciales = await controlador.buscarInmueblesIniciales(3)
    this.setState({
      infoInmuebles : inmIniciales
    })
    console.log("FINISHED")
  }
  
}
 
export default Mapa;