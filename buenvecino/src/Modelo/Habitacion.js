import Inmueble from './Inmueble'

class Habitacion extends Inmueble{
    
    constructor(infoInmueble){
        super(infoInmueble)
    }
    
    static validarEstructuraObjeto(infoInmueble){
        return Inmueble.validarEstructuraObjeto( infoInmueble )
    }
}

export default Habitacion