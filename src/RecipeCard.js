import React, { useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';

const RecipeCard = ({ recipe, deleteRecipe, updateRecipe }) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState(recipe.name);
  const [description, setDescription] = useState(recipe.description);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateRecipe({ ...recipe, name, description });
    handleClose();
  };

  return (
    <Card>
      <Card.Img variant="top" src={recipe.image} />
      <Card.Body>
        <Card.Title>{recipe.name}</Card.Title>
        <Card.Text>{recipe.description}</Card.Text>
        <Button variant="danger" onClick={() => deleteRecipe(recipe.id)}>Delete</Button>
        <Button variant="primary" onClick={handleShow} className="ml-2">Edit</Button>
      </Card.Body>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Recipe Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update Recipe
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Card>
  );
};

export default RecipeCard;
