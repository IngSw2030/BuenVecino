import React, { Component } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import '../styles/HistorialPago.css'

class HistorialPago extends Component {
  render() {
    return (
      <div className="HistorialPago"> 
       <div className="head">
        <Header/>
        <h2>Historial de Pagos</h2>
        </div>
        <div className="contenido">

        </div>
        <Footer/>
        
      </div>
    );
  }
}

export default HistorialPago;
