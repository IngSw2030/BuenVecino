import React, { Component } from "react";
import "../styles/Footer.css";

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <div className="Contacto">
          <img src={require("../assets/Logo.png")} alt="" />
          <h4>Contacto</h4>
          <h4>Anuncia tu propiedad</h4>
          <h4>Universidad Javeriana 2020</h4>
          <p>Hecho con ♥ en Bogotá</p>
        </div>
        <div className="Suscripcion">
          <h4>Nuestras redes sociales</h4>
          <a href="https://www.facebook.com/" target="blank"><i className="fab fa-facebook-square"></i></a>
          <a href="https://github.com/IngSw2030/BuenVecino" target="blank"><i className="fab fa-github"></i></a>
        </div>
      </div>
    );
  }
}

export default Footer;
