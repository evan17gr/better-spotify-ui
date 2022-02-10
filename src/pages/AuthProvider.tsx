import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import apiInstance from '../axios';
import { BASE_URL, URL_REFRESH_TOKEN, URL_USER_AUTHENTICATE } from '../axios';

interface ContextProps {
  token: string;
  setAccessToken: (arg: string) => void;
  login: () => void;
  logout: () => void;
  isLoggedIn: boolean;
}

export const AuthContext = createContext<ContextProps>({
  token: '',
  setAccessToken: () => {},
  login: () => {},
  logout: () => {},
  isLoggedIn: false,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const setAccessToken = (token2: string) => {
    setToken(token2);
  };

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const value = {
    token,
    setAccessToken,
    login,
    isLoggedIn,
    logout,
  };

  useEffect(() => {
    console.log(token, 'TOKENNNNNNNNNNN');
  }, [token]);

  apiInstance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      const originalReq = error.config;

      if (
        error.response.status == 401 &&
        !originalReq._retry &&
        error.response.config.url != URL_USER_AUTHENTICATE
      ) {
        originalReq._retry = true;

        return axios
          .get(BASE_URL + URL_REFRESH_TOKEN, {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            withCredentials: true,
          })
          .then(async (res) => {
            // If the response is success , then log
            if (res.status == 200) {
              setAccessToken(res.data.access_token);
              console.log(res.data.access_token);
              console.log(originalReq);
              try {
                await axios({
                  method: originalReq.method,
                  url: originalReq.baseURL + originalReq.url,
                  headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + res.data.access_token,
                  },
                  data: originalReq.data,
                  withCredentials: true,
                });
              } catch (err) {
                console.log(err);
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }

      return Promise.reject(error);
    }
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
