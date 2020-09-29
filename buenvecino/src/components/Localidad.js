import React,{Component} from 'react';
import Inmueble from '../components/Inmueble'

class Localidad extends Component {
    render() {
      return (
        <div>
            <h2>Las localidades más solicitadas:</h2>
            <p>Aquí encontrarás los lugares de Bogotá donde <br/>
                más se hospendan nuestros clientes</p>
            <Inmueble/>

        </div>
      );
    }
  }
  
export default Localidad;