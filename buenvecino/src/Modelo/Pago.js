class Pago {
    
    static ESTRUCTURA_JSON = {
        "type": "object",
            "additionalProperties": false,
            "properties": {
                "idSolicitud": {
                    "type": "string"
                },
                "estado":{
                    "type": "string",
                    "enum": ["A", "D", "R"],
                    "$comment": "D: desconocido, A: Aceptado por la entidad R: rechazado por la entidad"
                },
                "valor":{
                    "type": "integer"
                },
                "informacionAdicional":{
                    "type": "object"
                }
            },
            "required": [
                "idSolicitud",
                "estado",
                "valor",
                "informacionAdicional"
            ],
            "title": "ESTRUCTURA_JSON"
    }

    constructor(infoPago){
        this.state = {
            ...infoPago,
        }
    }

    perteneceSolicitud(idSolicitud){
        return this.state.idSolicitud === idSolicitud
    }

    static validarEstructuraObjeto(infoArrendatario){
        let Validator = require('jsonschema').Validator;
        let v = new Validator();
        return v.validate(infoArrendatario, this.ESTRUCTURA_JSON) 
    }

}

export default Pago