import { InfoRounded } from '@material-ui/icons';
import Utils from './Utils'
import SistemaBV from './SistemaBV'
import Arrendador from './Arrendador';
import Favorito from './Favorito';
import ManejadorBD from './Firebase/ManejadorBD';

class Arrendatario{
    static TABLA_FAVORITOS = "Favorito"
    
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
        this.state = {
            ...infoUsuario,
            ...Utils.agregarCamposSiNoExisten(infoUsuario, ["chats", "favoritos", "historialInmuebles", "metodoPago"])        
        }
    }

    async cargarInformacionAdicional(){
        console.log("INFORMACION ADICIONAL ARRENDATARIO AUN NO IMPLEMENTADA")
    }

    static validarEstructuraObjeto(infoArrendatario){
        let Validator = require('jsonschema').Validator;
        let v = new Validator();
        return v.validate(infoArrendatario, this.ESTRUCTURA_JSON) 
    }
    
    async agregarFavorito (infoFavorito){
        try {
            let idFavorito  = await ManejadorBD.escribirInformacion("Favorito", infoFavorito)
            let favorito = Arrendatario.crearObjetoFavorito(infoFavorito, idFavorito)
            let clausulaAgregar = Utils.clausulaAgregarElementoArrayFirebase(idFavorito)
            await ManejadorBD.actualizarInformacion("Arrendatarios", this.state.idFirebase, {favorito: clausulaAgregar})
            this.state.listaInmuebles.push(favorito)
            return {idError: 0, mensaje: "Inmueble agregado a favorito"}
        }
        catch (error) {
            throw error
        }
    }

    async eliminarFavorito (idFavorito){
        for(let i in this.state.favorito){
            if(this.state.favorito[i] == idFavorito){
                let auxiliar = this.state.favorito[i]
                let favoritoAux = this.state.favorito
                favoritoAux.splice(i, 1)
                this.state.listaFavoritos.splice(i, 1)
                this.state = {...this.state, favorito: favoritoAux}
                let objauxiliar = await ManejadorBD.leerInformacionDocumento(Arrendatario.TABLA_FAVORITOS, auxiliar)
                let clausulaEliminar = Utils.clausulaEliminarElementoArrayFirebase(idFavorito)
                await ManejadorBD.actualizarInformacion("Arrendatario", this.state.idFirebase, {favorito: clausulaEliminar})
                await ManejadorBD.borrarInformacion(Arrendatario.TABLA_Favoritos, idFavorito)
                return {idError: 0, mensaje: "Inmueble eliminado exitosamente de favoritos", auxiliar: objauxiliar, auxiliar2: auxiliar}
            }
        }
        return {idError: 1, mensaje: "Inmueble no encontrado"}
    }


    static crearObjetoFavorito(infoFavorito, idFirebase){
        infoFavorito = {...infoFavorito, idFirebase}
        return new Favorito(infoFavorito)
    }

     async cargarInformacionAdicionalFavoritos(){
        let listaFavoritos = []
        let favoritoAux = this.state.favorito
        for(let i in favoritoAux){
            let objeto = await ManejadorBD.leerInformacionDocumento(Arrendatario.TABLA_Favoritos, favoritoAux[i])
            objeto = new Favorito(objeto)
            listaFavoritos[i] = objeto
        }
        this.state = {
            ...this.state,
            listaFavoritos : listaFavoritos
        }
    }
}
 
export default Arrendatario