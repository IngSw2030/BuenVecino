import React, { Component } from "react";
import { Button } from "@material-ui/core";
import "../styles/Reservar.css";
import Modal from '@material-ui/core/Modal'
import Login from "./Login"
import Logo from "../assets/Logo.png"



class Reservar extends Component {
  constructor() {
    super()
    this.state = {
      open: false,
    }
  }

  setOpen = (valor) => {
    console.log(valor)
    console.log(this.state.open)
    this.setState({ open: valor })
    console.log(this.state.open)
  }
  handleOpen = () => {
    this.setOpen(true);
  };

  handleClose = () => {
    this.setOpen(false);
  };



  render() {
    return (
      <div className="Reservar">
        <Button variant="outlined" onClick={this.handleOpen}>Reservar Ahora</Button>
        <h3>$40.054x15 / NOCHES</h3>
        <h3>Total $855.000</h3>

        <Modal
          open={this.state.open}
          onClose={this.handleClose}
          className="mdl"
        >
          <Login />
        </Modal>
      </div>
    );
  }
}

export default Reservar;