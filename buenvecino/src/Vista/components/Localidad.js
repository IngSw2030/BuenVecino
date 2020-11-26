import React,{Component} from 'react';
import Inmueble from '../components/Inmueble'
import img from '../assets/Rectangle7.png'

import "../styles/Localidad.css";

class Localidad extends Component {
    render() {
      return (
        <div className="Localidad">
            <h2>Las localidades más solicitadas:</h2>
            <p>Aquí encontrarás los lugares de Bogotá donde <br/>
                más se hospendan nuestros clientes</p>
            <div className="InmueblesL">
            <Inmueble imagen={img} nombre="Chia" descripcion="Afueras de Bogotá" precio={123456} />
            <Inmueble imagen={img} nombre="Chapinero" descripcion="Centro de Bogota" precio={3621873}/>
            <Inmueble imagen={img} nombre="Teusaquillo" descripcion="Recomendado" precio={587687}/>
            </div>

        </div>
      );
    }
  }
  
export default Localidad;