import React, { Component } from "react";
import '../styles/DescripcionLugar.css';

class DescripcionLugar extends Component {
  render() {
    return (
      <div className="DescripcionLugar">
        
        <img src={this.props.imagen } alt="Logo de la pagina" />
        <p>{this.props.descripcion}</p>

      </div>
    );
  }
}

export default DescripcionLugar;