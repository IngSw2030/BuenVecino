import ManejadorBD from './Firebase/ManejadorBD'
import Utils from './Utils'

class SolicitudReserva{

    static TIEMPO_SOLICITUD = 10 * 60 * 1000

    static COLECCION_BLOQUEOS = "BloqueosSolicitudes"

    static RECEPTOR_SOLICITUD = null

    static ESTRUCTURA_JSON = {
        "type": "object",
        "additionalProperties": false,
        "properties": {
            "idArrendatario": {
                "type": "string"
            },
            "idArrendador": {
                "type": "string"
            },
            "idInmueble": {
                "type": "string"
            },
            "fechaInicio": {
                "type": "integer"
            },
            "fechaFin": {
                "type": "integer"
            },
            "estado":{
                "type": "string",
                "enum": ["A", "C", "D", "R", "CC", "O"],
                "$comment": "D: desconocido, A: Aceptado por Arrendatario, R: rechazado por Arrendatario, C: Cancelado por Arrendador, CC: Confirmado por Arrendador, O: EL inmueble ya fue ocupado"
            }
        },
        "required": [
            "idArrendatario",
            "idArrendador",
            "idInmueble",
            "fechaInicio",
            "fechaFin",
            "estado"
        ],
        "title": "ESTRUCTURA_JSON"
    }

    constructor(infoReserva){
        this.state = {
            ...infoReserva
        }
        this.actualizarSolicitud = this.actualizarSolicitud.bind(this)
    }

    async actualizarSolicitud(solicitudActualizada){
        if ( this.state.idFirebase != solicitudActualizada.idFirebase ){
            ManejadorBD.escribirInformacion("ADVERTENCIAS", {mensaje: "Se está disparando la función actualizar solicitud sobre un objeto que no debería"})
            return
        }
        let respuesta = this.cambiarEstado(solicitudActualizada.estado, true)
        if ( respuesta.idError != 0 ){
            ManejadorBD.escribirInformacion("ADVERTENCIAS", {mensaje: "Se está disparando la función actualizar solicitud con un estado prohibido"})
        }
    }

    cambiarEstado(nuevoEstado, ignorarSiNoCambia=false){
        
        let estado = this.state.estado
        let mensajeExito = "La solicitud ha cambiado de estado exitosamente"
        if ( nuevoEstado == estado && ignorarSiNoCambia){
            mensajeExito = "Solicitud cambiada artificialmente para notificar al receptor"
        }
        else if ( nuevoEstado == estado ){
            return {idError: 11, mensaje: "La solicitud ya tenía ese estado previamente"}
        }
        else if ( nuevoEstado == "D" ){
            return {idError: 10, mensaje: "No se puede cambiar al estado Desconocido en una solicitud que ya inició proceso"}
        }
        else if ( nuevoEstado == "R" && estado != "D" ){
            return {idError: 11, mensaje: "No se puede rechazar una solicitud que ya fue aceptada"}
        }
        else if ( nuevoEstado == "A" && estado != "D" ){
            return {idError: 12, mensaje: "No se puede aceptar una solicitud que no está a la espera de aceptacion"}
        }
        else if ( nuevoEstado == "CC" && estado != "A" ){
            return {idError: 13, mensaje: "No se puede confirmar una solicitud que no ha sido aceptada aun"}
        }
        this.state.estado = nuevoEstado
        if ( SolicitudReserva.RECEPTOR_SOLICITUD !== null ){
            SolicitudReserva.RECEPTOR_SOLICITUD(this.state)
        }
        return {idError: 0, mensaje: mensajeExito, antiguoEstado: estado, nuevoEstado: nuevoEstado}
    }

    estaAbierta(){
        let estado = this.state.estado
        if ( estado == "D" || estado == "A" ){
            return true
        }
        return false
    }

    estaAsociadoMismoInmueble(idInmueble){
        return this.state.idInmueble == idInmueble
    }

    fechasSeCruzan(fecha1, fecha2){
        return Utils.fechasSeCruzan(this.state.fechaInicio, this.state.fechaFin, fecha1, fecha2)
    }
    
    iniciarEscuchaActualizaciones(){
        ManejadorBD.escucharActualizacionesDocumento("Solicitudes", this.state.idFirebase, this.actualizarSolicitud)
    }

    static async bloquearSolicitudesTemporalmente(solicitud){
        if ( await this.existenBloqueosAsociadosSolicitud(solicitud) ){
            return {idError: 100, mensaje: "La solicitud presenta un bloqueo temporal para pago, mientras otro posible cliente realiza el suyo"}
        }
        let bloqueo = {
            idInmueble: solicitud.state.idInmueble,
            momento: Date.now()
        }
        let idBloqueo = await ManejadorBD.escribirInformacion(this.COLECCION_BLOQUEOS, bloqueo)
        return {idError: 0, mensaje: "Los pagos han sido bloqueados temporalmente por 10 minutos", idBloqueo: idBloqueo }
    }

    static establecerReceptorSolicitudes(metodoReceptor){
        this.RECEPTOR_SOLICITUD = metodoReceptor
        return {idError: 0, mensaje: "Receptor de Solicitudes enlazado correctamente"}
    }

    static async existenBloqueosAsociadosSolicitud(solicitud){
        let posBloc = await ManejadorBD.realizarConsulta(this.COLECCION_BLOQUEOS, ["idInmueble"], ["=="], [solicitud.state.idInmueble])
        let bloqueo = false    
        for(let i in posBloc){
            if ( Math.abs( posBloc[i].momento - Date.now() ) < this.TIEMPO_SOLICITUD ){
                bloqueo = true
            }
            else{
                ManejadorBD.borrarInformacion(this.COLECCION_BLOQUEOS, posBloc[i].idFirebase)
            }
        }
        return bloqueo
    }

    static async liberarBloqueosSolicitudes( idBloqueo ){
        await ManejadorBD.borrarInformacion( this.COLECCION_BLOQUEOS, idBloqueo )
    }

    
    static validarEstructuraObjeto(infoSolicitud){
        let Validator = require('jsonschema').Validator;
        let v = new Validator();
        return v.validate(infoSolicitud, this.ESTRUCTURA_JSON) 
    }
}

export default SolicitudReserva