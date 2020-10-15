import React,{Component} from "react";
import Landing from "./screens/landing";
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import PaginaTests from './screens/PaginaTest'
import Mapas from './screens/mapas'

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
