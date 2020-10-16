import React, { Component } from "react";
import HeaderInmueble from "../components/HeaderInmueble"
import DescripcionInmueble from "../components/DescripcionInmueble"
import DescripcionLugar from "../components/DescripcionLugar";
import Reservar from "../components/Reservar"
import ContactoArrendador from "../components/ContactoArrendador"
class InfoInmueble extends Component {
  render() {
    return (
      <div>
          <HeaderInmueble/>
          <DescripcionInmueble/>
          <div>
          <Reservar/>
          <div>
              <DescripcionLugar/>
              <DescripcionLugar/>
              <DescripcionLugar/>
              <DescripcionLugar/>
          </div>
          <ContactoArrendador/>
          </div>
          
      </div>
    );
  }
}

export default InfoInmueble;
