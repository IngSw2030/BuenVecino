import {db} from './Firebase'

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

    static async realizarConsultaCompuesta(coleccion, campos, relaciones, valores){
        try {
            let ref =  db.collection(coleccion)
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