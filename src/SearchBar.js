// Importing the React library to use React components
import React from 'react';

// Importing the Form component from the react-bootstrap library to create a form
import { Form } from 'react-bootstrap';

// Defining a functional component called SearchBar that takes a prop `setSearchTerm`
const SearchBar = ({ setSearchTerm }) => {
  return (
    // Using the Form component from react-bootstrap to create a form
    <Form>
      {/* Form.Group is used to group form elements together */}
      <Form.Group>
        {/* Form.Label is used to create a label for the input field */}
        <Form.Label>Search Recipes</Form.Label>
        
        {/* Form.Control is used to create an input field */}
        <Form.Control
          type="text" // Specifies that the input type is text
          placeholder="Search by name" // Placeholder text inside the input field
          onChange={(e) => setSearchTerm(e.target.value)} // Event handler that updates the search term when the input value changes
        />
      </Form.Group>
    </Form>
  );
};

// Exporting the SearchBar component as the default export of this module
export default SearchBar;
