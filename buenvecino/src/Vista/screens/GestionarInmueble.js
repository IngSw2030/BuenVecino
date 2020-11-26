import React, { Component } from "react";
import InmuebleMapa from "../components/InmuebleMapa";
import { Button } from "@material-ui/core";
import "../styles/GestionarInmueble.css";
import DeleteIcon from "@material-ui/icons/Delete";
import CachedIcon from "@material-ui/icons/Cached";
import Modal from "@material-ui/core/Modal";
import InmuebleGestion from '../components/InmuebleGestion'
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

class GestionarInmueble extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  setOpen = (valor) => {
    this.setState({ open: valor });
  };
  handleOpen = () => {
    this.setOpen(true);
  };

  handleClose = () => {
    this.setOpen(false);
  };

  render() {
    let obj = {
      nombre: "NOmbre",
      descripción: "DEScripción",
      precio: "3213214324324",
    };
    return (

      <div className="GestionarInmueble">
        <div className="head">
          <Header />
          <h2>Gestiona Tus Inmuebles</h2>
        </div>
        <div className="btnAgregar">
          <Link to="/registrarInmueble">
          <Button variant="contained" className="agregar">
            AGREGAR INMUEBLE
          </Button>
          </Link>
        </div>
        <div className="inmuebles">
          <InmuebleGestion />
          <InmuebleGestion />
        </div>
        <Footer />
      </div>
    );
  }
}

export default GestionarInmueble;
