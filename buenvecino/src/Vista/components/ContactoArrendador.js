import React, { Component } from "react";
import "../styles/ContactoArrendador.css"

class ContactoArrendador extends Component {
  render() {
    return (
      <div className="ContactoArrendador">
        <h3>¿Tienes dudas?, contacta al arrendador</h3>
        <div className="logos">
          <div>
          <img src={require('../assets/chat.png')} alt="Logo de la pagina"/>
          <h3>Chat</h3>

          </div>
          <div>
          <img src={require('../assets/telefono.png')} alt="Logo de la pagina"/>
          <h3>Teléfono</h3>

          </div>
        </div>
      </div>
    );
  }
}

export default ContactoArrendador;