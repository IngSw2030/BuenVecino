import React,{Component} from 'react';
import "../styles/Inmueble.css";

class Inmueble extends Component {
    render() {
      return (
        <div className="Inmueble">
            <img src={this.props.imagen} alt=""/>
            <h3>{this.props.nombre}</h3>
            <h4>{this.props.descripcion}</h4>
            <p className="Precio">Desde $ {this.props.precio} / Mes</p>

        </div>
      );
    }
  }
  
export default Inmueble;