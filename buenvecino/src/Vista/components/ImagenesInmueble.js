import React, { Component } from "react";
import '../styles/ImagenesInmueble.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel'
import Imagen from "../assets/FotoInmueble.png"

class ImagenesInmueble extends Component {
  render() {
    return (
      <div className="ImagenesInmueble">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={Imagen}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={Imagen}
              alt="Third slide"
            />

          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={Imagen}
              alt="Third slide"
            />
          </Carousel.Item>
          
        </Carousel>



      </div>
    );
  }
}

export default ImagenesInmueble;