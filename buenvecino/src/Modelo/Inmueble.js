import Utils from './Utils'


class Inmueble{


    //TODO REVISAR TEMA DE LAS FOTOS
    static ESTRUCTURA_JSON = {
        "type": "object",
        "additionalProperties": true,
        "properties": {
            "tipo": {
                "type": "string",
                "enum": ["C", "H", "A"]
            },
            "nombre": {
                "type": "string"
            },
            "precio": {
                "type": "integer"
            },
            "descripcion": {
                "type": "string"
            },
            "nBaños": {
                "type": "integer",
                "minimum": 0
            },
            "area": {
                "type": "number",
                "minimum": 0
            },
            "esAmoblado": {
                "type": "boolean"
            },
            "idPropietario" : {
                "type": "string"
            }
            //TO DO
            /*"ubicacion": {
                "$ref": "#/definitions/Ubicacion"
            }*/
            /*"historialArrendatarios": {
                "type": "array",
                "items": {
                    "$ref": "#/definitions/PeriodoEstadia",
                    "uniqueItems": true
                }
            }*/
        },
        "required": [
            "area",
            "descripcion",
            "esAmoblado",
            "nBaños",
            "nombre",
            "precio",
            "tipo",
            "idPropietario"
            //"ubicacion"
        ],
        "title": "ESTRUCTURA_JSON"
    }

    objeto(nombre, objeto, valorDefecto = []){
        return ( objeto.state[nombre] != undefined ? objeto[nombre] : valorDefecto )
    }

    constructor(infoInmueble){
        this.state = {
            ...infoInmueble,
            ...Utils.agregarCamposSiNoExisten(infoInmueble, ["servicios", "ubicacion", "historialArrendatarios"], [[],[],{}])
        }
    }
    
    static validarEstructuraObjeto(infoInmueble){
        var Validator = require('jsonschema').Validator
        var v = new Validator()
        return v.validate(infoInmueble, this.ESTRUCTURA_JSON)
    }

    static obtenerCadenaBusqueda(barrio, localidad){
        barrio = Utils.normalizarString(barrio).toUpperCase()
        localidad = Utils.normalizarString(localidad).toUpperCase()
        return {tagBarrio : barrio, tagLocalidad : localidad}
    }

    static calcularDistanciaPuntosGeograficos(punto1, punto2){
        function enRadianes(valor){
            return (Math.PI / 180) * valor;
        }
        let r = 6371
        let dLat = enRadianes( punto2.latitud - punto1.latitud )
        let dLon = enRadianes( punto2.longitud - punto1.longitud )
        let a = Math.pow(Math.sin( dLat / 2 ), 2) + Math.cos( enRadianes(punto1.latitud)) * 
                Math.cos(enRadianes(punto2.latitud)) * Math.pow(Math.sin( dLon / 2 ), 2)
        let c = 2 * Math.atan2( Math.sqrt(a), Math.sqrt(1-a) )
        return r * c
    }

    
}

export default Inmueble