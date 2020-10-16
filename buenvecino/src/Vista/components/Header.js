import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import { Avatar } from '@material-ui/core';
import '../styles/Header.css';

class Header extends Component{


render(){
	return (
		<div className="header">
			<img src={require('../assets/Logo.png')} alt="Logo de la pagina" className="header__icon" />

			<div className="header__right">
				<nav>
					<ul className ="nav-items">
						<li><Link to="/">Ingresar</Link></li>
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
