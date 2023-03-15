import React, { useContext } from 'react';

import './App.css';
import Authentication from './components/Authentication';
import ProfileForm from './components/Pages/ProfileForm';
// import AuthContext from './components/Store/AuthContext';
import ProfileComplete from './components/Pages/ProfileComplete';
import { Route, Switch  } from 'react-router-dom';
import ForgotPssword from './components/Pages/ForgotPssword';
import { useSelector } from 'react-redux';
import './App.css';

const App = () => {
  // const AuthCntx=useContext(AuthContext);
  // const isAuthenticate=AuthCntx.isAuthenticate;
  const isAuthenticate=useSelector((state)=>state.authReducer.isAuthenticate)
  const isMode=useSelector((state)=>state.themeReducer.isMode)
  
  return (
    <div className={isMode ? "app-container" : ''}>
      
      <Switch>
        <Route path="/" exact>
        {!isAuthenticate? <Authentication /> :<ProfileForm />}
        </Route>
        <Route path="/profileForm" exact>
        {!isAuthenticate? <Authentication /> :<ProfileComplete />}
        </Route>
        <Route path="/ForgotPassword" exact>
          <ForgotPssword />
        </Route>
     
      </Switch>
    </div>
  );
};

export default App;
