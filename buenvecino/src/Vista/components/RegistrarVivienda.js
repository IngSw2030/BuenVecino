import React, { Component } from "react";
import { Button } from "@material-ui/core";
import "../styles/RegistrarVivienda.css";
import Mapa from './Mapa'
import Controlador from "../../Controlador/Controlador";

class RegistrarVivienda extends Component {
    
    constructor(props){
        super()
        this.state = {
            controlador: Controlador.getControlador(),
            tipoInmueble: "C"
        }
        this.refFormulario = React.createRef()
        this.refTipoInmueble = React.createRef()

        console.log(this.state)
    }

    render() {
        return (
            <div className="RegistrarVivienda">
                <div className="titulo" >
                    <h2>REGISTRA TU VIVIENDA</h2>
                    <p>Buenvecino te la la posibilidad de rentar tu espacio para Universitarios de una manera rápida y amigable.</p>
                </div>
                <div className="formulario">
                    <form onSubmit={ (e)=>{this.iniciarRegistro(e)} } ref={this.refFormulario} >
                        <div className="formu">
                            <div>
                                <label for="TInmueble">Tipo de Inmueble</label>
                                <select 
                                    name="TInmueble" required
                                    onChange = { (e)=>{ this.cambiarTipoInmueble(e) } }
                                    ref = { this.refTipoInmueble }
                                >
                                    <option selected value=""> Seleccione Tipo de Inmueble</option>
                                    <option value="C">Casa</option>
                                    <option value="A">Apartamento</option>
                                    <option value="H">Habitación</option>
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

                            {
                                this.state.tipoInmueble === "C" || this.state.tipoInmueble === "A" ?
                                <div>
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
                                </div>
                                :
                                null
                            }

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

                        <div>
                            <Mapa zoom={13} centrar = {{lat: 4.641055, lng: -74.086925}} infoInmuebles={[]} />
                        </div>
                        <div className="botones">
                            <Button> Cancelar </Button>
                            <Button type="submit"> Registrar Vivienda </Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    cambiarTipoInmueble(e){
        this.setState( {tipoInmueble: this.refTipoInmueble.current.value })
        
    }

    async iniciarRegistro(e){
        e.preventDefault()
        let miFormulario = this.refFormulario.current
        let datos = new FormData( miFormulario )

        let esAmoblado = datos.get("amoblado") === "Si"
        let tipo = datos.get("TiInmueble")

        let objetoUbicacion = {
            direccion:      datos.get("direccion"),
            barrio:         datos.get("barrio"),
            localidad:      datos.get("localidad"),
            latitud:        56.34444,
            longitud:       4.111111
        }

        let objInmueble = {
            tipo:           datos.get("TiInmueble"),
            nombre:         datos.get("name"),
            precio:         datos.get("precio"),
            descripcion:    datos.get("descripcion"),
            area:           datos.get("area"),
            esAmoblado:     esAmoblado,
            esCompartido:   datos.get("esCompartido"),
            ubicacion:      objetoUbicacion
        }

        if ( tipo === "A" || tipo === "C" ){
            objInmueble = {
                ...objInmueble,
                nHabitaciones:  datos.get("nhabitaciones"),
                nPisos:         datos.get("nPisos"),
                nBanos:         datos.get("nbanos"),
                nCocinas:       datos.get("nCocinas"),
            }
        }

        if ( this.state.inicio === undefined ){
            let res = await this.state.controlador.iniciarSesionUsuario("prueba112@prueba.com","123456")
            console.log("INICIO SESIÓN RES")
            this.setState( {inicio: true} )
        }
        

        let respuesta = await this.state.controlador.registrarInmueble( objInmueble )
        console.log( respuesta )
        if ( respuesta.idError == 0 ){
            
            console.log("CARFAR FOTOS")

        }
        else{
            console.log("ERROR MISTAKEN :V")
            console.log( objInmueble )
            //MOSTRAR MENSAJE EXITO
        }
    }
}

export default RegistrarVivienda;
