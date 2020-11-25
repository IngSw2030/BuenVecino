import ManejadorBD from './Firebase/ManejadorBD'
import Utils from './Utils'
import Valorable from './Valorable'

class Inmueble extends Valorable{

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
            },
            "ubicacion" : {
                "type": "object"
            }
        },
        "required": [
            "area",
            "descripcion",
            "esAmoblado",
            "nBaños",
            "nombre",
            "precio",
            "tipo",
            "idPropietario",
            "ubicacion"
        ],
        "title": "ESTRUCTURA_JSON"
    }

    static ESTRUCTURA_JSON_UBICACION = {
        "type": "object",
            "additionalProperties": false,
            "properties": {
                "direccion": {
                    "type": "string"
                },
                "localidad": {
                    "type": "string"
                },
                "latitud": {
                    "type": "number"
                },
                "longitud": {
                    "type": "number"
                },
                "barrio": {
                    "type": "string"
                },
                "tagBarrio": {
                    "type": "string"
                },
                "tagLocalidad": {
                    "type": "string"
                }
            },
            "required": [
                "barrio",
                "direccion",
                "latitud",
                "localidad",
                "longitud",
                "tagBarrio",
                "tagLocalidad"
            ],
            "title": "ESTRUCTURA_JSON_UBICACION"
    }

    constructor(infoInmueble){
        super()
        this.state = {
            ...this.state,
            ...infoInmueble,
            ...Utils.agregarCamposSiNoExisten(infoInmueble, ["servicios", "historialArrendatarios", "valoraciones"], []),
        }
    }

    actualizarInmueble(inmuebleActualizado){
        if ( this.state.listaValoraciones != inmuebleActualizado.valoraciones ){
            this.actualizarListaValoraciones( inmuebleActualizado.listaValoraciones )
        }
    }

    async cargarInformacionAdicional(){
        await this.cargarInformacionAdicionalFotos()
        await this.cargarInformacionAdicionalValoraciones()
    }

    async cargarInformacionAdicionalFotos(){

    }

    async cargarInformacionAdicionalValoraciones(){
        await super.cargarInformacionAdicionalValoraciones()
        this.recibirActualizacionValoracion = this.recibirActualizacionValoracion.bind(this)
        this.actualizarInmueble = this.actualizarInmueble.bind(this)
        for(let i in this.state.listaValoraciones){
            this.state.listaValoraciones[i].establecerReceptorValoracion(this.recibirActualizacionValoracion)
            ManejadorBD.escucharActualizacionesDocumento("Inmuebles2", this.state.idFirebase, this.actualizarInmueble)
        }
    }

    obtenerCalificacionPromedio(){
        if ( this.state.listaValoraciones.length === 0 ){
            return 0
        }
        let prom = 0
        for(let i in this.state.listaValoraciones){
            prom += this.state.listaValoraciones[i].state.calificacion
        }
        return prom / this.state.listaValoraciones.length
    }

    recibirActualizacionValoracion(nuevaValoracion){
        for(let i in this.state.listaValoraciones){
            if ( this.state.listaValoraciones[i].state.idFirebase === nuevaValoracion.state.idFirebase ){
                this.state.listaValoraciones[i] = nuevaValoracion
                this.actualizarListaValoraciones(this.state.listaValoraciones)
                break
            }
        }
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

    static validarEstructuraObjeto(infoInmueble){
        var Validator = require('jsonschema').Validator
        var v = new Validator()
        var erroresInmuebles = v.validate(infoInmueble, this.ESTRUCTURA_JSON)
        if ( erroresInmuebles.errors.length > 0 ){
            return erroresInmuebles
        }
        return this.validarEstructuraObjetoUbicacion(infoInmueble.ubicacion) 
    }

    static validarEstructuraObjetoUbicacion(infoUbicacion){
        var Validator = require('jsonschema').Validator
        var v = new Validator()
        return v.validate(infoUbicacion, this.ESTRUCTURA_JSON_UBICACION)
    }

    
}

export default Inmueble