import { firebase } from "./Firebase/Firebase"

class Utils{

    static agregarCampoSiNoExiste(objeto, nombreCampo, valorPorDefecto = {}){
        if ( objeto.hasOwnProperty(nombreCampo) ){
            return {}
        }
        else{
            return {[nombreCampo] : valorPorDefecto}
        }
        
    }

    static agregarCamposSiNoExisten(objeto, campos, valorPorDefecto = {}){
        let res = {}
        for( let i in campos ){
            res = {...res, ...Utils.agregarCampoSiNoExiste(objeto, campos[i], valorPorDefecto)}
        }
        return res
    }

    static clausulaAgregarElementoArrayFirebase(elemento){
        return firebase.firestore.FieldValue.arrayUnion(elemento)
    }

    static clausulaEliminarElementoArrayFirebase(elemento){
        return firebase.firestore.FieldValue.arrayRemove(elemento)
    }

    static compararIdFirebase(dato1, dato2){
        return dato1.idFirebase === dato2.idFirebase
    }

    static eliminarDuplicadosDeArray(array, funcionComparacion=Utils.compararIdFirebase){
        for(let i=0; i<array.length-1; i++){
            for(let j=i+1; j<array.length; j++){
                if ( funcionComparacion(array[i], array[j]) ){
                    array.splice(j, 1)
                    j--
                }
            }
        }
        return array
    }

    static emparejarArrayIds( arrayObjetos, arrayIds ){
        let arrayEmparejado = []
        for(let i in arrayIds){
            for(let j in arrayObjetos){
                if ( arrayObjetos[j].idFirebase === arrayIds[i] ){
                    arrayEmparejado[i] = arrayObjetos[j]
                    break
                }
            }
        }
        return arrayEmparejado
    }

    static fechasSeCruzan(fechaInicial1, fechaFinal1, fechaInicial2, fechaFinal2){
        let caso1 = fechaInicial1 >= fechaInicial2 && fechaFinal1 <= fechaFinal2
        let caso2 = fechaInicial2 >= fechaInicial1 && fechaFinal2 <= fechaFinal1
        let caso3 = fechaInicial1 <= fechaInicial2 && fechaFinal1 >= fechaInicial2
        let caso4 = fechaInicial1 <= fechaFinal2 && fechaFinal1 >= fechaFinal2
        return caso1 || caso2 || caso3 || caso4
    }

    static normalizarString(cadena){
        return cadena.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    }
    
    static ordenarArray(array, comparar){
        for(let i=0; i<array.length-1; i++){
            for(let j=i+1; j<array.length; j++){
                if ( comparar( array[i], array[j] ) ){
                    let aux = array[i]
                    array[i] = array[j]
                    array[j] = aux
                }
            }
        }
    }    
}

export default Utils