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
        "title": "ESTRUCTURA-JSOn"
    }


    constructor(infoChat, idUsuarioLocal){
        this.state = {
            ...infoChat,
            listaMensajes: [],
            receptoresMensajes : [],
            idUsuarioLocal : idUsuarioLocal,
        }
    }

    async cargarMensajes(){
        //let mensajesChat = await ManejadorBD.realizarConsulta("Mensajes", ["idChat"], ["=="], [this.state.idFirebase])
        for(let i in this.state.mensajes){
            let mensajeActual = await ManejadorBD.leerInformacionDocumento("Mensajes", this.state.mensajes[i])
            let objMensajeActual = new Mensaje( mensajeActual )
            this.state.listaMensajes.push( objMensajeActual )
        }
        console.log("TOTAL MENSAJES : " + this.state.listaMensajes)
    }

    async agregarMensajeChat(mensaje, idRemitente){
        let objMensaje = {
            fecha : Date.now(),
            mensaje : mensaje,
            idChat : this.state.idFirebase,
            remitente : idRemitente
        }
        let idMensaje = await ManejadorBD.escribirInformacion("Mensajes", objMensaje)
        objMensaje = new Mensaje({...objMensaje, idFirebase: idMensaje})

        console.log("OBJETO ESCRITO : ", objMensaje)

        console.log("ANTES DE ", this.state.mensajes)
        this.state.mensajes.push( idMensaje )
        this.state.listaMensajes.push( objMensaje )
        console.log("DESPUES DE ", this.state.mensajes)
        let clausulaAgregar = Utils.clausulaAgregarElementoArrayFirebase(idMensaje)
        await ManejadorBD.actualizarInformacion("Chats", this.state.idFirebase, {mensajes: clausulaAgregar})
    }

    establecerReceptorMensajesChat(metodoReceptor){
        this.state.receptoresMensajes.push( metodoReceptor )
        return {idError: 0, mensaje: "Receptor de mensajes enlazado exitosamente"}
    }


    compararMensajes(mensaje1, mensaje2){
        if ( mensaje1.fecha < mensaje2.fecha ){
            return true
        }
        return false
    }

    async actualizarChat(chatActualizado){  
        let retornoMensaje = []

        console.log(chatActualizado.mensajes)
        console.log(this.state.listaMensajes)

        for( let i in chatActualizado.mensajes){
            if ( this.state.listaMensajes[i] != undefined ){
                retornoMensaje[i] = this.state.listaMensajes[i].state
                console.log("TENGO EL : ", retornoMensaje[i].idFirebase, ": ", this.state.listaMensajes[i])
            }
            else{
                retornoMensaje[i] = await ManejadorBD.leerInformacionDocumento("Mensajes", chatActualizado.mensajes[i])
                this.state.listaMensajes[i] = new Mensaje( retornoMensaje[i] )
                this.state.mensajes[i] = retornoMensaje[i].idFirebase
                console.log("NO TENGO EL : ", retornoMensaje[i].idFirebase)
            }
        }
        console.log("IMPLEMENTAR ACTUALIZADO INTELIGENTE")
        for(let i in this.state.receptoresMensajes){
            this.state.receptoresMensajes[i](this.state.idFirebase, retornoMensaje)
        }
    }

    async iniciarChat(){
        await this.cargarMensajes()
        this.actualizarChat = this.actualizarChat.bind(this)
        console.log("CUIDADO CON COMO SE LEEN LOS MENSAJE, TAL VEZ NO HAGA FALTA")
        ManejadorBD.escucharActualizacionesDocumento("Chats", this.state.idFirebase, this.actualizarChat)
    }

    
    static validarEstructuraObjeto(infoChat){
        var Validator = require('jsonschema').Validator
        var v = new Validator()
        return v.validate(infoChat, this.ESTRUCTURA_JSON)
    }

}

export default Chat