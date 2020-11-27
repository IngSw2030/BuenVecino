import React, { Component } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ModificarVivienda from "../components/ModificarVivienda";
import "../styles/ModificarInmueble.css"

class ModificarInmueble extends Component {
  render() {
    return (
      <div className="ModificarInmueble">
        <div className="head">
        <Header/>
        </div>
        <div className="contenido">
        <ModificarVivienda/>
        </div>

        <Footer/>
        
      </div>
    );
  }
}

export default ModificarInmueble;