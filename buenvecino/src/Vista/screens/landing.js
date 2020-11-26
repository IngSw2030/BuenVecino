import React, { Component } from "react";
import HeaderLanding from "../components/HeaderLanding";
import Banner from "../components/Banner";
import Localidad from "../components/Localidad"
import Descripcion from "../components/Descripcion"
import Prefooter from "../components/Prefooter"
import Footer from "../components/Footer"
import Controlador from "../../Controlador/Controlador";

class Landing extends Component {
  render() {
    return (
      <div>
        <HeaderLanding />
        <Banner />
        <Localidad/>
        <Descripcion/>
        <Prefooter/>
        <Footer/>
        {/* home */}
        {/* Header */}
        {/* banner */}
        {/* cards */}
        {/* footer */}
      </div>
    );
  }

}

export default Landing;
