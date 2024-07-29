import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import './scss/style.scss';
import { PrivateRoute, PublicRoute } from './services/AuthRoutes';
import { loadState, saveState } from './services/helper';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

function App() {

  const loginedUser = useSelector(state => state.loginedUser)
  const dispatch = useDispatch()
  useLayoutEffect(() => {
    let loginUserData = loadState("loginedUser")
    console.log(loginUserData)
    dispatch({ type: "LOGIN", loginedUser: loginUserData });
  }, [])

  // useEffect(() => {
  //   let x = setTimeout(() => {
  //     saveState("loginedUser", "")
  //     dispatch({ type: "LOGOUT", loginedUser: {} });
  //   }, 10000)

  //   return () => {
  //     clearTimeout(x)
  //   }
  // }, [loginedUser])

    return (
      <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
            {/* <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
            <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} /> */}
            {/* <Route exact path="/" name="Home" render={props => <Login {...props} />} /> */}
            {/* <Route path="/" name="Home" render={props => {
                if (user) { return <TheLayout {...props} /> }
                else { return <Login {...props} /> }
              }} /> */}
            {/* <PrivateRoute authed={user} path='/dashboard' component={TheLayout} /> */}
            {/* <Route exact path="/" render={() => (<Redirect to="/login" />)} component={Login} /> */}
            <PublicRoute loginedUser={loginedUser} path="/login" component={Login} />
            <PublicRoute loginedUser={loginedUser} path="/register" component={Register} />
            <PublicRoute loginedUser={loginedUser} path="/404" component={Page404} />
            <PublicRoute loginedUser={loginedUser} path="/500" component={Page500} />
            <PrivateRoute loginedUser={loginedUser} component={TheLayout} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
}

export default App;
