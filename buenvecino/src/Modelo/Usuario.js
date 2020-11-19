import Chat from './Chat'
import ManejadorBD from './Firebase/ManejadorBD'

import Utils from './Utils'


class Usuario{

    constructor(){
        
    }

    async actualizarListaChat(usuarioActualizado){
        if ( usuarioActualizado == undefined ){
            console.log("UNDEFINED EN ACTUALIZR LISTA CHATS")
            return {}
        }
        let actualizacionChats = usuarioActualizado.chats
        let tamanoActualizado = actualizacionChats.length
        let tamanoLocal = this.state.chats.length
        //Si hay un nuevo chat en la lista de chats
        if ( tamanoActualizado > tamanoLocal ){
            this.state.chats[tamanoLocal] = actualizacionChats[ tamanoActualizado - 1 ]
            let chatDesconocido = await ManejadorBD.leerInformacionDocumento("Chats", this.state.chats[tamanoLocal])
            let nuevoObjetoChat = new Chat( chatDesconocido )
            this.state.listaChats[tamanoLocal] = nuevoObjetoChat
            this.state.listaChats[tamanoLocal].iniciarChat()
        }
        //Si se eliminó un chat de la lista de chats (aun no implementado)
        else if ( tamanoActualizado > tamanoLocal ){

        }
        //No hubo cambios, (tal vez sea util después si hay que escuchar mas cosas)
        else{
            
        }
        if ( this.state.receptorChat != null ){
            let nuevosChats = this.state.listaChats.map( (chat) => {return chat.state} )
            this.state.receptorChat( nuevosChats )
        }
    }

    async agregarMensajeChat(idChat, mensajeNuevo){
        for(let i in this.state.chats){
            if ( this.state.chats[i] == idChat ){
                return await this.state.listaChats[i].agregarMensajeChat(mensajeNuevo, this.state.idFirebase)
            }
        }
        return {idRespuesta: 1, mensaje: "Chat no encontrado"}
    }

    async cargarInformacionAdicional(){
        await this.cargarInformacionAdicionalChats()
    }

    async cargarInformacionAdicionalChats(){
        let chatsArray = this.state.chats
        let listaChats = []
        for(let i in chatsArray ){
            let objeto = await ManejadorBD.leerInformacionDocumento("Chats", chatsArray[i])
            listaChats[i] = new Chat (objeto)
            listaChats[i].iniciarChat()
        }
        this.state = {
            ...this.state,
            listaChats : listaChats,
            receptorChat : null
        }
        this.actualizarListaChat = this.actualizarListaChat.bind(this)
        let colecccion = this.state.inmuebles == undefined ? "Arrendatario" : "Arrendador"
        ManejadorBD.escucharActualizacionesDocumento(colecccion, this.state.idFirebase, this.actualizarListaChat) 
    }

    async crearChat(idUsuario2){
        let infoChat = {
            usuario1: this.state.idFirebase,
            usuario2: idUsuario2,
            mensajes: []
        }
        let erroresObjeto = Chat.validarEstructuraObjeto(infoChat) 
        if ( erroresObjeto.errors.length > 0 ){
            return {idError: 3, mensaje: erroresObjeto}
        }
        let idNuevoChat = await ManejadorBD.escribirInformacion("Chats", infoChat)
        infoChat = {...infoChat, idFirebase : idNuevoChat}
        let coleccion = this.obtenerColeccionCorrespondienteUsuario()
        let clausulaAgregar = {chats: Utils.clausulaAgregarElementoArrayFirebase(idNuevoChat) }
        ManejadorBD.actualizarInformacion(coleccion, this.state.idFirebase, clausulaAgregar)
    }

    eliminarMensajeChat(idChat, idMensaje){
        for(let i in this.state.chats){
            if ( this.state.chats[i] == idChat ){
                return this.state.listaChats[i].eliminarMensajeChat(idMensaje, this.state.idFirebase)
            }
        }
        return {idError: 1, mensaje: "El chat no existe"}
    }

    establecerReceptorChats(metodoReceptor){
        this.state.metodoReceptor = metodoReceptor
        return {idError: 0, mensaje: "Receptor de Chats enlazado correctamente"}
    }

    establecerReceptorMensajesChat(idChat, metodoReceptor){
        for(let i in this.state.chats){
            if ( this.state.chats[i] == idChat ){
                return this.state.listaChats[i].establecerReceptorMensajesChat(metodoReceptor)
            }
        }
        return {idError: 1, mensaje: "Chat no encontrado"}
    }

    async obtenerColeccionCorrespondienteUsuario(){
        if  (this.state.inmuebles != undefined ){
            return "Arrendador"
        }
        else {
            return "Arrendatario"
        }
    }

    obtenerMensajesCargadosChat(idChat){
        for(let i in this.state.chats){
            if ( this.state.chats[i] == idChat ){
                return this.state.listaChats[i].obtenerMensajesCargadosChat()
            }
        }
        return {idError: 1, mensaje: "Chat no encontrado"}   
    }

    

}

export default Usuario