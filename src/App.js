import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';

import {NavbarComponent} from './components/index';
import {Home, Success} from './pages/index';

const App = () => {
  return (
    <BrowserRouter>
      <NavbarComponent />
      <main>
        <Switch>
          <Route path="/" component={Home} exact></Route>
          <Route path="/success" component={Success}></Route>
        </Switch>
      </main>
    </BrowserRouter>
  )
}

export default App;