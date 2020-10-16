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
                    this.state.inmueblesInicio.map( (obj, index) => {
                      return <InmuebleMapa info={obj} />
                    } )
                }
                  {/*<InmuebleMapa/>
                  <InmuebleMapa/>
                  <InmuebleMapa/>*/}
              </div>
            <Mapa/>
          </div>
    );
  }

  constructor(props){
    super()
    this.state = {
      inmueblesInicio : []
    }
    this.cargarInmueblesIniciales()
  }

  async cargarInmueblesIniciales(){
    let controlador = Controlador.getControlador()
    let inmIniciales = await controlador.buscarInmueblesIniciales(3)
    this.setState({
      inmueblesInicio : inmIniciales
    })
  }

}

export default BusquedaMapa;