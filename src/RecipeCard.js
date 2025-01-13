// Importing React and the useState hook from the React library
import React, { useState } from 'react';

// Importing Card, Button, Modal, and Form components from the react-bootstrap library
import { Card, Button, Modal, Form } from 'react-bootstrap';

// Defining a functional component called RecipeCard that takes props: recipe, deleteRecipe, and updateRecipe
const RecipeCard = ({ recipe, deleteRecipe, updateRecipe }) => {
  // Using the useState hook to manage the visibility of the edit modal
  const [show, setShow] = useState(false);

  // Using the useState hook to manage the name and description of the recipe
  const [name, setName] = useState(recipe.name);
  const [description, setDescription] = useState(recipe.description);

  // Function to close the edit modal
  const handleClose = () => setShow(false);

  // Function to open the edit modal
  const handleShow = () => setShow(true);

  // Function to handle the form submission when updating a recipe
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    updateRecipe({ ...recipe, name, description }); // Calls the updateRecipe function with the updated recipe data
    handleClose(); // Closes the modal after submission
  };

  return (
    // Using the Card component from react-bootstrap to display the recipe details
    <Card>
      {/* Card.Img is used to display the recipe image */}
      <Card.Img variant="top" src={recipe.image} />

      {/* Card.Body contains the main content of the card */}
      <Card.Body>
        {/* Card.Title displays the name of the recipe */}
        <Card.Title>{recipe.name}</Card.Title>

        {/* Card.Text displays the description of the recipe */}
        <Card.Text>{recipe.description}</Card.Text>

        {/* Button to delete the recipe. Calls the deleteRecipe function with the recipe id */}
        <Button variant="danger" onClick={() => deleteRecipe(recipe.id)}>Delete</Button>

        {/* Button to open the edit modal */}
        <Button variant="primary" onClick={handleShow} className="ml-2">Edit</Button>
      </Card.Body>

      {/* Modal component for editing the recipe */}
      <Modal show={show} onHide={handleClose}>
        {/* Modal.Header contains the title and a close button */}
        <Modal.Header closeButton>
          <Modal.Title>Edit Recipe</Modal.Title>
        </Modal.Header>

        {/* Modal.Body contains the form for editing the recipe */}
        <Modal.Body>
          {/* Form component to handle the recipe update */}
          <Form onSubmit={handleSubmit}>
            {/* Form.Group for the recipe name input */}
            <Form.Group>
              <Form.Label>Recipe Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)} // Updates the name state when the input changes
                required // Makes the input field required
              />
            </Form.Group>

            {/* Form.Group for the recipe description input */}
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea" // Renders the input as a textarea
                rows={3} // Sets the number of rows for the textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)} // Updates the description state when the input changes
                required // Makes the input field required
              />
            </Form.Group>

            {/* Button to submit the form and update the recipe */}
            <Button variant="primary" type="submit">
              Update Recipe
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Card>
  );
};

// Exporting the RecipeCard component as the default export of this module
export default RecipeCard;