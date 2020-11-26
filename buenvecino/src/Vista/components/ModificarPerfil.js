import React, { Component } from "react"
import { Button } from "@material-ui/core"
import "../styles/RegistrarUsuario.css"
import Controlador from "../../Controlador/Controlador"
import login from "../assets/Login.png"
import { Link } from "react-router-dom"

class ModificarPerfil extends Component {

    constructor(props){
        super()
        this.state = {
            tipoUsuario: "Arrendador",

        }
        this.refFormulario = React.createRef()
        this.tipoUsuario = React.createRef()
    }

    render() {
        return (
            <div className="RegistrarUsuario">
                <div className="ingresar">
                    <img src={login} alt="" />
                    <h2>TU PERFIL</h2>
                </div>
                <div className="formulario">
                    <form >
                        <div>
                         <label for="name">Nombre Completo</label>
                         <p>  Aqui va Nombre Del Perfil</p>
                        </div>

                        <div>
                        <label for="Tdni">Tipo de DNI</label>
                        <p> Aqui va Tipo de DNI</p>
                        </div>   

                        <div>                     
                        <label for="dni">DNI</label>
                        <p>Aqui va Numero DNI</p>
                        </div>
                        <div>
                        <label for="tipo">Rol</label>
                        <p>Tipo de Rol</p>
                        </div>
                        <div>
                        <label for="genero">Genero</label>
                        <select name="genero" required>
                            <option selected value="">Seleccione su genero</option>
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                            <option value="O">Otro</option>
                            <option value="N">No indica</option>
                        </select>
                        </div>
                        <div>
                        <label for="myDate">Fecha de nacimiento</label>
                        <p>Aqui va Fecha de Nacimiento</p>
                        </div>
                        <label for="correo">Correo Electronico</label>
                        <input
                            type="email"
                            placeholder=" Ingrese su correo "
                            name="correo"
                            required
                            value="AQuivacorereo@envalue.com"
                        />
                        <label for="psw">Cambiar Contraseña</label>
                        <input
                            type="password"
                            placeholder=" Ingrese su contraseña "
                            name="psw1"
                            required
                        />
                        <label for="psw">Confirmar contraseña</label>
                        <input
                            type="password"
                            placeholder=" Ingrese su contraseña "
                            name="psw2"
                            required
                        />
                        <label for="tel">Numero de Telefono</label>
                        <input type="number" placeholder="Ingrese su telefono" name="tel" value="48390248930284" required></input>
                        {
                            this.state.tipoUsuario === "Arrendador" ?
                            <div>
                                <label for="direccion">Direccion</label>
                                <input
                                    type="text"
                                    placeholder=" Ingrese su direccion "
                                    name="direccion"
                                    required
                                    value ="Calle falsa 123"
                                />
        
                                <label for="ciudad">Ciudad</label>
                                <input
                                    type="text"
                                    placeholder=" Ingrese su ciudad "
                                    name="ciudad"
                                    value= "Bogota Ome"
                                    required
                                />
                            </div>
                            :
                            null
                        }
                        <div className="botones">

                             <Link to="/">       <Button> Cancelar </Button> </Link>
                            <Button type="submit" > Actualizar Datos </Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

    

export default ModificarPerfil;
