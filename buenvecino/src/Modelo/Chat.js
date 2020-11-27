import ManejadorBD from "./Firebase/ManejadorBD"
import Mensaje from "./Mensaje"
import Utils from "./Utils"

class Chat{

    static ESTRUCTURA_JSON = {
        "type": "object",
        "additionalProperties": false,
        "properties": {
            "usuario1": {
                "type": "string"
            },
            "usuario2": {
                "type": "string"
            },
            "mensajes": {
                "type": "array",
                "items": {
                    "type": "string",
                    "uniqueItems": true
                }
            }
        },
        "required": [
            "usuario1",
            "usuario2"
        ],
        "title": "ESTRUCTURA-JSON"
    }


    constructor(infoChat){
        if ( infoChat.state !== undefined ){
            infoChat = infoChat.state
        }
        this.state = {
            ...infoChat,
            listaMensajes: [],
            receptorMensajes : null,
        }
    }

    async actualizarChat(chatActualizado){  
        let mensajesActualizados = chatActualizado.mensajes
        let tamanoActualizado = mensajesActualizados.length
        let tamanoLocal = this.state.mensajes.length
        //Se agregó un mensaje
        if ( tamanoActualizado > tamanoLocal ){
            let nuevoMensaje = mensajesActualizados[tamanoActualizado - 1]
            this.state.mensajes[tamanoLocal] = nuevoMensaje
            nuevoMensaje = await ManejadorBD.leerInformacionDocumento("Mensajes", nuevoMensaje)
            this.state.listaMensajes[tamanoLocal] = new Mensaje( nuevoMensaje )
        }
        //Se eliminó un mensaje
        else if ( tamanoActualizado < tamanoLocal ){
            for(let i=0; i<tamanoLocal; i++){
                let persiste = false
                for(let j=0;  j<tamanoActualizado; j++){
                    if ( this.state.mensajes[i] === mensajesActualizados[j] ){
                        persiste = true
                        break
                    }
                }
                if ( !persiste ){
                    this.state.mensajes.splice(i, 1)
                    this.state.listaMensajes.splice(i, 1)
                    break
                }
            }
        }
        if ( this.state.receptorMensajes !== null ){
            let retorno = this.state.listaMensajes.map( (actual) => {return actual.state} )
            this.state.receptorMensajes( this.state.idFirebase, retorno )
        }
    }

    async agregarMensajeChat(mensaje, idRemitente){
        let objMensaje = {
            momento : Date.now(),
            mensaje : mensaje,
            idChat : this.state.idFirebase,
            remitente : idRemitente
        }
        let erroresObjeto = Mensaje.validarEstructuraObjeto(objMensaje)
        if ( erroresObjeto.errors.length > 0 ){
            return {idError: 2, mensaje: erroresObjeto}
        }
        let idMensaje = await ManejadorBD.escribirInformacion("Mensajes", objMensaje)
        let clausulaAgregar = Utils.clausulaAgregarElementoArrayFirebase(idMensaje)
        await ManejadorBD.actualizarInformacion("Chats", this.state.idFirebase, {mensajes: clausulaAgregar})
    }

    async cargarMensajes(){
        if ( this.state.listaMensajes === [] ){
            let mensajes = await ManejadorBD.realizarConsulta("Mensajes", ["idChat"], ["=="], [this.state.idFirebase])
            Utils.ordenarArray(mensajes, this.compararMensajes)
            for(let i in mensajes){
                this.state.listaMensajes.push( new Mensaje(mensajes[i]) )
            }
        }
        
    }

    compararMensajes(mensaje1, mensaje2){
        return mensaje1.momento > mensaje2.momento
    }

    eliminarMensajeChat(idMensaje, idSolicitante){
        for(let i in this.state.mensajes){
            if ( this.state.mensajes[i] === idMensaje ){
                if ( !this.state.listaMensajes[i].perteneceA(idSolicitante) ){
                    return {idError: 4, mensaje: "El mensaje no pertenece a quien lo intenta eliminar"}
                }
                if ( !this.state.listaMensajes[i].vencioTiempoEliminacion() ){
                    let clausulaBorrado = { mensajes: Utils.clausulaEliminarElementoArrayFirebase( idMensaje ) }
                    ManejadorBD.actualizarInformacion("Chats", this.state.idFirebase, clausulaBorrado)
                    ManejadorBD.borrarInformacion( "Mensajes", idMensaje )
                    return {idError: 0, mensaje: "Mensaje eliminado exitosamente"}
                }
                else{
                    return {idError: 3, mensaje: "Tiempo de eliminación excedido"}
                }
            }
        }
        return {idError: 2, mensaje: "Mensaje no encontrado"}
    }

    establecerReceptorMensajesChat(metodoReceptor){
        this.state.receptorMensajes = metodoReceptor
        return {idError: 0, mensaje: "Receptor de mensajes enlazado exitosamente"}
    }
   
    async iniciarChat(){
        await this.cargarMensajes()
        this.actualizarChat = this.actualizarChat.bind(this)
        ManejadorBD.escucharActualizacionesDocumento("Chats", this.state.idFirebase, this.actualizarChat)
    }

    obtenerMensajesCargadosChat(){
        let respuesta = {
            idError: 0,
            mensaje: this.state.listaMensajes.map( (mensaje) =>{ return mensaje.state } )
        }
        return respuesta
    }

    transformarInformacionJSON(){
        for(let i in this.state.listaMensajes){
            this.state.listaMensajes[i] = new Mensaje( this.state.listaMensajes[i].state )
        }
        this.iniciarChat()
    }
    
    static validarEstructuraObjeto(infoChat){
        var Validator = require('jsonschema').Validator
        var v = new Validator()
        return v.validate(infoChat, this.ESTRUCTURA_JSON)
    }

}

export default Chat