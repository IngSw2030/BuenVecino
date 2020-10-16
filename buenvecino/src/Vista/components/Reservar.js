import React, { Component } from "react";
import { Button } from "@material-ui/core";
import "../styles/Reservar.css";


class Reservar extends Component {
  render() {
    return (
      <div className="Reservar">
        <Button variant="outlined">Reservar Ahora</Button>
        <h3>$40.054x15 / NOCHES</h3>
        <h3>Total $855.000</h3>
      </div>
    );
  }
}

export default Reservar;