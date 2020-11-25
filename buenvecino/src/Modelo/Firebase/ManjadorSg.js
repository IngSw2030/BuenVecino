import {sg} from './Firebase'

class ManejadorSg{

    static PATH_FOTOS_INMUEBLE = "FotosInmuebles/" 
    static PATH_FOTOS_PERFIL = "FotosPerfil/"

    static async cargarImagenInmueble(idInmueble, nombreArchivo, archivo){
        try {       
            let referencia = sg.ref().child( this.PATH_FOTOS_INMUEBLE + idInmueble + "/" + nombreArchivo)
            referencia.put( archivo )
            let url = await referencia.getDownloadURL()
            return url
        }
        catch (error) {
            throw error
        }
    }

    static async cargarImagenPerfil(idUsuario, nombreArchivo, archivo){
        try {       
            let referencia = sg.ref().child( this.PATH_FOTOS_PERFIL )
            referencia.put( archivo )
            let url = await referencia.getDownloadURL()
            return url
        }
        catch (error) {
            throw error
        }
        
    }

    static async obtenerImagenesInmueble(idInmueble){
        try {
            let referencia = sg.ref().child( this.PATH_FOTOS_INMUEBLE + idInmueble )
            let referenciasURL = await referencia.listAll()
            let listaURL = []
            for(let i in referenciasURL.items){
                listaURL.push( await referenciasURL.items[i].getDownloadURL() )
            }       
            return listaURL
        }
        catch (error) {
            throw error
        }        
    }

    static async obtenerImagenesPerfil(idUsuario){
        try {
            let referencia = sg.ref().child( this.PATH_FOTOS_PERFIL + idUsuario )
            let referenciasURL = await referencia.listAll()
            let listaURL = []
            for(let i in referenciasURL.items){
                listaURL.push( await referenciasURL.items[i].getDownloadURL() )
            }       
            return listaURL
        }
        catch (error) {
            throw error
        }        
    }
}

export default ManejadorSg