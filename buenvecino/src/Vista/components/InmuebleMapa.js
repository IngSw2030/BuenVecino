import React,{Component} from 'react';
import '../styles/InmuebleMapa.css';


class InmuebleMapa extends Component{
render(){
	return (
        <div className="InmuebleMapa">
            <img src={require('../assets/Rectangle7.png')} alt=""/>
            <div>
                <h3>Nombre</h3>
                <p>Descripcion</p>
                <h3>precio</h3>
            </div>
            

        </div>
	);
}
}

export default InmuebleMapa;