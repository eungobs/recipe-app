import React from 'react';
import RecipeCard from './RecipeCard';
import { Row, Col } from 'react-bootstrap';

const RecipeList = ({ recipes, deleteRecipe, updateRecipe }) => {
  return (
    <Row>
      {recipes.map(recipe => (
        <Col key={recipe.id} sm={12} md={6} lg={4} className="mb-4">
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

export default RecipeList;
