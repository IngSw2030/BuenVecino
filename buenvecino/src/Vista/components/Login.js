import React, { Component } from "react";
import { Button } from "@material-ui/core";
import "../styles/Login.css";
import { Link } from 'react-router-dom'
import login from "../assets/Login.png"
import Controlador from "../../Controlador/Controlador";


class Login extends Component {

    constructor(props){
        super()
        this.state = {
            controlador: Controlador.getControlador()
        }
        this.refFormulario = React.createRef()
    }


    render() {
        return (
            <div className="Login">
                <div className="ingresar">
                    <img src={login} alt="icono Login" />
                    <h2>INGRESAR</h2>
                </div>
                <div className="formulario">
                    <form 
                        onSubmit = { async (e)=>{ await this.iniciarSesion(e)} }
                        ref={this.refFormulario}
                    >
                        <label for="correo">Correo Electronico</label>
                        <input type="email" placeholder=" Ingrese su correo " name="correo" required />

                        <label for="psw">Contraseña</label>
                        <input type="password" placeholder=" Ingrese su contraseña " name="psw" required />

                        <Button type="submit">Iniciar sesión</Button>

                        <div className="botones">
                        <Link to="/registrarUsuario"><button>REGISTRATE </button></Link>
                        <Button onClick={ (e)=>{this.props.cerrar()} }> 
                            Cancelar 
                        </Button>
                    </div>

                    </form>
                    
                </div>
            </div>
        );
    }

    bloquearSolicitudIngreso(){
        this.setState( {bloqueo: true} )
    }

    desbloquearSolicitudIngreso(){
        this.setState( {bloqueo: false} )
    }

    estaBloqueado(){
        if ( this.state.bloqueo === undefined || this.state.bloqueo === false ){
            return false
        }
        else{
            return true
        }
    }

    async iniciarSesion(e){        
        e.preventDefault()
        if ( this.state.controlador.existeUsuarioSesionActiva() ){
            console.log("CUIDADO, YA EXISTE SESIÓN")
            return
        }
        if ( !this.estaBloqueado() ){
            this.bloquearSolicitudIngreso()
        }
        else{
            return
        }
        let miFormulario = this.refFormulario.current
        let datos = new FormData( miFormulario )
        let email = datos.get( "correo" )
        let contrasena = datos.get( "psw" )

        let respuesta = await this.state.controlador.iniciarSesionUsuario(email, contrasena)
        if ( respuesta.idError === 0 ){
            this.mostrarResultado( respuesta.mensaje )
            this.props.cerrar()
        }
        else{
            this.mostrarResultado( respuesta.mensaje )
            console.log("ERROR")
        }
        this.desbloquearSolicitudIngreso()
        
    }

    mostrarResultado(mensaje){
        console.log( mensaje )
    }

  
}

export default Login;