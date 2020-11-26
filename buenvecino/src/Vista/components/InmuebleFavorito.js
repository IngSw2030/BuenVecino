import React, { Component } from "react";
import InmuebleMapa from "../components/InmuebleMapa";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Modal from "@material-ui/core/Modal";
import "../styles/InmuebleGestion.css";
import { Link } from "react-router-dom";
import basura from '../assets/boteBasura.png'




class InmuebleFavorito extends Component {

    constructor() {
        super();
        this.state = {
            open: false,
        };
    }

    setOpen = (valor) => {
        this.setState({ open: valor });
    };
    handleOpen = () => {
        this.setOpen(true);
    };

    handleClose = () => {
        this.setOpen(false);
    };

    render() {
        let obj = {
            nombre: "NOmbre",
            descripción: "DEScripción",
            precio: "3213214324324",
        };

        return (
            <div>
                <div className="item">
                    <div className="inmueble">
                        <Link to="/inmueble">
                        <InmuebleMapa info={obj} />
                        </Link>
                    </div>
                    <div className="botones">
                        
                        <Button
                            variant="contained"
                            startIcon={<DeleteIcon />}
                            className="eliminar"
                            onClick={this.handleOpen}
                        >
                            ELIMINAR
              </Button>
                        <Modal
                            open={this.state.open}
                            onClose={this.handleClose}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                        >
                            <div className="modalDel">
                                <div className="titulo">
                                    <img
                                        src={basura}
                                        alt="Logo de la pagina"
                                    />
                                    <h2>¿Seguro de eliminar este inmueble de tu lista de favoritos?</h2>
                                </div>
                                <div className="modalbot">
                                    <Button variant="contained" className="eliminar">
                                        SI, ELIMINAR
                                     </Button>
                                    <Button
                                        variant="contained"
                                        className="modificar"
                                        onClick={this.handleClose}
                                    >
                                        CANCELAR
                                     </Button>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>

            </div>
        );
    }
}

export default InmuebleFavorito;