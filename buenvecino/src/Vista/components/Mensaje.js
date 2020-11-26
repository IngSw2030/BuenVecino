import { Button } from "@material-ui/core";
import React, { Component } from "react";
import '../styles/Mensaje.css'


class Mensaje extends Component {
    render() {
        return (
            <div className="Mensaje">
                <div className="mensa">
                    <p className="emisor">Aca se envio el Mensaje</p>
                    <p className="receptor"> Aca se envio otro Mensaje</p>
                    <p className="receptor"> aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaoooooooooooooooooooooooooooooo</p>
                    <p className="emisor">eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeoooooooooooooooooooooooo</p>
                    <p className="emisor">Holaaaaaaaaaaaa eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeoooooooooooooooooooooooo</p>
                    
                    
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