import SistemaBV from '../Modelo/SistemaBV'

class Controlador{

    static instanciaControlador = null

    constructor(){
        this.modelo = new SistemaBV()
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

    async cerrarSesion(){
        this.modelo.cerrarSesion()
    }

    async crearChat(idUsuario2, primerMensaje){
        return await this.modelo.crearChat(idUsuario2, primerMensaje)
    }

    async eliminarInmueble(idInmueble){
        return await this.modelo.eliminarInmueble(idInmueble)
    }

    eliminarMensajeChat(idChat, idMensaje){
        return this.modelo.eliminarMensajeChat(idChat, idMensaje)
    }

    establecerReceptorChats(metodoReceptor){
        this.modelo.establecerReceptorChats(metodoReceptor)
    }   

    establecerReceptorMensajesChat(idChat, metodoReceptor){
        return this.modelo.establecerReceptorMensajesChat(idChat, metodoReceptor)
    }

    async iniciarSesionUsuario(email, contrasena){
        return await this.modelo.iniciarSesionUsuario(email, contrasena)
    }

    async modificarInmueble(idInmueble, camposModificados){
        return await this.modelo.modificarInmueble(idInmueble, camposModificados)
    }

    obtenerMensajesCargadosChat(idChat){
        return this.modelo.obtenerMensajesCargadosChat(idChat)
    }

    obtenerUsuarioActivo(){
        return this.modelo.obtenerUsuarioActivo().state
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

