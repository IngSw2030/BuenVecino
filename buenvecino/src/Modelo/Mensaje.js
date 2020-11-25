
class Mensaje{

    static TIEMPO_ELIMINACION = 30*1000           //30 segundos

    static ESTRUCTURA_JSON = {
        "type": "object",
            "additionalProperties": false,
            "properties": {
                "mensaje": {
                    "type": "string"
                },
                "remitente": {
                    "type": "string",
                },
                "idChat": {
                    "type": "string",
                },
                "momento": {
                    
                }
            },
            "required": [
                "mensaje",
                "momento",
                "remitente",
                "idChat"
            ],
            "title": "ESTRUCTURA-JSON"
    }

    constructor(infoMensaje){
        this.state = {
            ...infoMensaje
        }
    }

    perteneceA(idSupuesto){
        return this.state.remitente === idSupuesto
    }

    vencioTiempoEliminacion(){
        return Math.abs(this.state.momento - Date.now()) >= Mensaje.TIEMPO_ELIMINACION 
    }

    static validarEstructuraObjeto(infoMensaje){
        var Validator = require('jsonschema').Validator
        var v = new Validator()
        return v.validate(infoMensaje, this.ESTRUCTURA_JSON)
    }
}

export default Mensaje