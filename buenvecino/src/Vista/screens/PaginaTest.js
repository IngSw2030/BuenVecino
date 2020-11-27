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




            //let atributo = {valoraciones: []}
            let atributo = {nBaños: firebase.firestore.FieldValue.delete()}
            this.agregarAtributo("Inmuebles", atributo)
            
            //this.agregarAtributo("Arrendadores", atributo)
            //this.agregarAtributo("Arrendatarios", atributo)
          }}>
            AGREGAR CAMPO
          </button>



          <br/><br/><br/>

          <input type="file" id="file-selector" multiple ref={this.refArchivo}></input>
          <br/>
          <button onClick={
            localStorage.removeItem("Controlador")
          }>
            PRUEBA OTRA
          </button>

          </div>



      )

  }


  async agregarAtributo(tabla, atributo){
    let res = await ManejadorBD.leerInformacionColeccion(tabla)
    for(let i in res){
      let res1 = res.nBaños
      
      ManejadorBD.actualizarInformacion(tabla, res[i].idFirebase, atributo)
      if ( res!==undefined ){
        ManejadorBD.actualizarInformacion(tabla, res[i].idFirebase, {nBanos: res1})
      }
    }    
  }

  async borrarInformacionColeccion(tabla){
    let res1 = await ManejadorBD.leerInformacionColeccion(tabla)
    res1.map( async (item) => { await ManejadorBD.borrarInformacion( tabla, item.idFirebase ) } )
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

      //let extension = fileList[i].type.substring(5, fileList[i].type.length)
      //console.log( extension )
      ManejadorSg.subirFotoPerfil( "J8RfvoQkotgBHJqy6tesdX3Uj0E2", fileList[i] )
    }   
    //let c = Controlador.getControlador()
    //let res = await c.subirFotosInmueble("Inmueble1", fileList)
    //console.log( res )
    //this.state.setState( {archivos: [...this.state.archivos, ...fileList]} )*/
  }

  

}

export default PaginaTest