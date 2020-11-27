import Arrendador from './Arrendador'
import Arrendatario from './Arrendatario'
import Autenticador from './Firebase/Autenticador'
import ManejadorBD from './Firebase/ManejadorBD'
import Usuario from './Usuario'
import Inmueble from './Inmueble'
import Utils from './Utils'

class SistemaBV{

    constructor(){
        this.state = {
            arrendador : null,
            arrendatario : null,
            cacheInmuebles: []
        }
    }

    aceptarSolicitudReserva(idSolicitud){
        return this.obtenerUsuarioActivo().aceptarSolicitudReserva(idSolicitud)
    }

    async agregarFavorito(favorito){
        return await this.obtenerUsuarioActivo().agregarFavorito(favorito)
    }

    async agregarInmuebleCache(idInmueble, posicion = -1){
        if ( posicion == -1 ){
            posicion = this.state.cacheInmuebles.length
        }
        let nuevoInmueble = await ManejadorBD.leerInformacionDocumento("Inmuebles", idInmueble)
        if ( nuevoInmueble !== null ){
            nuevoInmueble = Arrendador.crearObjetoInmueble(nuevoInmueble, idInmueble)
            await nuevoInmueble.cargarInformacionAdicional()
            this.state.cacheInmuebles[posicion] =  {inmueble: nuevoInmueble, tiempo: Date.now()}    
        }
        return nuevoInmueble
    }

    async agregarMensajeChat(idChat, mensaje){
        return await this.obtenerUsuarioActivo().agregarMensajeChat(idChat, mensaje)
    }

    agregarServiciosInmueble(idInmueble, idServicios){
        return this.obtenerUsuarioActivo().agregarServiciosInmueble(idInmueble, idServicios)
    }

    buscarFavorito(idInmueble){
        if ( this.obtenerTipoUsuarioActivo() === "Arrendatario" ){
            return this.obtenerUsuarioActivo().buscarFavorito(idInmueble)
        }
        else{
            return null
        }
    }

    //Que coincida con el barrio o con la localidad
    async buscarInmueblesIniciales(cantInmuebles = 3){
        return await ManejadorBD.leerInformacionColeccion("Inmuebles", cantInmuebles)
    }

    async buscarInmueblesPorBarrioLocalidad(sitio){
        try {
            sitio = Utils.normalizarString(sitio).toUpperCase().trim()
            let campos = ["ubicacion.tagBarrio","ubicacion.tagBarrio","ubicacion.tagLocalidad","ubicacion.tagLocalidad"]
            let operadores = [">=", "<=", ">=", "<="]
            let valores =  [sitio, sitio+'\uf8ff', sitio, sitio+'\uf8ff'] 
            let inmuebles1 = await ManejadorBD.realizarConsulta("Inmuebles", campos.slice(0,2), operadores.slice(0,2), valores.slice(0,2))
            let inmuebles2 = await ManejadorBD.realizarConsulta("Inmuebles", campos.slice(2,4), operadores.slice(2,4), valores.slice(2,4))
            return Utils.eliminarDuplicadosDeArray([...inmuebles1, ...inmuebles2])
        } catch (error) {
            throw error
        }
    }

    async buscarInmueblePorTipo(tipoInmueble){
        return await ManejadorBD.realizarConsulta("Inmuebles", "tipo", "==", tipoInmueble)
    }

    async buscarTodosInmuebles(){
        try {
            return await ManejadorBD.leerInformacionColeccion("Inmuebles")
        } catch (error) {
            return error
        }
    }

    async buscarUsuariosPorDni(dni, tipoDni){
        let usuarios1 = await ManejadorBD.realizarConsulta("Arrendatarios", ["dni", "tipoDni"], ["==","=="], [dni, tipoDni])
        let usuarios2 = await ManejadorBD.realizarConsulta("Arrendadores", ["dni", "tipoDni"], ["==","=="], [dni, tipoDni])
        let usuarios3 = [...usuarios1, ...usuarios2]
        if (usuarios3.length > 0){
            return usuarios3
        }
        else{
            return null
        }
    }

    cancelarSolicitudReserva(idSolicitud){
        return this.obtenerUsuarioActivo().cancelarSolicitudReserva(idSolicitud)
    }

    async cerrarSesion(){
        Autenticador.cerrarSesionUsuario()
    }

    async confirmarSolicitudReserva(idSolicitud){
        return await this.obtenerUsuarioActivo().confirmarSolicitudReserva(idSolicitud)
    }

    async crearChat(idUsuario2, primerMensaje){
        let tipoUsuario2 = await this.obtenerColeccionCorrespondienteUsuario(idUsuario2)
        if ( idUsuario2 === this.obtenerUsuarioActivo().state.idFirebase ){
            return {idError: 1, mensaje: "Está tratando de crear un chat consigo mismo"}
        }
        else if ( tipoUsuario2 === null ){
            return {idError: 2, mensaje: "El usuario con quien intenta crear el chat no existe"}
        }
        else{
            let respuesta = this.obtenerUsuarioActivo().crearChat(idUsuario2)
            if ( respuesta.idError === 0 ){
                let clausulaActualizar = { chats : Utils.clausulaAgregarElementoArrayFirebase( respuesta.idNuevoChat ) }
                await ManejadorBD.actualizarInformacion( tipoUsuario2, idUsuario2, clausulaActualizar )
                await this.agregarMensajeChat(respuesta.idNuevoChat, primerMensaje)
            }
            return respuesta
        }
    }

    crearObjetoUsuario(infoUsuario, idFirebase, esArrendatario){
        infoUsuario = {...infoUsuario, idFirebase}
        if ( esArrendatario ){
            return new Arrendatario(infoUsuario)
        }
        else{
            return new Arrendador(infoUsuario)
        }
    }

    async crearSolicitudReserva(infoReserva){
        let inmueble = await ManejadorBD.leerInformacionDocumento("Inmuebles", infoReserva.idInmueble)
        if ( inmueble === null ){
            return {idError: 1, mensaje: "El inmueble no existe"}
        }
        return await this.obtenerUsuarioActivo().crearSolicitudReserva(infoReserva);
    }

    async eliminarInmueble(idInmueble){
        return await this.obtenerUsuarioActivo().eliminarInmueble(idInmueble)
    }

    eliminarFavorito(idFavorito){
        return this.obtenerUsuarioActivo().eliminarFavorito(idFavorito)
    }

    eliminarMensajeChat(idChat, idInmueble){
        return this.obtenerUsuarioActivo().eliminarMensajeChat(idChat, idInmueble) 
    }

    eliminarValoracion(idValoracion){
        return this.obtenerUsuarioActivo().eliminarValoracion(idValoracion)
    }

    emailEstaRegistrado(email){
        return Autenticador.emailEstaRegistrado(email)
    }

    establecerReceptorChats(metodoReceptor){
        return this.obtenerUsuarioActivo().establecerReceptorChats(metodoReceptor)
    }

    establecerReceptorListaSolicitudes(metodoReceptor){
        return this.obtenerUsuarioActivo().establecerReceptorListaSolicitudes(metodoReceptor)
    }

    establecerReceptorListaValoraciones(metodoReceptor){
        return this.obtenerUsuarioActivo().establecerReceptorListaValoraciones(metodoReceptor)
    }

    establecerReceptorMensajesChat(idChat, metodoReceptor){
        return this.obtenerUsuarioActivo().establecerReceptorMensajesChat(idChat, metodoReceptor)
    }

    establecerReceptorSolicitudes(metodoReceptor){
        return this.obtenerUsuarioActivo().establecerReceptorSolicitudes(metodoReceptor)
    }

    async establecerUsuario(usuario, esArrendatario){
        if ( esArrendatario ){
            await usuario.cargarInformacionAdicional()
            this.state = {
                ...this.state,
                arrendatario: usuario,
                arrendador: null
            }
            
        }
        else {
            await usuario.cargarInformacionAdicional()
            this.state = {
                ...this.state,
                arrendatario: null,
                arrendador: usuario
            }
        }
    }

    existeUsuarioSesionActiva(){
        return this.obtenerUsuarioActivo() !== null
    }

    async iniciarSesionUsuario(email, contrasena){
        try {
            let idRespuesta = await Autenticador.iniciarSesionUsuario(email, contrasena)
            idRespuesta = idRespuesta.uid
            let arrendador = await ManejadorBD.leerInformacionDocumento( "Arrendadores", idRespuesta )
            if ( arrendador !== null){
                let usuario = new Arrendador( arrendador )
                await this.establecerUsuario(usuario, false)
                return {idError: 0, mensaje: "inicio de sesión exitoso", usuario: this.state.arrendador.state, tipo: "Arrendador"}
            }
            else{
                let arrendatario = await ManejadorBD.leerInformacionDocumento( "Arrendatarios", idRespuesta )
                let usuario = new Arrendatario( arrendatario )
                await this.establecerUsuario(usuario, true)
                return {idError: 0, mensaje: "inicio de sesión exitoso", usuario: this.state.arrendatario.state, tipo: "Arrendatario"}
            }
        }
        catch (error) {
            return {idError: 0, mensaje: Autenticador.obtenerMensajeError( error )}
        }
    }

    async modificarInmueble(idInmueble, camposModificados){
        return await this.state.arrendador.modificarInmueble(idInmueble, camposModificados)
    }

    async modificarValoracion(idValoracion, camposModificados){
        return await this.obtenerUsuarioActivo().modificarValoracion(idValoracion, camposModificados)
    }

    async obtenerColeccionCorrespondienteUsuario(idUsuario){
        if  (await ManejadorBD.leerInformacionDocumento("Arrendador", idUsuario) !== null ){
            return "Arrendador"
        }
        else if ( await ManejadorBD.leerInformacionDocumento("Arrendatario", idUsuario) !== null ){
            return "Arrendatario"
        }
        return null
    }

    async obtenerInmueble(idInmueble){
        for(let i in this.state.cacheInmuebles){
            if ( this.state.cacheInmuebles[i].inmueble.state.idFirebase === idInmueble ){
                if ( this.state.cacheInmuebles[i].tiempo + 1000*60*10 < Date.now() ){
                    return this.state.cacheInmuebles[i].inmueble
                }
                else{
                    return await this.agregarInmuebleCache(idInmueble, i)
                }
            }
        }
        return await this.agregarInmuebleCache(idInmueble)

    }

    obtenerInmueblesCargados(){
        return this.obtenerUsuarioActivo().obtenerInmueblesCargados()
    }

    obtenerMensajesCargadosChat(idChat){
        return this.obtenerUsuarioActivo().obtenerMensajesCargadosChat(idChat)
    }

    obtenerSolicitudesCargadas(){
        return this.obtenerUsuarioActivo().obtenerSolicitudesCargadas()
    }

    obtenerTipoUsuarioActivo(){
        if ( this.obtenerUsuarioActivo() === null){
            return null
        }
        else if ( this.obtenerUsuarioActivo().obtenerTipoUsuario() === "AO" ){
            return "Arrendatario"
        }
        else{
            return "Arrendador"
        }
    }

    obtenerUsuarioActivo(){
        if ( this.state.arrendatario !== null ){
            return this.state.arrendatario
        }
        else if ( this.state.arrendador !== null ){
            return this.state.arrendador
        }
        else{
            return null
        }
    }

    obtenerValoracionesHechas(){
        return this.obtenerUsuarioActivo().obtenerValoracionesHechas()
    }

    obtenerValoracionesRecibidas(){
        return this.obtenerUsuarioActivo().obtenerValoracionesRecibidas()
    }
    
    async realizarPago(idSolicitud, infoPago){
        return await this.obtenerUsuarioActivo().realizarPago(idSolicitud, infoPago)
    }

    async realizarValoracion(infoValoracion){
        return this.obtenerUsuarioActivo().realizarValoracion(infoValoracion)
    }

    rechazarSolicitudReserva(idSolicitud){
        return this.obtenerUsuarioActivo().rechazarSolicitudReserva(idSolicitud)
    }

    async registrarInmueble(infoInmueble, fotos=null){
        return await this.obtenerUsuarioActivo().registrarInmueble(infoInmueble, fotos)
    }

    async registrarUsuario(infoUsuario, esArrendatario, email, contrasena){
        try {
            let errores = this.validarEstructuraObjetoUsuario(infoUsuario, esArrendatario)
            if ( errores.errors.length > 0 ){
                return {idError: 3, mensaje: errores}
            }
            if ( await this.emailEstaRegistrado(email) ){
                return {idError: 1, mensaje: "El email ingreasdo ya se encuentra registrado"}
            }
            if ( await this.buscarUsuariosPorDni(infoUsuario.dni, infoUsuario.tipoDni, SistemaBV.ARRENDATARIO) !== null ){
                return {idError: 2, mensaje: "Ya existe un usuario registrado con ese numero de documento"}
            }
            let idUsuario = await Autenticador.registrarUsuario(email, contrasena)
            idUsuario = idUsuario.uid
            let usuario = this.crearObjetoUsuario(infoUsuario, idUsuario, esArrendatario)
            let ruta = esArrendatario ? "Arrendatarios" : "Arrendadores"
            let objUsuarioBD = Usuario.obtenerObjetoBD( usuario )
            await ManejadorBD.escribirInformacionIdManual(ruta, idUsuario, objUsuarioBD)
            await this.establecerUsuario(usuario, esArrendatario)
            return {idError: 0, mensaje: "Usuario registrado exitosamente"}
        }
        catch (error) {
            return error
        }        
    }

    
    async subirFotosInmueble(idInmueble, archivos){
        return await this.obtenerUsuarioActivo().subirFotosInmueble(idInmueble, archivos)  
    }

    async subirFotoPerfil(archivo){
        return await this.obtenerUsuarioActivo().subirFotoPerfil(archivo)
    }

    validarEstructuraObjetoUsuario(infoUsuario, esArrendatario){
        if ( esArrendatario ){
            return Arrendatario.validarEstructuraObjeto(infoUsuario)
        }
        else{
            return Arrendador.validarEstructuraObjeto(infoUsuario)
        }
    }
}

export default SistemaBV