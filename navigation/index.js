
import React from 'react';
import AuthContextProvider from '../context/AuthContext/AuthContextProvider';
import Routes from './Routes';

const Navigation = () => {

  return (
    <AuthContextProvider>   
        <Routes />
    </AuthContextProvider>
  );
}

export default Navigation;