import SistemaBV from '../Modelo/SistemaBV'

class Controlador{

    static instanciaControlador = null

    constructor(){
        this.modelo = new SistemaBV()
    }

    async aceptarSolicitudReserva(idSolicitud){
        return this.modelo.aceptarSolicitudReserva(idSolicitud)
    }

    async agregarFavorito(favorito){
        return await this.modelo.agregarFavorito(favorito)
    }

    async agregarMensajeChat(idChat, mensaje){
        return await this.modelo.agregarMensajeChat(idChat, mensaje)
    }

    async buscarInmueblesIniciales(cantInmuebles = 3){
        return await this.modelo.buscarInmueblesIniciales(cantInmuebles)
    }    

    async buscarInmueblesPorBarrioLocalidad(sitio){
        return await this.modelo.buscarInmueblesPorBarrioLocalidad(sitio)
    }

    async buscarInmueblePorTipo(tipoInmueble){
        return await this.modelo.buscarInmueblePorTipo(tipoInmueble)
    }

    async buscarTodosInmuebles(){
        return this.modelo.buscarTodosInmuebles()
    }

    async cargarFotosInmueble(idInmueble, archivos){
        return await this.modelo.cargarFotosInmueble(idInmueble, archivos)
    }

    cancelarSolicitudReserva(idSolicitud){
        return this.modelo.cancelarSolicitudReserva(idSolicitud)
    }

    async cerrarSesion(){
        this.modelo.cerrarSesion()
    }

    async confirmarSolicitudReserva(idSolicitud){
        return await this.modelo.confirmarSolicitudReserva(idSolicitud)
    }

    async crearChat(idUsuario2, primerMensaje){
        return await this.modelo.crearChat(idUsuario2, primerMensaje)
    }

    async crearSolicitudReserva(infoReserva){
        infoReserva.fechaInicio = infoReserva.fechaInicio.getTime()
        infoReserva.fechaFin = infoReserva.fechaFin.getTime()
        return await this.modelo.crearSolicitudReserva(infoReserva);
    }

    async eliminarInmueble(idInmueble){
        return await this.modelo.eliminarInmueble(idInmueble)
    }

    eliminarFavorito(idFavorito){
        return this.modelo.eliminarFavorito(idFavorito)
    }

    eliminarMensajeChat(idChat, idMensaje){
        return this.modelo.eliminarMensajeChat(idChat, idMensaje)
    }

    eliminarValoracion(idValoracion){
        return this.modelo.eliminarValoracion(idValoracion)
    }

    establecerReceptorChats(metodoReceptor){
        return this.modelo.establecerReceptorChats(metodoReceptor)
    }   

    establecerReceptorListaSolicitudes(metodoReceptor){
        return this.modelo.establecerReceptorListaSolicitudes(metodoReceptor)
    }

    establecerReceptorListaValoraciones(metodoReceptor){
        return this.modelo.establecerReceptorListaValoraciones(metodoReceptor)
    }

    establecerReceptorMensajesChat(idChat, metodoReceptor){
        return this.modelo.establecerReceptorMensajesChat(idChat, metodoReceptor)
    }

    establecerReceptorSolicitudes(metodoReceptor){
        return this.modelo.establecerReceptorSolicitudes(metodoReceptor)
    }

    async iniciarSesionUsuario(email, contrasena){
        return await this.modelo.iniciarSesionUsuario(email, contrasena)
    }

    async modificarInmueble(idInmueble, camposModificados){
        return await this.modelo.modificarInmueble(idInmueble, camposModificados)
    }

    async modificarValoracion(idValoracion, camposModificados){
        return await this.modelo.modificarValoracion(idValoracion, camposModificados)
    }

    obtenerInmueblesCargados(){
        return this.modelo.obtenerInmueblesCargados()
    }

    obtenerMensajesCargadosChat(idChat){
        return this.modelo.obtenerMensajesCargadosChat(idChat)
    }

    obtenerSolicitudesCargadas(){
        return this.modelo.obtenerSolicitudesCargadas()
    }

    obtenerUsuarioActivo(){
        return this.modelo.obtenerUsuarioActivo().state
    }

    obtenerValoracionesHechas(){
        return this.modelo.obtenerValoracionesHechas()
    }

    obtenerValoracionesRecibidas(){
        return this.modelo.obtenerValoracionesRecibidas()
    }

    async realizarPago(idSolicitud, infoPago){
        return await this.modelo.realizarPago(idSolicitud, infoPago)
    }

    async realizarValoracion(infoValoracion){
        return await this.modelo.realizarValoracion(infoValoracion)
    }

    rechazarSolicitudReserva(idSolicitud){
        return this.modelo.rechazarSolicitudReserva(idSolicitud)
    }

    async registrarInmueble(infoInmueble){
        return this.modelo.registrarInmueble(infoInmueble)
    }

    async registrarUsuario(infoUsuario, esArrendatario, email, contrasena){
        return await this.modelo.registrarUsuario(infoUsuario, esArrendatario, email, contrasena)
    }

    static getControlador(){
        if ( this.instanciaControlador == null ){
            this.instanciaControlador = new Controlador()
        }
        return this.instanciaControlador
    }

    async pruebaX(param=null){
        return await this.modelo.pruebaX(param)
    }
}


export default Controlador

