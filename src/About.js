import React from 'react'; // Importing React to define the component.
import { Container, Typography, Box, Button } from '@mui/material'; // Importing Material-UI components for layout and styling.
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for programmatic navigation.

const About = () => {
  const navigate = useNavigate(); // Initializing the navigate function from react-router for navigation.

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}> {/* Container for responsive layout */}
      <Typography variant="h4" align="center" gutterBottom> {/* Main heading for the About section */}
        About Smart Recipe
      </Typography>
      <Box sx={{ mb: 4 }}> {/* Box to group content with a bottom margin */}
        <Typography variant="h6" paragraph> {/* Subheading with paragraph styling */}
          Welcome to Smart Recipe! Our mission is to help busy professionals, chefs, busy mothers, and anyone who loves to cook and bake by providing a platform where you can find, share, and enjoy a wide variety of recipes.
        </Typography>
        <Typography variant="body1" paragraph> {/* Body text with paragraph styling */}
          Our website offers a diverse collection of recipes that are updated weekly. Users can not only browse and use recipes from others but also add their own recipes and make edits as needed. Whether you're looking for a quick meal, a gourmet dish, or a delicious dessert, Smart Recipe is here to inspire and assist you in your culinary adventures.
        </Typography>
        <Typography variant="body1" paragraph> {/* Additional body text for contact information */}
          If you have any questions or suggestions, feel free to contact us at: <strong>smartrecipes@gmail.com</strong>.
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center"> {/* Box to center the button */}
        <Button variant="contained" color="primary" onClick={() => navigate('/')}> {/* Button to navigate back to home */}
          Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default About; // Exporting the About component for use in other parts of the application.

