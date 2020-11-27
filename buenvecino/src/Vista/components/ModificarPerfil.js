import React, { Component } from "react"
import { Button } from "@material-ui/core"
import "../styles/ModificarPerfil.css"
import Controlador from "../../Controlador/Controlador"
import login from "../assets/Login.png"
import { Link } from "react-router-dom"

class ModificarPerfil extends Component {

    constructor(props){
        super()
        this.state = {
            tipoUsuario: "Arrendador",
            usuarioActivo:null
        }
        this.refFormulario = React.createRef()
        this.tipoUsuario = React.createRef()

    }
    componentDidMount(){
        
        let usuario = Controlador.getControlador().obtenerUsuarioActivo()
        console.log("Usuario",usuario)
        this.setState({usuarioActivo:"Perro hpta",})
        console.log("Usuario activo",this.state.usuarioActivo,this.state.tipoUsuario)
        
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
                        <div className="modificar">
                         <label for="name">Nombre Completo</label>
                         <p>  Aqui va Nombre Del Perfil</p>
                        </div>

                        <div className="modificar">
                        <label for="Tdni">Tipo de DNI</label>
                        <p> Aqui va Tipo de DNI</p>
                        </div>   

                        <div className="modificar">                     
                        <label for="dni">DNI</label>
                        <p>Aqui va Numero DNI</p>
                        </div>
                        <div className="modificar">
                        <label for="tipo">Rol</label>
                        <p>Tipo de Rol</p>
                        </div>
                        <div className="modificar">
                        <label for="genero">Genero</label>
                        <select name="genero" required>
                            <option selected value="">Seleccione su genero</option>
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                            <option value="O">Otro</option>
                            <option value="N">No indica</option>
                        </select>
                        </div>
                        <div className="modificar">
                        <label for="myDate">Fecha de nacimiento</label>
                        <p>Aqui va Fecha de Nacimiento</p>
                        </div >
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
                            <div className="visualPerfil">
                                <div>
                                <label for="direccion">Direccion</label>
                                <input
                                    type="text"
                                    placeholder=" Ingrese su direccion "
                                    name="direccion"
                                    required
                                    value ="Calle falsa 123"
                                />
                                </div>
                                <div>
                                <label for="ciudad">Ciudad</label>
                                <input
                                    type="text"
                                    placeholder=" Ingrese su ciudad "
                                    name="ciudad"
                                    value= "Bogota Ome"
                                    required
                                />
                                </div>
                            </div>
                            :
                            null
                        }
                        <div className="botones">

                             <Link to="/">       <button > CANCELAR </button> </Link>
                            <Button type="submit" className="Registrarse"> Actualizar Datos </Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

    

export default ModificarPerfil;
