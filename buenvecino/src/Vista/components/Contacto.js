import React, { Component } from "react";
import '../styles/Contacto.css'
import { Avatar } from '@material-ui/core';
import Controlador from "../../Controlador/Controlador";


class Contacto extends Component {
    
    constructor(props){
        super()
        this.state = {
            controlador: Controlador.getControlador(),
            nombreUsuario: "",
            ultimoMensaje: ""
        }
    }

    async componentDidMount(){
        let idUsuario2 = this.props.infoChat.usuario1
        console.log( this.props.infoChat, " LO QUE ME DAN" )
        if ( this.state.controlador.obtenerUsuarioActivo().idFirebase === idUsuario2 ){
            idUsuario2 = this.props.infoChat.usuario2
        }
        let usuario = await this.state.controlador.obtenerInformacionUsuario( idUsuario2 )
        if ( usuario !== null ){
            this.setState({
                nombreUsuario: usuario.nombre,
                foto: usuario.fotoPerfil
            })
        }
        console.log( this.state )
    }

    render() {
        return (
            <div className="contacto">
                {/* <img/> */}
                <button>
                    <img src={this} />
                    <p>{this.state.nombreUsuario}</p>
                </button>
            </div>
        );
    }
}

export default Contacto;
