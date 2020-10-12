import Arrendador from './Arrendador'
import Arrendatario from './Arrendatario'
import Autenticador from './Firebase/Autenticador'
import ManejadorBD from './Firebase/ManejadorBD'


class SistemaBV{

    static ARRENDADOR = 1
    static ARRENDATARIO = 2

    constructor(){
        this.state = {
            arrendador : null,
            usuario : null
        }
    }

    async buscarUsuariosPorDni(dni, tipoDni){
        let usuarios1 = await ManejadorBD.realizarConsultaCompuesta("Arrendatarios", ["dni", "tipoDni"], ["==","=="], [dni, tipoDni])
        let usuarios2 = await ManejadorBD.realizarConsultaCompuesta("Arrendadores", ["dni", "tipoDni"], ["==","=="], [dni, tipoDni])
        let usuarios3 = [...usuarios1, ...usuarios2]
        if (usuarios3.length > 0){
            return usuarios3
        }
        else{
            return null
        }
    }

    emailEstaRegistrado(email){
        return Autenticador.emailEstaRegistrado(email)
    }

    establecerUsuario(tipoUsuario, usaurio){
        if (tipoUsuario == SistemaBV.ARRENDADOR){
            //this.arrendador = usuario
            //this.arrendatario = null
        }
        else if (tipoUsuario == SistemaBV.ARRENDATARIO){
            //this.arrendatario = usuario
            //this.arrendador = null
        }
        else{
            throw "ESTABLECER USUARIO RECIBE UNA OPCION PROHIBIDA"
        }
    }

    registrarArrendador(arrendador, correo, contrasena){
        
    }

    async registrarUsuario(infoUsuario, tipoUsuario, email, contrasena){
        if ( await this.emailEstaRegistrado(email) ){
            return {resultadoRegistro: false, idError: 1, mensaje: "El email ingreasdo ya se encuentra registrado"}
        }
        if ( await this.buscarUsuariosPorDni(infoUsuario.dni, infoUsuario.tipoDni, SistemaBV.ARRENDATARIO) != null ){
            return {resultadoRegistro: false, idError: 2, mensaje: "Ya existe un usuario registrado con ese numero de documento"}
        }
        if (this.validarEstructuraUsuario(infoUsuario, tipoUsuario)){

        }
        if(this.validarInformacionUsuario(infoUsuario, tipoUsuario)){

        }
        

        let idUsuario = await Autenticador.registrarUsuario(email, contrasena)
        console.log(idUsuario)
        idUsuario = idUsuario.uid
        console.log(idUsuario)
        await ManejadorBD.escribirInformacionIdManual("Arrendatarios", idUsuario, infoUsuario)
        return {resultadoRegistro: true, idError: 0, mensaje: "Usuario registrado exitosamente"}
        
    }

    validarEstructuraUsuario(infoUsuario, tipoUsuario){
        const infoUsuarios = ["nombre", "dni", "tipoDni", "genero", "fechaNacimiento"]
    }

    validarInformacionUsuario(infoUsario, tipoUsuario){

    }

    pruebaX(){
        let usuario = {
            nombre : "John Gonzalez",
            dni : 1010021694,
            tipoDni : "C",
            genero : "M",
            fechaNacimiento : 20200101,
            email : "prueba2@prueba.com",
            telefono : 3112224455,
            chats : [],
            favoritos : [],
            historialInmuebles : [],
        }

        console.log( Arrendatario.validarEstructura(usuario) )

    }

}

export default SistemaBV