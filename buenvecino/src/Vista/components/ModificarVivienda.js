import React, { Component } from "react";
import { Button } from "@material-ui/core";
import "../styles/RegistrarVivienda.css";
import Mapa from './Mapa'

class ModificarVivienda extends Component {
    render() {
        return (
            <div className="RegistrarVivienda">
                <div className="titulo" >
                    <h2>MODIFICA TU INMUEBLE</h2>
                    <p>Buenvecino te la la posibilidad de rentar tu espacio para Universitarios de una manera rápida y amigable.</p>
                </div>
                <div className="formulario">
                    <form action="">
                        <div className="formu">
                            <div>
                                <label for="TInmueble">Tipo de Inmueble</label>
                                <select name="TInmueble" required>
                                    <option selected value=""> Seleccione Tipo de Inmueble</option>
                                    <option>Casa</option>
                                    <option>Apartamento</option>
                                    <option>Habitación</option>
                                </select>
                            </div>

                            <div>
                                <label for="name">Nombre </label>
                                <input
                                    type="text"
                                    placeholder=" Ingrese un nombre para el Inmueble "
                                    name="name"
                                    required
                                />
                            </div>

                            <div>
                                <label for="precio">Precio</label>
                                <input type="number" placeholder="Ingrese el precio del Inmueble" name="precio" required />
                            </div>

                            <div>
                                <label for="descripcion">Descripción</label>
                                <textarea type="text" placeholder="Ingrese una descripción acerca del inmueble " name="descripción" required />
                            </div>


                            <div>
                                <label for="nbanos">Baños</label>
                                <select name="nbanos" required>
                                    <option selected value="">Seleccione el numero de baños</option>
                                    <option>0</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>

                            <div>
                                <label for="area">Area m2</label>
                                <input type="number" placeholder="Ingrese area del Inmueble" name="area" required />
                            </div>

                            <div>
                                <label for="amoblado">¿El inmueble se encuentra amoblado?</label>
                                <select name="amoblado" required>
                                    <option selected value="">Seleccione una respuesta</option>
                                    <option>Si</option>
                                    <option>No</option>
                                </select>
                            </div>

                            <div>
                                <label for="nhabitaciones">Habitaciones</label>
                                <select name="nhabitaciones" required>
                                    <option selected value="">Seleccione el numero de habitaciones</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                </select>
                            </div>

                            <div>
                                <label for="compartido">¿El inmueble se encuentra compartido?</label>
                                <select name="compartido" required>
                                    <option selected value="">Seleccione una respuesta</option>
                                    <option>Si</option>
                                    <option>No</option>
                                </select>
                            </div>

                            <div>
                                <label for="nPisos">Pisos</label>
                                <select name="nPisos" required>
                                    <option selected value="">Seleccione el numero de pisos</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>

                            <div>
                                <label for="nCocinas">Cocinas</label>
                                <select name="nCocinas" required>
                                    <option selected value="">Seleccione el numero de cocinas</option>
                                    <option>0</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>

                            <div>
                                <label for="direccion">Direccion </label>
                                <input
                                    type="text"
                                    placeholder=" Ingrese la dirección del Inmueble "
                                    name="direccion"
                                    required
                                />
                            </div>

                            <div>
                                <label for="barrio">Barrio </label>
                                <input
                                    type="text"
                                    placeholder=" Ingrese el barrio del Inmueble "
                                    name="barrio"
                                    required
                                />
                            </div>

                            <div>
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

                            <div>
                                <label>Imagenes del Inmueble</label>
                                <input type="file" name="file[]" multiple/>
                            </div>

                        </div>

                        
                        <div className="botones">
                            <Button> Cancelar </Button>
                            <Button type="submit"> Registrate </Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default ModificarVivienda;
