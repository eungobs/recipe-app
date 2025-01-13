// Importing React for creating the component
import React from 'react';

// Importing Link and useNavigate from react-router-dom for navigation
import { Link, useNavigate } from 'react-router-dom';

// Importing isAuthenticated and logout functions from the auth module
import { isAuthenticated, logout } from './auth';

// Defining the Header functional component
const Header = () => {
  // useNavigate hook to programmatically navigate to different routes
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    logout(); // Calls the logout function to clear authentication
    navigate('/login'); // Navigates to the login page after logout
  };

  return (
    // Header element to wrap the navigation
    <header>
      {/* Navigation element to contain the links */}
      <nav>
        {/* Link to the home page */}
        <Link to="/">Home</Link>

        {/* Conditional rendering based on authentication status */}
        {isAuthenticated() ? (
          // If the user is authenticated, show these links and button
          <>
            {/* Link to the add-recipe page */}
            <Link to="/add-recipe">Add Recipe</Link>

            {/* Button to log out the user */}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          // If the user is not authenticated, show these links
          <>
            {/* Link to the login page */}
            <Link to="/login">Login</Link>

            {/* Link to the register page */}
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

// Exporting the Header component as the default export
export default Header;