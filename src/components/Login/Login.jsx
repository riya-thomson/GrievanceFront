import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import './Login.css';
import logo from '../../assets/logoo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext.jsx';
import axios from 'axios';

const ADMIN_EMAIL = 'admin@gmail.com'; 
const ADMIN_PASSWORD = 'admin';

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({ Email: '', Password: '' });
  const { setIsAuthenticated, setUserId } = useAuth();

  useEffect(() => {
    return () => {
      setInput({ Email: '', Password: '' });
    };
  }, []);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if both fields are filled
    if (!input.Email || !input.Password) {
      alert('Please fill in both Email and Password.');
      return; // Exit function early if either field is empty
    }

    // Check if entered credentials match admin credentials
    if (input.Email === ADMIN_EMAIL && input.Password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setUserId(ADMIN_EMAIL); // Assuming you want to set the userId as the email
      navigate('/admin'); // Navigate to admin page
      return; // Exit function after navigating
    }

    try {
      const response = await axios.get('http://localhost:3005/view', { params: { Email: input.Email } });
      const userData = response.data;

      if (userData.Email === input.Email && userData.Password === input.Password) {
        console.log("Credentials matched");
        setIsAuthenticated(true);
        setUserId(userData.Email);
        navigate('/form'); // Redirect based on user role or other conditions
      } else {
        console.log("Credentials did not match");
        alert('Invalid username or password.'); // Show alert message
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert('An error occurred during login. Please try again later.'); // Show alert message for API call failures
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: 15,
        gap: 1,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div id = 'box6'></div>
      <div id = 'nav'>
        <div id = 'logo-img'>
          <img src={logo} alt="" />
        </div>
      </div>
      
      <div className="login-fields" style={{ maxWidth: 450, margin: 'auto' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', color:'black' }}>
          LOGIN
        </Typography>
        <Typography sx={{ textAlign: 'left' }} variant="body1">
          Email Address
        </Typography>
        <TextField label="Enter Email" variant="filled" name="Email" required value={input.Email} onChange={handleChange} fullWidth />
        <br />
        <br />
        <Typography sx={{ textAlign: 'left' }} variant="body1">
          Password
        </Typography>
        <TextField label="Enter Password" variant="filled" name="Password" required type="password" value={input.Password} onChange={handleChange} fullWidth />
        <br />
        <br />
        <Button variant="contained" onClick={handleSubmit} fullWidth
                sx={{
                  backgroundColor: '#e42313',
                  '&:hover': {
                    backgroundColor: '#9e2014',
                  },
                 borderRadius: '8px', // Rounded corners
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'transparent', // Remove default border
                    },
                    '&:hover fieldset': {
                      borderColor: 'transparent', // Remove hover border
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'transparent', // Remove focused border
                    },
                  },
                  }}> <Link to = {'/login'} style = {{color:'white', textDecoration:'none'}} >Login</Link>
        </Button>

        <br />
        <br />

        <Typography variant="h7" gutterBottom sx={{ fontWeight: 'bold' }}>
          Don't have an account?
        </Typography>
        <Link to="/signup">
          <Typography variant="body2" gutterBottom sx={{ fontWeight: 'bold', color: 'red', cursor: 'pointer' }}>
            Register Here.
          </Typography>
        </Link>
      </div>
    </Box>
  );
};

export default Login;
