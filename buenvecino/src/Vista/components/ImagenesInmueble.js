import React, { Component } from "react";
import '../styles/ImagenesInmueble.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel'
import Imagen from "../assets/FotoInmueble.png"

class ImagenesInmueble extends Component {
  constructor(props){
    super()
    console.log(props.inmueble.listaFotos);
    this.state = {
      fotos:props.inmueble.listaFotos
    }
}


  render() {
    return (
      <div className="ImagenesInmueble">
        <Carousel>
          {
            this.state.fotos.map((item,index)=>{
              return <Carousel.Item>
                <div className="block">
              <img
                className=""
                src={item}
                alt={index}
              />
              </div>
            </Carousel.Item>

            })
          }
          
          
        </Carousel>



      </div>
    );
  }
}

export default ImagenesInmueble;