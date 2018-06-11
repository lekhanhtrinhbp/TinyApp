import React from 'react';
import {
  Router,
  Route,
  browserHistory,
  IndexRedirect,
  IndexRoute,
} from 'react-router';

import Home from 'App/Home';
import About from 'App/About';
import Login from 'App/Login';
import CreateEvent from 'App/CreateEvent';
import Events from 'App/Events';
import Event from 'App/Event';
import Register from 'App/Register';
import Admin from 'App/Admin';
import Management from 'App/Management';
import App from './App';

const requireAuth = (nextState, replace) => {
  const appUser = JSON.parse(sessionStorage.getItem('appUser'));
  if (!appUser) {
    replace({
      path: '/',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

const requireLogin = (nextState, replace) => {
  const appUser = JSON.parse(sessionStorage.getItem('appUser'));
  if (!appUser) {
    replace({
      pathname: 'login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

const Routes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="register" component={Register} />
      <Route path="about" component={About} />
      <Route path="login" component={Login} />
      <Route path="events" component={Events} />
      <Route path="event/:id" component={Event} isDetail />
      <Route onEnter={requireAuth}>
        <Route path="management" component={Management} />
        <Route path="event/:id/edit" component={CreateEvent} isEdit />
        <Route path="preview" component={Event} isPreview />
        <Route path="admin" component={Admin} />
      </Route>
      <Route path="create" component={CreateEvent} onEnter={requireLogin} />
    </Route>
    <Route path="*">
      <IndexRedirect to="/" />
    </Route>
  </Router>
);

export default Routes;
