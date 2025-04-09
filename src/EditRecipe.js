// src/EditRecipe.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const EditRecipe = () => {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await axios.get(`http://localhost:5000/recipes/${id}`);
      setRecipe(response.data);
    };
    fetchRecipe();
  }, [id]);

  const handleEditRecipe = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/recipes/${id}`, recipe);
    navigate('/'); // Redirect to home after editing recipe
  };

  if (!recipe) return <div>Loading...</div>;

  return (
    <Container>
      <Typography variant="h4">Edit Recipe</Typography>
      <form onSubmit={handleEditRecipe}>
        <TextField label="Recipe Name" fullWidth margin="normal" value={recipe.name} onChange={(e) => setRecipe({ ...recipe, name: e.target.value })} />
        <TextField label="Ingredients" fullWidth margin="normal" value={recipe.ingredients} onChange={(e) => setRecipe({ ...recipe, ingredients: e.target.value })} />
        <TextField label="Instructions" fullWidth margin="normal" value={recipe.instructions} onChange={(e) => setRecipe({ ...recipe, instructions: e.target.value })} />
        <TextField label="Category" fullWidth margin="normal" value={recipe.category} onChange={(e) => setRecipe({ ...recipe, category: e.target.value })} />
        <TextField label="Preparation Time" fullWidth margin="normal" value={recipe.prepTime} onChange={(e) => setRecipe({ ...recipe, prepTime: e.target.value })} />
        <TextField label="Cooking Time" fullWidth margin="normal" value={recipe.cookTime} onChange={(e) => setRecipe({ ...recipe, cookTime: e.target.value })} />
        <TextField label="Servings" fullWidth margin="normal" value={recipe.servings} onChange={(e) => setRecipe({ ...recipe, servings: e.target.value })} />
        <Button variant="contained" color="primary" type="submit">Save Changes</Button>
      </form>
    </Container>
  );
};

export default EditRecipe;

