import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import '../styles/Mapa.css';
import Controlador from '../../Controlador/Controlador' 
import {Link} from 'react-router-dom'

const AnyReactComponent = ({ text,path } ) => {
  const [visible, setVisible] = React.useState(false)
  let url = "/inmueble/"+path
  return (
    <Link to={url}>
    <div className="marcador" 
      onMouseOver={
          (e)=>{
            setVisible(!visible)
          }
        }
        onMouseOut={
          (e)=>{
            setVisible(!visible)
          }
        }>
        {visible ? <p>{text}</p> : null}
      
      <button>
        <i class="fas fa-map-marker-alt"></i> 
      </button>
    </div>
    </Link>

 
  )
}

const MarcadorReactComponent = ({ text } ) => {
  return (
    <div className="propio" >
        <i className="fas fa-map-marker-alt"></i> 
    </div>
  )
}
    
    
class Mapa extends Component {
  
  /*static defaultProps = {
    coordenadas: {
      lat: 4.641055,
      lng: -74.086925
    },
    zoom: 12
  };*/
 
  _onClick = ({x, y, lat, lng, event}) => {
    if ( this.props.retornarCoordenadas !== undefined ){
      let obj = {
        lat:lat,
        lng:lng,
        text:"Tu Inmueble"
      }
      this.setState({buscar:true})
      this.setState({registro:obj})
      this.props.retornarCoordenadas( obj )
    }
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div className="Mapa">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDhsvsEHAbP4WIea6w7U4uXtnDQ9TmFooI' }}
          center={this.props.centrar}
          zoom={this.props.zoom}
          onClick={this._onClick}
        >
        {
          this.props.infoInmuebles.map( (obj, index) =>{
            return <AnyReactComponent
                lat={obj.ubicacion.latitud}
                lng={obj.ubicacion.longitud}
                text={obj.nombre}
                path={obj.idFirebase}
              />
       
            
          } )
        }
        {
            this.state.buscar === true ?

              
              <MarcadorReactComponent
                lat={this.state.registro.lat}
                lng={this.state.registro.lng}
                text={this.state.registro.text}
                className="propio"
              />
            :
            null
            
       
            
          
        }

        </GoogleMapReact>
      </div>
    );
  }

  constructor(props){
    super()
    this.state = {
			registro: {
        lat:null,
        lng:null,
        text:""
      },
      buscar:false,
    }
    
  }

  
  
}

export default Mapa;