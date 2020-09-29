import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div>
        <div>
          <img src={require("../assets/Logo.png")} alt="" />
          <h4>Contacto</h4>
          <h4>Anuncia tu propiedad</h4>
          <h4>Universidad Javeriana 2020</h4>
          <h4>Hecho con en Bogotá</h4>
        </div>
        <div>
          <h4>Suscribete</h4>
          <input type="email" />
          <h4>Nuestras redes sociales</h4>
          <a href="https://www.facebook.com/" target="blank"><i class="fab fa-facebook-square"></i></a>
          <a href="https://github.com/IngSw2030/BuenVecino" target="blank"><i class="fab fa-github"></i></a>
        </div>
      </div>
    );
  }
}

export default Footer;
