import ManejadorBD from "./Firebase/ManejadorBD"
import Utils from "./Utils"
import Valoracion from "./Valoracion"

/*
 * Esta clase nace en forma de "Interface" y es utilizada para menejar las valoraciones tanto de un Usuario
 * como de un Inmueble desde un punto central, teniendo en cuenta que las Interfaces no están soportadas por JS
*/
class Valorable{

    constructor(){
        this.state = {
            listaValoraciones : [],
            receptorListaValoraciones : null
        }
    }

    async actualizarListaValoraciones(actualizacionValoraciones){
        if ( actualizacionValoraciones === undefined ){
            console.log("UNDEFINED EN ACTUALIAR VALORACIONES")
            return
        }
        let tamanoActualizado = actualizacionValoraciones.length
        let tamanoLocal = this.state.valoraciones.length
        if ( tamanoActualizado > tamanoLocal){
            await this.agregarValoracionDesdeBD(actualizacionValoraciones[tamanoActualizado-1], tamanoLocal)
        }
        else if ( tamanoActualizado < tamanoLocal ){
            this.eliminarValoracionDespuesDeActualizacion(actualizacionValoraciones)
        }
        if ( this.state.receptorListaValoraciones !== null ){
            let nuevasValoraciones = this.state.listaValoraciones.map( (valoracion) => {return valoracion.state} )
            this.state.receptorListaValoraciones( nuevasValoraciones )
        }
    }

    async agregarValoracionDesdeBD(idNuevaValoracion, posicion){
        this.state.valoraciones[posicion] = idNuevaValoracion
        let valoracionDesconocida = await ManejadorBD.leerInformacionDocumento("Valoraciones", idNuevaValoracion)
        let nuevoObjetoValoracion = new Valoracion( valoracionDesconocida )
        nuevoObjetoValoracion.iniciarEscuchaActualizaciones()
        this.state.listaValoraciones[posicion] = nuevoObjetoValoracion
    }

    async cargarInformacionAdicionalValoraciones(){
        let listaValoraciones = []
        let valoracionesRecibidas = await ManejadorBD.realizarConsulta("Valoraciones", ["idAutor"], ["=="], [this.state.idFirebase])
        let valoracionesHechas = await ManejadorBD.realizarConsulta("Valoraciones", ["idValorado"], ["=="], [this.state.idFirebase])
        let valoracionesBD = [...valoracionesHechas, ...valoracionesRecibidas]
        valoracionesBD = Utils.emparejarArrayIds( valoracionesBD, this.state.valoraciones )
        for(let i in valoracionesBD){
            let nuevaValoracion = new Valoracion(valoracionesBD[i])
            nuevaValoracion.iniciarEscuchaActualizaciones()
            listaValoraciones.push( nuevaValoracion )
        }
        this.state = {
            ...this.state,
            listaValoraciones: listaValoraciones 
        }
    }

    async eliminarValoracionDespuesDeActualizacion(valoracionesActualizadas){
        for( let i in this.state.valoraciones){
            let encontrado = false
            for( let j in valoracionesActualizadas ){
                if ( this.state.valoraciones[i] === valoracionesActualizadas[j] ){
                    encontrado = true
                    break
                }
            }
            if ( !encontrado ){
                this.state.valoraciones.splice(i, 1)
                this.state.listaValoraciones.splice(i, 1)
                return
            }
        }
    }

    establecerReceptorListaValoraciones(receptor){
        this.state.receptorListaValoraciones = receptor
        return {idError: 0, mensaje: "Receptor de lista de Valoraciones establecido exitosamente"}
    }

    obtenerValoracionesHechas(){
        let valoraciones = []
        for(let i in this.state.listaValoraciones){
            if ( this.state.listaValoraciones[i].perteneceA(this.state.idFirebase) ){
                valoraciones.push( this.state.listaValoraciones[i] )
            }
        }
        return valoraciones
    }

    obtenerValoracionesRecibidas(){
        let valoraciones = []
        for(let i in this.state.listaValoraciones){
            if ( !this.state.listaValoraciones[i].perteneceA(this.state.idFirebase) ){
                valoraciones.push( this.state.listaValoraciones[i] )
            }
        }
        return valoraciones
    }

}

export default Valorable