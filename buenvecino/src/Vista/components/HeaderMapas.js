import React,{Component} from 'react';

import { Button } from '@material-ui/core';
import '../styles/HeaderMapa.css';

class HeaderMapas extends Component{
    render(){
        return (
            <div className="headerMapa">
                <img src={require('../assets/Logo.png')} alt="Logo de la pagina"/>
                <div className="barraBuscar">
                    <input type="text" placeholder="Ubicacion" className="ubicacion" onChange={(e)=>{this.buscar()}}/>
                    <input type="text" placeholder="Tiempo" className="tiempo" />
                    <Button variant="outlined" className="buscar">Buscar</Button>
                    <Button variant="outlined" className="ingreso">Ingresar</Button>
                    <Button variant="outlined" className="registro">Registra tu vivenda</Button>
                </div>

            </div>
        );
    }

    buscar(){
        let palabra = "candelaria"
        fetch('https://nominatim.openstreetmap.org/?addressdetails=1&q='+palabra+' bogota&format=json&limit=1').then(response => response.json())
        .then(data => console.log(data));
    }

}

export default HeaderMapas;