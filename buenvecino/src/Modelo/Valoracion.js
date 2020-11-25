import ManejadorBD from './Firebase/ManejadorBD'

class Valoracion{

    static ESTRUCTURA_JSON = {
        
        "type": "object",
        "additionalProperties": false,
        "properties": {
            "idAutor": {
                "type": "string"
            },
            "idValorado":{
                "type": "string"
            },
            "comentario":{
                "type": "string"
            },
            "calificacion":{
                "type": "integer",
                "minimum" : 1,
                "maximun" : 5
            },
            "fecha":{
                "type": "integer"
            },
            "tipo":{
                "type": "string",
                "enum": ["AO", "AR", "IN"],
            }
        },
        "required": [
            "idAutor",
            "idValorado",
            "comentario",
            "calificacion",
            "fecha",
            "tipo"
        ],
        "title": "ESTRUCTURA_JSON"
        
    }

    constructor(infoValoracion){
        this.state = {
            ...infoValoracion,
            receptorValoracion: null
        }
        this.actualizarValoracion = this.actualizarValoracion.bind(this)
    }

    actualizarValoracion(nuevaValoracion){
        this.state = {...this.state, ...nuevaValoracion}
        if ( this.state.receptorValoracion !== null ){
            this.state.receptorValoracion(this)
        }
    }

    establecerReceptorValoracion(receptor){
        this.state.receptorValoracion = receptor
        return {idError: 0, mensaje: "Receptor de Valoración establecido exitosamente"}
    }

    obtenerColeccionAsociadaAutor(){
        return Valoracion.obtenerColeccionDelAutorSegunTipo(this.state.tipo)
    }

    obtenerColeccionAsociadaValorado(){
        return Valoracion.obtenerColeccionDelValoradoSegunTipo(this.state.tipo)
    }

    perteneceA(idPosiblePropietario){
        return this.state.idAutor === idPosiblePropietario
    }

    static async existeObjetoValorado(tipoValoracion, idObjeto){
        let coleccion = this.obtenerColeccionDelValoradoSegunTipo(tipoValoracion)
        console.log( coleccion, idObjeto, " BOBOBOBOB " )
        let respuesta = await ManejadorBD.leerInformacionDocumento(coleccion, idObjeto)
        console.log("RESP : ", respuesta)
        return respuesta !== null ? true : false
    }

    //Retorna la coleccion asociada al autor de la valoracion basandose en un tipo de valoracion
    static obtenerColeccionDelAutorSegunTipo(tipoValoracion){ 
        switch( tipoValoracion ){
            case "IN": 
            case "AR": return "Arrendatarios"
            case "AO": return "Arrendadores"
            default: return null
        } 
    }

    //Retorna la coleccion asociada al objeto valorado de la valoracion basandose en un tipo de valoracion
    static obtenerColeccionDelValoradoSegunTipo(tipoValoracion){ 
        switch( tipoValoracion ){
            case "IN": return "Inmuebles2"
            case "AR": return "Arrendadores"
            case "AO": return "Arrendatarios"
            default: return null
        } 
    }

    static revisarTipoValoracion(tipoUsuario, tipoValoracion){
        //Arrendador, lo puede evaluar un arrendatario
        if ( tipoValoracion === "AR" ){
            return tipoUsuario === "AO" ?
                {idError: 0, mensaje: "Tipo de valoración correcto"} :
                {idError: 2, mensaje: "Un Arrendador solo puede ser evaluado por un Arrendatario"}
        }
        //Arrendatario, lo puede valorar un arrendador
        else if ( tipoValoracion === "AO" ){
            return tipoUsuario === "AR" ?
                {idError: 0, mensaje: "Tipo de valoración correcto"} :
                {idError: 2, mensaje: "Un Arrendatario solo puede ser evaluado por un Arrendador"}
        }
        //Inmueble, lo puede valorar un arrendatario
        else if ( tipoValoracion === "IN" ){
            return tipoUsuario === "AO" ?
                {idError: 0, mensaje: "Tipo de valoración correcto"} :
                {idError: 2, mensaje: "Un Inmueble solo puede ser evaluado por un Arrendatario"}
        }
        else{
            return {idError: 1, mensaje: "Tipo de valoración invalida, solo se permiten AR, AO o IN"}
        }
    }

    static validarEstructuraObjeto(infoValoracion){
        let Validator = require('jsonschema').Validator;
        let v = new Validator();
        return v.validate(infoValoracion, this.ESTRUCTURA_JSON) 
    }

}

export default Valoracion