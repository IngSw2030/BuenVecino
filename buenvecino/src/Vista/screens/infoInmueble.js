import React, { Component } from "react";
import HeaderInmueble from "../components/HeaderInmueble"
import DescripcionInmueble from "../components/DescripcionInmueble"
import DescripcionLugar from "../components/DescripcionLugar";
import Reservar from "../components/Reservar"
import ContactoArrendador from "../components/ContactoArrendador"
import ImagenesInmueble from "../components/ImagenesInmueble"
import Footer from "../components/Footer";
import "../styles/InfoInmueble.css"
class InfoInmueble extends Component {
  render() {
    return (
      <div className="InfoInmueble">
          <HeaderInmueble/>
          <ImagenesInmueble/>
          <div className="contenido">
          <DescripcionInmueble/>
          <div>
          <Reservar/>
          <div className="descripcion">
              <DescripcionLugar imagen={require('../assets/LogoHabitacion.png')} descripcion="Habitaciones - 1 "/>
              <DescripcionLugar imagen={require('../assets/LogoBano.png')} descripcion=" Baños - 1"/>
              <DescripcionLugar imagen={require('../assets/LogoCocina.png')} descripcion="Cocina Integral"/>
              <DescripcionLugar imagen={require('../assets/LogoInternet.png')} descripcion="Wifi - 5Mb"/>
          </div>
          <ContactoArrendador/>
          </div>
          </div>
          <Footer/>
      </div>
    );
  }
}

export default InfoInmueble;
