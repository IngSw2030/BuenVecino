import React, { Component } from "react";
import '../styles/HeaderInmueble.css';

class HeaderInmueble extends Component {
  render() {
    return (
      <div className="HeaderInmueble">
         <img src={require('../assets/Logo.png')} alt="Logo de la pagina"/> 
      </div>
    );
  }
}

export default HeaderInmueble;