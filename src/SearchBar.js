import React from 'react';
import { Form } from 'react-bootstrap';

const SearchBar = ({ setSearchTerm }) => {
  return (
    <Form>
      <Form.Group>
        <Form.Label>Search Recipes</Form.Label>
        <Form.Control
          type="text"
          placeholder="Search by name"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>
    </Form>
  );
};

export default SearchBar;
