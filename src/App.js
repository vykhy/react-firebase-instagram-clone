import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import * as ROUTES from './constants/routes'
import './styles/app.css' 
import useAuthListener from './hooks/use-auth-listener'
import UserContext from './context/user'
//import ReactDOM from 'react-dom';

const Login = lazy(() => import ('./pages/login'))
const Signup = lazy(() => import ('./pages/signup'))
const NotFound = lazy(() => import ('./pages/not-found'))
const Dashboard = lazy(() => import ('./pages/dashboard'))

function App() {

  const { user } = useAuthListener()

  return (
    <UserContext.Provider value = {{ user }}>
      <Router>
        <Switch>
          <Suspense fallback={<p>Loading...</p>}>
            <Route path={ROUTES.LOGIN} component={ Login } exact/>
            <Route path={ROUTES.SIGN_UP} component={ Signup } exact />
            <Route path={ROUTES.DASHBOARD} component={ Dashboard } exact />
            <Route component={ NotFound } />
          </Suspense>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
