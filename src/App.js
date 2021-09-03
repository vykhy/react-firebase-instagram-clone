import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import * as ROUTES from './constants/routes'
import './styles/app.css' 
import useAuthListener from './hooks/use-auth-listener'
import UserContext from './context/user'
import ProtectedRoute from './helpers/protected-route';
import isLoggedIn from './helpers/is-logged-in';
//import ReactDOM from 'react-dom';

const Login = lazy(() => import ('./pages/login'))
const Signup = lazy(() => import ('./pages/signup'))
const NotFound = lazy(() => import ('./pages/not-found'))
const Profile = lazy(() => import ('./pages/profile'))
const Dashboard = lazy(() => import ('./pages/dashboard'))

function App() {

  const { user } = useAuthListener()

  return (
    <UserContext.Provider value = {{ user }}>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <isLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.LOGIN} exact>
              <Login/>
            </isLoggedIn>
            <isLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.SIGN_UP} exact>
              <Signup/>
            </isLoggedIn>
            <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
              <Dashboard />
            </ProtectedRoute>
            <Route path={ROUTES.PROFILE} exact component={Profile} />
            <Route component={ NotFound } />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
