import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Avatar } from '@material-ui/core';
import '../styles/Header.css';
import Modal from '@material-ui/core/Modal'
import Login from "../components/Login"
import RegistrarUsuario from "../components/RegistrarUsuario"

class Header extends Component {

	constructor() {
		super()
		this.state = {
			open: false
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
				<img src={require('../assets/Logo.png')} alt="Logo de la pagina" className="header__icon" />

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
								aria-labelledby="simple-modal-title"
								aria-describedby="simple-modal-description"
							>
								
								<Login/>
								

							</Modal>
							<li><Link to="/">Registrate</Link></li>
							<li><Link to="/">Registra tu vivienda</Link></li>
							<li><Link to="/">Ayuda</Link></li>
						</ul>
					</nav>
					<Avatar />
				</div>
			</div>
		);
	}
}

export default Header;
