
class Favorito {
    static ESTRUCTURA_JSON = {
        "type": "object",
        "additionalProperties": false,
        "properties": {
            
            "fechaAgregado": {
                "type": "number"
            },
            "comentario": {
                "type": "string"
            },
            "idInmueble": {
                "type": "string",
            }
            
        },
        "required": [
            "fechaAgregado",
            "comentario",
            "idInmueble"
        ],
        "title": "ESTRUCTURA_JSON"
    }

    constructor(infoFavorito){
        if ( infoFavorito.state !== undefined ){
            infoFavorito = infoFavorito.state
        }
        this.state = {
            ...infoFavorito
        }
    }

    estaAsociadoMismoInmueble(idInmueble){
        return this.state.idInmueble === idInmueble
    }

    transformarInformacionJSON(){
        
    }

    static validarEstructuraObjeto(infoFavorito){
        var Validator = require('jsonschema').Validator;
        var v = new Validator();
        return v.validate(infoFavorito, this.ESTRUCTURA_JSON)
    }
}

export default Favorito

