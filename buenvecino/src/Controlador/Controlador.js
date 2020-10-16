import SistemaBV from '../Modelo/SistemaBV'

class Controlador{

    static instanciaControlador = null

    constructor(){
        this.modelo = new SistemaBV()
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

    async buscarInmueblePorBarrioLocalidad(sitio){
        return await this.modelo.buscarInmueblePorBarrioLocalidad(sitio)
    }

    async buscarTodosInmuebles(){
        return this.modelo.buscarTodosInmuebles()
    }

    static getControlador(){
        if ( this.instanciaControlador == null ){
            this.instanciaControlador = new Controlador()
        }
        return this.instanciaControlador
    }
}


export default Controlador

