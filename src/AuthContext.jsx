import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const navigate = useNavigate();

  let storedUserId = '';

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    storedUserId = localStorage.getItem('sUserId'); // Assign the value to storedUserId
    
    if (storedLoginStatus === 'true') {
      setIsAuthenticated(true);
      setUserId(storedUserId);
      console.log("logged in auth context");
      console.log("USERNAME = " + storedUserId);
    }
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3005/view', { params: { email: userId } })
      .then((response) => {
        const email = response.data.Email;

        if (email === storedUserId) {
          console.log("email matched");
          setIsAuthenticated(true);
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('sUserId', response.data.Email);

          setUserId(email);
          navigate('/');
        } else {
          console.log("email not matched");
        }
      })
      .catch((error) => {
        console.log("error" + error);
      })
      .finally(() => {
        setSubmitted(false);
      });
  }, [submitted]);

  const login = (email, password) => {
    setUserId(email);
    setSubmitted(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserId('');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ authenticated, setIsAuthenticated, userId, setUserId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
