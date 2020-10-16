import React, { Component } from "react";
import '../styles/ImagenesInmueble.css';

class ImagenesInmueble extends Component {
  render() {
    return (
      <div className="ImagenesInmueble">
           <img src={require('../assets/FotoInmueble.png')} alt="Logo de la pagina"/> 
           <button className="botonIzquierda"> {"<"} </button>
           <button className="botonDerecha"> {">"} </button> 


          
      </div>
    );
  }
}

export default ImagenesInmueble;