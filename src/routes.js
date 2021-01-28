import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Components
import Home from './Pages/Home';
import Login from './Pages/login';
import Auth from './Pages/Auth';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
