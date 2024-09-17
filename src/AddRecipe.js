import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
    servings: '',
    image: null,
  });

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [message, setMessage] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setMessage('Failed to load users.');
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      const file = files[0];
      setRecipe({
        ...recipe,
        image: file,
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      setRecipe({
        ...recipe,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', recipe.name);
    formData.append('ingredients', recipe.ingredients);
    formData.append('instructions', recipe.instructions);
    formData.append('category', recipe.category);
    formData.append('prepTime', recipe.prepTime);
    formData.append('cookTime', recipe.cookTime);
    formData.append('servings', recipe.servings);
    if (recipe.image) {
      formData.append('image', recipe.image);
    }

    try {
      const response = await axios.post('http://localhost:3001/recipes', formData);

      setMessage('Recipe added successfully!');
      setRecipe({
        name: '',
        ingredients: '',
        instructions: '',
        category: '',
        prepTime: '',
        cookTime: '',
        servings: '',
        image: null,
      });
      setImagePreview('');
    } catch (error) {
      console.error('Error adding recipe:', error);
      setMessage(`Failed to add recipe: ${error.message}`);
    }
  };

  const handleShare = async () => {
    if (!selectedUser) {
      setMessage('Please select a user to share the recipe with.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3001/users/${selectedUser}/sharedRecipes`, recipe, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setMessage('Recipe shared successfully!');
    } catch (error) {
      console.error('Error sharing recipe:', error);
      setMessage(`Failed to share recipe: ${error.message}`);
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
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleChange}
              style={{ marginBottom: '16px' }}
            />
            {imagePreview && (
              <div>
                <img src={imagePreview} alt="Recipe Preview" style={{ maxWidth: '100%', marginTop: '16px' }} />
                <Typography variant="body1">Image Preview</Typography>
              </div>
            )}
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
