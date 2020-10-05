import React, { Component } from 'react'

import DataBaseTest from '../DataBaseTest'


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
              if ( num != 1 ){
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


				</div>
      )
  }

  constructor(props){
    super(props)
    this.state = {
      cont: 0,
      val: 0,
      val2: 1000,
      bd: []
    }
  }

  modificar = () =>{
    let antVal = this.state.val
    if (this.state.cont % 2 == 0){
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

  subirInformacion(e){
    e.preventDefault()
    const valor = e.target.value
    const campo = e.target.name
    let idMayor = 0
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
    if ( true ){
      let dbt = new DataBaseTest()
      dbt.testFUncionamiento()
    }
    this.pruebaBaseDatos()   
  }

  componentWillMount(){

  }

}

export default PaginaTest