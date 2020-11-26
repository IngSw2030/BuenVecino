import React, { Component } from "react";
import Mensaje from "../components/Mensaje";
import Contacto from "../components/Contacto";
import Footer from "../components/Footer";
import Header from "../components/Header";
import '../styles/Chat.css'

class Chat extends Component {
  render() {
    return (
      <div className="Chat">
        <div className="head">
          <Header />
          <h2>Mis Chats</h2>
        </div>
        <div className="contenido">
          <div className="listaCon">
            <h2>Contactos</h2>
            <div className="contactos">
              <Contacto />
              <Contacto />
              <Contacto />
              <Contacto />
            </div>
          </div>
          <div className="mensajes">
            <Mensaje/>
            
          </div>


        </div>
        <Footer />
      </div>
    );
  }
}

export default Chat;
