import React, { Component } from "react";
import '../styles/Contacto.css'
import { Avatar } from '@material-ui/core';
import Controlador from "../../Controlador/Controlador";


class Contacto extends Component {
    
    constructor(props){
        super()
        this.state = {
            nombreUsuario: "",
            ultimoMensaje: ""
        }
    }

    async componentDidMount(){
        let idUsuario2 = this.props.infoChat.usuario1
        if ( Controlador.getControlador().obtenerUsuarioActivo().idFirebase === idUsuario2 ){
            idUsuario2 = this.props.infoChat.usuario2
        }
        let usuario = await Controlador.getControlador().obtenerInformacionUsuario( idUsuario2 )
        if ( usuario !== null ){
            this.setState({
                nombreUsuario: usuario.nombre,
                foto: usuario.fotoPerfil
            })
        }
    }

    render() {
        return (
            <div className="contacto">
                {/* <img/> */}
                <button onClick={this.notificarCambio}>
                    <img src={this} />
                    <p>{this.state.nombreUsuario}</p>
                </button>
            </div>
        );
    }

    notificarCambio = () =>{
        this.props.notificarCambio( this.props.indexChat )
    }
}

export default Contacto;
