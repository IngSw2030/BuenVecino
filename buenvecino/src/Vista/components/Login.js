import React, { Component } from "react";
import { Button } from "@material-ui/core";
import "../styles/Login.css";


class Login extends Component {
  render() {
    return (
      <div className="Login">
          <div className="ingresar">
              <img src={require("../assets/Login.png")} alt=""/>
              <h2>INGRESAR</h2>
          </div>
          <div className="formulario">
              <form>
                  <label for="correo">Correo Electronico</label>
                  <input type="email" placeholder=" Ingrese su correo " name="correo" required/>

                  <label for="psw">Contrasena</label>
                  <input type="password" placeholder=" Ingrese su contraseña " name="psw" required/>

                  <Button type="submit">Iniciar sesión</Button>
                  
              </form>
              <div className="botones">
                  <Button> Registrate </Button>
                  <Button> Cancelar </Button>
              </div>
          </div>
      </div>
    );
  }
}

export default Login;