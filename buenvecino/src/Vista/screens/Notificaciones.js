import React, { Component } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import '../styles/Notificaciones.css'

class Notificaciones extends Component {
  render() {
    return (
      <div className="Notificaciones"> 
       <div className="head">
        <Header/>
        <h2>Mis Notificaciones</h2>
        </div>
        <div className="contenido">

        </div>
        <Footer/>
        
      </div>
    );
  }
}

export default Notificaciones;
