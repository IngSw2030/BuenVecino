import React from 'react'
import {db} from './firebase'

const tabla = "prueba"

class DataBaseTest{

    constructor(){
    
    }


    async leerInfo(){
        try {
            const infoLeida = await db.collection(tabla).get()
            const data = infoLeida.docs.map( doc => ({ id: doc.id, ...doc.data() }) )
            console.log("Info Leida :")
            console.log(data)
            return data;

        } catch (error) {
            console.log("Error en la lectura : " + error)   
        }
        
    }

    async escribirInfo(info){
        try {
            let idNuevo = await db.collection(tabla).add(info)
            console.log("Nuevo Item agregado : " + idNuevo.id)
            return idNuevo.id
        } catch (error) {
            console.log("Error en la escritura : " + error)
        }
    }

    async borrarInfo(id){
        try{
            await db.collection(tabla).doc(id).delete()
            console.log("informacion borrada con ID : " + id)
        }
        catch(error){
            console.log("Error en el borrado : " + error)
        }

    }

    async modificarInfo(id, nuevaInfo){
        try {
            await db.collection(tabla).doc(id).update(nuevaInfo)    
            console.log("Información modificada")
        }
        catch (error) {
            console.log("Error en la modificacion : " + error)
        }
    }

    ordenarInfo(data){
        for(let i=0; i<data.length-1; i++){
            for(let j=i+1; j<data.length; j++){
                if (data[i].date > data[j].date){
                    let aux = data[i]
                    data[i] = data[j]
                    data[j] = aux
                }
            }
        }
    }

    async borrarTodaInfo(){
        let data = await this.leerInfo()
        this.ordenarInfo(data)
        for(let i=0; i<data.length; i++ ){
            this.borrarInfo(data[i].id)
        }  
        console.log("Toda la información borrada")
    }

    async testFUncionamiento(){
        let data = await this.leerInfo()
        if ( data.length % 10 == 0 && data.length > 0  ){
            this.ordenarInfo(data)
            for(let i=0; i<data.length-1; i++ ){
                this.borrarInfo(data[i].id)
            }
        }
        else if (data.length > 0){
            this.ordenarInfo(data)
            let ultimoElemento = data[ data.length-1 ]
            let nuevoElemento = {
                miId : ultimoElemento.miId += 1,
                name: ultimoElemento.name = ultimoElemento.name.substring(0, 6) + ultimoElemento.miId,
                date: ultimoElemento.date = Date.now()
            }
            
            this.escribirInfo(nuevoElemento)
        }
        else{
            let nuevoElemento = {
                name: "nombre1",
                miId: 1,
                date: Date.now()
            }
            await this.escribirInfo(nuevoElemento)
        }
    }
    

}

export default DataBaseTest