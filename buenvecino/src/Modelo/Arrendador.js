import Apartamento from './Apartamento';
import Casa from './Casa';
import Habitacion from './Habitacion';
import ManejadorBD from './Firebase/ManejadorBD';

class Arrendador{

    static TABLA_INMUEBLES = "Inmuebles2"

    static ESTRUCTURA_JSON = {     
        "type": "object",
        "additionalProperties": false,
        "properties": {
            "nombre": {
                "type": "string"
            },
            "dni": {
                "type": "integer"
            },
            "tipoDni": {
                "type": "string",
                "enum": ["CC", "CE", "TI", "PA"]
            },
            "genero": {
                "type": "string",
                "enum": ["M", "F", "O", "N"]
            },
            "fechaNacimiento": {
                "type": "integer"
            },
            "email": {
                "type": "string"
            },
            "telefono": {
                "type": "integer"
            },
            "direccion": {
                "type": "string"
            },
            "ciudad": {
                "type": "string"
            }
        },
        "required": [
            "ciudad",
            "direccion",
            "dni",
            "email",
            "fechaNacimiento",
            "genero",
            "nombre",
            "telefono",
            "tipoDni"
        ],
        "title": "ESTRUCTURA_JSON"
    }

    constructor(infoBasicaUsuario){
        if ( infoBasicaUsuario.chats != undefined ){
            this.state = {
                ...infoBasicaUsuario
            }
        }
        else{
            this.state = {
                ...infoBasicaUsuario,
                inmuebles : [],
                chats : []
            }
        }
    }

    async agregarInmueble(inmueble, idInmueble){
        await ManejadorBD.actualizarInformacion("Arrendadores", this.state.idFirebase, {inmuebles: [...this.state.inmuebles, idInmueble]})
        this.state.listaInmuebles.push(inmueble)
    }

    async cargarInformacionAdicional(){
        let listaInmuebles = []
        let inmueblesAux = this.state.inmuebles
        for(let i in inmueblesAux ){
            let objeto = await ManejadorBD.leerInformacionDocumento(Arrendador.TABLA_INMUEBLES, inmueblesAux[i])
            switch( objeto.tipo ){
                case "C" : objeto = new Casa(objeto); break
                case "A" : objeto = new Apartamento(objeto); break
                case "H" : objeto = new Habitacion(objeto); break
            }
            listaInmuebles[i] = objeto
        }
        this.state = {
            ...this.state,
            listaInmuebles : listaInmuebles
        }
    }

    async eliminarInmueble(idInmueble){
        for(let i in this.state.inmuebles){
            if ( this.state.inmuebles[i] == idInmueble ){
                let auxiliar = this.state.inmuebles[i]
                let inmueblesAux = this.state.inmuebles
                inmueblesAux.splice(i, 1)
                this.state.listaInmuebles.splice(i, 1)
                this.state =  {...this.state, inmuebles: inmueblesAux} 
                let objauxiliar = await ManejadorBD.leerInformacionDocumento(Arrendador.TABLA_INMUEBLES, auxiliar)
                await ManejadorBD.actualizarInformacion("Arrendadores", this.state.idFirebase, {inmuebles: inmueblesAux})
                await ManejadorBD.borrarInformacion(Arrendador.TABLA_INMUEBLES, idInmueble)
                return {respuesta: true, idError: 0, mensaje: "Inmueble eliminado exitosamente", auxiliar: objauxiliar, auxiliar2: auxiliar}
            }
        }
        return {respuesta: false, idError: 1, mensaje: "Inmueble no encontrado"}
    }

    async modificarInmueble(idInmueble, camposModificados){
        console.log("Cambiar inmuebles2 x Inmuebles")
        let inmuebleModificado = null
        for( let i in this.state.listaInmuebles ){
            let idAInmuebleAux = this.state.listaInmuebles[i].state.idFirebase
            if ( idAInmuebleAux == idInmueble  ){
                inmuebleModificado = this.state.listaInmuebles[i].state
                break
            }
        }
        if ( inmuebleModificado == null ){
            return {respuesta: false, idError: 1, mensaje: "Inmueble no encontrado"}
        }
        delete inmuebleModificado.idFirebase
        await ManejadorBD.actualizarInformacion(Arrendador.TABLA_INMUEBLES, idInmueble, {...inmuebleModificado, ...camposModificados})
        return {respuesta: true, idError: 0, mensaje: "Modificación realizada"}
    }

    static validarEstructuraObjeto(infoArrendatario){
        var Validator = require('jsonschema').Validator;
        var v = new Validator();
        return v.validate(infoArrendatario, this.ESTRUCTURA_JSON)
    }
}

export default Arrendador