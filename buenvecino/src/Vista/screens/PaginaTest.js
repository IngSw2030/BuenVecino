import React, { Component } from 'react'
import Controlador from '../../Controlador/Controlador'
import ManejadorBD from '../../Modelo/Firebase/ManejadorBD'
import Utils from '../../Modelo/Utils'
import {firebase} from '../../Modelo/Firebase/Firebase'
import ManejadorSg from '../../Modelo/Firebase/ManjadorSg'

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


                {
                  this.state.tipo === undefined ? <div>INICIO SESION</div> : <div>{this.state.tipo + " " + this.state.usuario.idFirebase}</div>
                }

            <input type="text" name="chat"  placeholder="IdInmueble/Solicitud" ref={this.inputSolicitudes}/>
            <input type="text" name="dsda" placeholder="Respuesta" ref={this.inputResponder}/>
            <input type="text" name="fecha" placeholder="Respuesta" ref={this.inputFecha}/>
            <button onClick={(e) => {this.pruebaSolicitud(e)} }>
              SIMULAR SOLICITUD
            </button>

            <button onClick={(e) => {this.pruebaValoracion(e)} }>
              CREAR VALORACION
            </button>
            <hr/>
            {
              this.state.respuestaEstadoSolicitud !== undefined ? 
              ( <div>{this.state.respuestaEstadoSolicitud}</div> ) :
              (<div> {"NO HAY RESPUESTA"}</div>)
            }
            <hr/>
            {
              this.state.sols.map( (item, ind) =>{
              return <div key={ind}><table><tr><td>{item.idFirebase}</td><td>| {item.idInmueble }</td><td> | { item.estado}</td><td>| {item.idArrendatario}</td> </tr></table></div>
              } )
            }
            <hr/>{
              this.state.sols2.map( (item, ind) =>{
                return <div key={ind}><table><tr><td> {item.idFirebase}</td><td> | {item.idInmueble}</td><td>  | {item.estado}</td></tr></table>  </div>
              } )
            }
            <hr/>{
              this.state.vals.map( (item, ind) =>{
                return <div key={ind}><table><tr><td> {item.idFirebase}</td><td> | {item.idValorado}</td><td>  | {item.comentario}</td></tr></table>  </div>
              } )
            }
            <hr/>
            {
                  this.state.tipo === undefined ? <div>NADA</div> : this.state.tipo === "DUENO" ?
                  <div>{
                    this.state.inmuebles.map( (item, inds) =>{
                    return <div key={inds}>{
                      <p>

                              {
                                this.state.kItem.map( (l)=>{
                                  if ( item.listaValoraciones.length > 0 ){
                                    console.log( item, " +1 " )
                                  }
                                  return <></>
                                } )
                              }                 
                        {
                          item.idFirebase 
                        } " "
                        {
                          
                          item.listaValoraciones.map( (item2) =>{
                            return <h5> {item2.state.comentario} {item2.state.calificacion} </h5>
                          } )
                        }

                      </p>



                    }</div>
                    } )
                    
                  }</div>:<div>NADA INTETESANTE</div>
            }

            <hr/>


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
                if ( item.remitente === Controlador.getControlador().obtenerUsuarioActivo().idFirebase ){
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
          <button onClick={async (e)=>{
            //let atributo = {estaDisponible: true }
            
            
            
            let atributo = {historialPagos: [], reservaciones: [], solicitudes: []}
            await this.agregarAtributo("Arrendatarios", atributo)
            
            atributo = {solicitudes: []}
            await this.agregarAtributo("Arrendadores", atributo)
                        
            await this.borrarInformacionColeccion("Solicitudes")
            await this.borrarInformacionColeccion("Pagos")
            await this.borrarInformacionColeccion("Reservaciones")

          }}>
            RESETEAR INFORMACION SOLICITUDES
          </button>

          <button onClick={async (e)=>{
            let atributo = {valoraciones: []}
            await this.agregarAtributo("Arrendadores", atributo)
            await this.agregarAtributo("Arrendatarios", atributo)
            await this.agregarAtributo("Inmuebles2", atributo)
                        
            await this.borrarInformacionColeccion("Valoraciones")

          }}>
            RESETEAR INFORMACION VALORACIONES
          </button>

          <button onClick={async (e)=>{

          }}>
            FUNCION VARIA
          </button>

          <button onClick={async (e)=>{
            let atributo = {valoraciones: []}
            this.agregarAtributo("Inmuebles2", atributo)
            //this.agregarAtributo("Arrendadores", atributo)
            //this.agregarAtributo("Arrendatarios", atributo)
          }}>
            AGREGAR CAMPO
          </button>



          <br/><br/><br/>

          <input type="file" id="file-selector" multiple ref={this.refArchivo}></input>
          <br/>
          <button onClick={
            (e) =>{
              ManejadorSg.obtenerImagenesInmueble("HOLA1")
            }
          }>
            PRUEBA OTRA
          </button>

          </div>



      )

  }

  recibirValoracion(nuevo){
    console.log( "ACTUALIZCION : ", nuevo )
    this.setState({
      vals: nuevo
    })
  }

  async pruebaValoracion(e){
    let c = Controlador.getControlador()
    if ( this.state.init2 === undefined ){
      await this.inicioSesionSolicitud(c)
      this.recibirValoracion = this.recibirValoracion.bind(this)
      console.log("C: ", c)
      c.establecerReceptorListaValoraciones(this.recibirValoracion)


      setTimeout( ()=>{
        if ( this.state.tipo == "DUENO" ){
          let rrrr = c.obtenerInmueblesCargados()
          console.log(rrrr)
          this.setState( {inmuebles: rrrr} )
          
        }
      }, 1000 )
      
    }
    else{
      let res = null
      let ids = this.inputSolicitudes.current.value
      let valor = this.inputResponder.current.value
      let cantidad = this.inputFecha.current.value
      valor = valor.toUpperCase()
      let tipoValoracion = ""
      if ( valor === "C" ){


        let objetoVal = {
          idValorado : ids,
          tipo: cantidad.toUpperCase(),
          calificacion: 5,
          comentario: "Bonito"
        }
        res = await c.realizarValoracion(objetoVal)
        console.log(res)

      }else if ( valor === "M" ){
        let modificacion = {
          comentario: "NO TAN BONITO AHORA >:V",
          calificacion: parseInt(cantidad)

        }
        res = await c.modificarValoracion(ids, modificacion)
      }
      else if ( valor === "E" ){
        res = await c.eliminarValoracion(ids)
      }
      console.log(res)
      this.setState( {respuestaEstadoSolicitud: res.mensaje} )
    }
  }

  async agregarAtributo(tabla, atributo){
    let res = await ManejadorBD.leerInformacionColeccion(tabla)
    for(let i in res){
      ManejadorBD.actualizarInformacion(tabla, res[i].idFirebase, atributo)
    }    
  }

  async borrarInformacionColeccion(tabla){
    let res1 = await ManejadorBD.leerInformacionColeccion(tabla)
    res1.map( async (item) => { await ManejadorBD.borrarInformacion( tabla, item.idFirebase ) } )
  }

  rebibirSolicitudes(nueva){
    let arrayAux = this.state.sols
    for(let i in arrayAux){
      if ( nueva.idFirebase === arrayAux[i].idFirebase ){
        arrayAux[i] = nueva
        this.setState( {sols: arrayAux} )
        return;
      }
    }
    this.setState( {sols: [...this.state.sols, nueva]} )
    
    
  }

  cambiosListaSolicitudes(nuevas){
    this.setState( {sols2: nuevas} )
  }

  async inicioSesionSolicitud(c){
    let texto = this.inputSolicitudes.current.value
    if ( texto === "1" ){
      let res = await c.iniciarSesionUsuario("prueba112@prueba.com","123456") //ARRENDADOR
      await this.setState({tipo: "DUENO", usuario: res.usuario})  
    }
    else if (texto === "2"){
      let res = await c.iniciarSesionUsuario("prueba1123d@prueba.com","123456") //ARRENDATARIO
      await this.setState({tipo: "INQUILINO", usuario: res.usuario})
    }
    else {
      let res = await c.iniciarSesionUsuario("johnjgm@prueba.com","123456") //ARRENDATARIO
      await this.setState({tipo: "INQUILINO", usuario: res.usuario})
    }
    this.rebibirSolicitudes = this.rebibirSolicitudes.bind(this)
    this.cambiosListaSolicitudes = this.cambiosListaSolicitudes.bind(this)
    let res = await c.establecerReceptorSolicitudes(this.rebibirSolicitudes)
    console.log("RESPUESTA 1 INICIAR SESION : ", res)
    let res2 = await c.establecerReceptorListaSolicitudes(this.cambiosListaSolicitudes)
    this.setState( {init2: 3} )
    console.log("RESPUESTA 2 INICIAR SESION : ", res2)
    
    this.inputSolicitudes.current.value = ""
    let rrr = c.obtenerSolicitudesCargadas()

    this.setState( {sols: rrr} )

  }

  async pruebaSolicitud(e){
    let c = Controlador.getControlador()

    if (this.state.init2 === undefined){
      this.inicioSesionSolicitud(c)
    }
    else{
      let idInmueble = this.inputSolicitudes.current.value
      let respuesta = this.inputResponder.current.value.toUpperCase()
      let res = {}
      if ( this.state.tipo === "DUENO" ){
        if ( respuesta === "A" ){
          res = await c.aceptarSolicitudReserva(idInmueble)
        }
        else if ( respuesta === "R" ){
          res = await c.rechazarSolicitudReserva(idInmueble)
        }
        console.log("ARRENDADOR: ", res)
        await this.setState( {respuestaEstadoSolicitud: res.mensaje} )
      }
      else{
        //21-nov
        //1-dic
        if ( respuesta=== "D" ){

          let fechas = this.inputFecha.current.value
          fechas = fechas.split(" ")
          let fecha1 = fechas[0].split("-")
          let fecha2 = fechas[1].split("-")

          fecha1 = fecha1.map( (item) => {return parseInt(item)} )
          fecha2 = fecha2.map( (item) => {return parseInt(item)} )

          fecha1 = new Date( fecha1[2], fecha1[1], fecha1[0] )
          fecha2 = new Date( fecha2[2], fecha2[1], fecha2[0] )

          console.log( fecha1.toString() )
          console.log( fecha2.toString() )

          fecha1[1]--
          fecha2[1]--

          let infoSolicitud = {
            //ENVUELVE INTERNAMENTE
            fechaInicio: fecha1,
            fechaFin: fecha2,
            idInmueble: idInmueble,
            idArrendatario: this.state.usuario.idFirebase,
            idArrendador: "wKOO7g9hQuVlDeHPjoMljX53Ryr2"
          }

          res = await c.crearSolicitudReserva(infoSolicitud)
          
        }
        else if ( respuesta === "C" ){
          res = await c.cancelarSolicitudReserva(idInmueble)
        }
        else if ( respuesta === "CC" ){
          console.log("HERE CC: ")
          res = await c.realizarPago(idInmueble, {idSolicitud: idInmueble, valor: 50000, informacionAdicional:{basura1:"1",basura2:"2"}})
          console.log("RESPUESTA PARCIAL : ", res)
          this.setState( {respuestaEstadoSolicitud: res.mensaje} )
          if ( res.idError === 0 || res.idError === 4  ){
            res = await c.confirmarSolicitudReserva(idInmueble)
          }
          
        }        
      }
      this.inputSolicitudes.current.value = ""
      this.inputResponder.current.value = ""
      console.log(res.mensaje, " RESPUESTA FINAL")
      this.setState( {respuestaEstadoSolicitud: res.mensaje} )
      
      
      
      
    }
    
    
  }

  //PROBAR FAVORITO, CREAR CHAT, AGREGAR MENSAJE, ELIMINAR MENSAJE

  async pruebaEliminar(e){
    let c = Controlador.getControlador()
    let res = await c.eliminarMensajeChat("lk", this.state.mensajes[this.state.mensajes.length-1].idFirebase)
    await this.setState({
      ress: res.mensaje
    })
  }

  async iniciarSesionUsuarioParaChat(texto){
    
    await this.setState({
      init: 5
    })
    let email = {}
    
    if ( texto === "1" ){
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
    await this.setState({
      mensajes: res3.mensaje
    })
  }

  async pruebaChat(e){
    let texto = this.inputChat.current.value
    let c = Controlador.getControlador()
    
    if ( this.state.init === undefined ){
      await this.iniciarSesionUsuarioParaChat(texto)

    }
    else{
      let k = await c.agregarMensajeChat("lk", texto)
      console.log(k)
    }



    this.inputChat.current.value = ""
  }

  async recibirNuevoMensaje(idChat, nuevo){
    if ( nuevo !== undefined ){
      let listaTot = this.state.mensajes
      listaTot.push( nuevo.mensajes )
      await this.setState( {mensajes: nuevo} )
      
    }
    else{
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
    let texto = this.state[campo] === undefined ? "" : this.state[campo] 
    
    let c = Controlador.getControlador()
    let res = await c.buscarInmueblesPorBarrioLocalidad(texto)
    console.log(res) 
    await this.setState(
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
      Comentario: "Favorito de prueba 2",
      idInmueble: "sjdV16ET2lTdtnVCdELP"
    }
    
    let res = await c.agregarFavorito(favorito)
    console.log(res.aux)

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
      sols: [],
      sols2: [],
      vals: [],
      inmuebles: [],
      kItem: [1]
    }
    this.inputChat = React.createRef()
    this.inputSolicitudes = React.createRef()
    this.inputResponder = React.createRef()
    this.inputFecha = React.createRef()
    this.refArchivo = React.createRef()

    console.log("this: ", this.state)
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

  async componentDidMount(){
    let c = Controlador.getControlador()
    await c.iniciarSesionUsuario("prueba112@prueba.com", "123456")
    this.refArchivo.current.addEventListener("change", this.cargarImagen, false)
  }

  async cargarImagen(e){
    const fileList = e.target.files;
    console.log( fileList )
    for(let i=0; i< fileList.length; i++){
      console.log("fileList : ", fileList[i])
      //let url = await ManejadorSg.cargarImagen("HOLA1", fileList[i])
      //console.log( url )
    }   
  }

  

}

export default PaginaTest