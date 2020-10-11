import React, { Component } from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Localidad from "../components/Localidad"
import Descripcion from "../components/Descripcion"
import Prefooter from "../components/Prefooter"
import Footer from "../components/Footer"

class Landing extends Component {
  render() {
    return (
      <div>
        <Header />
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
