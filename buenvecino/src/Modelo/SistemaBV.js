import {Autenticador} from './Firebase/Autenticador'
import {ManejadorBD} from './Firebase/ManejadorBD'

class SistemaBV{

    static ARRENDADOR = 1
    static ARRENDATARIO = 2

    constructor(){

    }

    buscarUsuarioPorDni(dni, tipoDni, tipoUsuario){
        if ( tipoUsuario == ARRENDADOR ){
            usuario = ManejadorBD.buscarObjeto("Usuarios")
        }
    }

    emailEstaRegistrado(email){
        return Autenticador.emailEstaRegistrado(email)
    }

    establecerUsuario(tipoUsuario, usaurio){
        if (tipoUsuario == ARRENDADOR){
            this.arrendador = usuario
            this.arrendatario = null
        }
        else if (tipoUsuario == ARRENDATARIO){
            this.arrendatario = usuario
            this.arrendador = null
        }
        else{
            throw "ESTABLECER USUARIO RECIBE UNA OPCION PROHIBIDA"
        }
    }



    registrarArrendatario(idCliente, nombre, dni, tipoDni, genero, fechaNacimiento, telefono, email){
        if ( this.emailEstaRegistrado(email) ){
            return {resultadoRegistro: false, idError: 1, mensaje: "El email ingreasdo ya se encuentra registrado"}
        }
        if ( this.buscarUsuarioPorDni(dni, tipoDni, ARRENDATARIO) ){
            return {resultadoRegistro: false, idError: 2, mensaje: "Ya existe un usuario registrado con ese numero de documento"}
        }

        Autenticador.registrarUsuario()
    }


}

export default SistemaBV