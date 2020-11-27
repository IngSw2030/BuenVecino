import {sg} from './Firebase'

class ManejadorSg{

    static PATH_FOTOS_INMUEBLE = "FotosInmuebles/" 
    static PATH_FOTOS_PERFIL = "FotosPerfil/"

    static async subirFotoInmueble(idInmueble, nombreArchivo, archivo){
        try {       
            let referencia = sg.ref().child( this.PATH_FOTOS_INMUEBLE + idInmueble + "/" + nombreArchivo)
            await referencia.put( archivo )
            let url = await referencia.getDownloadURL()
            return url
        }
        catch (error) {
            throw error
        }
    }

    static async subirFotoPerfil(idUsuario, archivo){
        try {       
            let referencia = sg.ref().child( this.PATH_FOTOS_PERFIL + idUsuario )
            await referencia.put( archivo )
            let url = await referencia.getDownloadURL()
            return url
        }
        catch (error) {
            throw error
        }
        
    }

    static async obtenerFotosInmueble(idInmueble){
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

    static async obtenerFotoPerfil(idUsuario){
        try {
            let referencia = sg.ref().child( this.PATH_FOTOS_PERFIL + idUsuario )
            return await referencia.getDownloadURL()

        }
        catch (error) {
            if ( error.code === "storage/object-not-found" ){
                return await this.obtenerFotoPerfil("noFoto.png")
            }
            else{
                throw error
            }
        }        
    }
}

export default ManejadorSg