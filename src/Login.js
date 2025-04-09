import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State to hold error messages
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/users?username=${username}&password=${password}`);
      if (response.data.length > 0) {
        navigate('/'); // Redirect to home if login is successful
      } else {
        setError('Invalid credentials'); // Set error for wrong credentials
      }
    } catch (error) {
      // Handle various error cases
      if (error.response) {
        // Server responded with a status code outside the 2xx range
        setError(`Error: ${error.response.status} - ${error.response.data}`);
      } else if (error.request) {
        // Request made but no response received
        setError('No response received from the server.');
      } else {
        // General error during setup
        setError('Error: ' + error.message);
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4">Login</Typography>
      <form onSubmit={handleLogin}>
        <TextField 
          label="Username" 
          fullWidth 
          margin="normal" 
          onChange={(e) => setUsername(e.target.value)} 
          value={username} // Controlled input
        />
        <TextField 
          label="Password" 
          type="password" 
          fullWidth 
          margin="normal" 
          onChange={(e) => setPassword(e.target.value)} 
          value={password} // Controlled input
        />
        {error && <Typography color="error">{error}</Typography>} {/* Display error message */}
        <Button variant="contained" color="primary" type="submit">Login</Button>
      </form>
    </Container>
  );
};

export default Login;

