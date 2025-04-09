import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography } from '@mui/material';

const Register = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError(""); // Reset error

    try {
      // Send POST request to register user
      await axios.post('http://localhost:5000/users', { name, surname, email, password });
      alert("Registration Successful!");
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <Container>
      <Typography variant="h4">Register</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleRegister}>
        <TextField 
          label="Name" 
          fullWidth 
          margin="normal" 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <TextField 
          label="Surname" 
          fullWidth 
          margin="normal" 
          onChange={(e) => setSurname(e.target.value)} 
          required 
        />
        <TextField 
          label="Email Address" 
          type="email" 
          fullWidth 
          margin="normal" 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <TextField 
          label="Password" 
          type="password" 
          fullWidth 
          margin="normal" 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <TextField 
          label="Confirm Password" 
          type="password" 
          fullWidth 
          margin="normal" 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          required 
        />
        <Button variant="contained" color="primary" type="submit">Register</Button>
      </form>
    </Container>
  );
};

export default Register;

