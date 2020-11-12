import React, { Component } from 'react'
import DataBaseTest from '../DataBaseTest'
import {db as DataBase} from '../../Modelo/Firebase/Firebase'
import Autenticador from '../../Modelo/Firebase/Autenticador'
import ManejadorBD from '../../Modelo/Firebase/ManejadorBD'

import SistemaBV from '../../Modelo/SistemaBV'

import Inmueble from '../../Modelo/Inmueble'
import Controlador from '../../Controlador/Controlador'

class PaginaTest extends Component{

  render(){
      return(
          <div>
            <button onClick={ (e) => this.pruebaInmuebles(e)}>
              PRUEBA INMUEBLES
            </button>



          </div>
      )
  }

  async pruebaInmuebles(e){
    let c = Controlador.getControlador()
    
    //CASA
    let inmueble = {
      tipo: "H",
      nombre: "EFSFSDFS",
      precio: 5533,
      descripcion: "Fdsfsdfs",
      nBaños: 44,
      area: 54.4,
      esAmoblado: true
    }
    let res = await c.registrarInmueble(inmueble)
    console.log( res )
  }


  constructor(props){
    super()
    this.state = {

    }
  }


}

export default PaginaTest