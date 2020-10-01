import React,{Component} from 'react';

import { Button } from '@material-ui/core';
import '../styles/HeaderMapa.css';

class HeaderMapas extends Component{
render(){
	return (
        <div className="header">
            <img src={require('../assets/Logo.png')} alt="Logo de la pagina"/>
            <div className="barraBuscar">
                <input type="text" placeholder="Ubicacion" className="ubicacion"/>
                <input type="text" placeholder="Tiempo" className="tiempo" />
                <Button variant="outlined" className="buscar">Buscar</Button>
                <Button variant="outlined" className="ingreso">Ingresar</Button>
                <Button variant="outlined" className="registro">Registra tu vivenda</Button>
            </div>

        </div>
	);
}
}

export default HeaderMapas;