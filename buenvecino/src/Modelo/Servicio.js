import ManejadorBD from "./Firebase/ManejadorBD"

class Servicio{

    static SERVICIOS =  null

    constructor(infoServicio){
        this.state = infoServicio
    }


    static async cargarServicios(){
        if ( this.SERVICIOS === null ){
            let servicios = await ManejadorBD.leerInformacionColeccion("Servicios")
            for(let i in servicios){
                let nuevoObjServicio = new Servicio( servicios[i] )
                this.SERVICIOS.push( nuevoObjServicio )
            }
        }
    }

    static obtenerServicio(idServicio){
        for(let i in this.SERVICIOS){
            if ( this.SERVICIOS[i].state.idFireabse === idServicio ){
                return this.SERVICIOS[i].state
            }
        }
        return null
    }

    static obtenerServiciosCargados(){
        return this.SERVICIOS
    }
}

export default Servicio