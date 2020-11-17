import Arrendador from './Arrendador'
import Arrendatario from './Arrendatario'
import Autenticador from './Firebase/Autenticador'
import ManejadorBD from './Firebase/ManejadorBD'
import {firebase} from './Firebase/Firebase'
import {definitions} from './Firebase/schema.json'
import Apartamento from './Apartamento'
import Casa from './Casa'
import Inmueble from './Inmueble'
import Habitacion from './Habitacion'
import Utils from './Utils'

class SistemaBV{

    constructor(){
        this.state = {
            arrendador : null,
            arrendatario : null
        }
    }

    async agregarMensajeChat(idChat, mensaje){
        return await this.obtenerUsuarioActivo().agregarMensajeChat(idChat, mensaje)
    }

    obtenerUsuarioActivo(){
        return this.state.arrendatario != null ? this.state.arrendatario : this.state.arrendador
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

    //Que coincida con el barrio o con la localidad
    //
    async buscarInmueblesIniciales(cantInmuebles = 3){
        return await ManejadorBD.leerInformacionColeccion("Inmuebles", cantInmuebles)
    }

    async buscarInmueblePorTipo(tipoInmueble){
        return await ManejadorBD.realizarConsulta("Inmuebles", "tipo", "==", tipoInmueble)
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

    async buscarTodosInmuebles(){
        try {
            return await ManejadorBD.leerInformacionColeccion("Inmuebles")
        } catch (error) {
            return error
        }
    }

    crearObjetoUsuario(infoUsuario, idFirebase, esArrendatario){
        infoUsuario = {...infoUsuario, idFirebase}
        console.log(infoUsuario)
        if ( esArrendatario ){
            return new Arrendatario(infoUsuario)
        }
        else{
            return new Arrendador(infoUsuario)
        }
    }

    emailEstaRegistrado(email){
        return Autenticador.emailEstaRegistrado(email)
    }

    async establecerUsuario(usuario, esArrendatario){
        if ( esArrendatario ){
            usuario = new Arrendatario(usuario)
            await usuario.cargarInformacionAdicional()
            this.state = {
                ...this.state,
                arrendatario: usuario,
                arrendador: null
            }
        }
        else {
            usuario = new Arrendador(usuario)
            await usuario.cargarInformacionAdicional()
            this.state = {
                ...this.state,
                arrendatario: null,
                arrendador: usuario
            }
        }
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
            if ( await this.buscarUsuariosPorDni(infoUsuario.dni, infoUsuario.tipoDni, SistemaBV.ARRENDATARIO) != null ){
                return {idError: 2, mensaje: "Ya existe un usuario registrado con ese numero de documento"}
            }
            console.log("HERE :V")
            let idUsuario = await Autenticador.registrarUsuario(email, contrasena)
            idUsuario = idUsuario.uid
            let usuario = this.crearObjetoUsuario(infoUsuario, idUsuario, esArrendatario)
            let ruta = esArrendatario ? "Arrendatarios" : "Arrendadores"
            await ManejadorBD.escribirInformacionIdManual(ruta, idUsuario, usuario.state)
            this.establecerUsuario(usuario, esArrendatario)
            return {idError: 0, mensaje: "Usuario registrado exitosamente"}
        }
        catch (error) {
            return error
        }        
    }

    establecerReceptorMensajesChat(idChat, metodoReceptor){
        return this.obtenerUsuarioActivo().establecerReceptorMensajesChat(idChat, metodoReceptor)
    }

    validarEstructuraObjetoUsuario(infoUsuario, esArrendatario){
        if ( esArrendatario ){
            return Arrendatario.validarEstructuraObjeto(infoUsuario)
        }
        else{
            return Arrendador.validarEstructuraObjeto(infoUsuario)
        }
    }
    
    async registrarInmueble(infoInmueble, fotos=null){
        return await this.state.arrendador.registrarInmueble(infoInmueble, fotos)
    }

    async iniciarSesionUsuario(email, contrasena){
        try {
            let idRespuesta = await Autenticador.iniciarSesionUsuario(email, contrasena)
            idRespuesta = idRespuesta.uid
            let arrendador = await ManejadorBD.leerInformacionDocumento( "Arrendadores", idRespuesta )
            if ( arrendador != null){
                await this.establecerUsuario(arrendador, false)
                return this.state.arrendador
            }
            else{
                let arrendatario = await ManejadorBD.leerInformacionDocumento( "Arrendatarios", idRespuesta )
                await this.establecerUsuario(arrendatario, true)
                return this.state.arrendatario
            }
        }
        catch (error) {
            throw error
        }
    }

    async modificarInmueble(idInmueble, camposModificados){
        return await this.state.arrendador.modificarInmueble(idInmueble, camposModificados)
    }

    async eliminarInmueble(idInmueble){
        console.log(idInmueble, " PRO ELMINAR")
        console.log( this.obtenerUsuarioActivo() )
        console.log("\n\n")
        return await this.state.arrendador.eliminarInmueble(idInmueble)
    }

    async cerrarSesion(){
        Autenticador.cerrarSesionUsuario()
    }

    async pruebaX(param){
        let inmuebles = await ManejadorBD.leerInformacionColeccion("Inmuebles")
        for (let i in inmuebles){
            console.log(inmuebles[i])
            let nubicacion = inmuebles[i].ubicacion
            let cadena = Inmueble.obtenerCadenaBusqueda( nubicacion.barrio, nubicacion.localidad )
            nubicacion = {...nubicacion, ...cadena}
            delete nubicacion.tagBusqueda
            await ManejadorBD.actualizarInformacion("Inmuebles", inmuebles[i].idFirebase, {ubicacion: {...nubicacion}})
        }
    }

}

export default SistemaBV