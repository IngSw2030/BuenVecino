import React,{Component} from "react";
import Landing from "./screens/landing";
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import PaginaTests from './screens/PaginaTest'
import Mapas from './screens/mapas'
import InfoInmueble from './screens/infoInmueble'
import GestionarInmueble from "./screens/GestionarInmueble";
import RegistrarInmueble from "./screens/RegistrarInmueble";
import RegistrarUsuario from "./components/RegistrarUsuario";
import GestionarPerfil from "./screens/GestionarPerfil";
import MisFavoritos from "./screens/MisFavoritos";
import Chat from "./screens/Chat";
import HistorialPago from "./screens/HistorialPago";


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
            <Route path="/inmueble" exact>
              <InfoInmueble/>
            </Route>
						<Route path="/gestionar" exact>
              <GestionarInmueble/>
            </Route>
            <Route path="/registrarInmueble" exact>
              <RegistrarInmueble/>
            </Route>
            <Route path="/registrarUsuario" exact>
              <RegistrarUsuario/>
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
