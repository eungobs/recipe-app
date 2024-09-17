import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Registration = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [country, setCountry] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if the user already exists
      const response = await axios.get('http://localhost:3001/users');

      // Log the response for debugging
      console.log('Response:', response.data);

      // Check if the response is valid JSON
      const existingUsers = response.data;

      const userExists = existingUsers.some(user => user.username === username);

      if (userExists) {
        setError('User with this username already exists.');
        return; // Prevent further execution if user exists
      }

      // Register the new user
      const newUser = { username, password, name, surname, country };
      const registerResponse = await axios.post('http://localhost:3001/users', newUser);

      if (registerResponse.status !== 201) {
        throw new Error(`Failed to register user: ${registerResponse.statusText}`);
      }

      // Reset form fields and error message
      setName('');
      setSurname('');
      setCountry('');
      setUsername('');
      setPassword('');
      setError('');

      // Redirect to login page upon successful registration
      navigate('/login');
    } catch (err) {
      console.error('Error:', err);
      setError(`An error occurred: ${err.message}`);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
