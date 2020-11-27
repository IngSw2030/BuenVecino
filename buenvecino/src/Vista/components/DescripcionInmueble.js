import React, { Component } from "react";
import '../styles/DescripcionInmueble.css';


class DescripcionInmueble extends Component {
  constructor(props){
    super()
    this.state = {
      tipoInmueble : ""
    }
  }

  componentDidMount(){
    let tipoInmueble = "" 
    switch( this.props.inmueble.tipo ){
      case "A": tipoInmueble="Apartamento"; break
      case "C": tipoInmueble="Casa"; break
      case "H": tipoInmueble="Habitación"; break
    }
    let cadenaPresentacion = ""
    cadenaPresentacion += this.obtenerCadenaPresentacion("nBanos", "baño", "s") + " - "
    if ( this.props.inmueble.tipo === "A" || this.props.inmueble.tipo === "C" ){
      cadenaPresentacion += this.obtenerCadenaPresentacion("nCocinas", "cocina", "s") + " - "
      cadenaPresentacion += this.obtenerCadenaPresentacion("nHabitaciones", "habitacion", "es")  + " - "
      cadenaPresentacion += this.obtenerCadenaPresentacion("nPisos", "piso", "s")  
    }
    else{
      cadenaPresentacion += this.obtenerCadenaPresentacion("nCamas", "cama", "s")
    }
    this.setState( {
      tipoInmueble: tipoInmueble,
      cadenaPresentacion: cadenaPresentacion
    })
  }

  obtenerCadenaPresentacion(atributo, nombre, terminacion){
    if ( this.props.inmueble[atributo] > 1 ){
      return this.props.inmueble[atributo] + " " + nombre + terminacion
    }
    else{
      return this.props.inmueble[atributo] + " " + nombre
    }
  }

  render() {
    return (
      <div className="DescripcionInmueble">
          
          <h3>ALGUN DATO</h3>
          <p>{this.state.cadenaPresentacion}</p>

          <h3>{this.state.tipoInmueble}</h3>
          <p>Maecenas laoreet felis nec ante auctor imperdiet. Nulla fermentum purus nisi, id aliquet lectus mattis ac. Etiam ut tellus sit amet urna viverra lacinia. Quisque porta dictum tincidunt. Maecenas id ex justo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut nec commodo orci, consectetur mattis elit. Nullam eu blandit odio. Nulla metus lorem, eleifend a nunc id, fermentum ultrices ipsum. Ut iaculis finibus erat vitae tempus. </p>
          <h3>Comodidades</h3>
          <p>Maecenas laoreet felis nec ante auctor imperdiet. Nulla fermentum purus nisi, id aliquet lectus mattis ac. Etiam ut tellus sit amet urna viverra lacinia. Quisque porta dictum tincidunt. Maecenas id ex justo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut nec commodo orci, consectetur mattis elit. Nullam eu blandit odio. Nulla metus lorem, eleifend a nunc id, fermentum ultrices ipsum. Ut iaculis finibus erat vitae tempus. </p>
      </div>
    );
  }
}

export default DescripcionInmueble;