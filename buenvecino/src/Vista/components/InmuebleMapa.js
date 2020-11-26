import React,{Component} from 'react';
import '../styles/InmuebleMapa.css';
import img from '../assets/Rectangle7.png'


class InmuebleMapa extends Component{
    render(){
        return (
            <div className="InmuebleMapa">
                <img src={img} alt=""/>
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
    }
}

export default InmuebleMapa;