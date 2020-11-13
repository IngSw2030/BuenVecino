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

            <br/>
            <button onClick={ (e) => this.pruebaIniciarSesion(e)}>
              PRUEBA BORRADO DE UN INMUEBLE
            </button>
            <br/>



          </div>
      )
  }

  async pruebaInmuebles(e){
    let c = Controlador.getControlador()
    let res2 = await c.iniciarSesionUsuario("prueba112@prueba.com", "123456")

    //CASA
    let inmueble = {
      tipo: "H",
      nombre: "EFSFSDFS",
      precio: 5533,
      descripcion: "Fdsfsdfs",
      nBaños: 44,
      area: 54.4,
      esAmoblado: true,
      idPropietario: "wKOO7g9hQuVlDeHPjoMljX53Ryr2"
    }
    let res = await c.registrarInmueble(inmueble)
    console.log( res )
  }

  async pruebaIniciarSesion(e){
    let c = Controlador.getControlador()
    let res = await c.iniciarSesionUsuario("prueba112@prueba.com", "123456")

    let res2 = await c.eliminarInmueble("mXJtcVZdGPTrRjw6CqdK")

    setTimeout(() => {  c.pruebaX({id: res2.auxiliar2, obj: res2.auxiliar })}, 20000);
    


    console.log(res2)

    c.cerrarSesion()
  }


  constructor(props){
    super()
    this.state = {

    }
  }


}

export default PaginaTest