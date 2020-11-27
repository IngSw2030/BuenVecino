import React, { Component } from "react";
import { Button } from "@material-ui/core";
import "../styles/RegistrarVivienda.css";
import Mapa from './Mapa'
import Controlador from "../../Controlador/Controlador";
import { Link } from "react-router-dom";

class RegistrarVivienda extends Component {
    
    constructor(props){
        super()
        this.state = {
            tipoInmueble: "C",
            fotosCargadas: [],
            estadoFotos: [],

            mensajeError: ""
        }
        this.refFormulario = React.createRef()
        this.refTipoInmueble = React.createRef()
        this.refFotos = React.createRef()

        this.establecerCoordenadas = this.establecerCoordenadas.bind(this)
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
                                <textarea type="text" placeholder="Ingrese una descripción acerca del inmueble " name="descripcion" required />
                            </div>


                            <div>
                                <label for="nbanos">Baños</label>
                                <select name="nbanos" required>
                                    <option selected value="">Seleccione el numero de baños</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>

                            <div>
                                <label for="area">Area m2</label>
                                <input type="number" placeholder="Ingrese area del Inmueble" name="area" required step="0.01"/>
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
                                <label for="compartido">¿El inmueble se encuentra compartido?</label>
                                <select name="compartido" required>
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
                                <div>
                                    <div>
                                        <label for="nCamas">Camas</label>
                                        <select name="nCamas" required>
                                            <option selected value="">Seleccione el numero de camas</option>
                                            <option>0</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                        </select>
                                    </div>
                                </div>
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
                                <input 
                                    type="file"
                                    name="fotos"
                                    multiple
                                    onChange = { (e)=>{this.actualizarFotos(e)} }
                                />
                            </div>

                            {
                                this.state.fotosCargadas.map( (item, index) => {
                                    if ( this.state.estadoFotos[index] ){
                                        return <div style={{backgroundColor: "#008000"}} key={index}>
                                                {item.name} : {item.type}
                                                <button
                                                    onClick={ (e)=>{ this.eliminarArchivo( index ) } }
                                                >
                                                    ELIMINAR
                                                </button>
                                            </div>
                                    }
                                    else{
                                        return <div style={{backgroundColor: "#FFFF00"}} key={index}>
                                                {item.name} : {item.type}   
                                                <button
                                                    onClick={ (e)=>{ this.eliminarArchivo( index ) } }
                                                >
                                                    ELIMINAR
                                                </button>
                                            </div>   
                                    }
                                })
                            }
                        </div>

                        <div className="mapa">
                            <Mapa 
                                zoom={13} 
                                centrar = {{lat: 4.641055, lng: -74.086925}} 
                                infoInmuebles={[]}
                                retornarCoordenadas = {this.establecerCoordenadas}   
                            />
                        </div>
                        <div className="botones">
                            <Link to="/"> <Button> Cancelar </Button></Link>
                            <Button type="submit" className="RegistrarVi"> Registrar Vivienda </Button>
                        </div>

                        <div>
                            {
                                <div style={{backgroundColor: "#FF0000"}}>
                                    {
                                        this.state.mensajeError
                                    }
                                </div>
                            }
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    establecerCoordenadas(coordenadas){
        this.setState( {coordenadasSeleccionadas: coordenadas} )
    }

    eliminarArchivo(index){
        let fotos = this.state.fotosCargadas
        let estados = this.state.estadoFotos
        fotos.splice(index, 1)
        estados.splice(index, 1)
        this.setState({
            fotosCargadas: fotos,
            estadoFotos: estados
        })
    }
    
    async actualizarFotos(e){
        let archivos = e.target.files
        await this.setState( {fotosCargadas: [...this.state.fotosCargadas, ...archivos]} )
        let aceptadas = this.state.fotosCargadas.map( (item) =>{
            return item.type.startsWith("image/")
        } )
        this.setState( {estadoFotos: aceptadas} )
    }

    cambiarTipoInmueble(e){
        this.setState( {tipoInmueble: this.refTipoInmueble.current.value })
    }


    async iniciarRegistro(e){
        e.preventDefault()

        if ( Controlador.getControlador().obtenerTipoUsuarioActivo() !== "Arrendatario" ){
            this.mostrarError("NO ESTA LOGUEADO UN ARRENDADOR")
            return
        }


        let miFormulario = this.refFormulario.current
        let datos = new FormData( miFormulario )

        let esAmoblado = datos.get("amoblado") === "Si"
        let esCompartido = datos.get("compartido") === "Si"
        let tipo = datos.get("TInmueble")
        
        if ( this.state.fotosCargadas.length === 0 ){
            this.mostrarError("Las fotos deben ser cargadas")
            return
        }
        for( let i in this.state.fotosCargadas ){
            if ( !this.state.estadoFotos[i] ){
                this.mostrarError("Verifique archivos rechazados, no va a continuar :v")
                return
            }
        }
        if ( this.state.coordenadasSeleccionadas === undefined ){
            this.mostrarError("Verifique que haya seleccionado en el mapa la ubicación, no va a continuar :v")
            return
        }

        let objetoUbicacion = {
            direccion:      datos.get("direccion"),
            barrio:         datos.get("barrio"),
            localidad:      datos.get("localidad"),
            latitud:        this.state.coordenadasSeleccionadas.lat,
            longitud:       this.state.coordenadasSeleccionadas.lng
        }

        let objInmueble = {
            tipo:           datos.get("TInmueble"),
            nombre:         datos.get("name"),
            precio:         parseInt( datos.get("precio") ),
            descripcion:    datos.get("descripcion"),
            area:           parseFloat( datos.get("area") ),
            esAmoblado:     esAmoblado,
            esCompartido:   esCompartido,
            ubicacion:      objetoUbicacion,
            nBanos:         parseInt( datos.get("nbanos") ),
        }
        if ( tipo === "A" || tipo === "C" ){
            objInmueble = {
                ...objInmueble,
                nHabitaciones:  parseInt( datos.get("nhabitaciones") ),
                nPisos:         parseInt( datos.get("nPisos") ),
                nCocinas:       parseInt( datos.get("nCocinas") ),
            }
        }
        else{
            objInmueble = {
                ...objInmueble,
                nCamas:         parseInt( datos.get("nCamas") )
            }
        }

        let respuesta = await Controlador.getControlador().registrarInmueble( objInmueble )
        if ( respuesta.idError == 0 ){
            if ( this.state.fotosCargadas.length > 0 ){
                let respuestaFotos = await Controlador.getControlador().subirFotosInmueble(respuesta.idInmueble, this.state.fotosCargadas )
                if ( respuestaFotos.idError > 0 ){
                    this.mostrarError(respuestaFotos.mensaje)
                }
            }
            this.setState( {mensajeError: ""} )
        }
        else{
            this.setState( {mensajeError: "MIRE LA CONSOLA QUE HUBO UN ERROR"} )

           this.mostrarError( respuesta.mensaje )
        }
    }

    mostrarError(e){
        console.log( e )
    }
}

export default RegistrarVivienda;
