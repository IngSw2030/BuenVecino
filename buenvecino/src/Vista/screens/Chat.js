import React, { Component } from "react";
import Mensaje from "../components/Mensaje";
import Contacto from "../components/Contacto";
import Footer from "../components/Footer";
import Header from "../components/Header";
import '../styles/Chat.css'
import Controlador from "../../Controlador/Controlador";

class Chat extends Component {
	
	constructor(props){
		super()
		this.state = {
			controlador: Controlador.getControlador()
		}
		
	}

	async componentDidMount(){
		await this.state.controlador.iniciarSesionUsuario("prueba11@prueba.com", "123456")
		if ( this.state.controlador.obtenerUsuarioActivo() !== null ){
			console.log( this.state.controlador.obtenerChatsCargados() )
		}
		
	}

	render() {
		return (
			<div className="Chat">
				<div className="head">
					<Header />
					<h2>Mis Chats</h2>
				</div>
				<div className="contenido">
					<div className="listaCon">
						<h2>Contactos</h2>
						<div className="contactos">
							this.state.controlador.
							<Contacto />
							<Contacto />
							<Contacto />
							<Contacto />
						</div>
					</div>
					<div className="mensajes">
						<Mensaje />

					</div>


				</div>
				<Footer />
			</div>
		);
	}
}

export default Chat;
