import React,{Component} from 'react';


class Caracteristica extends Component {
    render() {
      return (
        <div>
            <img src={require('../assets/guy-working-at-home 1.png')} alt=""/>
            <h3>Nombre</h3>
            <p>Descripción</p>
        </div>
      );
    }
  }
  
export default Caracteristica;