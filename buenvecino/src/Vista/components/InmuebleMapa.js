import React,{Component} from 'react';
import '../styles/InmuebleMapa.css';


class InmuebleMapa extends Component{
    render(){
        return (
            <div className="InmuebleMapa">
                <img src={require('../assets/Rectangle7.png')} alt=""/>
                <div>
                    <h3>{this.props.info.nombre}</h3>
                    <p>{this.props.info.descripcion}</p>
                    <h3>{this.props.info.precio}</h3>
                </div>
            </div>
        );
    }

    constructor(props){
        super()
    }
}

export default InmuebleMapa;