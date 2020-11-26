import React, { Component } from "react";
import "../styles/ContactoArrendador.css"
import chat from '../assets/chat.png'
import StarIcon from '@material-ui/icons/Star';
import { yellow } from "@material-ui/core/colors";
import Modal from '@material-ui/core/Modal'
import Login from "./Login"
import Logo from "../assets/Logo.png"
import NavDropdown from 'react-bootstrap/NavDropdown'


class ContactoArrendador extends Component {
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
      <div className="ContactoArrendador">
        <h3>¿Tienes dudas?, contacta al arrendador</h3>
        <div className="logos">
          <div onClick={this.handleOpen}>
          <img src={chat} alt="Logo de la pagina"/>
          <h3>Chat</h3>

          </div>
          <div onClick={this.handleOpen}>
            <StarIcon style={{fontSize:80, color:yellow[500]}}/>
          <h3>Agregar a Favoritos</h3>
          </div>
          <Modal
								open={this.state.open}
								onClose={this.handleClose}
								className="mdl"
							>

								<Login />


							</Modal>
        </div>
        
      </div>
    );
  }
}

export default ContactoArrendador;