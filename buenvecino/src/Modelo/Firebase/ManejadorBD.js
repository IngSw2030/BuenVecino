import {db} from './Firebase'

class ManejadorBD{

    static async actualizarInformacion(coleccion, id, nuevoDato){
        try {
            delete nuevoDato.idFirebase
            await db.collection(coleccion).doc(id).update(nuevoDato)
        }
        catch (error) {
            throw error
        }
    }

    static async borrarInformacion(coleccion, id){
        try{
            await db.collection(coleccion).doc(id).delete()
        }
        catch(error){
            throw error
        }
    }

    static escucharActualizacionesColeccion(coleccion, metodoRecuperacion){
        try {
            db.collection(coleccion).onSnapshot( metodoRecuperacion )
        }
        catch (error) {
            throw error
        }
    }

    static escucharActualizacionesDocumento(coleccion, documento, metodoRecuperacion){
        try {
            db.collection(coleccion).doc(documento).onSnapshot( metodoRecuperacion )
        }
        catch (error) {
            throw error
        }
    }

    static async escribirInformacion(coleccion, objeto){
        try {
            let nuevoObjeto = await db.collection(coleccion).add(objeto)
            return nuevoObjeto.id
        } catch (error) {
            throw error
        }
    }

    static async escribirInformacionIdManual(coleccion, id, objeto){
        try {
            await db.collection(coleccion).doc(id).set(objeto)
        } catch (error) {
            throw error
        }
    }

    static async leerInformacionColeccion(coleccion, nElementos = -1){
        try {
            let infoLeida = db.collection(coleccion)
            if ( nElementos > 0 ){
                infoLeida = infoLeida.limit(nElementos)
            }
            infoLeida = await infoLeida.get()
            const data = infoLeida.docs.map( doc => ({ idFirebase: doc.id, ...doc.data() }) )
            return data;
        } catch (error) {
            throw error
        }
    }

    static async leerInformacionDocumento(coleccion, idDocumento){
        try {
            const infoLeida = await db.collection(coleccion).doc(idDocumento).get()
            if ( infoLeida.data() != undefined ){
                return {idFirebase: idDocumento, ...infoLeida.data() }
            }
            else{
                return null
            }
        }
        catch (error) {
            throw error
        }
    }

    static async realizarConsulta(coleccion, campos, relaciones, valores, nElementos = -1){
        try {
            let ref =  db.collection(coleccion)
            for(let i=0; i<campos.length; i++){
                ref = ref.where(campos[i], relaciones[i], valores[i])
            }
            if ( nElementos > 0 ){
                ref = ref.limit(nElementos)
            }
            let info = await ref.get()
            info = info.docs.map( doc => ({ idFirebase: doc.id, ...doc.data() })  )
            return info
        }
        catch (error) {
            throw error
        }
    }    
}

export default ManejadorBD