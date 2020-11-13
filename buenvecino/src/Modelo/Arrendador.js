import ManejadorBD from './Firebase/ManejadorBD';

class Arrendador{

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

    async agregarInmueble(infoInmueble, idInmueble){
        console.log("AUN NO SE HA AGREGADO EL INMUEBLE COMO OBJETO AL ARRENDADOR")
        await ManejadorBD.actualizarInformacion("Arrendadores", this.state.idFirebase, {inmuebles: [...this.state.inmuebles, idInmueble]})
    }

    async eliminarInmueble(idInmueble){

        for(let i in this.state.inmuebles){
            if ( this.state.inmuebles[i] == idInmueble ){
                let auxiliar = this.state.inmuebles[i]
                let inmueblesAux = this.state.inmuebles     
                inmueblesAux.splice(i, 1)
                this.state =  {...this.state, inmuebles: inmueblesAux} 
                let objauxiliar = await ManejadorBD.leerInformacionDocumento("Inmuebles2", auxiliar)
                await ManejadorBD.actualizarInformacion("Arrendadores", this.state.idFirebase, {inmuebles: inmueblesAux})
                await ManejadorBD.borrarInformacion("Inmuebles2", idInmueble)

                return {respuesta: true, idError: 0, mensaje: "Inmueble eliminado exitosamente", auxiliar: objauxiliar, auxiliar2: auxiliar}
            }
        }
        return {respuesta: false, idError: 0, mensaje: "Inmueble no encontrado"}
    }

    static validarEstructuraObjeto(infoArrendatario){
        var Validator = require('jsonschema').Validator;
        var v = new Validator();
        return v.validate(infoArrendatario, this.ESTRUCTURA_JSON)
    }
}

export default Arrendador