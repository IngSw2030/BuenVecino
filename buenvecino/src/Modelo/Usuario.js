import Chat from './Chat'
import ManejadorBD from './Firebase/ManejadorBD'
import SolicitudReserva from './SolicitudReserva'

import Utils from './Utils'


class Usuario{

    constructor(infoUsuario){
        this.state = {
            ...infoUsuario,
            ...Utils.agregarCamposSiNoExisten(infoUsuario, ["chats", "solicitudes"], []),
            receptorChat: null,
            receptorListaSolicitudes: null,
            
        }
    }

    async actualizarEstado(usuarioActualizado){
        if ( usuarioActualizado.chats == undefined ){
            console.log("UNDEFINED EN ACTUALIZR ESTADO USUARIO")
            return
        }
        if ( usuarioActualizado.chats.length != this.state.chats.length ){
            this.actualizacionChats(usuarioActualizado.chats)
        }
        if( usuarioActualizado.solicitudes.length != this.state.solicitudes.length ){
            this.actualizarListaSolicitudes(usuarioActualizado.solicitudes)
        }
    }

    async actualizarListaChat(actualizacionChats){
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
        if ( this.state.receptorChat != null ){
            let nuevosChats = this.state.listaChats.map( (chat) => {return chat.state} )
            this.state.receptorChat( nuevosChats )
        }
    }

    async actualizarListaSolicitudes(actualizacionSolicitudes){
        let tamanoActualizado = actualizacionSolicitudes.length
        let tamanoLocal = this.state.solicitudes.length
        //Si hay una nueva solicitud en la lista de solicitudes
        //Afecta solo al arrendador, el arrendatario ya la tiene en su información local
        if ( tamanoActualizado > tamanoLocal ){
            this.state.solicitudes[tamanoLocal] = actualizacionSolicitudes[ tamanoActualizado - 1 ]
            let solicitudDesconocida = await ManejadorBD.leerInformacionDocumento("Solicitudes", this.state.solicitudes[tamanoLocal])
            let nuevoObjetoSolicitud = new SolicitudReserva( solicitudDesconocida )
            nuevoObjetoSolicitud.iniciarEscuchaActualizaciones()
            this.state.listaSolicitudes[tamanoLocal] = nuevoObjetoSolicitud
        }
        //Si se eliminó una solicitud, el cambio es de cada usuario, por lo que no afectaría al otro usuario
        else if ( tamanoActualizado > tamanoLocal ){
            return
        }
        if ( this.state.receptorListaSolicitudes != null ){
            let nuevasSolicitudes = this.state.listaSolicitudes.map( (solicitud) => {return solicitud.state} )
            this.state.receptorListaSolicitudes( nuevasSolicitudes )
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

    cambiarEstadoSolicitudLocalmente(idSolicitud, nuevoEstado){
        for(let i in this.state.listaSolicitudes){
            if ( this.state.listaSolicitudes[i].state.idFirebase === idSolicitud ){
                return this.state.listaSolicitudes[i].cambiarEstado(nuevoEstado) 
            }
        }
        return {idError: 1, mensaje: "Solicitud no encontrada"}
    }

    cambiarEstadoSolicitudBaseDatos(idSolicitud, nuevoEstado){
        let cambio = {
            estado: nuevoEstado
        }
        ManejadorBD.actualizarInformacion("Solicitudes", idSolicitud, cambio)
    }

    async cargarInformacionAdicional(){
        this.actualizarEstado = this.actualizarEstado.bind(this)  
        await this.cargarInformacionAdicionalChats()
        await this.cargarInformacionAdicionalSolicitudes()

        //Escuchar actualizaciones desde la BD
        let coleccion = this.obtenerColeccionCorrespondienteUsuario()
        ManejadorBD.escucharActualizacionesDocumento(coleccion, this.state.idFirebase, this.actualizarEstado)
    }

    async cargarInformacionAdicionalChats(){
        let listaChats = []
        for(let i in this.state.chats ){
            //CUIDADO: Se puede optimizar con una consulta
            let objeto = await ManejadorBD.leerInformacionDocumento("Chats", this.state.chats[i])
            listaChats[i] = new Chat (objeto)
            listaChats[i].iniciarChat()
        }
        this.state = {
            ...this.state,
            listaChats : listaChats,
            receptorChat : null
        }
         
    }

    async cargarInformacionAdicionalSolicitudes(){
        let listaSolicitudes = []
        let tipoId = this.obtenerTipoIdCorrespondienteUsuario()
        let solicitudesBD = await ManejadorBD.realizarConsulta("Solicitudes", [tipoId], ["=="], [this.state.idFirebase])
        //Filtrar solo las solicitudes activas
        //Por el momento las eliminadas no se borran de la lista de solicitudes
        for(let i in solicitudesBD){
            for (let j in this.state.solicitudes ){
                if ( solicitudesBD[i].idFirebase == this.state.solicitudes[j] ){
                    let nuevaSolicitud = new SolicitudReserva(solicitudesBD[i])
                    nuevaSolicitud.iniciarEscuchaActualizaciones()
                    listaSolicitudes.push( nuevaSolicitud )
                }
            }
        }
        this.state = {
            ...this.state,
            listaSolicitudes: listaSolicitudes
        }
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

    //Se eliminan a nivel personal, la decision no elimina ni la solicitud ni se la elimina al otro usuario
    async eliminarSolicitudReserva(idSolicitud){
        for(let i in this.state.solicitudes){
            if ( this.state.solicitudes[i] == idSolicitud ){
                let coleccion = this.obtenerColeccionCorrespondienteUsuario()
                let clausulaBorrar = {solicitudes: Utils.clausulaEliminarElementoArrayFirebase(idSolicitud)}
                this.state.solicitudes.splice(i, 1)
                this.state.listaSolicitudes.splice(i, 1)
                await ManejadorBD.actualizarInformacion(coleccion, this.state.idFirebase, clausulaBorrar)
                ManejadorBD.detenerEscuchaActualizacionesDocumento("Solicitudes", idSolicitud)
                return {idError: 0, mensaje: "Solicitud eliminada exitosamente"}
            }
        }
        return {idError: 1, mensaje: "Solicitud de reserva no encontrada"}
    }

    establecerReceptorChats(metodoReceptor){
        this.state.receptorChat = metodoReceptor
        return {idError: 0, mensaje: "Receptor de Chats enlazado correctamente"}
    }

    establecerReceptorListaSolicitudes(metodoReceptor){
        this.state.receptorListaSolicitudes = metodoReceptor
        return {idError: 0, mensaje: "Receptor de Lista de Solicitudes enlazado correctamente"}
    }

    establecerReceptorMensajesChat(idChat, metodoReceptor){
        for(let i in this.state.chats){
            if ( this.state.chats[i] == idChat ){
                return this.state.listaChats[i].establecerReceptorMensajesChat(metodoReceptor)
            }
        }
        return {idError: 1, mensaje: "Chat no encontrado"}
    }

    establecerReceptorSolicitudes(metodoReceptor){
        return SolicitudReserva.establecerReceptorSolicitudes(metodoReceptor) 
    }
    
    obtenerColeccionCorrespondienteUsuario(){
        if  (this.state.inmuebles != undefined ){
            return "Arrendadores"
        }
        else {
            return "Arrendatarios"
        }
    }

    obtenerSolicitudesCargadas(){
        return this.state.listaSolicitudes.map( (item) => {return item.state} )
    }

    obtenerTipoIdCorrespondienteUsuario(){
        if  (this.state.inmuebles != undefined ){
            return "idArrendador"
        }
        else {
            return "idArrendatario"
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