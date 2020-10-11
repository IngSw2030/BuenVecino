import React, { Component } from "react";
import "../styles/Banner.css";
import { Button } from "@material-ui/core";

class Banner extends Component {
  render() {
    return (
      <div className="banner">
        <div className="banner__info ">
          <h1 className="title_font">
            Hospedate en <br /> Bogotá
          </h1>
          <h3 className="subtitle_font">
            Reserva o comparte residencias universitarias con nosotros.
          </h3>
          <Button variant="outlined">Regístrate</Button>
        </div>
        <div className="banner__search">
          <form>
            <p>¿En qué localidad quieres hospedarte?</p>
            <input type="text" />
            <p>Duración en meses en la que planeas hospedarte</p>
            <input type="text" />
            <Button variant="outlined">Buscar</Button>
          </form>
        </div>
      </div>
    );
  }
}
export default Banner;
