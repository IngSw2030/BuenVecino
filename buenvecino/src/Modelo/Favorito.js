import Arrendatario from './Arrendatario'

class Favorito {
    static ESTRUCTURA_JSON = {
        "type": "object",
        "additionalProperties": false,
        "properties": {
            
            "fechaAgregado": {
                "type": "number"
            },
            "Comentario": {
                "type": "string"
            },
            "idInmueble": {
                "type": "string",
            }
            
        },
        "required": [
            "fechaAgredado",
            "Comentario",
            "idInmueble"
        ],
        "title": "ESTRUCTURA_JSON"
    }

    constructor(infoFavorito){
        this.state = {
            ...infoFavorito
        }
    }
}

export default Favorito

