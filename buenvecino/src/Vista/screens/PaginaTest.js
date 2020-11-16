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
              PRUEBA AGREGAR INMUEBLES
            </button>

            <br/>
            <button onClick={ (e) => this.pruebaBorrarInmueble(e)}>
              PRUEBA BORRADO DE UN INMUEBLE
            </button>
            <br/>

            <br/>

            <button onClick={ (e) => this.pruebaModificacion(e)}>
              PRUEBA MODIFICACION INMUEBLE
            </button>
            <br/>

            <button onClick={ (e) => this.prueba1(e)}>
              PRUEBA AGREGAR UBICACION
            </button>
            <br/>

            <input type="text" name="consulta" onChange={ (e)=>{this.actualizarCampo(e)}}/>
            <button onClick={ (e) => {
                this.pruebaConsultaUbicacion(e, "consulta")                
                } }>
              PRUEBA CONSULTA UBICACION
            </button>

            <br/>
                {
                  this.state.inm.map( (e)=>{
                    return (
                      <div>
                        {"BARRIO : " + e.ubicacion.barrio}
                        <br/>
                        {"LOCLAIDAD : " + e.ubicacion.localidad}
                        <br/>
                        <br/>
                        <br/>
                        
                      </div>
                    )
                  } )
                }

          </div>
      )
  }

  
  
  
  async pruebaConsultaUbicacion(e, campo){
    console.log(this.state[campo])
    let texto = this.state[campo] == undefined ? "" : this.state[campo] 
    
    let c = Controlador.getControlador()
    let res = await c.buscarInmueblesPorBarrioLocalidad(texto)
    console.log(res) 
    this.setState(
      {
        inm: res
      }
    )
  }

  prueba1(e){
    let c = Controlador.getControlador()
    c.pruebaX()
  }

  async pruebaInmuebles(e){
    console.log("ENTRO : ", e)
    let c = Controlador.getControlador()
    let res2 = await c.iniciarSesionUsuario("prueba112@prueba.com", "123456")
    console.log("HERE : ", res2)
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

  async pruebaBorrarInmueble(e){
    let c = Controlador.getControlador()
    let res = await c.iniciarSesionUsuario("prueba112@prueba.com", "123456")
    let res2 = await c.eliminarInmueble("Wku4iipUeJcSlUaemdNy")
    //setTimeout(() => {  c.pruebaX({id: res2.auxiliar2, obj: res2.auxiliar })}, 10000);
    console.log(res2)
    c.cerrarSesion()
  }

  async pruebaModificacion(e){
    let c = Controlador.getControlador()
    let res = await c.iniciarSesionUsuario("prueba112@prueba.com", "123456")

    let res2 = await c.modificarInmueble("Ib65yu42QYaFM0aR4u2D", null)

    console.log(res2)
    c.cerrarSesion()
  }

  constructor(props){
    super()
    this.state = {
      inm: []
    }
  }

  async actualizarCampo(e){
    let obj = {
      [e.target.name] : e.target.value
    }
    await this.setState(
      {...this.state,
      ...obj}
    )
  }


}

export default PaginaTest