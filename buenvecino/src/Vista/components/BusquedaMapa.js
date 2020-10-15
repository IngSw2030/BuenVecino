import React, { Component } from "react";
import InmuebleMapa from "../components/InmuebleMapa"
import Mapa from "../components/Mapa"
import '../styles/BusquedaMapa.css';

class BusquedaMapa extends Component {
  render() {
    return (
          <div className="BusquedaMapa">
              <div className="Inmuebles">
                  <InmuebleMapa/>
                  <InmuebleMapa/>
                  <InmuebleMapa/>
              </div>
            <Mapa/>
          </div>
    );
  }
}

export default BusquedaMapa;