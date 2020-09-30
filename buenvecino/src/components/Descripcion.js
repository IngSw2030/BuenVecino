import React,{Component} from 'react';
import Caracteristica from './Caracteristica'

import "../styles/Descripcion.css";


class Descripcion extends Component {
    render() {
      return (
        <div className="Descripcion">
            <Caracteristica imagen={require('../assets/man-having-his-meal1.png')} nombre ="Locación" descripcion="Ofrecemos espacios con locaciones estratégicas para que puedas disfrutar de tu vida universitaria."/>
            <Caracteristica imagen={require('../assets/guy-working-at-home.png')} nombre ="Comodidad" descripcion="En cada lugar de hospedaje verás todas las comodidades y diferenciadores para que puedas decidir por la opción más agradable."/>
            <Caracteristica imagen={require('../assets/team-discussing-on-website-development.png')} nombre ="Social" descripcion="Puedes hospedarte como miembro o “roomie” de una locacion universitaria, podrás compartir y conocer nuevos compañeros." />
        </div>
      );
    }
  }
  
export default Descripcion;