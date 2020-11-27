import Apartamento from './Apartamento';
import Casa from './Casa';
import Habitacion from './Habitacion';
import ManejadorBD from './Firebase/ManejadorBD';
import Utils from './Utils';
import Usuario from './Usuario'
import ManejadorSg from './Firebase/ManjadorSg';
import Inmueble from './Inmueble';

class Arrendador extends Usuario{

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
            },
            "direccion": {
                "type": "string"
            },
            "ciudad": {
                "type": "string"
            }
        },
        "required": [
            "ciudad",
            "direccion",
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

    constructor(infoUsuario){   
        super(infoUsuario)
        this.state = {
            ...this.state,
            ...Utils.agregarCamposSiNoExisten(infoUsuario, ["inmuebles"], [])
        }
    }

    aceptarSolicitudReserva(idSolicitud){
        let respuesta = this.cambiarEstadoSolicitudLocalmente(idSolicitud, "A")
        if ( respuesta.idError !== 0 ){
            return respuesta
        }
        this.cambiarEstadoSolicitudBaseDatos(idSolicitud, "A") 
        return {idError: 0, mensaje: "Solicitud aceptada exitosamente"}
    }

    agregarServiciosInmueble(idInmueble, idServicios){
        for(let i in this.state.listaInmuebles){
            if ( this.state.listaInmuebles.state.idFirebase === idInmueble ){
                return this.state.listaInmuebles.agregarServicios(idServicios)
            }
        }
        return {idError: 1, mensaje: "El inmueble no existe"}
    }

    async cargarInformacionAdicional(){
        await super.cargarInformacionAdicional()
        await this.cargarInformacionAdicionalInmuebles()
    }

    async cargarInformacionAdicionalInmuebles(){
        let listaInmuebles = []
        let inmueblesAux = this.state.inmuebles
        let consulta = await ManejadorBD.realizarConsulta("Inmuebles", ["idPropietario"], ["=="], [this.state.idFirebase])
        consulta = Utils.emparejarArrayIds( consulta, this.state.inmuebles )
        for( let i in consulta ){
            let objeto = consulta[i]
            switch( objeto.tipo ){
                case "C" : objeto = new Casa(objeto); break
                case "A" : objeto = new Apartamento(objeto); break
                case "H" : objeto = new Habitacion(objeto); break
                default : console.log("Tipo de Inmueble no permitido : " + objeto.tipo + "\t" + objeto.idFirebase)
            }
            listaInmuebles[i] = objeto
            listaInmuebles[i].cargarInformacionAdicional()
        }
        this.state = {
            ...this.state,
            listaInmuebles : listaInmuebles
        }
    }

    static crearObjetoInmueble(infoInmueble, idFirebase){
        infoInmueble = {...infoInmueble, idFirebase}
        if ( infoInmueble.tipo === "C" ){
            return new Casa(infoInmueble)
        }
        else if ( infoInmueble.tipo === "A" ) {
            return new Apartamento(infoInmueble)
        }
        else{
            return new Habitacion(infoInmueble)
        }
    }

    async eliminarInmueble(idInmueble){
        for(let i in this.state.inmuebles){
            if ( this.state.inmuebles[i] === idInmueble ){
                let auxiliar = this.state.inmuebles[i]
                this.state.inmuebles.splice(i, 1)
                this.state.listaInmuebles.splice(i, 1)
                let objauxiliar = await ManejadorBD.leerInformacionDocumento("Inmuebles", auxiliar)
                let clausulaEliminar = Utils.clausulaEliminarElementoArrayFirebase(idInmueble)
                await ManejadorBD.actualizarInformacion("Arrendadores", this.state.idFirebase, {inmuebles: clausulaEliminar})
                await ManejadorBD.borrarInformacion("Inmuebles", idInmueble)
                return {idError: 0, mensaje: "Inmueble eliminado exitosamente"}
            }
        }
        return {idError: 1, mensaje: "Inmueble no encontrado"}
    }

    async modificarInmueble(idInmueble, camposModificados){
        let inmuebleModificado = null
        for( let i in this.state.listaInmuebles ){
            let idAInmuebleAux = this.state.listaInmuebles[i].state.idFirebase
            if ( idAInmuebleAux === idInmueble  ){
                inmuebleModificado = this.state.listaInmuebles[i].state
                break
            }
        }
        if ( inmuebleModificado === null ){
            return {idError: 1, mensaje: "Inmueble no encontrado"}
        }
        await ManejadorBD.actualizarInformacion("Inmuebles", idInmueble, camposModificados)
        return {idError: 0, mensaje: "Modificación realizada"}
    }

    obtenerInmueblesCargados(){
        let respuesta = this.state.listaInmuebles.map( (item) => item.state )
        return respuesta
    }

    rechazarSolicitudReserva(idSolicitud){
        let respuesta = this.cambiarEstadoSolicitudLocalmente(idSolicitud, "R")
        if ( respuesta.idError !== 0 ){
            return respuesta
        }
        this.cambiarEstadoSolicitudBaseDatos(idSolicitud, "R") 
        return {idError: 0, mensaje: "Solicitud rechazada exitosamente"} 
    }

    async registrarInmueble(infoInmueble, fotos){
        try {
            infoInmueble.idPropietario = this.state.idFirebase
            let tagsBusqueda = Inmueble.obtenerCadenaBusqueda( infoInmueble.ubicacion.barrio, infoInmueble.ubicacion.localidad )
            infoInmueble.ubicacion = { ...infoInmueble.ubicacion, ...tagsBusqueda }
            let errores = Arrendador.validarEstructuraObjetoInmueble(infoInmueble)
            if ( errores.errors.length > 0 ){
                return {idError: 3, mensaje: errores}
            }
            let idInmueble = await ManejadorBD.escribirInformacion("Inmuebles", infoInmueble)
            let inmueble = Arrendador.crearObjetoInmueble(infoInmueble, idInmueble)
            let clausulaAgregar = Utils.clausulaAgregarElementoArrayFirebase(idInmueble)
            await ManejadorBD.actualizarInformacion("Arrendadores", this.state.idFirebase, {inmuebles: clausulaAgregar})
            this.state.listaInmuebles.push(inmueble)
            return {idError: 0, mensaje: "Inmueble registrado exitosamente", idInmueble: idInmueble}
            
        }
        catch (error) {
            throw error
        }        
    }

    async subirFotosInmueble(idInmueble, archivos){
        for(let i in this.state.listaInmuebles){
            if ( this.state.listaInmuebles[i].state.idFirebase === idInmueble ){
                let imagenesRechazadas = []
                let consecutivo = 1
                let urls = []
                for( let i=0; i<archivos.length; i++ ){
                    if ( !archivos[i].type.startsWith("image/") ){
                        imagenesRechazadas.push( archivos[i] )
                    }
                    else{
                        let nombre = "FOTO" + consecutivo
                        let url = await ManejadorSg.subirFotoInmueble(idInmueble, nombre, archivos[i])
                        urls.push( url )
                        consecutivo++
                    }
                }
                if ( imagenesRechazadas.length === archivos.length ){
                    return {idError: 3, mensaje: "Los archivos fueron cargados", rechazados: imagenesRechazadas}
                }
                else if ( imagenesRechazadas.length !== 0 ){
                    this.state.listaInmuebles[i].agregarUrlsFotos(urls)
                    return {idError: -1, mensaje: "Algunos archivos fueron rechazados", rechazados: imagenesRechazadas}
                }
                else{
                    this.state.listaInmuebles[i].agregarUrlsFotos(urls)
                    return {idError: 0, mensaje: "Las imagenes fueron cargadas exitosamente"}
                }  
            }
        }
        return {idError: 2, mensaje: "El inmueble no existe"}
    }

    static validarEstructuraObjeto(infoArrendatario){
        var Validator = require('jsonschema').Validator;
        var v = new Validator();
        return v.validate(infoArrendatario, this.ESTRUCTURA_JSON)
    }

    //NOTA IMPORTANTE: Este método no lo puede implementar la clase Inmueble porque se generaría una dependencia
    //circular entre la clase Inmueble y las que heredan de ella 
    static validarEstructuraObjetoInmueble(infoInmueble){
        if ( infoInmueble.tipo === "C" ){
            return Casa.validarEstructuraObjeto(infoInmueble)
        }
        else if ( infoInmueble.tipo === "A" ) {
            return Apartamento.validarEstructuraObjeto(infoInmueble)
        }
        else{
            return Habitacion.validarEstructuraObjeto(infoInmueble)
        }
    }

}

export default Arrendador