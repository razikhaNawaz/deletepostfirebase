import React, { useContext } from 'react';

import './App.css';
import Authentication from './components/Authentication';
import ProfileForm from './components/Pages/ProfileForm';
import AuthContext from './components/Store/AuthContext';
import ProfileComplete from './components/Pages/ProfileComplete';
const App = () => {
  const AuthCntx=useContext(AuthContext);
  const isAuthenticate=AuthCntx.isAuthenticate;
  
  return (
    <div>
      {!isAuthenticate && <Authentication />}
      {isAuthenticate && <ProfileForm />}
      <ProfileComplete />
    </div>
  );
};

export default App;
