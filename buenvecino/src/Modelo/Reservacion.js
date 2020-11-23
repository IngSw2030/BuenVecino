import ManejadorBD from './Firebase/ManejadorBD';

class Reservacion{

    static ESTRUCTURA_JSON = {
        "type": "object",
        "additionalProperties": false,
        "properties": {
            "idArrendatario": {
                "type": "string"
            },
            "idArrendador": {
                "type": "string"
            },
            "idInmueble": {
                "type": "string"
            },
            "valor": {
                "type": "integer",
                "minimum": 0
            },
            "fechaInicio": {
                "type": "integer"
            },
            "fechaFin": {
                "type": "integer"
            },
            "valoracion": {
                "type": "string"
            }
        },
        "required": [
            "fechaFin",
            "fechaInicio",
            "idArrendador",
            "idArrendatario",
            "idInmueble",
            "valor",
            "valoracion"
        ],
        "title": "ESTRUCTURA_JSON"
    }

    constructor(infoReservacion){
        this.state = {
            ...infoReservacion,

        }    
    }

    static validarEstructuraObjeto(infoReservacion){
        let Validator = require('jsonschema').Validator;
        let v = new Validator();
        return v.validate(infoReservacion, this.ESTRUCTURA_JSON) 
    }
}


export default Reservacion