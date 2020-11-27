import SistemaBV from '../Modelo/SistemaBV'

class Controlador{

    static instanciaControlador = null

    constructor(lc = null){
        if ( lc !== null ){
            this.modelo = new SistemaBV(lc)
        }
        else{
            this.modelo = new SistemaBV()
        }
    }

    async aceptarSolicitudReserva(idSolicitud){
        let respuesta = this.modelo.aceptarSolicitudReserva(idSolicitud)
        Controlador.almacenarLocalStorage()
        return respuesta
    }

    async agregarFavorito(favorito){
        let respuesta =  await this.modelo.agregarFavorito(favorito)
        Controlador.almacenarLocalStorage()
        return respuesta
    }

    async agregarMensajeChat(idChat, mensaje){
        let respuesta =  await this.modelo.agregarMensajeChat
        Controlador.almacenarLocalStorage()(idChat, mensaje)
        return respuesta
    }

    agregarServiciosInmueble(idInmueble, idServicios){
        let respuesta =  this.modelo.agregarServiciosInmueble(idInmueble, idServicios)
        Controlador.almacenarLocalStorage()
        return respuesta
    }

    buscarFavorito(idInmueble){
        let respuesta = this.modelo.buscarFavorito(idInmueble)
        Controlador.almacenarLocalStorage()
        return respuesta !== null ? respuesta.state : respuesta
    }

    async buscarInmueblesIniciales(cantInmuebles = 3){
        let respuesta =  await this.modelo.buscarInmueblesIniciales(cantInmuebles)
        Controlador.almacenarLocalStorage()
        return respuesta
    }    

    async buscarInmueblesPorBarrioLocalidad(sitio){
        let respuesta =  await this.modelo.buscarInmueblesPorBarrioLocalidad(sitio)
        Controlador.almacenarLocalStorage()
        return respuesta
    }

    async buscarInmueblePorTipo(tipoInmueble){
        let respuesta =  await this.modelo.buscarInmueblePorTipo(tipoInmueble)
        Controlador.almacenarLocalStorage()
        return respuesta
    }

    async buscarTodosInmuebles(){
        let respuesta =  this.modelo.buscarTodosInmuebles()
        Controlador.almacenarLocalStorage()
        return respuesta
    }

    cancelarSolicitudReserva(idSolicitud){
        let respuesta =  this.modelo.cancelarSolicitudReserva(idSolicitud)
        Controlador.almacenarLocalStorage()
        return respuesta
    }

    async cerrarSesion(){
        this.modelo.cerrarSesion()
        localStorage.removeItem("Controlador")
    }

    async confirmarSolicitudReserva(idSolicitud){
        let respuesta =  await this.modelo.confirmarSolicitudReserva(idSolicitud)
        Controlador.almacenarLocalStorage()
        return respuesta
    }

    async crearChat(idUsuario2, primerMensaje){
        let respuesta =  await this.modelo.crearChat(idUsuario2, primerMensaje)
        Controlador.almacenarLocalStorage()
        return respuesta   
    }

    async crearSolicitudReserva(infoReserva){
        let respuesta =  await this.modelo.crearSolicitudReserva(infoReserva);
        Controlador.almacenarLocalStorage()
        return respuesta
    }

    async eliminarInmueble(idInmueble){
        let respuesta =  await this.modelo.eliminarInmueble(idInmueble)
        Controlador.almacenarLocalStorage()
        return respuesta
    }

    eliminarFavorito(idFavorito){
        let respuesta =  this.modelo.eliminarFavorito(idFavorito)
        Controlador.almacenarLocalStorage()
        return respuesta
    }

    eliminarMensajeChat(idChat, idMensaje){
        let respuesta =  this.modelo.eliminarMensajeChat(idChat, idMensaje)
        Controlador.almacenarLocalStorage()
        return respuesta
    }

    eliminarValoracion(idValoracion){
        let respuesta =  this.modelo.eliminarValoracion(idValoracion)
        Controlador.almacenarLocalStorage()
        return respuesta
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
        return  this.modelo.establecerReceptorMensajesChat(idChat, metodoReceptor)
    }

    establecerReceptorSolicitudes(metodoReceptor){
        return this.modelo.establecerReceptorSolicitudes(metodoReceptor)
    }

    existeUsuarioSesionActiva(){
        let respuesta =  this.modelo.existeUsuarioSesionActiva()
        Controlador.almacenarLocalStorage()
        return respuesta
    }

    async iniciarSesionUsuario(email, contrasena){
        let respuesta = await this.modelo.iniciarSesionUsuario(email, contrasena)
        Controlador.almacenarLocalStorage()
        return respuesta
    }

    async modificarInmueble(idInmueble, camposModificados){
        let respuesta =  await this.modelo.modificarInmueble(idInmueble, camposModificados)
        Controlador.almacenarLocalStorage()
        return respuesta
    }

    async modificarValoracion(idValoracion, camposModificados){
        let respuesta =  await this.modelo.modificarValoracion(idValoracion, camposModificados)
        Controlador.almacenarLocalStorage()
        return respuesta
    }

    obtenerChatsCargados(){
        return this.modelo.obtenerChatsCargados().map( e => e.state )
        
    }

    async obtenerFotoPerfil(){
        return await this.modelo.obtenerFotoPerfil()
    }

    async obtenerInformacionUsuario(idUsuario){
        return await this.modelo.obtenerInformacionUsuario(idUsuario)
    }

    async obtenerInmueble(idInmueble){
        let resultado = await this.modelo.obtenerInmueble(idInmueble)
        return resultado !== null ? resultado.state : null
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

    obtenerTipoUsuarioActivo(){
        return this.modelo.obtenerTipoUsuarioActivo()
    }

    obtenerUsuarioActivo(){
        let respuesta = this.modelo.obtenerUsuarioActivo()
        return respuesta !== null ? respuesta.state : null
    }

    obtenerValoracionesHechas(){
        return this.modelo.obtenerValoracionesHechas()
    }

    obtenerValoracionesRecibidas(){
        return this.modelo.obtenerValoracionesRecibidas()
    }

    async realizarPago(idSolicitud, infoPago){
        let respuesta =  await this.modelo.realizarPago(idSolicitud, infoPago)
        Controlador.almacenarLocalStorage()
        return respuesta
    }

    async realizarValoracion(infoValoracion){
        let respuesta =  await this.modelo.realizarValoracion(infoValoracion)
        Controlador.almacenarLocalStorage()
        return respuesta
    }

    rechazarSolicitudReserva(idSolicitud){
        let respuesta =  this.modelo.rechazarSolicitudReserva(idSolicitud)
        Controlador.almacenarLocalStorage()
        return respuesta
    }

    async registrarInmueble(infoInmueble){
        let respuesta =  this.modelo.registrarInmueble(infoInmueble)
        Controlador.almacenarLocalStorage()
        return respuesta
    }

    async registrarUsuario(infoUsuario, esArrendatario, email, contrasena){
        let respuesta =  await this.modelo.registrarUsuario(infoUsuario, esArrendatario, email, contrasena)
        Controlador.almacenarLocalStorage()
        return respuesta
    }

    
    async subirFotosInmueble(idInmueble, archivos){
        let respuesta =  await this.modelo.subirFotosInmueble(idInmueble, archivos)
        Controlador.almacenarLocalStorage()
        return respuesta
    }

    async subirFotoPerfil(archivo){
        let respuesta =  await this.modelo.subirFotoPerfil(archivo)
        Controlador.almacenarLocalStorage()
        return respuesta
    }
    
    static getControlador(){
        if ( this.instanciaControlador === null ){
            let lc = localStorage.getItem("Controlador")
            if ( lc === null ){
                this.instanciaControlador = new Controlador()
            }
            else{
                let modelo = JSON.parse( lc )
                this.instanciaControlador = new Controlador(modelo)
                this.instanciaControlador.modelo.transformarInformacionJSON()
            }
        }
        else{
            localStorage.setItem( "Controlador", JSON.stringify( this.instanciaControlador ) )
        }
        return this.instanciaControlador
    }

    static almacenarLocalStorage(){
        localStorage.setItem( "Controlador", JSON.stringify( this.instanciaControlador ) )
    }

}


export default Controlador

