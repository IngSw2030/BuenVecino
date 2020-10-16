import React, { Component } from "react";
import InmuebleMapa from "../components/InmuebleMapa"
import Mapa from "../components/Mapa"
import '../styles/BusquedaMapa.css';
import Controlador from '../../Controlador/Controlador'

class BusquedaMapa extends Component {
  render() {
    return (
          <div className="BusquedaMapa">
              <div className="Inmuebles">
                {
                    this.props.infoInmuebles.map( (obj, index) => {
                      return <InmuebleMapa info={obj} />
                    } )
                }
              </div>
            <Mapa infoInmuebles={this.props.infoInmuebles} centrar={this.props.centrar} zoom={this.props.zoom}/>
          </div>
    );
  }

  constructor(props){
    super()
  }
}

export default BusquedaMapa;