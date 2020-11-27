import React, { Component } from "react";
import { Button } from "@material-ui/core";
import "../styles/ModificarPerfil.css";
import Controlador from "../../Controlador/Controlador";
import login from "../assets/Login.png";
import { Link } from "react-router-dom";

class ModificarPerfil extends Component {
  constructor(props) {
    super();
    this.state = {
      tipoUsuario: "Arrendador",
      usuarioActivo: {
        nombre: "",
        tipoDni: "",
        dni: "",
        fechaNacimiento: "",
        email: "",
        telefono: "",
        genero: "",
        direccion:"",
        ciudad:""
      },
    };
    this.refFormulario = React.createRef();
    this.tipoUsuario = React.createRef();
  }

  async componentDidMount() {
    let usuario = Controlador.getControlador().obtenerUsuarioActivo();
    let tipo = Controlador.getControlador().obtenerTipoUsuarioActivo();
    await this.setState({ usuarioActivo: usuario, tipoUsuario: tipo });

    console.log("Usuario", usuario);
    await this.setState({ usuarioActivo: usuario });
    console.log(
      "Usuario activo",
      this.state.usuarioActivo.nombre,
      this.state.tipoUsuario
    );
  }

  render() {
    return (
      <div className="RegistrarUsuario">
        <div className="ingresar">
          <img src={login} alt="" />
          <h2>TU PERFIL</h2>
        </div>
        <div className="formulario">
          <form>
            <div className="modificar">
              <label for="name">Nombre Completo</label>
              <p> {this.state.usuarioActivo.nombre}</p>
            </div>

            <div className="modificar">
              <label for="Tdni">Tipo de DNI</label>
              <p> {this.state.usuarioActivo.tipoDni}</p>
            </div>

            <div className="modificar">
              <label for="dni">DNI</label>
              <p>{this.state.usuarioActivo.dni}</p>
            </div>
            <div className="modificar">
              <label for="tipo">Rol</label>
              <p>{this.state.tipoUsuario}</p>
            </div>
            <div className="modificar">
              <label for="genero">Genero</label>
              {
                  this.state.usuarioActivo.genero === "M"?
                  <p>Masculino</p>
                  :
                  <p>Feminino</p>
              }

            </div>
            <div className="modificar">
              <label for="myDate">Fecha de nacimiento</label>
              <p>{this.state.usuarioActivo.fechaNacimiento}</p>
            </div>
            <label for="correo">Correo Electronico</label>
            <input
              type="email"
              placeholder=" Ingrese su correo "
              name="correo"
              required
              value={this.state.usuarioActivo.email}
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
            <input
              type="number"
              placeholder="Ingrese su telefono"
              name="tel"
              value={this.state.usuarioActivo.telefono}
              required
            ></input>
            {this.state.tipoUsuario === "Arrendador" ? (
              <div className="visualPerfil">
                <div>
                  <label for="direccion">Direccion</label>
                  <input
                    type="text"
                    placeholder=" Ingrese su direccion "
                    name="direccion"
                    required
                    value={this.state.usuarioActivo.direccion}
                  />
                </div>
                <div>
                  <label for="ciudad">Ciudad</label>
                  <input
                    type="text"
                    placeholder=" Ingrese su ciudad "
                    name="ciudad"
                    value={this.state.usuarioActivo.ciudad}
                    required
                  />
                </div>
              </div>
            ) : null}
            <div className="botones">
              <Link to="/">
                {" "}
                <button> CANCELAR </button>{" "}
              </Link>
              <Button type="submit" className="Registrarse">
                {" "}
                Actualizar Datos{" "}
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ModificarPerfil;
