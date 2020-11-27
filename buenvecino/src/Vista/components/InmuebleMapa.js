import React,{Component} from 'react';
import '../styles/InmuebleMapa.css';
import img from '../assets/Rectangle7.png'
import ManejadorSg from '../../Modelo/Firebase/ManjadorSg';


class InmuebleMapa extends Component{
    render(){
        return (
            <div className="InmuebleMapa">
                <img src={this.state.imagen} alt=""/>
                <div>
                    <h3 className="Titulo">{this.props.info.nombre}</h3>
                    <p>{this.props.info.descripcion}</p>
                    <h3>$ COP {this.props.info.precio}</h3>
                </div>
            </div>
        );
    }

     constructor(props){
        super()
        console.log(props.info)
        this.state = {
             imagen:{img}
          }
        
    }
    async componentDidMount(){
        let imagenes = await ManejadorSg.obtenerFotosInmueble(this.props.info.idFirebase)
        if(imagenes.length !== 0){
            console.log("entro funcion")
            await this.setState({imagen:imagenes[0]})
        }
        
    }
}

export default InmuebleMapa;