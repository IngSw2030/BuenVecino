import React, { Component } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import RegistrarVivienda from '../components/RegistrarVivienda'

class RegistrarInmueble extends Component {
  render() {
    return (
      <div>
        <Header/>
        <RegistrarVivienda/>
        <Footer/>
      </div>
    );
  }
}

export default RegistrarInmueble;