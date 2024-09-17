import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Login.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(''); // Clear previous error messages

    try {
      // Fetch users from JSON server
      const response = await axios.get('http://localhost:3001/users');

      // Check if the response is valid
      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const users = response.data;

      // Check if the user exists and password matches
      const user = users.find(user => user.username === username && user.password === password);

      if (user) {
        setLoading(false);
        navigate('/add-recipe'); // Redirect to the add-recipe page on successful login
      } else {
        setLoading(false);
        setErrorMessage('Invalid username or password');
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage('Failed to login. Please try again.');
      console.error('Login Error:', error); // Log the error for debugging
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h1>Login</h1>
      {loading ? (
        <div className={styles.loaderContainer}>
          <div className={styles.loader}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
          </div>
          <p>Logging in...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={styles.loginInput}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.loginInput}
          />
          <button type="submit" className={styles.loginButton}>Login</button>
        </form>
      )}
    </div>
  );
};

export default Login;
