// AddRecipe.js
import React, { useState, useEffect } from 'react';
import { Container, TextField, TextareaAutosize, Button, Grid, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddRecipe = () => {
  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    category: '',
    prepTime: '',
    cookTime: '',
    servings: ''
  });

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({
      ...recipe,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...recipe,
        ingredients: recipe.ingredients.split(',')
      })
    });

    if (response.ok) {
      setMessage('Recipe added successfully!');
      setRecipe({
        name: '',
        ingredients: '',
        instructions: '',
        category: '',
        prepTime: '',
        cookTime: '',
        servings: ''
      });
    } else {
      setMessage('Failed to add recipe.');
    }
  };

  const handleShare = async () => {
    if (!selectedUser) {
      setMessage('Please select a user to share the recipe with.');
      return;
    }

    const response = await fetch(`http://localhost:3000/users/${selectedUser}/sharedRecipes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(recipe)
    });

    if (response.ok) {
      setMessage('Recipe shared successfully!');
    } else {
      setMessage('Failed to share recipe.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" className="mb-4 mt-4">Add New Recipe</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Recipe Name"
              name="name"
              value={recipe.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Ingredients (comma-separated)"
              name="ingredients"
              value={recipe.ingredients}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextareaAutosize
              name="instructions"
              value={recipe.instructions}
              onChange={handleChange}
              required
              minRows={4}
              placeholder="Instructions"
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Category"
              name="category"
              value={recipe.category}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Preparation Time"
              name="prepTime"
              value={recipe.prepTime}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Cooking Time"
              name="cookTime"
              value={recipe.cookTime}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Servings"
              name="servings"
              type="number"
              value={recipe.servings}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" className="me-2">
              Add Recipe
            </Button>
          </Grid>
        </Grid>
      </form>
      <Typography variant="h5" className="mt-4 mb-2">Share Recipe</Typography>
      <FormControl fullWidth>
        <InputLabel id="user-select-label">Select User</InputLabel>
        <Select
          labelId="user-select-label"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          {users.map(user => (
            <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="secondary" onClick={handleShare} className="mt-2">
        Share Recipe
      </Button>
      {message && <Typography variant="body1" className="mt-3">{message}</Typography>}
    </Container>
  );
};

export default AddRecipe;
