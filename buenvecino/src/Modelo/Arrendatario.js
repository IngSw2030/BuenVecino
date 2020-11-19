import { InfoRounded } from '@material-ui/icons';
import Utils from './Utils'
import SistemaBV from './SistemaBV'
import Arrendador from './Arrendador';
import Favorito from './Favorito';
import ManejadorBD from './Firebase/ManejadorBD';
import Usuario from './Usuario'
import Chat from './Chat'

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
        super()
        this.state = {
            ...infoUsuario,
            ...Utils.agregarCamposSiNoExisten(infoUsuario, ["chats", "favoritos", "historialInmuebles", "metodoPago"])        
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
            this.state.listaFavoritos.push(favorito)
            return {idError: 0, mensaje: "Inmueble agregado a favoritos"}
        }
        catch (error) {
            throw error
        }
    }

    async cargarInformacionAdicional(){
        await super.cargarInformacionAdicional()
        await this.cargarInformacionAdicionalFavoritos()
    }

    async cargarInformacionAdicionalFavoritos(){
        let listaFavoritos = []
        let favoritoAux = this.state.favoritos
        for(let i in favoritoAux){
            let objeto = await ManejadorBD.leerInformacionDocumento(Arrendatario.TABLA_FAVORITOS, favoritoAux[i])
            objeto = new Favorito(objeto)
            listaFavoritos[i] = objeto
        }
        this.state = {
            ...this.state,
            listaFavoritos : listaFavoritos
        }
    }

    static crearObjetoFavorito(infoFavorito, idFirebase){
        infoFavorito = {...infoFavorito, idFirebase}
        return new Favorito(infoFavorito)
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

    static validarEstructuraObjeto(infoArrendatario){
        let Validator = require('jsonschema').Validator;
        let v = new Validator();
        return v.validate(infoArrendatario, this.ESTRUCTURA_JSON) 
    }
    

}
 
export default Arrendatario