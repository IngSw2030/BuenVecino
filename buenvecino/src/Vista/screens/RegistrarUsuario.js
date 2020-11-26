import React, { Component } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import RegistrarUsuario from '../components/RegistrarUsuario'
import "../styles/RegistrarUsuarioS.css"


class RegistrarUser extends Component {
  render() {
    return (
      <div className="RegistrarUser">
        <div className="head">
        <Header/>
        </div>
        <div className="registro">
        <RegistrarUsuario />
        </div>
        <Footer/>
      </div>
    );
  }
}

export default RegistrarUser;