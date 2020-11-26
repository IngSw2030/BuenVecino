import React,{Component} from 'react';
import Caracteristica from './Caracteristica'
import img1 from '../assets/man-having-his-meal1.png'
import img2 from '../assets/guy-working-at-home.png'
import img3 from '../assets/team-discussing-on-website-development.png'
import "../styles/Descripcion.css";


class Descripcion extends Component {
    render() {
      return (
        <div className="Descripcion">
            <Caracteristica imagen={img1} nombre ="Locación" descripcion="Ofrecemos espacios con locaciones estratégicas para que puedas disfrutar de tu vida universitaria."/>
            <Caracteristica imagen={img2} nombre ="Comodidad" descripcion="En cada lugar de hospedaje verás todas las comodidades y diferenciadores para que puedas decidir por la opción más agradable."/>
            <Caracteristica imagen={img3} nombre ="Social" descripcion="Puedes hospedarte como miembro o “roomie” de una locacion universitaria, podrás compartir y conocer nuevos compañeros." />
        </div>
      );
    }
  }
  
export default Descripcion;