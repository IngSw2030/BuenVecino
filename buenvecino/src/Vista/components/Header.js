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
			controlador: Controlador.getControlador()
		}
		this.handleClose = this.handleClose.bind( this )
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
							<li type="button" onClick={this.handleOpen}>
								Ingresar
     						 </li>
							<Modal
								open={this.state.open}
								onClose={this.handleClose}
								className="mdl"
							>
								<Login cerrar={this.handleClose}/>
							</Modal>

						</ul>
					</nav>
					<NavDropdown title={<Avatar style={{fontSize:200}} />} id="basic-nav-dropdown" className="icono">
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
		this.state.controlador.cerrarSesion()
	}

	notificarInicioSesion(){
		console.log( "Inicio para header" )
		return 0
	}
}

export default Header;