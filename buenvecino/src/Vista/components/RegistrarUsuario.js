import React, { Component } from "react";
import { Button } from "@material-ui/core";
import "../styles/RegistrarUsuario.css";

class RegistrarUsuario extends Component {
    render() {
        return (
            <div className="RegistrarUsuario">
                <div className="ingresar">
                    <img src={require("../assets/Login.png")} alt="" />
                    <h2>REGISTRO</h2>
                </div>
                <div className="formulario">
                    <form action="">
                        <label for="name">Nombre Completo</label>
                        <input
                            type="text"
                            placeholder=" Ingrese su nombre completo "
                            name="name"
                            required
                        />

                        <label for="Tdni">Tipo de DNI</label>
                        <select name="Tdni">
                            <option selected> Tipo de DNI</option>
                            <option>CC</option>
                            <option>CE</option>
                            <option>TI</option>
                            <option>PA</option>
                        </select>
                        

                        <label for="dni">DNI</label>
                        <input type="number" placeholder="Ingrese su DNI" name="dni" required></input>

                        <label for="tipo">Rol</label>
                        <select name="tipo">
                            <option selected>Seleccione un rol</option>
                            <option>Arrendador</option>
                            <option>Arrendatario</option>
                        </select>
                        

                        <label for="genero">Genero</label>
                        <select name="genero">
                            <option>Seleccione su genero</option>
                            <option>M</option>
                            <option>F</option>
                            <option>O</option>
                            <option>N</option>
                        </select>
                        <label for="myDate">Fecha de nacimiento</label>
                        <input type="date" name="myDate" step="7" id="myDate" required />

                        <label for="correo">Correo Electronico</label>
                        <input
                            type="email"
                            placeholder=" Ingrese su correo "
                            name="correo"
                            required
                        />

                        <label for="psw">Contrasena</label>
                        <input
                            type="password"
                            placeholder=" Ingrese su contraseña "
                            name="psw"
                            required
                        />

                        <label for="tel">Numero de Telefono</label>
                        <input type="number" placeholder="Ingrese su telefono" name="tel" required></input>

                        <label for="direccion">Direccion</label>
                        <input
                            type="text"
                            placeholder=" Ingrese su direccion "
                            name="direccion"
                            required
                        />

                        <label for="ciudad">Ciudad</label>
                        <input
                            type="text"
                            placeholder=" Ingrese su ciudad "
                            name="ciudad"
                            required
                        />

                        <div className="botones">
                            <Button> Cancelar </Button>
                            <Button type="submit"> Registrate </Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default RegistrarUsuario;
