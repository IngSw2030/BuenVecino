import React,{Component} from 'react';
import "../styles/Inmueble.css";

class Inmueble extends Component {
    render() {
      return (
        <div className="Inmueble">
            <img src={require('../assets/Rectangle 7.png')} alt=""/>
            <h3>Nombre</h3>
            <h4>Descripción</h4>
            <p className="Precio">Desde $ fkjldsaf Precio / Mes</p>

        </div>
      );
    }
  }
  
export default Inmueble;