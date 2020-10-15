import {db, fb, firebase} from './Firebase'

class ManejadorBD{

    constructor(){

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
            let nuevoObjeto = await db.collection(coleccion).doc(id).set(objeto)
        } catch (error) {
            throw error
        }
    }

    static async leerInformacion(...ruta){
        try {
            console.log(ruta)
            //let path = new firebase.firestore.FieldPath(ruta)
            let ref = db.collection(ruta[0]).doc().get()
            for(let i=1; i<ruta.length; i++){
                ref = ref.collection(ruta[i]).doc().get()
            }
            console.log(ref)

            ref = db.collection("prueba").doc().collection("8Jp13yNtwN8TkB6bakkB").doc()

            const infoLeida = await ref.get()
            const data = infoLeida.docs.map( doc => ({ id: doc.id, ...doc.data() }) )
            return data;
        } catch (error) {
            throw error
        }
    }

    static async realizarConsulta(rutaColeccion, campos, relaciones, valores){
        try {
            let ref =  db.collection(rutaColeccion)
            for(let i=0; i<campos.length; i++){
                ref = ref.where(campos[i], relaciones[i], valores[i])
            }
            let info = await ref.get()
            info = info.docs.map( doc => ({ id: doc.id, ...doc.data() })  )
            return info
        } catch (error) {
            throw error
        }
    }    
}

export default ManejadorBD