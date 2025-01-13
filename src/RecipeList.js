// Importing the React library to use React components
import React from 'react';

// Importing the RecipeCard component from the './RecipeCard' file
import RecipeCard from './RecipeCard';

// Importing the Row and Col components from the react-bootstrap library for layout purposes
import { Row, Col } from 'react-bootstrap';

// Defining a functional component called RecipeList that takes props: recipes, deleteRecipe, and updateRecipe
const RecipeList = ({ recipes, deleteRecipe, updateRecipe }) => {
  return (
    // Using the Row component from react-bootstrap to create a row layout
    <Row>
      {/* Mapping through the `recipes` array to render each recipe */}
      {recipes.map(recipe => (
        // Using the Col component from react-bootstrap to create a column layout
        // The `key` prop is set to the recipe's id to uniquely identify each element in the list
        // The `sm`, `md`, and `lg` props define the column width for different screen sizes
        // The `className="mb-4"` adds a margin-bottom of 4 units to each column
        <Col key={recipe.id} sm={12} md={6} lg={4} className="mb-4">
          {/* Rendering the RecipeCard component for each recipe */}
          {/* Passing the recipe data, deleteRecipe function, and updateRecipe function as props */}
          <RecipeCard
            recipe={recipe}
            deleteRecipe={deleteRecipe}
            updateRecipe={updateRecipe}
          />
        </Col>
      ))}
    </Row>
  );
};

// Exporting the RecipeList component as the default export of this module
export default RecipeList;
