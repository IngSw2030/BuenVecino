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
    console.log("HERE :V")
    let tipoInmueble = "" 
    switch( this.props.inmueble.tipo ){
      case "A": tipoInmueble="Apartamento"; break
      case "C": tipoInmueble="Casa"; break
      case "H": tipoInmueble="Habitacion"; break
    }
    console.log( tipoInmueble )
    this.setState( {tipoInmueble: tipoInmueble} )
  }

  render() {
    return (
      <div className="DescripcionInmueble">
          <h3>{this.state.tipoInmueble}</h3>
          {
            this.props.inmueble.tipo === "A" || this.props.inmueble.tipo === "C" ? 
              <p>{`${this.props.inmueble.nHabitaciones} habitaciones - ${this.props.inmueble.nBanos} baños - 
                ${this.props.inmueble.nPisos} pisos`}</p>
            
            :
            <p>HOLA COMO ESTA</p>
          }

          <h3>Apartamento</h3>
          <p>Maecenas laoreet felis nec ante auctor imperdiet. Nulla fermentum purus nisi, id aliquet lectus mattis ac. Etiam ut tellus sit amet urna viverra lacinia. Quisque porta dictum tincidunt. Maecenas id ex justo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut nec commodo orci, consectetur mattis elit. Nullam eu blandit odio. Nulla metus lorem, eleifend a nunc id, fermentum ultrices ipsum. Ut iaculis finibus erat vitae tempus. </p>
          <h3>Comodidades</h3>
          <p>Maecenas laoreet felis nec ante auctor imperdiet. Nulla fermentum purus nisi, id aliquet lectus mattis ac. Etiam ut tellus sit amet urna viverra lacinia. Quisque porta dictum tincidunt. Maecenas id ex justo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut nec commodo orci, consectetur mattis elit. Nullam eu blandit odio. Nulla metus lorem, eleifend a nunc id, fermentum ultrices ipsum. Ut iaculis finibus erat vitae tempus. </p>
      </div>
    );
  }
}

export default DescripcionInmueble;