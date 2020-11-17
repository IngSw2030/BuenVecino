import SistemaBV from '../Modelo/SistemaBV'

class Controlador{

    static instanciaControlador = null

    constructor(){
        this.modelo = new SistemaBV()
    }


    async agregarMensajeChat(idChat, mensaje){
        return await this.modelo.agregarMensajeChat(idChat, mensaje)
    }

    async iniciarSesionUsuario(email, contrasena){
        return await this.modelo.iniciarSesionUsuario(email, contrasena)
    }

    async registrarUsuario(infoUsuario, esArrendatario, email, contrasena){
        return await this.modelo.registrarUsuario(infoUsuario, esArrendatario, email, contrasena)
    }

    async buscarInmueblesIniciales(cantInmuebles = 3){
        return await this.modelo.buscarInmueblesIniciales(cantInmuebles)
    }

    async buscarInmueblePorTipo(tipoInmueble){
        return await this.modelo.buscarInmueblePorTipo(tipoInmueble)
    }

    async buscarInmueblesPorBarrioLocalidad(sitio){
        return await this.modelo.buscarInmueblesPorBarrioLocalidad(sitio)
    }

    async buscarTodosInmuebles(){
        return this.modelo.buscarTodosInmuebles()
    }

    async cerrarSesion(){
        this.modelo.cerrarSesion()
    }

    establecerReceptorMensajesChat(idChat, metodoReceptor){
        this.modelo.establecerReceptorMensajesChat(idChat, metodoReceptor)
    }

    static getControlador(){
        if ( this.instanciaControlador == null ){
            this.instanciaControlador = new Controlador()
        }
        return this.instanciaControlador
    }

    async eliminarInmueble(idInmueble){
        return await this.modelo.eliminarInmueble(idInmueble)
    }

    establecerReceptorMensajesChat(idChat, metodoReceptor){
        return this.modelo.establecerReceptorMensajesChat(idChat, metodoReceptor)
    }

    async modificarInmueble(idInmueble, camposModificados){
        return await this.modelo.modificarInmueble(idInmueble, camposModificados)
    }

    obtenerUsuarioActivo(){
        return this.modelo.obtenerUsuarioActivo().state
    }

    async pruebaX(param=null){
        return await this.modelo.pruebaX(param)
    }

    async registrarInmueble(infoInmueble){
        return this.modelo.registrarInmueble(infoInmueble)
    }

}


export default Controlador

