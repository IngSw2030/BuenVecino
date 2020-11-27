import React, { Component } from "react";
import Header from "../components/Header"
import DescripcionInmueble from "../components/DescripcionInmueble"
import DescripcionLugar from "../components/DescripcionLugar";
import Reservar from "../components/Reservar"
import ContactoArrendador from "../components/ContactoArrendador"
import ImagenesInmueble from "../components/ImagenesInmueble"
import Footer from "../components/Footer";
import logo1 from '../assets/LogoHabitacion.png'
import logo2 from '../assets/LogoBano.png'
import logo3 from '../assets/LogoCocina.png'
import logo4 from '../assets/LogoInternet.png'
import "../styles/InfoInmueble.css"
import Controlador from "../../Controlador/Controlador";

class InfoInmueble extends Component {

    constructor(props){
        super()
        this.state = {
            inmueble: {},
            controlador: Controlador.getControlador()
        }
    }

    async componentDidMount(){
        let inmueble = await this.state.controlador.obtenerInmueble(this.props.match.params.idInmueble)
        console.log( inmueble, " RECEIVED " )
        this.setState( {inmueble: inmueble} )
    }

    render() {
        return (
        <div className="InfoInmueble">
            <div className="headerMapa">
                <Header />
            </div>
            <ImagenesInmueble inmueble={this.state.inmueble}/>
            <div className="contenido">
                <DescripcionInmueble inmueble={this.state.inmueble}/>
                <div>
                    <Reservar inmueble={this.state.inmueble}/>
                    <div className="descripcion">
                        <DescripcionLugar imagen={logo1} descripcion="Habitaciones - 1 " />
                        <DescripcionLugar imagen={logo2} descripcion=" Baños - 1" />
                        <DescripcionLugar imagen={logo3} descripcion="Cocina Integral" />
                        <DescripcionLugar imagen={logo4} descripcion="Wifi - 5Mb" />
                    </div>
                    <ContactoArrendador inmueble={this.state.inmueble} />
                </div>
            </div>
            <Footer />
        </div>
        );
    }
}

export default InfoInmueble;
