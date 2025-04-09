// src/Home.js
import React, { useState, useEffect } from 'react';
import { Button, Typography, Container, Box, List, ListItem, Dialog, DialogTitle, DialogContent, DialogActions, Card, CardContent, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import './Home.css';

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const navigate = useNavigate();

  const images = [
    "https://img.freepik.com/free-photo/penne-pasta-tomato-sauce-with-chicken-tomatoes-wooden-table_2829-19744.jpg",
    "https://img.freepik.com/free-photo/fresh-grill-bbq-chicken_144627-7526.jpg",
    "https://img.freepik.com/free-photo/top-view-vegetable-soup-with-meat-inside-plate-grey_140725-36040.jpg",
    "https://img.freepik.com/free-photo/pre-prepared-food-showcasing-ready-eat-delicious-meals-go_23-2151246068.jpg?t=st=1723380390~exp=1723383990~hmac=799a00085a3f5b27b4789ef10a672a40ee5a2f7b9a158effb8bb99eeffc4bb0e&w=996",
    "https://img.freepik.com/free-photo/preparation-baking-kitchen-ingredients-cooking_114579-491.jpg?t=st=1723380462~exp=1723384062~hmac=b2a44a6b0dfd0ac241a4cd814938b385c15d1dbff135e642f2fd40d191bfa242&w=360"
  ];

  const recipes = [
    {
      name: 'Spaghetti Carbonara',
      details: 'A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.',
      category: 'Main Course',
      prepTime: '15 minutes',
      cookTime: '20 minutes',
      servings: '4',
      image: images[0]
    },
    {
      name: 'Grilled Chicken Salad',
      details: 'A healthy salad with grilled chicken, fresh vegetables, and a light dressing.',
      category: 'Appetizer',
      prepTime: '10 minutes',
      cookTime: '15 minutes',
      servings: '4',
      image: images[1]
    },
    {
      name: 'Vegetable Stir Fry',
      details: 'A colorful mix of vegetables stir-fried with soy sauce and garlic.',
      category: 'Main Course',
      prepTime: '10 minutes',
      cookTime: '10 minutes',
      servings: '4',
      image: images[2]
    },
    {
      name: 'Chocolate Cake',
      details: 'A rich and moist chocolate cake perfect for any occasion.',
      category: 'Dessert',
      prepTime: '20 minutes',
      cookTime: '30 minutes',
      servings: '8',
      image: images[3]
    },
    {
      name: 'Caesar Salad',
      details: 'A fresh salad with romaine lettuce, croutons, and Caesar dressing.',
      category: 'Appetizer',
      prepTime: '10 minutes',
      cookTime: '0 minutes',
      servings: '2',
      image: images[4]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleClose = () => {
    setSelectedRecipe(null);
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to Smart Recipe!
      </Typography>

      <Box>
        <Typography variant="h5" align="center">
          Featured Recipes
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center">
          <List style={{ width: '100%', maxWidth: 600 }}>
            {recipes.map((recipe, index) => (
              <ListItem button key={index} onClick={() => handleRecipeClick(recipe)}>
                <Card style={{ display: 'flex', margin: '10px 0' }}>
                  <CardMedia
                    component="img"
                    style={{ width: '100px', height: '100px' }}
                    image={recipe.image}
                    alt={recipe.name}
                  />
                  <CardContent>
                    <Typography variant="h6">{recipe.name}</Typography>
                    <Typography variant="body2">{recipe.details}</Typography>
                  </CardContent>
                </Card>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>

      <Box>
        <img src={images[currentImage]} alt="Recipe" style={{ width: '70%', maxHeight: '300px', margin: '20px auto', display: 'block', transition: 'opacity 1s ease-in-out' }} />
      </Box>

      <Box display="flex" justifyContent="center" mt={2}>
        <Button variant="outlined" onClick={() => navigate('/register')} style={{ marginRight: '10px' }}>
          Register
        </Button>
        <Button variant="outlined" onClick={() => navigate('/login')}>
          Login
        </Button>
      </Box>

      {/* Recipe Details Dialog */}
      <Dialog open={!!selectedRecipe} onClose={handleClose}>
        <DialogTitle>{selectedRecipe?.name}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            {selectedRecipe?.details}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Social Media Icons */}
      <Box display="flex" justifyContent="center" mt={2}>
        <Button color="inherit" href="https://facebook.com">
          <FacebookIcon />
        </Button>
        <Button color="inherit" href="https://twitter.com">
          <TwitterIcon />
        </Button>
        <Button color="inherit" href="https://instagram.com">
          <InstagramIcon />
        </Button>
        <Button color="inherit" href="https://linkedin.com">
          <LinkedInIcon />
        </Button>
      </Box>
    </Container>
  );
};

export default Home;




