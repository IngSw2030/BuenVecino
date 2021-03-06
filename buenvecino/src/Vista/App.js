import React,{Component} from "react";
import Landing from "./screens/landing";
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import PaginaTests from './screens/PaginaTest'
import Mapas from './screens/mapas'
import InfoInmueble from './screens/infoInmueble'
import GestionarInmueble from "./screens/GestionarInmueble";
import RegistrarInmueble from "./screens/RegistrarInmueble";
import RegistrarUser from "./screens/RegistrarUsuario";
import GestionarPerfil from "./screens/GestionarPerfil";
import MisFavoritos from "./screens/MisFavoritos";
import Chat from "./screens/Chat";
import HistorialPago from "./screens/HistorialPago";
import ModificarInmueble from "./screens/ModificarInmueble";
import Notificaciones from "./screens/Notificaciones";
import HistorialInmuebles from "./screens/HistorialInmuebles";


// import Header from './components/Header';
// import Main from './Main';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact>
              <Landing />
              {/* <Header />
              <Main /> */}
              {/* home */}
              {/* Header */}
              {/* banner */}
              {/* cards */}
              {/* footer */}
            </Route>
            <Route path="/busqueda" exact>
              <Mapas/>
            </Route>
            <Route path="/inmueble/:idInmueble" component={InfoInmueble} exact>
              
            </Route>
						<Route path="/gestionar" exact>
              <GestionarInmueble/>
            </Route>
            <Route path="/registrarInmueble" exact>
              <RegistrarInmueble/>
            </Route>
            <Route path="/registrarUsuario" exact>
              <RegistrarUser/>
            </Route>
            <Route path="/perfil" exact>
              <GestionarPerfil/>
            </Route>
            <Route path="/favoritos" exact>
              <MisFavoritos/>
            </Route>
            <Route path="/chats" exact>
              <Chat/>
            </Route>
            <Route path="/historialpagos" exact>
              <HistorialPago/>
            </Route>
            <Route path="/gestionarInmueble" exact>
              <GestionarInmueble/>
            </Route>
            <Route path="/modificarInmueble" exact>
              <ModificarInmueble/>
            </Route>
            <Route path="/historialPago" exact>
              <HistorialPago/>
            </Route>
            <Route path="/notificaciones" exact>
              <Notificaciones/>
            </Route>
            <Route path="/historialInmueble" exact>
              <HistorialInmuebles/>
            </Route>
            
            
						{/*Pagina para pruebas de cualquier cosa, en el archivo screens/PaginaTests.js*/}
						<Route path="/test" exact>
							<PaginaTests/>
						</Route>
          </Switch>
        </BrowserRouter>
      </div>
		);
	}

  componentDidMount(){
			
  }
}
export default App;
