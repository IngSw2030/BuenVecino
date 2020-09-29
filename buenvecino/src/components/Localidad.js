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
            <div className="Inmuebles">
            <Inmueble/>
            <Inmueble/>
            <Inmueble/>
            </div>

        </div>
      );
    }
  }
  
export default Localidad;