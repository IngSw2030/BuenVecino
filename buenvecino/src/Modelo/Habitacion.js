import Inmueble from './Inmueble'

class Habitacion extends Inmueble{
    
    constructor(infoInmueble){
        super(infoInmueble)
        console.log("HERE HHAHAHA")
    }
    
    static validarEstructuraObjeto(infoInmueble){
        return Inmueble.validarEstructuraObjeto( infoInmueble )
    }
}

export default Habitacion