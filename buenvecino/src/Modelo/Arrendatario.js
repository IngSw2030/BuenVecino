class Arrendatario{
    
    static DATOS_USAURIO = ["nombre", "dni", "tipoDni", "genero", "fechaNacimiento", "email", "telefono"]
    constructor(infoBasicaUsuario){

    }

    static validarEstructura(infoArrendatario){

        let respuesta = {esValido : true, faltantes: [], sobrantes: []}
        for(let dato in this.DATOS_USAURIO){
            if ( infoArrendatario[ this.DATOS_USAURIO[dato] ] == undefined ){
                respuesta = {esValido : false, faltantes : respuesta.faltantes.push(this.DATOS_USAURIO[dato]), ...respuesta}
            }
        }
        let existeLlave = false
        for(let llave in Object.keys(infoArrendatario)){
            existeLlave = false
            for(let dato in this.DATOS_USAURIO){
                if ( llave === dato ){
                    existeLlave = true
                }
            }
            if ( !existeLlave ){
                respuesta = {esValido:false, sobrantes : respuesta.sobrantes.push(Object.keys(infoArrendatario)[llave]), ...respuesta}
            }
        }
        return respuesta
    }
}

export default Arrendatario