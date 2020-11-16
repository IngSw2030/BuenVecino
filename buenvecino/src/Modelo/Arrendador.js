import Apartamento from './Apartamento';
import Casa from './Casa';
import Habitacion from './Habitacion';
import ManejadorBD from './Firebase/ManejadorBD';
import Utils from './Utils';
import Inmueble from './Inmueble';

class Arrendador{

    static TABLA_INMUEBLES = "Inmuebles2"

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
        this.state = {
            ...infoUsuario,
            ...Utils.agregarCamposSiNoExisten(infoUsuario, ["inmuebles", "chats"], [])
        }
    }

    agregarIdFirebase(idFirebase){
        this.state = {
            ...this.state,
            idFirebase: idFirebase,
        }
    }

    async registrarInmueble(infoInmueble, fotos){
        try {
            let errores = Arrendador.validarEstructuraObjetoInmueble(infoInmueble)
            if ( errores.errors.length > 0 ){
                //REVISAR ERROR ID ERROR
                return {respuesta: false, idError: 3, mensaje: errores}
            }
            console.log("MODIFICAR TABLA INMUEBLES 2 POR INMUEBLES")
            let idInmueble = await ManejadorBD.escribirInformacion("Inmuebles2", infoInmueble)
            let inmueble = Arrendador.crearObjetoInmueble(infoInmueble, idInmueble)
            await ManejadorBD.actualizarInformacion("Arrendadores", this.state.idFirebase, {inmuebles: [...this.state.inmuebles, idInmueble]})
            this.state.listaInmuebles.push(inmueble)
            return {respuesta: true, idError: 0, mensaje: "Inmueble registrado exitosamente"}
        }
        catch (error) {
            throw error
        }



        
    }

    //Carga los inmuebles y otros datos (aun no definidos) dentro del objeto del arrendador actual
    async cargarInformacionAdicional(){
        let listaInmuebles = []
        let inmueblesAux = this.state.inmuebles
        for(let i in inmueblesAux ){
            let objeto = await ManejadorBD.leerInformacionDocumento(Arrendador.TABLA_INMUEBLES, inmueblesAux[i])
            switch( objeto.tipo ){
                case "C" : objeto = new Casa(objeto); break
                case "A" : objeto = new Apartamento(objeto); break
                case "H" : objeto = new Habitacion(objeto); break
                default : console.log("Tipo de Inmueble no permitido : " + objeto.tipo + "\t" + objeto.idFirebase)
            }
            listaInmuebles[i] = objeto
        }
        this.state = {
            ...this.state,
            listaInmuebles : listaInmuebles
        }
    }

    static crearObjetoInmueble(infoInmueble, idFirebase){
        infoInmueble = {...infoInmueble, idFirebase}
        if ( infoInmueble.tipo == "C" ){
            return new Casa(infoInmueble)
        }
        else if ( infoInmueble.tipo == "A" ) {
            return new Apartamento(infoInmueble)
        }
        else{
            return new Habitacion(infoInmueble)
        }
    }

    async eliminarInmueble(idInmueble){
        for(let i in this.state.inmuebles){
            if ( this.state.inmuebles[i] == idInmueble ){
                let auxiliar = this.state.inmuebles[i]
                let inmueblesAux = this.state.inmuebles
                inmueblesAux.splice(i, 1)
                this.state.listaInmuebles.splice(i, 1)
                this.state =  {...this.state, inmuebles: inmueblesAux} 
                let objauxiliar = await ManejadorBD.leerInformacionDocumento(Arrendador.TABLA_INMUEBLES, auxiliar)
                await ManejadorBD.actualizarInformacion("Arrendadores", this.state.idFirebase, {inmuebles: inmueblesAux})
                await ManejadorBD.borrarInformacion(Arrendador.TABLA_INMUEBLES, idInmueble)
                return {respuesta: true, idError: 0, mensaje: "Inmueble eliminado exitosamente", auxiliar: objauxiliar, auxiliar2: auxiliar}
            }
        }
        return {respuesta: false, idError: 1, mensaje: "Inmueble no encontrado"}
    }

    async modificarInmueble(idInmueble, camposModificados){
        console.log("Cambiar el ATRIBUTO ESTATICO TABLA_INMUEBLES")
        let inmuebleModificado = null
        for( let i in this.state.listaInmuebles ){
            let idAInmuebleAux = this.state.listaInmuebles[i].state.idFirebase
            if ( idAInmuebleAux == idInmueble  ){
                inmuebleModificado = this.state.listaInmuebles[i].state
                break
            }
        }
        if ( inmuebleModificado == null ){
            return {respuesta: false, idError: 1, mensaje: "Inmueble no encontrado"}
        }
        await ManejadorBD.actualizarInformacion(Arrendador.TABLA_INMUEBLES, idInmueble, {...inmuebleModificado, ...camposModificados})
        return {respuesta: true, idError: 0, mensaje: "Modificación realizada"}
    }

    static validarEstructuraObjeto(infoArrendatario){
        var Validator = require('jsonschema').Validator;
        var v = new Validator();
        return v.validate(infoArrendatario, this.ESTRUCTURA_JSON)
    }

    //NOTA IMPORTANTE: Este método no lo puede implementar la clase Inmueble porque se generaría una dependencia
    //circular entre la clase Inmueble y las que heredan de ella 
    static validarEstructuraObjetoInmueble(infoInmueble){
        if ( infoInmueble.tipo == "C" ){
            return Casa.validarEstructuraObjeto(infoInmueble)
        }
        else if ( infoInmueble.tipo == "A" ) {
            return Apartamento.validarEstructuraObjeto(infoInmueble)
        }
        else{
            return Habitacion.validarEstructuraObjeto(infoInmueble)
        }
    }

}

export default Arrendador