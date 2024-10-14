import React, { useState } from 'react'; // Importing React and the useState hook for managing component state.
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for programmatic navigation.
import './Login.css'; // Importing CSS styles specific to the Login component.

const Login = () => {
  // State variables to hold username, password, and loading status.
  const [username, setUsername] = useState(''); // State for username input.
  const [password, setPassword] = useState(''); // State for password input.
  const [loading, setLoading] = useState(false); // State to indicate loading status during authentication.
  
  const navigate = useNavigate(); // Initializing navigate function from react-router for navigation.

  // Function to handle form submission.
  const handleSubmit = (e) => {
    e.preventDefault(); // Preventing the default form submission behavior.
    setLoading(true); // Setting loading state to true to indicate the login process has started.

    // Simulating an authentication process with a timeout.
    setTimeout(() => {
      setLoading(false); // Resetting loading state after the timeout.
      navigate('/add-recipe'); // Navigating to the '/add-recipe' route upon successful login.
    }, 1000); // 1 second delay to simulate the loading process.
  };

  return (
    <div className="login-container"> {/* Main container for the login component */}
      <h1>Login</h1> {/* Heading for the login form */}
      
      {loading ? ( // Conditional rendering based on loading state.
        <div className="loader-container"> {/* Loader container shown during loading */}
          <div className="loader"> {/* Loader animation */}
            <div className="dot"></div> {/* Individual dot for loader */}
            <div className="dot"></div> {/* Individual dot for loader */}
            <div className="dot"></div> {/* Individual dot for loader */}
          </div>
          <p>Logging in...</p> {/* Loading message */}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="login-form"> {/* Form for user input */}
          <input
            type="text"
            placeholder="Username" // Placeholder for the username input field.
            value={username} // Binding the input value to username state.
            onChange={(e) => setUsername(e.target.value)} // Updating username state on input change.
            required // Making the username input a required field.
            className="login-input" // Adding CSS class for styling.
          />
          <input
            type="password"
            placeholder="Password" // Placeholder for the password input field.
            value={password} // Binding the input value to password state.
            onChange={(e) => setPassword(e.target.value)} // Updating password state on input change.
            required // Making the password input a required field.
            className="login-input" // Adding CSS class for styling.
          />
          <button type="submit" className="login-button">Login</button> {/* Submit button for the form */}
        </form>
      )}
    </div>
  );
};

export default Login; // Exporting the Login component for use in other parts of the application.




