import { Button } from "@material-ui/core";
import React, { Component } from "react";
import Controlador from "../../Controlador/Controlador";
import '../styles/Mensaje.css'


class Mensaje extends Component {
    
    constructor(props){
        super()
        let idActivo = Controlador.getControlador().obtenerUsuarioActivo().idFirebase
        this.state = {
            idUsuario: idActivo,
            controlador: Controlador.getControlador()
        }
        console.log( props, " PPPORPRORR PROPS" )
    }

    componentDidMount(){
        console.log( this.props.mensajes , " JAJAJAAJ")
    }
    
    render() {
        return (
            <div className="Mensaje">
                <div className="mensa">
                    {
                        this.props.mensajes.map( (item, index)=>{
                            console.log("MAPPED : ", item.state.mensaje)
                            if ( item.state.remitente === this.state.idUsuario ){
                                return <p className="emisor">{item.state.mensaje}</p>
                            }
                            else{
                                return <p className="receptor">{item.state.mensaje}</p>
                            }
                        } )
                    }                    
                </div>
                <div className="Enviar">
                <input type="text"/>
                <Button>Enviar</Button>
                </div>
            </div>
        );
    }
}

export default Mensaje;