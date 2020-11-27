import React, { Component } from "react";
import '../styles/HeaderG.css';
import { Link } from 'react-router-dom'
import { Avatar } from '@material-ui/core';
import '../styles/HeaderG.css';
import Modal from '@material-ui/core/Modal'
import Login from "./Login"
import Logo from "../assets/Logo.png"
import NavDropdown from 'react-bootstrap/NavDropdown'
import Controlador from "../../Controlador/Controlador";


class Header extends Component {

	constructor() {
		super()
		this.state = {
			open: false,
			usuarioActivo: null,
			foto: "https://image.freepik.com/vector-gratis/perfil-avatar-hombre-icono-redondo_24640-14046.jpg"
		}
		this.handleClose = this.handleClose.bind( this )

		console.log( Controlador.getControlador(), " EXISTE" )
	}

	async componentDidMount(){
		console.log( "CONTROLER : ", Controlador.getControlador() )
		let usuario = Controlador.getControlador().obtenerUsuarioActivo()
		if ( usuario !== null ){
			let foto = await Controlador.getControlador().obtenerFotoPerfil()
			if (foto !== null) {
				console.log("ESTE USUARIO NO TIENE FOTO")
				this.setState({foto: foto,})
			}
			else {
				this.setState({ foto: "https://upload.wikimedia.org/wikipedia/commons/0/06/Rammstein_logo.png", })
				console.log("CAMBIAR FOTO PERFIL CUANDO NO EXISTE")
			}
			this.setState({usuarioActivo: usuario})
		}
	}

	setOpen = (valor) => {
		this.setState({ open: valor })
	}
	handleOpen = () => {
		console.log("ABRIR", Controlador.getControlador().obtenerUsuarioActivo() )
		if ( Controlador.getControlador().obtenerUsuarioActivo() === null ){
			this.setOpen(true);
		}
		
	};

	handleClose = () => {
		this.setOpen(false);
		console.log("RECIEN CERRADITO : ", Controlador.getControlador())
		this.notificarInicioSesion()
	};

	render() {
		return (
			<div className="headerG">
        <div className="imgH">
        <Link to="/">
				<img src={Logo} alt="Logo de la pagina" className="header__icon" />
        </Link>
        </div>
				<div className="log">
					<nav>
						<ul className="nav-items">
							{/* <li onClick={this.handleOpen}>Ingresar</li> */}
							{
								this.state.usuarioActivo === null ? 
								<li type="button" onClick={this.handleOpen}>
									Ingresar
							  	</li>
							  :
							  	null
							}
							
							
							<Modal
								open={this.state.open}
								onClose={this.handleClose}
								className="mdl"
							>
								<Login cerrar={this.handleClose}/>
							</Modal>

						</ul>
					</nav>
					<NavDropdown title={ <img src={ this.state.foto }/> } id="basic-nav-dropdown" className="icono">				
						<NavDropdown.Item ><Link to="/perfil">Mi Perfil</Link></NavDropdown.Item>
						<NavDropdown.Item ><Link to="/favoritos">Mis Favoritos</Link></NavDropdown.Item>
						<NavDropdown.Item ><Link to="/gestionarInmueble">Mis Inmuebles</Link></NavDropdown.Item>
            			<NavDropdown.Item ><Link to="/chats">Mis Chats</Link></NavDropdown.Item>
						<NavDropdown.Item ><Link to="/historialpagos">Historial de Pagos</Link></NavDropdown.Item>
            			<NavDropdown.Item ><Link to="/notificaciones">Mis Notificaciones</Link></NavDropdown.Item>
						<NavDropdown.Item ><Link to="/historialInmueble">Historial de Inmuebles</Link></NavDropdown.Item>	
            			<NavDropdown.Divider />
						<NavDropdown.Item 
							onClick = {this.cerrarSesion}
						><Link to="/">Cerrar Sesión</Link></NavDropdown.Item>
					</NavDropdown>
					
				</div>
			</div>
		);
	}

	cerrarSesion = (e) =>{
		Controlador.getControlador().cerrarSesion()
	}

	notificarInicioSesion(){
		let usuarioActivo = Controlador.getControlador().obtenerUsuarioActivo()
		console.log( "HA INICIADO SESION : ", usuarioActivo )
		if ( usuarioActivo !== null ){
			this.setState( {
				usuarioActivo: usuarioActivo,
				foto: usuarioActivo.fotoPerfil
			} )
		}
		else{
			//Sesion no iniciada
		}
	}
}

export default Header;