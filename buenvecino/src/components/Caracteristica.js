import React,{Component} from 'react';
import "../styles/Caracteristica.css";


class Caracteristica extends Component {
    render() {
      return (
        <div className="Caracteristica">
            <img src={require('../assets/guy-working-at-home 1.png')} alt=""/>
            <h3>Nombre</h3>
            <p>Descripción</p>
        </div>
      );
    }
  }
  
export default Caracteristica;