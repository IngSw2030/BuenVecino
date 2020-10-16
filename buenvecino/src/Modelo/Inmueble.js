class Inmueble{

    constructor(){

    }

    
    static calcularDistanciaPuntosGeograficos(punto1, punto2){
        function enRadianes(valor){
            return (Math.PI / 180) * valor;
        }
        let r = 6371
        let dLat = enRadianes( punto2.latitud - punto1.latitud )
        let dLon = enRadianes( punto2.longitud - punto1.longitud )
        let a = Math.pow(Math.sin( dLat / 2 ), 2) + Math.cos( enRadianes(punto1.latitud)) * 
                Math.cos(enRadianes(punto2.latitud)) * Math.pow(Math.sin( dLon / 2 ), 2)
        let c = 2 * Math.atan2( Math.sqrt(a), Math.sqrt(1-a) )
        return r * c
    }
}

export default Inmueble