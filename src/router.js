import React, { Component } from 'react';
import { Route, Switch, routerRedux, withRouter, Redirect } from 'dva/router';
import PropTypes from 'prop-types';
import _ from 'lodash';
import IndexPage from './routes/IndexPage';
const { ConnectedRouter } = routerRedux;

const routeComponent = [
  { key: 'root', path: '/index', exact: true, component: IndexPage },
];
const redirectComponent = [ //轉址
  { key: 'root', exact: true, to: '/index', From: '/' },
];

class Root extends Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    children: PropTypes.any
  };

  render() {
    const { children } = this.props;
    return children;
  }
}

const RouterRoot = withRouter(_.flow()(Root));

const renderRoutes = (r) => {
  const { key, exact, path, component: Component } = r;
  return (
    <Route
      key={`route-${key}`}
      exact={exact}
      path={path}
      render={(props) => <Component {...props} />}
    />
  );
}
const renderRedirects = (r) => {
  const { key, exact, to, From } = r;
  return (
    <Redirect
      key={`redirect-${key}`}
      exact={exact}
      from={From}
      to={to}
    />
  );
}

const router = props => {
  return (
    <ConnectedRouter {...props}>
      <RouterRoot {...props}>
        <Switch>
          {/* <AppSwitch> */}
          {
            routeComponent.map(value => renderRoutes(value))
          }
          {
            redirectComponent.map(value => renderRedirects(value))
          }
          {/* </AppSwitch> */}
        </Switch>
      </RouterRoot>
    </ConnectedRouter>
  );
};

export default router;
