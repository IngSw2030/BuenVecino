import React,{Component} from 'react';
import { Button } from "@material-ui/core";
import "../styles/Prefooter.css";


class Prefooter extends Component {
    render() {
      return (
        <div className="Prefooter">
            <h3>¿Posees un espacio o habitación que quieras rentar?</h3>
            <Button variant="outlined">Registra tu vivienda</Button>
        </div>
      );
    }
  }
  
export default Prefooter;