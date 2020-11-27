import React, { Component } from "react"
import { Button } from "@material-ui/core"
import "../styles/RegistrarUsuario.css"
import Controlador from "../../Controlador/Controlador"
import login from "../assets/Login.png"

class RegistrarUsuario extends Component {

    constructor(props){
        super()
        this.state = {
            tipoUsuario: "Arrendador"

        }
        this.refFormulario = React.createRef()
        this.tipoUsuario = React.createRef()
    }

    render() {
        return (
            <div className="RegistrarUsuario">
                <div className="ingresar">
                    <img src={login} alt="" />
                    <h2>REGISTRO</h2>
                </div>
                <div className="formulario">
                    <form action="iniciarRegistro" onSubmit={ (e)=>{this.iniciarRegistro(e)}} ref={ this.refFormulario }>
                        <label for="name">Nombre Completo</label>
                        <input
                            type="text"
                            placeholder=" Ingrese su nombre completo "
                            name="name"
                            required
                        />

                        <label>Foto de perfil</label>
                        <input name="Foto" type="file" />

                        <label for="Tdni">Tipo de DNI</label>
                        <select name="Tdni" required>
                            <option selected value=""> Tipo de DNI</option>
                            <option>CC</option>
                            <option>CE</option>
                            <option>TI</option>
                            <option>PA</option>
                        </select>                        
                        <label for="dni">DNI</label>
                        <input type="number" placeholder="Ingrese su DNI" name="dni" required></input>
                        <label for="tipo">Rol</label>
                        <select name="tipo" required 
                            onChange={(e)=>{this.modificarTipoUsuario(e)}} 
                            ref={this.tipoUsuario}
                        >
                            <option selected value="" >Seleccione un rol</option>
                            <option>Arrendador</option>
                            <option>Arrendatario</option>
                        </select>
                        <label for="genero">Genero</label>
                        <select name="genero" required>
                            <option selected value="">Seleccione su genero</option>
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                            <option value="O">Otro</option>
                            <option value="N">No indica</option>
                        </select>
                        <label for="myDate">Fecha de nacimiento</label>
                        <input type="date" name="myDate" id="myDate" required />
                        <label for="correo">Correo Electronico</label>
                        <input
                            type="email"
                            placeholder=" Ingrese su correo "
                            name="correo"
                            required
                        />
                        <label for="psw">Contraseña</label>
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
                        <input type="number" placeholder="Ingrese su telefono" name="tel" required></input>
                        {
                            this.state.tipoUsuario === "Arrendador" ?
                            <div className="visual">
                                <div>
                                <label for="direccion">Direccion</label>
                                <input
                                    type="text"
                                    placeholder=" Ingrese su direccion "
                                    name="direccion"
                                    required
                                />
                                </div>
                                <div>
                                <label for="ciudad">Ciudad</label>
                                <input
                                    type="text"
                                    placeholder=" Ingrese su ciudad "
                                    name="ciudad"
                                    required
                                />
                                </div>
                            </div>
                            :
                            null
                        }
                        <div className="botones">
                            <Button className="Cancelar"> Cancelar </Button>
                            <Button type="submit" className="Registrarse" > Registrate </Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    async iniciarRegistro(e){
        e.preventDefault()
        let formulario = this.refFormulario.current
        let datos = new FormData( formulario ) 
        
        let agregarFoto = true
        let esArrendatario = true
        let contrasena1 = datos.get("psw1")
        let contrasena2 = datos.get("psw2")
        if ( contrasena1 !== contrasena2 ){
            console.log("ERROR, NO SE COMO HACERLO ##")
            this.mostrarError("Contraseñas no coinciden")
            return
        }
        let tokensFecha = datos.get("myDate").split("-")
        let fechaParcial = new Date( tokensFecha[0], tokensFecha[1]-1, tokensFecha[2] ).getTime()
        let objetoBasico = {
            nombre:             datos.get("name"),
            dni:                parseInt(datos.get("dni")),
            tipoDni:            datos.get("Tdni"),
            genero:             datos.get("genero"),
            fechaNacimiento:    fechaParcial,
            email:              datos.get("correo"),
            telefono:           parseInt(datos.get("tel"))
        }
        if ( this.state.tipoUsuario === "Arrendador" ){
            objetoBasico = {
                ...objetoBasico,
                direccion:      datos.get("direccion"),
                ciudad:         datos.get("ciudad")
            }
            esArrendatario = false
        }

        let foto = datos.get("Foto")
        if ( foto.name === "" ){
            agregarFoto = false
        }
        else{
            if ( !foto.type.startsWith("image/") ){
                this.mostrarError( "El archivo seleccionado no es una imagen" )
                return
            }
        }

        let respuesta = await Controlador.getControlador().registrarUsuario( objetoBasico, esArrendatario, objetoBasico.email, contrasena1 )
        if ( respuesta.idError !== 0 ){
            this.mostrarError( respuesta )
        }
        else{
            if ( agregarFoto ){
                await Controlador.getControlador().subirFotoPerfil(foto)
                console.log("FOTO CARGADA")
            }
            
            //LA FUNCION QUE MUESTRE EL MENSAJE DE EXITO
            this.mostrarError("EXITO")
        }
        //Si IdError es 3 es porque se está haciendo una mala conversión de datos, en teoria el usuario
        //nunca debería conocer dicho error

    }
    
    modificarTipoUsuario(e){
        this.setState( {tipoUsuario: this.tipoUsuario.current.value} )
    }

    mostrarError(mensajeError){
        console.log( mensajeError )
    }

}

export default RegistrarUsuario;
