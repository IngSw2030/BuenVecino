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
            usuario : null
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

    crearUsuario(infoUsuario, esArrendatario){
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
            if ( await this.emailEstaRegistrado(email) ){
                return {respuesta: false, idError: 1, mensaje: "El email ingreasdo ya se encuentra registrado"}
            }
            if ( await this.buscarUsuariosPorDni(infoUsuario.dni, infoUsuario.tipoDni, SistemaBV.ARRENDATARIO) != null ){
                return {respuesta: false, idError: 2, mensaje: "Ya existe un usuario registrado con ese numero de documento"}
            }
            let errores = this.validarEstructuraObjetoUsuario(infoUsuario, esArrendatario)
            if ( errores.errors.length > 0 ){
                return {respuesta: false, idError: 3, mensaje: errores}
            }
            let usuario = this.crearUsuario(infoUsuario, esArrendatario)
            let idUsuario = await Autenticador.registrarUsuario(email, contrasena)
            idUsuario = idUsuario.uid
            let ruta = esArrendatario ? "Arrendatarios" : "Arrendadores"
            await ManejadorBD.escribirInformacionIdManual(ruta, idUsuario, usuario.state)
            return {respuesta: true, idError: 0, mensaje: "Usuario registrado exitosamente"}
        }
        catch (error) {
            return error
        }        
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
        try {
            let errores = this.validarEstructuraObjetoInmueble(infoInmueble)
            if ( errores.errors.length > 0 ){
                //REVISAR ERROR ID ERROR
                return {respuesta: false, idError: 3, mensaje: errores}
            }let inmueble = this.crearInmueble(infoInmueble)
            let idInmueble = await ManejadorBD.escribirInformacion("Inmuebles2", inmueble.state)
            await this.state.arrendador.agregarInmueble(inmueble, idInmueble)
            return {respuesta: true, idError: 0, mensaje: "Inmueble registrado exitosamente"}
        }
        catch (error) {
            return error
        }
    }

    crearInmueble(infoInmueble){
        if ( infoInmueble.tipo == "C" ){
            return new Casa(infoInmueble)
        }
        else if ( infoInmueble.tipo == "A" ) {
            return new Apartamento(infoInmueble)
        }
        else{
            return new Habitacion(infoInmueble)
        }
    }

    validarEstructuraObjetoInmueble(infoInmueble){
        if ( infoInmueble.tipo == "C" ){
            return Casa.validarEstructuraObjeto(infoInmueble)
        }
        else if ( infoInmueble.tipo == "A" ) {
            return Apartamento.validarEstructuraObjeto(infoInmueble)
        }
        else{
            return Habitacion.validarEstructuraObjeto(infoInmueble)
        }
    }

    async buscarArrendador( idArrendador ){
        return ManejadorBD.leerInformacionDocumento( "Arrendadores", idArrendador )
    }

    async buscarArrendatario( idArrendatario ){
        return ManejadorBD.leerInformacionDocumento( "Arrendatarios", idArrendatario )
    }

    async iniciarSesionUsuario(email, contrasena){
        try {
            let idRespuesta = await Autenticador.iniciarSesionUsuario(email, contrasena)
            idRespuesta = idRespuesta.uid
            let arrendador = await this.buscarArrendador( idRespuesta )
            if ( arrendador != null){
                await this.establecerUsuario(arrendador, false)
                return this.state.arrendador
            }
            else{
                let arrendatario = await this.buscarArrendatario( idRespuesta )
                await this.establecerUsuario(arrendatario, true)
                return this.state.arrendatario
            }
        }
        catch (error) {
            return error
        }
    }

    async modificarInmueble(idInmueble, camposModificados){
        console.log("ARRENDADOR ", this.state.arrendador)
        return await this.state.arrendador.modificarInmueble(idInmueble, camposModificados)
    }

    async eliminarInmueble(idInmueble){
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