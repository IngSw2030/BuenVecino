import React,{Component} from 'react';
import Caracteristica from './Caracteristica'

import "../styles/Descripcion.css";


class Descripcion extends Component {
    render() {
      return (
        <div className="Descripcion">
            <Caracteristica/>
            <Caracteristica/>
            <Caracteristica/>
        </div>
      );
    }
  }
  
export default Descripcion;