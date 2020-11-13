class Arrendatario{
    
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
            }
        },
        "required": [
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
                chats : [],
                favoritos : [],
                historialInmuebles : [],
                metodoPago : {}
            }
        } 
    }

    static validarEstructuraObjeto(infoArrendatario){
        let Validator = require('jsonschema').Validator;
        let v = new Validator();
        return v.validate(infoArrendatario, this.ESTRUCTURA_JSON) 
    }
}

export default Arrendatario