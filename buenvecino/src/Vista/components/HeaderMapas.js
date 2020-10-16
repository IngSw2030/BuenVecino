import React,{Component} from 'react';

import { Button } from '@material-ui/core';
import '../styles/HeaderMapa.css';

class HeaderMapas extends Component{
    render(){
        return (
            <div className="headerMapa">
                <img src={require('../assets/Logo.png')} alt="Logo de la pagina"/>
                <div className="barraBuscar">
                    <input type="text" placeholder="Ubicacion" className="ubicacion" ref={this.inputBusqueda}/>
                    {/* <input type="text" placeholder="Tiempo" className="tiempo" /> */}
                    <Button variant="outlined" className="buscar" onClick={(e)=>{this.buscarInmueble(e)}}>Buscar</Button>
                    <Button variant="outlined" className="ingreso">Ingresar</Button>
                    <Button variant="outlined" className="registro">Registra tu vivenda</Button>
                </div>

            </div>
        );
    }

    constructor(props){
        super()
        this.inputBusqueda = React.createRef()
    }

    buscarInmueble(e){
        let busqueda = this.inputBusqueda.current.value        
        fetch('https://nominatim.openstreetmap.org/?addressdetails=1&q='+busqueda+'bogota&format=json&limit=1').then(response => response.json())
        .then( (data) => {
            let coordenadas = {}
            let busquedaExitosa = true
            if ( data.length > 0 ){
                coordenadas = {
                    lat : parseFloat(data[0].lat),
                    lng : parseFloat(data[0].lon)
                }
            }
            else{
                //Coordenas por defecto de Bogotá
                coordenadas = {
                    lat : 4.59808, 
                    lng: -74.0760439
                }
                busquedaExitosa = false
            }
            this.props.actualizarEstado(busqueda, coordenadas, busquedaExitosa)
        }).catch( (error) => {
            console.log(error)
        })
    }
}

export default HeaderMapas;