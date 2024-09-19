import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [country, setCountry] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      // Retrieve existing users from localStorage
      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

      // Check if the username already exists
      const userExists = existingUsers.some(user => user.username === username);

      if (userExists) {
        setError('User with this username already exists.');
        return; // Prevent further execution if user exists
      }

      // Register the new user
      const newUser = { name, surname, country, username, password };

      // Add the new user to the list of users and save to localStorage
      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));

      // Clear form fields and navigate to the login page upon successful registration
      setName('');
      setSurname('');
      setCountry('');
      setUsername('');
      setPassword('');
      setError(''); // Clear error message
      navigate('/login'); // Redirect to login page
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred. Please try again.');
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
