import Utils from './Utils'
import Favorito from './Favorito';
import ManejadorBD from './Firebase/ManejadorBD';
import Usuario from './Usuario'
import SolicitudReserva from './SolicitudReserva';
import Pago from './Pago';
import Reservacion from './Reservacion';

class Arrendatario extends Usuario{
    static TABLA_FAVORITOS = "Favoritos"
    
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

    constructor(infoUsuario){
        super(infoUsuario)
        this.state = {
            ...this.state,
            ...Utils.agregarCamposSiNoExisten(infoUsuario, ["favoritos", "metodoPago", "historialPagos", "reservaciones"], []),
        }
    }

    async agregarFavorito (infoFavorito){
        try {
            let errores = Favorito.validarEstructuraObjeto(infoFavorito)
            if ( errores.errors.length > 0 ){
                return {idError: 1, mensaje: errores}
            }
            for(let i in this.state.listaFavoritos){
                if ( this.state.listaFavoritos[i].estaAsociadoMismoInmueble(infoFavorito.idInmueble) ){
                    return {idError: 2, mensaje: "Ya existe un favorito con dicho inmueble"}
                }
            }
            let idFavorito  = await ManejadorBD.escribirInformacion("Favoritos", infoFavorito)
            let favorito = Arrendatario.crearObjetoFavorito(infoFavorito, idFavorito)
            let clausulaAgregar = Utils.clausulaAgregarElementoArrayFirebase(idFavorito)
            await ManejadorBD.actualizarInformacion("Arrendatarios", this.state.idFirebase, {favoritos: clausulaAgregar})
            this.state.favoritos.push(idFavorito)
            this.state.listaFavoritos.push(favorito)
            return {idError: 0, mensaje: "Inmueble agregado a favoritos"}
        }
        catch (error) {
            throw error
        }
    }

    buscarFavorito(idInmueble){
        for(let i in this.state.listaFavoritos){
            if ( this.state.listaFavoritos[i].estaAsociadoMismoInmueble(idInmueble) ){
                return this.state.listaFavoritos[i]
            }
        }
        return null
    }

    //Cancela las otras solicitudes que el usuario tenía abiertas para la misma fecha
    cancelarOtrasSolicitudes(infoSolicitud){
        let idSolicitudAceptada = infoSolicitud.idFirebase
        let fecha1 = infoSolicitud.fechaInicio
        let fecha2 = infoSolicitud.fechaFin
        for(let i in this.state.listaSolicitudes){
            let solActual = this.state.listaSolicitudes[i]
            let estaAbierta = solActual.estaAbierta()
            let noEsLaNueva = solActual.state.idFirebase !== idSolicitudAceptada
            let coincideFecha = solActual.fechasSeCruzan(fecha1, fecha2)
            if ( estaAbierta && noEsLaNueva && coincideFecha ){
                this.cambiarEstadoSolicitudLocalmente(solActual.state.idFirebase, "C")
                this.cambiarEstadoSolicitudBaseDatos(solActual.state.idFirebase, "C")
            }
        }
    }

    cancelarSolicitudReserva(idSolicitud){
        let respuesta = this.cambiarEstadoSolicitudLocalmente(idSolicitud, "C")
        if ( respuesta.idError !== 0 ){
            return respuesta
        }
        this.cambiarEstadoSolicitudBaseDatos(idSolicitud, "C") 
        return {idError: 0, mensaje: "Solicitud cancelada exitosamente"}       
    }

    //Cancela las otras solicitudes que el inmueble tenia
    async cancelarSolicitudesParaInmueble(infoSolicitud){
        let idInmueble = infoSolicitud.idInmueble
        let idSolicitudAprobada = infoSolicitud.idFirebase
        let fecha1 = infoSolicitud.fechaInicio
        let fecha2 = infoSolicitud.fechaFin
        let respuesta = await ManejadorBD.realizarConsulta("Solicitudes", ["idInmueble"], ["=="], [idInmueble])
        for(let i in respuesta){
            if ( respuesta[i].idFirebase !== idSolicitudAprobada ){
                let objRervaAux = new SolicitudReserva( respuesta[i] )
                if ( objRervaAux.estaAbierta() && objRervaAux.fechasSeCruzan(fecha1, fecha2) ){
                    this.cambiarEstadoSolicitudBaseDatos(respuesta[i].idFirebase, "O" )
                }
            }
        }
    }

    async cargarInformacionAdicional(){
        await super.cargarInformacionAdicional()
        await this.cargarInformacionAdicionalFavoritos()
        await this.cargarInformacionAdicionalPagos()
        await this.cargarInformacionAdicionalReservaciones()
    }

    async cargarInformacionAdicionalFavoritos(){
        let listaFavoritos = []
        for(let i in this.state.favoritos){
            let objeto = await ManejadorBD.leerInformacionDocumento(Arrendatario.TABLA_FAVORITOS, this.state.favoritos[i])
            objeto = new Favorito(objeto)
            listaFavoritos[i] = objeto
        }
        this.state = {
            ...this.state,
            listaFavoritos : listaFavoritos
        }
    }

    async cargarInformacionAdicionalPagos(){
        let listaPagos = []
        for(let i in this.state.historialPagos){
            let objeto = await ManejadorBD.leerInformacionDocumento("Pagos", this.state.historialPagos[i])
            objeto = new Pago(objeto)
            listaPagos[i] = objeto
        }
        this.state = {
            ...this.state,
            listaPagos : listaPagos
        }
    }

    async cargarInformacionAdicionalReservaciones(){
        let listaReservaciones = []
        for(let i in this.state.reservaciones){
            let objeto = await ManejadorBD.leerInformacionDocumento("Reservaciones", this.state.reservaciones[i])
            objeto = new Reservacion(objeto)
            listaReservaciones[i] = objeto
        }
        this.state = {
            ...this.state,
            listaReservaciones : listaReservaciones
        }
    }

    async confirmarSolicitudReserva(idSolicitud){
        for(let i in this.state.solicitudes){
            if ( this.state.solicitudes[i] === idSolicitud ){
                let pagoEfectuado = null
                for(let j in this.state.historialPagos){
                    if ( this.state.listaPagos[j].perteneceSolicitud(idSolicitud) ){
                        pagoEfectuado = this.state.listaPagos[j].state
                        break
                    }
                }
                if ( pagoEfectuado === null ){
                    return {idError: 2, mensaje: "Aun no hay un pago para la solicitud"}
                }
                let objSolicitud = this.state.listaSolicitudes[i].state
                let infoReserva = {
                    idArrendatario: objSolicitud.idArrendatario,
                    idArrendador: objSolicitud.idArrendador,
                    idInmueble: objSolicitud.idInmueble,
                    fechaInicio: objSolicitud.fechaInicio,
                    fechaFin: objSolicitud.fechaFin,
                    valor: pagoEfectuado.valor,
                    valoracion: ""
                }
                let errores = Reservacion.validarEstructuraObjeto(infoReserva)
                if ( errores.errors.length > 0 ){
                    return {idError: 3, mensaje: errores}
                }
                let idReserva = await ManejadorBD.escribirInformacion("Reservaciones", infoReserva)
                let reserva = new Reservacion( {idFirebase: idReserva, ...infoReserva} )
                this.state.listaReservaciones.push( reserva )
                this.state.reservaciones.push( idReserva )
                let clausulaAgregarHI = {reservaciones: Utils.clausulaAgregarElementoArrayFirebase(idReserva)}
                ManejadorBD.actualizarInformacion("Arrendatarios", this.state.idFirebase, clausulaAgregarHI)
                this.cambiarEstadoSolicitudLocalmente(idSolicitud, "CC")
                this.cambiarEstadoSolicitudBaseDatos(idSolicitud, "CC")
                this.cancelarSolicitudesParaInmueble(objSolicitud)
                this.cancelarOtrasSolicitudes(objSolicitud)
                return {idError: 0, mensaje: "Confirmación realizada exitosamente"} 
            }
        }
        return {idError: 1, mensaje: "Solicitud no encontrada"}
    }

    static crearObjetoFavorito(infoFavorito, idFirebase){
        infoFavorito = {...infoFavorito, idFirebase}
        return new Favorito(infoFavorito)
    }

    async crearSolicitudReserva(infoSolicitud){
        infoSolicitud = {...infoSolicitud, estado: "D"}
        let errores = SolicitudReserva.validarEstructuraObjeto(infoSolicitud)
        if ( errores.errors.length > 0 ){
            return {idError: 4, mensaje: errores}
        }
        let fecha1 = infoSolicitud.fechaInicio
        let fecha2 = infoSolicitud.fechaFin
        if ( this.existeSolicitudReservaAbierta(infoSolicitud.idInmueble) ){
            return {idError: 3, mensaje: "Ya existe una solicitud de Reserva para este inmueble"}
        }
        if ( this.existeReservacionEnMismaFechaArrendatario(fecha1, fecha2) ){
            return {idError: 5, mensaje: "Ya existe una reservación en ese periodo"}
        }
        if ( await this.existeReservacionEnMismaFechaInmueble(infoSolicitud.idInmueble, fecha1, fecha2) ){
            return {idError: 2, mensaje: "El inmueble no esta disponible para esa fecha"}
        }
        let idSolicitud =  await ManejadorBD.escribirInformacion("Solicitudes", infoSolicitud)
        let clausulaAgregar = {solicitudes: Utils.clausulaAgregarElementoArrayFirebase(idSolicitud)}
        await ManejadorBD.actualizarInformacion("Arrendatarios", this.state.idFirebase, clausulaAgregar)
        await ManejadorBD.actualizarInformacion("Arrendadores", infoSolicitud.idArrendador, clausulaAgregar)
        infoSolicitud = {...infoSolicitud, idFirebase: idSolicitud}
        let objSolicitudReserva = new SolicitudReserva(infoSolicitud)
        this.state.listaSolicitudes.push(objSolicitudReserva)
        objSolicitudReserva.iniciarEscuchaActualizaciones()
        this.state.solicitudes.push(idSolicitud)
        this.actualizarListaSolicitudes(this.state.solicitudes)
        return {idError: 0, mensaje: "Solicitud creada exitosamente"}
    }

    eliminarFavorito (idFavorito){
        for(let i in this.state.favoritos){
            if(this.state.favoritos[i] === idFavorito){
                this.state.favoritos.splice(i, 1)
                this.state.listaFavoritos.splice(i, 1)
                let clausulaEliminar = Utils.clausulaEliminarElementoArrayFirebase(idFavorito)
                ManejadorBD.actualizarInformacion("Arrendatarios", this.state.idFirebase, {favoritos: clausulaEliminar})
                ManejadorBD.borrarInformacion(Arrendatario.TABLA_FAVORITOS, idFavorito)
                
                return {idError: 0, mensaje: "Favorito eliminado exitosamente"}
            }
        }
        return {idError: 1, mensaje: "Favorito no encontrado"}
    }

    existeReservacionEnMismaFechaArrendatario(fechaInicio, fechaFin){
        
        for(let i in this.state.listaReservaciones){
            let fecha1 = this.state.listaReservaciones[i].state.fechaInicio
            let fecha2 = this.state.listaReservaciones[i].state.fechaFin
            if ( Utils.fechasSeCruzan(fechaInicio, fechaFin, fecha1, fecha2) ){
                return true
            }
        }
        return false
    }

    async existeReservacionEnMismaFechaInmueble(idInmueble, fecha1, fecha2){
        let resultado = await ManejadorBD.realizarConsulta("Reservaciones", ["idInmueble"], ["=="], [idInmueble])
        for(let i in resultado){
            let objAux = new SolicitudReserva(resultado[i])
            if ( objAux.fechasSeCruzan(fecha1, fecha2) ){
                return true
            }
        }
        return false
    }

    existeSolicitudReservaAbierta(idInmueble){
        for(let i in this.state.solicitudes){
            if ( this.state.listaSolicitudes[i].estaAsociadoMismoInmueble(idInmueble) ){
                if ( this.state.listaSolicitudes[i].estaAbierta() ){
                    return true
                }
            }
        }
        return false
    }

    //Por el momento es una simulación, como mensaje de exito retorna la misma información del pago recibida
    async realizarPago(idSolicitud, infoPago){
        for(let i in this.state.listaPagos){
            if ( this.state.listaPagos[i].state.idSolicitud === idSolicitud ){
                return {idError: 4, mensaje: "Pago ya efectuado para dicha solicitud"}
            }
        }
        for(let i in this.state.solicitudes){
            if ( this.state.solicitudes[i] === idSolicitud ){
                
                infoPago = {...infoPago, estado: "D"}
                let errores = Pago.validarEstructuraObjeto(infoPago)
                if ( errores.errors.length > 0 ){
                    return {idError: 2, mensaje: errores}
                }
                //SIMULACIÓN : Deberia ser obtenida desde la entidad Financiera / Pasarela de Pagos
                let bloqueoSolicitudes = await SolicitudReserva.bloquearSolicitudesTemporalmente(this.state.listaSolicitudes[i])
                if ( bloqueoSolicitudes.idError !== 0 ){
                    return bloqueoSolicitudes
                }                
                let informacionPagoSimulado = {
                    idSolicitud: idSolicitud,
                    estado: "A",
                    valor: infoPago.valor,
                    informacionAdicional: {
                        entidad: "Bancolombia",
                        fecha: Date.now(),
                        pagador: this.state.nombre,
                        pagadoA: "#DATO_SIMULADO"
                    }
                }
                let ultMomento = Date.now()
                //while(Date.now() - ultMomento < 30000){}
                //Remover el bloqueo
                await SolicitudReserva.liberarBloqueosSolicitudes( bloqueoSolicitudes.idBloqueo )
                if ( informacionPagoSimulado.estado === "A" ){
                    infoPago.estado = "A"
                }
                else{
                    return {idError: 3, mensaje: "Su solicitud de pago no ha sido aceptada"}
                }
                //FIN SIMULACIÓN
                
                let idFirebase = await ManejadorBD.escribirInformacion("Pagos", informacionPagoSimulado)
                this.state.listaPagos.push( new Pago( {...informacionPagoSimulado, idFirebase} ) )
                this.state.historialPagos.push( idFirebase )
                let clausulaAgregar = {historialPagos: Utils.clausulaAgregarElementoArrayFirebase(idFirebase)}
                ManejadorBD.actualizarInformacion("Arrendatarios", this.state.idFirebase, clausulaAgregar)
                return {idError: 0, mensaje: "Pago efectuado exitosamente", informacionPago: infoPago}
            }
        }
        return {idError: 1, mensaje: "Solicitud no encontrada"}
    }

    static transformarInformacionJSON(){
        for(let i in this.state.listaFavoritos){
            this.state.listaFavoritos[i] = new Favorito( this.state.listaFavoritos[i].state )
            this.state.listaFavoritos[i].transformarInformacionJSON()
        } 
        for(let i in this.state.listaPagos){
            this.state.listaPagos[i] = new Pago( this.state.listaPagos[i].state )
            this.state.listaPagos[i].transformarInformacionJSON()
        } 
        for(let i in this.state.listaReservaciones){
            this.state.listaReservaciones[i] = new Reservacion( this.state.listaReservaciones[i].state )
            this.state.listaReservaciones[i].transformarInformacionJSON()
        }   
    }

    static validarEstructuraObjeto(infoArrendatario){
        let Validator = require('jsonschema').Validator;
        let v = new Validator();
        return v.validate(infoArrendatario, this.ESTRUCTURA_JSON) 
    }
    

}
 
export default Arrendatario