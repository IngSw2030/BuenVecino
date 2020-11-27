import React, { Component } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import RegistrarVivienda from '../components/RegistrarVivienda'
import '../styles/RegistrarInmueble.css'

class RegistrarInmueble extends Component {
  render() {
    return (
      <div className="RegistrarInmueble">
        <div className="head">
        <Header/>
        </div>
        <div className="contenido">
        <RegistrarVivienda/>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default RegistrarInmueble;