import Inmueble from './Inmueble'

class Habitacion extends Inmueble{
    
    static ESTRUCTURA_JSON = {
        "type": "object",
        "additionalProperties": true,
        "properties": {
            "nCamas": {
                "type": "integer"
            },
        },
        "required": [
            "nCamas"
        ],
        "title": "ESTRUCTURA_JSON"
    }

    constructor(infoInmueble){
        super(infoInmueble)
    }
    
    static validarEstructuraObjeto(infoInmueble){
        let resInmueble = Inmueble.validarEstructuraObjeto( infoInmueble )
        if ( resInmueble.errors.length > 0 ){
            return resInmueble;
        }
        var Validator = require('jsonschema').Validator;
        var v = new Validator();
        return v.validate(infoInmueble, this.ESTRUCTURA_JSON)
    }
}

export default Habitacion