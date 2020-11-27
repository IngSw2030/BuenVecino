import { Button } from "@material-ui/core";
import React, { Component } from "react";
import Controlador from "../../Controlador/Controlador";
import '../styles/Mensaje.css'


class Mensaje extends Component {
    
    constructor(props){
        super()
        let idActivo = Controlador.getControlador().obtenerUsuarioActivo().idFirebase
        this.state = {
            mensajes: []
        }
        this.recibirActualizacionMensaje = this.recibirActualizacionMensaje.bind( this )
        this.refMensaje = React.createRef()

        
    }

    componentDidMount(){
        Controlador.getControlador().establecerReceptorMensajesChat( this.props.idChat, this.recibirActualizacionMensaje )
        this.setState( {
            mensajes: this.props.mensajes.map( (item) =>{ return item.state }) 
        } )
    }

    render() {
        return (
            <div className="Mensaje">
                <div className="mensa">
                    {
                        this.state.mensajes.map( (item, index)=>{
                            if ( item.remitente === this.state.idUsuario ){
                                return <p className="emisor">{item.mensaje}</p>
                            }
                            else{
                                return <p className="receptor">{item.mensaje}</p>
                            }
                        } )
                    }                    
                </div>
                <div className="Enviar">
                    <input type="text" ref={this.refMensaje} />
                    <Button onClick={ (e)=>{this.enviarMensaje()} }
                    >
                        Enviar
                    </Button>
                </div>
            </div>
        );
    }

    recibirActualizacionMensaje(idChat, listaMensajes){
        this.setState( {mensajes: listaMensajes} )
    }

    async enviarMensaje(){
        let mensaje = this.refMensaje.current.value.trim()
        if ( mensaje !== "" ){
            let respuesta = await Controlador.getControlador().agregarMensajeChat(this.props.idChat, mensaje)
            this.refMensaje.current.value = ""
        }
    }
}

export default Mensaje;