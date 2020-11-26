import React, { Component } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import RegistrarUsuario from '../components/RegistrarUsuario'

class RegistrarUser extends Component {
  render() {
    return (
      <div>
        <Header/>
        <RegistrarUsuario/>
        <Footer/>
      </div>
    );
  }
}

export default RegistrarUser;