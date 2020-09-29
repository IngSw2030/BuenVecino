import React,{Component} from 'react';


class Inmueble extends Component {
    render() {
      return (
        <div>
            <img src={require('../assets/Rectangle 7.png')} alt=""/>
            <h3>Nombre</h3>
            <p>Descripción</p>
            <p>Desde $ Precio / Mes</p>

        </div>
      );
    }
  }
  
export default Inmueble;