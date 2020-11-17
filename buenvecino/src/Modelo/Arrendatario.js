import Chat from './Chat'
import ManejadorBD from './Firebase/ManejadorBD'
import Utils from './Utils'

class Arrendatario{
    
    static ESTRUCTURA_JSON = {
        "type": "object",
        "additionalProperties": false,
        "properties": {
            "nombre": {
                "type": "string"
            },
            "dni": {
                "type": "integer"
            },
            "tipoDni": {
                "type": "string",
                "enum": ["CC", "CE", "TI", "PA"]
            },
            "genero": {
                "type": "string",
                "enum": ["M", "F", "O", "N"]
            },
            "fechaNacimiento": {
                "type": "integer"
            },
            "email": {
                "type": "string"
            },
            "telefono": {
                "type": "integer"
            }
        },
        "required": [
            "dni",
            "email",
            "fechaNacimiento",
            "genero",
            "nombre",
            "telefono",
            "tipoDni"
        ],
        "title": "ESTRUCTURA_JSON"
    }

    constructor(infoUsuario){
        this.state = {
            ...infoUsuario,
            ...Utils.agregarCamposSiNoExisten(infoUsuario, ["chats", "favoritos", "historialInmuebles", "metodoPago"])        
        }
    }

    async cargarInformacionAdicional(){
        console.log("INFORMACION ADICIONAL ARRENDATARIO AUN NO IMPLEMENTADA TOTALEMENTE")
        await this.cargarInformacionAdicionalChats()
    }

    async cargarInformacionAdicionalChats(){
        let chatsArray = this.state.chats
        let listaChats = []
        for(let i in chatsArray ){
            let objeto = await ManejadorBD.leerInformacionDocumento("Chats", chatsArray[i])
            listaChats[i] = new Chat(objeto, this.state.idFirebase)
            listaChats[i].iniciarChat()
        }
        this.state = {
            ...this.state,
            listaChats : listaChats
        }
    }

    establecerReceptorMensajesChat(idChat, metodoReceptor){
        let chatsArray = this.state.listaChats
        for(let i in chatsArray ){
            if ( chatsArray[i].state.idFirebase == idChat ){
                return chatsArray[i].establecerReceptorMensajesChat(metodoReceptor)
            }
        }
        return {idError: 1, mensaje: "Chat no encontrado"}
    }

    async agregarMensajeChat(idChat, mensaje){
        for(let i in this.state.listaChats){
            if ( this.state.listaChats[i].state.idFirebase == idChat ){
                return this.state.listaChats[i].agregarMensajeChat(mensaje, this.state.idFirebase)
            }
        }
    }

    static validarEstructuraObjeto(infoArrendatario){
        let Validator = require('jsonschema').Validator;
        let v = new Validator();
        return v.validate(infoArrendatario, this.ESTRUCTURA_JSON) 
    }
}

export default Arrendatario