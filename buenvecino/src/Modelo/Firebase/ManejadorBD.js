import {db} from './Firebase'

class ManejadorBD{

    constructor(){

    }

    static async buscarInformacion(coleccion, campos, relaciones, valores){
        try {
            let ref =  db.collection(coleccion)
            for(let i=0; i<campos.length; i++){
                ref = ref.where(campos[i], relaciones[i], valores[i])
            }
            let info = await ref.get()
            info = info.docs.map( doc => ({ id: doc.id, ...doc.data() })  )
            return info


            //const data = infoLeida.docs.map( doc => ({ id: doc.id, ...doc.data() }) )
            //return data;
        } catch (error) {
            console.log(error + " EEROOR ")
        }
    }

    
}

export default ManejadorBD