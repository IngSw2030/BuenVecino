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
			controlador: Controlador.getControlador(),
			listaChats: [],
			chatActualizar: [],
			chatSeleccionado: 0
		}
		this.cambiarChat = this.cambiarChat.bind(this)
	}

	async componentDidMount(){
		if ( this.state.controlador.obtenerUsuarioActivo() !== null ){
			await this.setState( {listaChats: this.state.controlador.obtenerChatsCargados()} )
			console.log( this.state.listaChats, " MMM " )
		}
		else{
			console.log( this.state.controlador, "NO ESTA ACTIVO" )
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
						{
							this.state.listaChats.map( (item, index) =>{
								console.log("MAPPING : ", item)
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
								console.log("SECOND MAPPING : ", item)
								return <Mensaje 
									mensajes={item.listaMensajes} 
								/>
							} )
						}
						

					</div>


				</div>
				<Footer />
			</div>
		);
	}

	cambiarChat(index){
		this.setState( {chatSeleccionado: index} )
		this.setState( {chatActualizar: [ this.state.listaChats[ index ] ]} )

		console.log("##$$ : ", this.state.listaChats[ index ], this.state.listaChats, "INDEX: :"+index)

	}
}

export default Chat;
