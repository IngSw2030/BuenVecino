import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Avatar } from '@material-ui/core';
import '../styles/Header.css';
import Modal from '@material-ui/core/Modal'
import Login from "./Login"
import Logo from "../assets/Logo.png"
import NavDropdown from 'react-bootstrap/NavDropdown'

class HeaderLanding extends Component {

	constructor() {
		super()
		this.state = {
			open: false,
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
	};

	render() {
		return (
			<div className="header">
				<img src={Logo} alt="Logo de la pagina" className="header__icon" />

				<div className="header__right">
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

								<Login />


							</Modal>

						</ul>
					</nav>
					<NavDropdown title={<Avatar/>} id="basic-nav-dropdown">
						<NavDropdown.Item ><Link to="/perfil">Mi Perfil</Link></NavDropdown.Item>
						<NavDropdown.Item ><Link to="/favoritos">Mis Favoritos</Link></NavDropdown.Item>
						<NavDropdown.Item ><Link to="/chats">Mis Chats</Link></NavDropdown.Item>
						<NavDropdown.Item ><Link to="/historialpagos">Historial de Pagos</Link></NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item ><Link to="/">Cerrar Sesión</Link></NavDropdown.Item>
					</NavDropdown>

				</div>
			</div>
		);
	}
}

export default HeaderLanding;
