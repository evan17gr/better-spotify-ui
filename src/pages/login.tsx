import React, { useContext, useEffect } from 'react';
import { useAuth } from './AuthProvider';
// const { setAccessToken, login, token } = useAuth();

const Login = () => {
  // useEffect(() => {
  //   console.log(token, 'TOKENNNNNN');
  // }, []);

  return <a href="http://localhost:7777/user/login">Login</a>;
};

export default Login;
