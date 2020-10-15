import React, { Component } from "react";
import HeaderMapas from "../components/HeaderMapas"
import BusquedaMapa from "../components/BusquedaMapa"
import Footer from "../components/Footer"

class Mapas extends Component {
  render() {
    return (
      <div>
          <HeaderMapas/>
          <BusquedaMapa/>
          <Footer/>
      </div>
    );
  }
}

export default Mapas;