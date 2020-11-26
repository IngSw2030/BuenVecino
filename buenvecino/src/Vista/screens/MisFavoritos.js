import React, { Component } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import InmuebleFavorito from "../components/InmuebleFavorito";
import "../styles/MisFavoritos.css"

class MisFavoritos extends Component {
  render() {
    return (
      <div className="MisFavoritos">
        <div className="head">
          <Header />
          <h2>Tus Inmuebles Favoritos</h2>
        </div>
        <div className="contenido">
          <InmuebleFavorito/>
          <InmuebleFavorito/>
          
        </div>
        <Footer />
      </div>
    );
  }
}

export default MisFavoritos;