import React from 'react';
import SearchIcon from '@material-ui/icons/Search';

import { Avatar } from '@material-ui/core';
import '../assets/Header.css';
const Header = () => {
	return (
		<div className="header">
			<img src={require('../assets/Logo.png')} alt="" className="header__icon" />

			<div className="header__right">
				<p className="saira">Ingresar | Registrate | Registra tu vivienda | Ayuda</p>
				<Avatar />
			</div>
		</div>
	);
};

export default Header;
