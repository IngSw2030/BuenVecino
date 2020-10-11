import React, { Component } from 'react'
import DataBaseTest from '../DataBaseTest'
import {db as DataBase} from '../../Modelo/Firebase/Firebase'
import Autenticador from '../../Modelo/Firebase/Autenticador'
import ManejadorBD from '../../Modelo/Firebase/ManejadorBD'

class PaginaTest extends Component{

  render(){
      return(
        <div>
					<button onClick={ () => this.modificar()}>
            BOTON DE PRUEBA
          </button>
          <p>Mensaje de prueba {this.state.val} {this.state.val2}</p>
          <div>
          {
            [...Array(this.state.cont)].map((e, i) => {
              let num = parseInt(Math.random() * (4 - 1) + 1)
              if ( num !== 1 ){
                return <p key={i}>{i+1}</p>
              }
              else{
                return null
              }
            })
          }
          </div>
          <form >
            <input type="text" name="campo1" onChange={(e)=>{this.actualizarCampo(e)}}/>
            <button name="btn1" onClick={(e)=>{this.subirInformacion(e)} }>SUBIR INFOS</button>
          </form>
          <div>
            <h1>
              PRUEBA DE BASES DE DATOS
            </h1>
            {
              
              this.state.bd.map( (el, index)=>{
                return <h1 key={index}>{el.name}</h1>
              })
            }
          </div>
          <br/><br/><br/>
          <h1>PRUEBA REGISTRO (INGRESAR EL CORREO SIN EL DOMINIO @prueba.com)</h1>
          <form >
          <input id="campo2" type="text" name="campo2" onChange={(e)=>{this.actualizarCampo(e)}}/>
          <input id="campo3" type="password" name="campo3" onChange={(e)=>{this.actualizarCampo(e)}} />
            <button name="btn2" onClick={(e)=>{this.registrarUsuario(e, "campo2", "campo3")} }>REGISTRAR</button>
          </form>
          {
            this.state.errorReg == null ? (<div className="alert alert-success">correcto</div>) : (<div className="alert alert-danger">{this.state.errorReg}</div>) 
          }

        <br/><br/><br/>
        <h1>PRUEBA INICIO SESION (INGRESAR EL CORREO SIN EL DOMINIO @prueba.com)</h1>
          <form >
          <input id="campo4" type="text" name="campo4" onChange={(e)=>{this.actualizarCampo(e)}}/>
          <input id="campo5" type="password" name="campo5" onChange={(e)=>{this.actualizarCampo(e)}} />
            <button name="btn2" onClick={(e)=>{this.iniciarSesion(e, "campo4", "campo5")} }>INICIAR SESION</button>
          </form>
          {
            this.state.errorReg2 == null ? (<div className="alert alert-success">correcto</div>) : (<div className="alert alert-danger">{this.state.errorReg2}</div>) 
          }

        <h1>PRUEBA CIERRE SESION (INGRESAR EL CORREO SIN EL DOMINIO @prueba.com)</h1>
        <button onClick={ (e)=>{ 
          try{
            let h=Autenticador.cerrarSesionUsuario()
            this.setState({errorReg3: null})
          }
          catch(error){
            this.setState({errorReg3 : Autenticador.obtenerMensajeError(error)})
          }

          
        } }>
          CIERRE SESION
        </button>
          {
            this.state.errorReg3 == null ? (<div className="alert alert-success">correcto</div>) : (<div className="alert alert-danger">{this.state.errorReg3}</div>) 
          }
          <br/><br/><br/><br/><br/>
          <div>

          <h1>PRUEBA CORREO YA REGISTRADO (INGRESAR EL CORREO SIN EL DOMINIO @prueba.com)</h1>
          <form >
          <input id="campo6" type="text" name="campo6" onChange={(e)=>{this.actualizarCampo(e)}}/>
            <button name="btn3" onClick={(e)=>{e.preventDefault(); this.estaCorreoRegistrado(e, "campo6")} }>CORREO REGISTRADO ?</button>
          </form>
          {
            this.state.errorReg2 == null ? (<div className="alert alert-success">correcto</div>) : (<div className="alert alert-danger">{this.state.errorReg2}</div>) 
          }
          <br/><br/>
          <button onClick={(e)=>this.prueba2()}>
            TEXTO
          </button>

          </div>

				</div>
      )
  }

  async prueba2(){
    let info = await ManejadorBD.buscarInformacion("Col1", ["c1", "c2"], ["==","<"], [10, 40])
    console.log(info)
  }


  constructor(props){
    super(props)
    this.state = {
      cont: 0,
      val: 0,
      val2: 1000,
      bd: [],
      errorReg: null,
      errorReg2: null,
      errorReg3: null,
      errorReg4: null,
    }
  }




  async registrarUsuario(e, campo, contrasena){
    try{
      e.preventDefault()
      let correo = this.state[campo] + "@prueba.com"
      let password = this.state[contrasena]
      if (password == undefined){
        password = "123456"
        
      }
      console.log(password + " $$$ ")
      let res = await Autenticador.registrarUsuario(correo, password)
      console.log(res)
      this.setState({errorReg: null})
    }
    catch(error){
      this.setState({errorReg : Autenticador.obtenerMensajeError(error)})
    }
  }

  async iniciarSesion(e, campo, contrasena){
    try{
      e.preventDefault()
      let correo = this.state[campo] + "@prueba.com"
      let password = this.state[contrasena]
      if (password == undefined){
        password = "123456"
        
      }
      console.log(password + " $$$ ")
      let res = await Autenticador.iniciarSesionUsuario(correo, password)
      console.log(res)
      this.setState({errorReg2: null})
    }
    catch(error){
      this.setState({errorReg2 : Autenticador.obtenerMensajeError(error)})
    }
  }

  async estaCorreoRegistrado(e, campo){
    try{
      e.preventDefault()
      let correo = this.state[campo] + "@prueba.com"

      let res = await Autenticador.emailEstaRegistrado(correo)
      this.setState({errorReg4 : Autenticador.obtenerMensajeError(res)})
      console.log(res)
    }
    catch(error){
      this.setState({errorReg4 : Autenticador.obtenerMensajeError(error)})
    }
  }







  modificar = () =>{
    if (this.state.cont % 2 === 0){
      this.setState( {val: this.state.val + 1} )  
    }
    else{
      this.setState( {val2: this.state.val2 - 1} )
    }
    this.setState( {cont: this.state.cont + 1} )
    console.log(this.state.cont + " CONT " + this.state.val + " " + this.state.val2)
  }

  
  actualizarCampo(e){
    const valor = e.target.value
    const campo = e.target.name
    this.setState( {
      [campo] : valor
    }, ()=> {this.actualizar(valor, campo) } )
  }

  async subirInformacion(e){
    e.preventDefault()
    const valor = e.target.value
    const campo = e.target.name
    let idMayor = 0


    if ( this.state.campo1 == undefined || !this.state.campo1.trim() ){
      
      const infoLeida = await DataBase.collection("prueba").where("miId", ">", 1).where("miId", "<=", 6).where("miId", "!=", 4)
      .get()
      const data = infoLeida.docs.map( doc => ({ id: doc.id, ...doc.data() }) )
      console.log(data)

      console.log(" VS ")
      let data4 = await new DataBaseTest().leerInfo()
      console.log(data4)


      return 
    }

    for(var i=0; i<this.state.bd.length; i++){
      console.log("Leido : " + this.state.bd[i].id)
      if (this.state.bd[i].miId > idMayor){
        idMayor = this.state.bd[i].miId
      }

    }
    idMayor++
    const nuevoObjeto = {
      name: this.state.campo1,
      miId: idMayor,
      date: Date.now()
    }
    let db = new DataBaseTest()
    db.escribirInfo(nuevoObjeto)
    let nuevoItem = [...this.state.bd, nuevoObjeto]
    this.setState( {bd: nuevoItem },()=>{})

    if ( nuevoObjeto.name == "Delete" ){
      console.log("Se supone toda la información sera borrada")
      db.borrarTodaInfo()
      this.setState({bd: []})
    }

    
  }

  actualizar(valor, campo){
    console.log(this.state[campo] + " ** " + valor)
  }

  


  async pruebaBaseDatos(){
    let data = new DataBaseTest()
    let value = await data.leerInfo()
    this.setState( {bd : value}, ()=>{ } )    
  }

  componentDidMount(){
    if ( false ){
      let dbt = new DataBaseTest()
      dbt.testFUncionamiento()
    }
    this.pruebaBaseDatos()   
  }

}

export default PaginaTest