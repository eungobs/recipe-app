// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import Home from './Home';
import Registration from './Registration';
import Login from './Login';
import AddRecipe from './AddRecipe';
import About from './About';

function App() {
  // State to hold the list of recipes
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      name: 'Spaghetti Carbonara',
      details: 'A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.',
      ingredients: ['Spaghetti', 'Eggs', 'Cheese', 'Pancetta', 'Pepper'],
      instructions: '1. Cook spaghetti. 2. Fry pancetta. 3. Mix eggs and cheese. 4. Combine all ingredients.',
      category: 'Main Course',
      prepTime: '15 minutes',
      cookTime: '20 minutes',
      servings: 4,
    },
    {
      id: 2,
      name: 'Grilled Chicken Salad',
      details: 'A healthy salad with grilled chicken, fresh vegetables, and a light dressing.',
      ingredients: ['Chicken', 'Lettuce', 'Tomatoes', 'Cucumbers', 'Dressing'],
      instructions: '1. Grill chicken. 2. Chop vegetables. 3. Mix together with dressing.',
      category: 'Appetizer',
      prepTime: '10 minutes',
      cookTime: '15 minutes',
      servings: 2,
    },
    // Add more initial recipes here if needed...
  ]);

  // Function to add a new recipe to the list
  const addRecipe = (newRecipe) => {
    setRecipes([
      ...recipes,
      { ...newRecipe, id: recipes.length + 1 },
    ]);
  };

  return (
    <Router>
      {/* Navigation bar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Fast Track Recipe</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/add-recipe">Add Recipe</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/register">Register</Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Define routes */}
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Home recipes={recipes} />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-recipe" element={<AddRecipe onAddRecipe={addRecipe} />} />
          <Route path="/about" element={<About />} />
          {/* Add more routes for Update and Delete if needed */}
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
