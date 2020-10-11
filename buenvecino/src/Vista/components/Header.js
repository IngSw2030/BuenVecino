import React,{Component} from 'react';

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
						<li><a href=""> Ingresar</a> </li>
						<li><a href=""> Registrate</a> </li>
						<li><a href=""> Registra tu vivienda</a> </li>
						<li><a href=""> Ayuda</a> </li>
					</ul>
				</nav>
				<Avatar />
			</div>
		</div>
	);
}
}

export default Header;
