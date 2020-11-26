import React, { Component } from 'react';
import { Button } from "@material-ui/core";
import "../styles/Prefooter.css";
import Modal from '@material-ui/core/Modal'
import Login from "../components/Login"


class Prefooter extends Component {

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
      <div className="Prefooter">
        <h3>¿Posees un espacio o habitación que quieras rentar?</h3>
        <Button variant="outlined" onClick={this.handleOpen}>Registra tu vivienda</Button>

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

export default Prefooter;