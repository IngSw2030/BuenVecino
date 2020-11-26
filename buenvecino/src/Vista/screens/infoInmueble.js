import React, { Component } from "react";
import Header from "../components/Header"
import DescripcionInmueble from "../components/DescripcionInmueble"
import DescripcionLugar from "../components/DescripcionLugar";
import Reservar from "../components/Reservar"
import ContactoArrendador from "../components/ContactoArrendador"
import ImagenesInmueble from "../components/ImagenesInmueble"
import Footer from "../components/Footer";
import logo1 from '../assets/LogoHabitacion.png'
import logo2 from '../assets/LogoBano.png'
import logo3 from '../assets/LogoCocina.png'
import logo4 from '../assets/LogoInternet.png'
import "../styles/InfoInmueble.css"
class InfoInmueble extends Component {
  render() {
    return (
      <div className="InfoInmueble">
        <div className="headerMapa">
          <Header/>
        </div>
          <ImagenesInmueble/>
          <div className="contenido">
          <DescripcionInmueble/>
          <div>
          <Reservar/>
          <div className="descripcion">
              <DescripcionLugar imagen={logo1} descripcion="Habitaciones - 1 "/>
              <DescripcionLugar imagen={logo2} descripcion=" Baños - 1"/>
              <DescripcionLugar imagen={logo3} descripcion="Cocina Integral"/>
              <DescripcionLugar imagen={logo4} descripcion="Wifi - 5Mb"/>
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
