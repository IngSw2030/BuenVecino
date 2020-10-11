import SistemaBV from '../Modelo/SistemaBV'

class Controlador{

    constructor(){
        this.modelo = new SistemaBV()
    }

    registrarArrendatario(idCliente, nombre, dni, tipoDni, genero, fechaNacimiento, telefono, correo){
        this.modelo.registrarArrendatario(idCliente, nombre, dni, tipoDni, genero, fechaNacimiento, telefono, correo)
    }
}


export default Controlador

