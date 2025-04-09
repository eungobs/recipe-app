// src/AddRecipe.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddRecipe = () => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [servings, setServings] = useState('');
  const navigate = useNavigate();

  const handleAddRecipe = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/recipes', {
      name,
      ingredients,
      instructions,
      category,
      prepTime,
      cookTime,
      servings,
    });
    navigate('/'); // Redirect to home after adding recipe
  };

  return (
    <Container>
      <Typography variant="h4">Add Recipe</Typography>
      <form onSubmit={handleAddRecipe}>
        <TextField label="Recipe Name" fullWidth margin="normal" onChange={(e) => setName(e.target.value)} />
        <TextField label="Ingredients" fullWidth margin="normal" onChange={(e) => setIngredients(e.target.value)} />
        <TextField label="Instructions" fullWidth margin="normal" onChange={(e) => setInstructions(e.target.value)} />
        <TextField label="Category" fullWidth margin="normal" onChange={(e) => setCategory(e.target.value)} />
        <TextField label="Preparation Time" fullWidth margin="normal" onChange={(e) => setPrepTime(e.target.value)} />
        <TextField label="Cooking Time" fullWidth margin="normal" onChange={(e) => setCookTime(e.target.value)} />
        <TextField label="Servings" fullWidth margin="normal" onChange={(e) => setServings(e.target.value)} />
        <Button variant="contained" color="primary" type="submit">Add Recipe</Button>
      </form>
    </Container>
  );
};

export default AddRecipe;

