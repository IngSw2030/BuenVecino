import React, { Component } from 'react'
import Controlador from '../../Controlador/Controlador'

class PaginaTest extends Component{

  render(){
      return(
          <div>



            <button onClick={ (e) => this.pruebaInmuebles(e)}>
              PRUEBA AGREGAR INMUEBLES
            </button>
            <br/>
            <button onClick={ (e) => this.pruebaFavorito(e)}>
              PRUEBA AGREGAR FAVORITO
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

            <button onClick={ (e) => this.pruebaAgregarUbicacion(e)}>
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
              <button onClick={ (e) => {
                this.pruebaRegistrarUsuario(e)
                } }>
              PRUEBA Registrar Usuario
            </button>

            <br/><br/>
            <input type="text" name="chat" onChange={ (e)=>{this.actualizarCampo(e)} } ref={this.inputChat}/>
            <button onClick={ (e) => {
                this.pruebaChat(e)
                } }>
              PRUEBA CHAT
            </button>
            <button onClick={ (e) => {
                this.pruebaEliminar(e)
                } }>
              PRUEBA ELIMINAR MENSAJE
            </button>
            <hr/>
            {
              <div>{this.state.ress}</div> 
            }
            <hr/>
            {
              this.state.mensajes.slice(0).reverse().map( (item) => {
                if ( item.remitente == Controlador.getControlador().obtenerUsuarioActivo().idFirebase ){
                  return (
                    <>
                    <div style={{backgroundColor: "#00A000"}}>{item.mensaje }</div>
                    </>
                    )
                }
                else{
                  return (
                    <>
                    <div style={{backgroundColor: "#A00000"}}>{item.mensaje }</div>
                    </>
                    
                    
                    )
                }
              })
            }

          </div>
      )
  }

  //PROBAR FAVORITO, CREAR CHAT, AGREGAR MENSAJE, ELIMINAR MENSAJE

  async pruebaEliminar(e){
    let c = Controlador.getControlador()
    let res = await c.eliminarMensajeChat("lk", this.state.mensajes[this.state.mensajes.length-1].idFirebase)
    this.setState({
      ress: res.mensaje
    })
  }

  async iniciarSesionUsuarioParaChat(texto){
    
    this.setState({
      init: 5
    })
    let email = {}
    
    if ( texto == "1" ){
      email = "prueba112@prueba.com"
      
    }
    else{
      email = "prueba1123d@prueba.com"
    }
    let contrasena = "123456"
    let c = Controlador.getControlador()
    c.cerrarSesion()
    await c.iniciarSesionUsuario(email, contrasena)
    
    this.recibirNuevoMensaje = this.recibirNuevoMensaje.bind(this)
    let res = await c.establecerReceptorMensajesChat( "lk", this.recibirNuevoMensaje )
    
    let res3 = c.obtenerMensajesCargadosChat("lk")
    this.setState({
      mensajes: res3.mensaje
    })
  }

  async pruebaChat(e){
    let texto = this.inputChat.current.value
    let c = Controlador.getControlador()
    
    if ( this.state.init == undefined ){
      await this.iniciarSesionUsuarioParaChat(texto)

    }
    else{
      let k = await c.agregarMensajeChat("lk", texto)
      console.log(k)
    }



    this.inputChat.current.value = ""
  }

  recibirNuevoMensaje(idChat, nuevo){
    if ( nuevo != undefined ){
      console.log("NUEVO RECIBIDO : ", nuevo)
      let listaTot = this.state.mensajes
      listaTot.push( nuevo.mensajes )
      this.setState( {mensajes: nuevo} )
      
    }
    else{
      console.log(idChat, " ", nuevo)
    }
    

  }

  async pruebaRegistrarUsuario(e){
    let c = Controlador.getControlador()
    let esArrendatario = true
    let email = "ultPre@prueba.com"
    let contrasena = "123456"
    
    let infoUsuario = {
      nombre: "JUANITO",
      dni: 1111111112,
      tipoDni: "CE",
      genero: "M",
      fechaNacimiento: Date.now(),
      email: email,
      telefono: 3333333333

    }
    let res = await c.registrarUsuario(infoUsuario, esArrendatario, email, contrasena)
    console.log(res)
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

  pruebaAgregarUbicacion(e){
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

  async pruebaFavorito(e){
    console.log("Entro a favorito: ", e)
    let c = Controlador.getControlador()
    let res2 = await c.iniciarSesionUsuario("prueba1123d@prueba.com", "123456")
    console.log("Llego a favorito: ", res2)  
    let favorito = {
      fechaAgregado: Date.now(),
      Comentario: "Me gusta mucho",
      idInmueble: "1hXHBQdB8AyPRgWBPGiJ"
    }
    let res = await c.agregarFavorito(favorito)
    console.log(res)
  }

  async pruebaBorrarInmueble(e){
    let c = Controlador.getControlador()
    let res = await c.iniciarSesionUsuario("prueba112@prueba.com", "123456")
    console.log(res, "RRESESES")
    let res2 = await c.eliminarInmueble("13OMdV60BRjrXWy3srA2")
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
      inm: [],
      mensajes : [],
    }
    this.inputChat = React.createRef()
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