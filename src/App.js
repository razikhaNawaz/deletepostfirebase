import React, { useContext } from 'react';

import './App.css';
import Authentication from './components/Authentication';
import ProfileForm from './components/Pages/ProfileForm';
import AuthContext from './components/Store/AuthContext';
import ProfileComplete from './components/Pages/ProfileComplete';
import { Route, Switch  } from 'react-router-dom';
const App = () => {
  const AuthCntx=useContext(AuthContext);
  const isAuthenticate=AuthCntx.isAuthenticate;
  
  return (
    <div>
      
      <Switch>
        <Route path="/" exact>
        {!isAuthenticate? <Authentication /> :<ProfileForm />}
        </Route>
        <Route path="/profileForm" exact>
        {!isAuthenticate? <Authentication /> :<ProfileComplete />}
        </Route>
     
      </Switch>
    </div>
  );
};

export default App;
