import React,{Component} from 'react';
import "../styles/Caracteristica.css";


class Caracteristica extends Component {
    render() {
      return (
        <div className="Caracteristica">
            <img src= {this.props.imagen } alt=""/>
            <h3>{this.props.nombre}</h3>
            <p>{this.props.descripcion}</p>
        </div>
      );
    }
  }
  
export default Caracteristica;