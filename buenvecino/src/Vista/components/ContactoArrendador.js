import React, { Component } from "react";
import "../styles/ContactoArrendador.css"
import chat from '../assets/chat.png'
import StarIcon from '@material-ui/icons/Star';
import { yellow } from "@material-ui/core/colors";
import Modal from '@material-ui/core/Modal'
import Login from "./Login"
import Logo from "../assets/Logo.png"
import NavDropdown from 'react-bootstrap/NavDropdown'
import Controlador from "../../Controlador/Controlador";


class ContactoArrendador extends Component {
  	constructor() {
		super()
		this.state = {
			open: false,
			controlador: Controlador.getControlador(),
			
		}
		this.handleClose = this.handleClose.bind( this )
	}

	componentDidMount(){
		console.log( this.state )
		//this.setState( {idInmueble : this.props.match.params.idInmueble} )
		this.setState( {idInmueble : "9MgpENgUCVqwu3NBnyPz"} )
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

  	render() {
		return (
		<div className="ContactoArrendador">
			<h3>¿Tienes dudas?, contacta al arrendador</h3>
			<div className="logos">
				<div onClick={ (e)=>{ this.handleOpen(); this.setState({disparadorIS: 1}) } }>
				<img src={chat} alt="Logo de la pagina"/>
				<h3>Chat</h3>

				</div>
				{
					this.state.controlador.obtenerTipoUsuarioActivo() !== "Arrendador" ?
						this.state.controlador.buscarFavorito(this.state.idInmueble) === null ?
							<div onClick={ (e)=>{ this.handleOpen(); this.setState({disparadorIS: 2}) } }>
								<StarIcon style={{fontSize:80, color:yellow[500]}}/>
								<h3>Agregar a Favoritos</h3>
							</div>
						:
							<div onClick={ (e)=>{ this.handleOpen(); this.setState({disparadorIS: 2}) } }>
								<StarIcon style={{fontSize:80, color:yellow[500]}}/>
								<h3>Eliminar de Favoritos</h3>
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

	notificarInicioSesion(){
		console.log( "INICIO SESION CONTACTO ARRENDADOR" )
		if ( !this.state.controlador.existeUsuarioSesionActiva() ){
			console.log("NADA QUE HACER :V")
			return
		}
		if ( this.state.disparadorIS === 1 ){
			console.log("PROCEDER A CHAT")
		}
		else{
			if ( this.state.controlador.obtenerTipoUsuarioActivo() === "Arrendatario" ){
				this.agregarFavorito()
			}
			
		}
		console.log( this.state.controlador.obtenerUsuarioActivo() )
	}

	async agregarFavorito(){
		if ( this.controlador.buscarFavorito(this.state.idInmueble) !== null ){
			//Solo entra aquí si ya se logeó y automaticamente se disparó la acción
			return
		}
		let objFavorito = {
			fechaAgregado:	Date.now().getTime(),
			comentario: "",
			idInmueble: this.state.idInmueble
		}
		let respuesta = await this.state.controlador.agregarFavorito(objFavorito)
		console.log( respuesta )
		this.mostrarMensajeExito( respuesta.mensaje )

	}

	mostrarMensajeExito(mensaje){
		console.log(mensaje)
	}
	  

}

export default ContactoArrendador;