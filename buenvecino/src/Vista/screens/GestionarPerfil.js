import React, { Component } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ModificarPerfil from "../components/ModificarPerfil";
import "../styles/GestionarPerfil.css"


class GestionarPerfil extends Component {
  render() {
    return (
      <div className="GestionarPerfil">
        <div className="head">
          <Header />
        </div>
        <div className="perfil">
        <ModificarPerfil />
        </div>
        <Footer />

      </div>
    );
  }
}

export default GestionarPerfil;