import React,{Component} from 'react';
import Inmueble from '../components/Inmueble'

import "../styles/Localidad.css";

class Localidad extends Component {
    render() {
      return (
        <div className="Localidad">
            <h2>Las localidades más solicitadas:</h2>
            <p>Aquí encontrarás los lugares de Bogotá donde <br/>
                más se hospendan nuestros clientes</p>
            <div className="InmueblesL">
            <Inmueble imagen={require('../assets/Rectangle7.png')} nombre="Chia" descripcion="Afueras de Bogotá" precio={123456} />
            <Inmueble imagen={require('../assets/Rectangle7.png')} nombre="Chapinero" descripcion="Centro de Bogota" precio={3621873}/>
            <Inmueble imagen={require('../assets/Rectangle7.png')} nombre="Teusaquillo" descripcion="Recomendado" precio={587687}/>
            </div>

        </div>
      );
    }
  }
  
export default Localidad;