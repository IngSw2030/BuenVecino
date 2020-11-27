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
			listaChats: [],
			chatActualizar: [],
			chatSeleccionado: 0
		}
		this.cambiarChat = this.cambiarChat.bind(this)
	}

	async componentDidMount(){
		if ( Controlador.getControlador().obtenerUsuarioActivo() !== null ){
			await this.setState( {listaChats: Controlador.getControlador().obtenerChatsCargados()} )
		}
		this.actualizarListaChats = this.actualizarListaChats.bind( this )
		Controlador.getControlador().establecerReceptorChats( this.actualizarListaChats )	
		
		console.log("MONTADO : ", Controlador.getControlador().obtenerUsuarioActivo())
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
						{
							this.state.listaChats.map( (item, index) =>{
								return (
								<Contacto 
									infoChat = {item} 
									indexChat={index} 
									key={index} 
									notificarCambio={this.cambiarChat}
									
								/>)
							})
						}		
						</div>
					</div>
					<div className="mensajes">
						{
							this.state.chatActualizar.map( (item, index)=>{
								return <Mensaje 
									mensajes={item.listaMensajes} 
									idChat={item.idFirebase}
								/>
							} )
						}
					</div>


				</div>
				<Footer />
			</div>
		);
	}

	actualizarListaChats(listaChatsActualizados){
		this.setState( {listaChats: listaChatsActualizados} )
	}

	cambiarChat(index){
		this.setState( {chatSeleccionado: index} )
		this.setState( {chatActualizar: [ this.state.listaChats[ index ] ]} )
	}
}

export default Chat;
