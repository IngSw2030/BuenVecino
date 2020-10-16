import Arrendador from './Arrendador'
import Arrendatario from './Arrendatario'
import Autenticador from './Firebase/Autenticador'
import ManejadorBD from './Firebase/ManejadorBD'
import {firebase} from './Firebase/Firebase'
import {definitions} from './Firebase/schema.json'

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

    async buscarInmueblePorBarrioLocalidad(sitio){
        try {
            let inmuebles1 = await ManejadorBD.realizarConsulta("Inmuebles", ["ubicacion.barrio"], ["=="], [sitio])
            let inmuebles2 = await ManejadorBD.realizarConsulta("Inmuebles", ["ubicacion.localidad"], ["=="], [sitio])
            return [...inmuebles1, ...inmuebles2]
        } catch (error) {
            return error
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

    establecerUsuario(tipoUsuario, esArrendatario){
        if ( esArrendatario ){
            //this.arrendador = usuario
            //this.arrendatario = null
        }
        else {
            //this.arrendatario = usuario
            //this.arrendador = null
        }
    }

    async registrarUsuario(infoUsuario, esArrendatario, email, contrasena){
        try {
            if ( await this.emailEstaRegistrado(email) ){
                return {resultadoRegistro: false, idError: 1, mensaje: "El email ingreasdo ya se encuentra registrado"}
            }
            if ( await this.buscarUsuariosPorDni(infoUsuario.dni, infoUsuario.tipoDni, SistemaBV.ARRENDATARIO) != null ){
                return {resultadoRegistro: false, idError: 2, mensaje: "Ya existe un usuario registrado con ese numero de documento"}
            }
            let errores = this.validarEstructuraObjetoUsuario(infoUsuario, esArrendatario)
            if ( errores.errors.length > 0 ){
                return {resultadoRegistro: false, idError: 3, mensaje: errores}
            }
            let usuario = this.crearUsuario(infoUsuario, esArrendatario)
            let idUsuario = await Autenticador.registrarUsuario(email, contrasena)
            idUsuario = idUsuario.uid
            let ruta = esArrendatario ? "Arrendatarios" : "Arrendadores"
            await ManejadorBD.escribirInformacionIdManual(ruta, idUsuario, usuario.state)
            return {resultadoRegistro: true, idError: 0, mensaje: "Usuario registrado exitosamente"}
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
    
    async pruebaX2(){
        
        
    }

    async pruebaX(){
        try{
            let data = await ManejadorBD.leerInformacionDocumento("prueba","8Jp13yNtwN8TkB6bakkB")
            console.log(data)
            console.log("FINISHED :V")
        }
        catch(error){
            console.log("ERROR : ")
            console.log(error)
        }
    }

}

export default SistemaBV