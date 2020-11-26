import React, { Component } from "react";
import '../styles/Contacto.css'
import { Avatar } from '@material-ui/core';


class Contacto extends Component {
    render() {
        return (
            <div className="contacto">
                {/* <img/> */}
                <button>
                    <Avatar />
                    <p>Nombre</p>
                </button>
            </div>
        );
    }
}

export default Contacto;
