import React, { Component } from "react";
import HeaderMapas from "../components/HeaderMapas"
import BusquedaMapa from "../components/BusquedaMapa"
import Footer from "../components/Footer"
import Controlador from '../../Controlador/Controlador'

class Mapas extends Component {
  render() {
    return (
      <div>
          <HeaderMapas actualizarEstado= {this.actualizarBusquedaInmuebles}/>
          <BusquedaMapa infoInmuebles={this.state.infoInmuebles} centrar={this.state.centrar} zoom={this.state.zoom} />
          <Footer/>
      </div>
    );
  }

  constructor(props){
    super()
    this.state = {
      infoInmuebles : [],
      centrar : {lat: 4.641055, lng: -74.086925},
      zoom: 12
    }
    this.actualizarBusquedaInmuebles = this.actualizarBusquedaInmuebles.bind(this)
    this.cargarInmueblesIniciales()
  }

  async cargarInmueblesIniciales(){
    let controlador = Controlador.getControlador()
    let inmIniciales = await controlador.buscarInmueblesIniciales(7)
    this.setState({
      infoInmuebles : inmIniciales
    })
  }

  async actualizarBusquedaInmuebles(busqueda, coordenadasMapa, busquedaExitosa){
    let controlador = Controlador.getControlador()
    let resBusqueda = await controlador.buscarInmueblePorBarrioLocalidad(busqueda)
    let zoom = 15
    if( busqueda.trim() === "" ){
      resBusqueda = await controlador.buscarInmueblesIniciales(11)
      coordenadasMapa = this.obtenerCoordenadasPromedioInmuebles(resBusqueda)
      zoom = 13
    }
    else if ( !busquedaExitosa ){
      if ( resBusqueda.length > 0 ){
        coordenadasMapa = this.obtenerCoordenadasPromedioInmuebles(resBusqueda)
      }
      else{
        zoom = 11
      }      
    }
    this.setState({
      infoInmuebles : resBusqueda,
      centrar : coordenadasMapa,
      zoom : zoom
    })
  }

  obtenerCoordenadasPromedioInmuebles(inmuebles){
    let promLon = 0
    let promLat = 0
    for(let i=0; i<inmuebles.length; i++){
      promLat += inmuebles[i].ubicacion.latitud
      promLon += inmuebles[i].ubicacion.longitud
    }
    return {
      lat : (promLat)/inmuebles.length,
      lng : (promLon)/inmuebles.length
    }
  }
}

export default Mapas;