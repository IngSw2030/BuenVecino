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

    static compararIdFirebase(dato1, dato2){
        return dato1.idFirebase == dato2.idFirebase
    }

    static eliminarDuplicadosDeArray(array, funcionComparacion=Utils.compararIdFirebase){
        for(let i=0; i<array.length-1; i++){
            for(let j=i+1; j<array.length; j++){
                console.log(array[i].idFirebase, " ", array[j].idFirebase)
                if ( funcionComparacion(array[i], array[j]) ){
                    array.splice(j, 1)
                    j--
                }
            }
        }
        return array
    }

    static normalizarString(cadena){
        return cadena.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    }
}

export default Utils