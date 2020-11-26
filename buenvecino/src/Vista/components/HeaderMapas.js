import React, { Component } from 'react';

import { Button } from '@material-ui/core';
import '../styles/HeaderMapa.css';
import img from '../assets/Logo.png'
import Header from './Header';

class HeaderMapas extends Component {
    render() {
        return (
            <div className="headerMapa">

                <Header/>
                
                <div className="barraBuscar">
                    <input type="text" placeholder="Ubicacion" className="ubicacion" ref={this.inputBusqueda} />
                    <div className= "localidad">
                        <label for="localidad">Localidad</label>
                        <select name="localidad" required>
                            <option selected value="">Seleccione la localidad</option>
                            <option>Antonio Nariño</option>
                            <option>Barrios Unidos</option>
                            <option>Bosa</option>
                            <option>Chapinero</option>
                            <option>Ciudad Bolívar</option>
                            <option>Engativá</option>
                            <option>Fontibón</option>
                            <option>Kennedy</option>
                            <option>La Candelaria</option>
                            <option>Los Mártires</option>
                            <option>Puente Aranda</option>
                            <option>Rafael Uribe Uribe</option>
                            <option>San Cristobal</option>
                            <option>Santa Fe</option>
                            <option>Suba</option>
                            <option>Sumapaz</option>
                            <option>Teusaquillo</option>
                            <option>Tunjuelito</option>
                            <option>Usaquén</option>
                            <option>Usme</option>
                        </select>
                    </div>

                    <Button variant="outlined" className="buscar" onClick={(e) => { this.buscarInmueble(e) }}>Buscar</Button>
                </div>

            </div>
        );
    }

    constructor(props) {
        super()
        this.inputBusqueda = React.createRef()
    }

    buscarInmueble(e) {
        let busqueda = this.inputBusqueda.current.value
        fetch('https://nominatim.openstreetmap.org/?addressdetails=1&q=' + busqueda + 'bogota&format=json&limit=1').then(response => response.json())
            .then((data) => {
                let coordenadas = {}
                let busquedaExitosa = true
                if (data.length > 0) {
                    coordenadas = {
                        lat: parseFloat(data[0].lat),
                        lng: parseFloat(data[0].lon)
                    }
                }
                else {
                    //Coordenas por defecto de Bogotá
                    coordenadas = {
                        lat: 4.59808,
                        lng: -74.0760439
                    }
                    busquedaExitosa = false
                }
                this.props.actualizarEstado(busqueda, coordenadas, busquedaExitosa)
            }).catch((error) => {
                console.log(error)
            })
    }
}

export default HeaderMapas;