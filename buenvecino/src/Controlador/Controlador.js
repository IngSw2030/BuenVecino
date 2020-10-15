import SistemaBV from '../Modelo/SistemaBV'

class Controlador{

    constructor(){
        this.modelo = new SistemaBV()
    }

    registrarUsuario(infoUsuario, esArrendatario, email, contrasena){
        this.modelo.registrarUsuario(infoUsuario, esArrendatario, email, contrasena)
    }
}


export default Controlador

