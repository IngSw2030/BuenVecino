import React, { Component } from "react";
import "../styles/ContactoArrendador.css"
import chat from '../assets/chat.png'
import StarIcon from '@material-ui/icons/Star';
import { yellow, red } from "@material-ui/core/colors";
import Modal from '@material-ui/core/Modal'
import Login from "./Login"
import Logo from "../assets/Logo.png"
import NavDropdown from 'react-bootstrap/NavDropdown'
import Controlador from "../../Controlador/Controlador";


class ContactoArrendador extends Component {
  	constructor(props) {
		super()
		this.state = {
			open: false,
			controlador: Controlador.getControlador(),
		}
		this.handleClose = this.handleClose.bind( this )
	}

	componentDidMount(){
		this.setState( {idInmueble : this.props.inmueble.idFirebase} )
		let tipo = this.state.controlador.obtenerTipoUsuarioActivo()
		if ( tipo === null ){
			this.modificarImagenFavorito(1)
		}
		else if ( tipo === "Arrendador" ){
			this.modificarImagenFavorito(0)
		}
		else if ( this.state.controlador.buscarFavorito(this.state.idInmueble) === null ){
			this.modificarImagenFavorito(1)
		}
		else{
			this.modificarImagenFavorito(2)
		}
	}

  	render() {
		return (
		<div className="ContactoArrendador">
			<h3>¿Tienes dudas?, contacta al arrendador</h3>
			<div className="logos">
				<div 
					onClick={ async (e)=>{
						this.setState( {disparador: 1} )
						this.decidirFuncionalidadBoton()
					}
				}>
				<img src={chat} alt="Logo de la pagina"/>
				<h3>Chat</h3>
				</div>
				{
					this.state.colorFavorito !== null ?
						<div 
							onClick={ async (e)=>{ 
								this.setState( {disparador: 2} )
								this.decidirFuncionalidadBoton()
							}
						}>
							<StarIcon style={{fontSize:80, color:this.state.colorFavorito}}/>
							<h3>{this.state.mensajeFavorito}</h3>
						</div>		
					:
						null
				}		
				<Modal
					open={this.state.open}
					onClose={this.handleClose}
					className="mdl"
				>
					<Login cerrar={this.handleClose} />
				</Modal>
			</div>
			
		</div>
		);
	}

	modificarImagenFavorito(pintar){
		if ( pintar == 1 ){
			this.setState({
				colorFavorito: yellow[500],
				mensajeFavorito: "Agregar a Favoritos"
			})
		}
		else if (pintar == 2){
			this.setState({
				colorFavorito: red[500],
				mensajeFavorito: "Eliminar de Favoritos"
			})
		}
		else{
			this.setState({
				colorFavorito: null,
				mensajeFavorito: null
			})
		}
	}

	decidirFuncionalidadBoton(){
		if ( !this.state.controlador.existeUsuarioSesionActiva() ){
			this.handleOpen()
		}
		else if ( this.state.disparadorIS === 1 ){
			this.iniciarChat()
		}
		else if ( this.state.disparadorIS === 2 ){
			this.cambiarEstadoFavorito()
		}
	}

	setOpen = (valor) => {
		console.log(valor)
		console.log(this.state.open)
		this.setState({ open: valor })
		console.log(this.state.open)
	}

	handleOpen = () => {
		this.setOpen(true);
	};

	handleClose = () => {
		this.setOpen(false);
		this.notificarInicioSesion()
	};

	notificarInicioSesion(){
		if ( !this.state.controlador.existeUsuarioSesionActiva() ){
			//Inicio de sesión no efectuado
			return
		}
		if ( this.state.disparadorIS === 1 ){
			console.log("PROCEDER A CHAT")
		}
		else{
			console.log( this.state.controlador.obtenerTipoUsuarioActivo() )
			if ( this.state.controlador.obtenerTipoUsuarioActivo() === "Arrendatario" ){
				this.cambiarEstadoFavorito(true)
			}	
		}
	}

	cambiarEstadoFavorito(ignorarEliminarFavorito=false){
		if ( this.state.controlador.buscarFavorito(this.state.idInmueble) !== null ){
			if ( !ignorarEliminarFavorito ){
				this.eliminarFavorito()
			}
		}
		else{
			this.agregarFavorito()

		}
		
	}

	async agregarFavorito(){
		let objFavorito = {
			fechaAgregado:	Date.now(),
			comentario: "",
			idInmueble: this.state.idInmueble
		}
		let respuesta = await this.state.controlador.agregarFavorito(objFavorito)
		if ( respuesta.idError === 0 ){
			this.modificarImagenFavorito(2)
		}
		this.mostrarMensajeExito( respuesta.mensaje )
	}

	async eliminarFavorito(){
		let idFavorito = this.state.controlador.buscarFavorito(this.state.idInmueble).idFirebase
		let respuesta = await this.state.controlador.eliminarFavorito(idFavorito)
		if ( respuesta.idError === 0 ){
			this.modificarImagenFavorito(1)
		}
		this.mostrarMensajeExito( respuesta )
	}

	iniciarChat(){

	}

	mostrarMensajeExito(mensaje){
		console.log(mensaje)
	}
	  

}

export default ContactoArrendador;