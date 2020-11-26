import React, { Component } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import '../styles/HistorialInmuebles.css'

class HistorialInmuebles extends Component {
  render() {
    return (
      <div className="HistorialInmuebles"> 
       <div className="head">
        <Header/>
        <h2>Mi Historial de Inmuebles</h2>
        </div>
        <div className="contenido">

        </div>
        <Footer/>
        
      </div>
    );
  }
}

export default HistorialInmuebles;
