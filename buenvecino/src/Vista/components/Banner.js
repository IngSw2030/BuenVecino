import React, { Component } from "react";
import "../styles/Banner.css";
import { Button } from "@material-ui/core";
import { Link } from 'react-router-dom'

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
          <Link to="/registrarUsuario">
            <Button variant="outlined" className="registrate">Regístrate</Button>
          </Link>
        </div>
        <div className="banner__search">
          <form>
          <p>¿En qué barrio quieres hospedarte?</p>
            
            <input type="text" />
            <p>¿En qué localidad quieres hospedarte?</p>
            
            <select name="localidad" required>
              <option selected value="">Seleccione la localidad</option>
              <option>Antonio Nariño</option>
              <option>Barrios Unidos</option>
              <option>Bosa</option>
              <option>Chapinero</option>
              <option>Ciudad Bolívar</option>
              <option>Engativá</option>
              <option>Fontibón</option>
              <option>Kennedy</option>
              <option>La Candelaria</option>
              <option>Los Mártires</option>
              <option>Puente Aranda</option>
              <option>Rafael Uribe Uribe</option>
              <option>San Cristobal</option>
              <option>Santa Fe</option>
              <option>Suba</option>
              <option>Sumapaz</option>
              <option>Teusaquillo</option>
              <option>Tunjuelito</option>
              <option>Usaquén</option>
              <option>Usme</option>
            </select>
            <Link to="/busqueda">
              <Button variant="outlined" className="buscar">Buscar</Button>
            </Link>
          </form>
        </div>
      </div>
    );
  }
}
export default Banner;
