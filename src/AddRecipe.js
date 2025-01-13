// Import necessary React hooks and CSS
import React, { useState, useEffect, useRef } from 'react';
import './recipe.css';

function AddRecipe() {
  // State Declarations
  // Initialize recipes from localStorage or empty array
  const [recipes, setRecipes] = useState(() => {
    const storedRecipes = localStorage.getItem('recipes');
    return storedRecipes ? JSON.parse(storedRecipes) : [];
  });

  // State variables for managing component's UI and functionality
  const [open, setOpen] = useState(false); // Controls recipe form modal visibility
  const [editMode, setEditMode] = useState(false); // Toggles between add and edit mode
  const [currentIndex, setCurrentIndex] = useState(null); // Tracks the index of recipe being edited
  const [searchQuery, setSearchQuery] = useState(''); // Stores search input
  const [darkMode, setDarkMode] = useState(false); // Manages dark/light mode
  const [zoomImage, setZoomImage] = useState(null); // Stores image for zooming
  
  // State for new recipe form with initial empty values
  const [newRecipe, setNewRecipe] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    category: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    image: ''
  });

  // Refs for form input elements
  // Allows direct access and manipulation of DOM elements
  const recipeNameRef = useRef(null);
  const ingredientsRef = useRef(null);
  const instructionsRef = useRef(null);
  const categoryRef = useRef(null);
  const prepTimeRef = useRef(null);
  const cookTimeRef = useRef(null);
  const servingsRef = useRef(null);
  const imageRef = useRef(null);

  // Predefined recipe categories
  const categories = [
    'Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert',
    'Beverage', 'Salad', 'Soup', 'Appetizer'
  ];

  // Effect to save recipes to localStorage whenever recipes state changes
  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  // Handler for input changes in the recipe form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe(prevRecipe => ({
      ...prevRecipe,
      [name]: value
    }));
  };

  // Converts image file to base64 string for storage
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handles adding or updating a recipe
  const handleAddRecipe = async (e) => {
    e.preventDefault();
    const imageFile = imageRef.current.files[0];

    try {
      // Convert image to base64 or use existing image
      const base64Image = imageFile ? await getBase64(imageFile) : newRecipe.image;
      const recipeWithImage = {
        ...newRecipe,
        image: base64Image
      };

      // Update existing recipe or add new recipe
      if (editMode && currentIndex !== null) {
        const updatedRecipes = [...recipes];
        updatedRecipes[currentIndex] = recipeWithImage;
        setRecipes(updatedRecipes);
      } else {
        setRecipes([...recipes, recipeWithImage]);
      }

      // Reset form after adding/updating
      resetForm();
    } catch (error) {
      console.error('Error adding/updating recipe:', error);
    }
  };

  // Resets the form to its initial state
  const resetForm = () => {
    // Reset state variables
    setOpen(false);
    setEditMode(false);
    setCurrentIndex(null);
    setNewRecipe({
      name: '',
      ingredients: '',
      instructions: '',
      category: '',
      prepTime: '',
      cookTime: '',
      servings: '',
      image: ''
    });

    // Reset refs
    if (recipeNameRef.current) recipeNameRef.current.value = '';
    if (ingredientsRef.current) ingredientsRef.current.value = '';
    if (instructionsRef.current) instructionsRef.current.value = '';
    if (categoryRef.current) categoryRef.current.value = '';
    if (prepTimeRef.current) prepTimeRef.current.value = '';
    if (cookTimeRef.current) cookTimeRef.current.value = '';
    if (servingsRef.current) servingsRef.current.value = '';
    if (imageRef.current) imageRef.current.value = '';
  };

  // Deletes a recipe from the list
  const handleDeleteRecipe = (index) => {
    const updatedRecipes = recipes.filter((_, i) => i !== index);
    setRecipes(updatedRecipes);
  };

  // Prepares a recipe for editing
  const handleEditRecipe = (index) => {
    const recipe = recipes[index];
    setNewRecipe(recipe);
    setCurrentIndex(index);
    setEditMode(true);
    setOpen(true);

    // Update refs
    if (recipeNameRef.current) recipeNameRef.current.value = recipe.name;
    if (ingredientsRef.current) ingredientsRef.current.value = recipe.ingredients;
    if (instructionsRef.current) instructionsRef.current.value = recipe.instructions;
    if (categoryRef.current) categoryRef.current.value = recipe.category;
    if (prepTimeRef.current) prepTimeRef.current.value = recipe.prepTime;
    if (cookTimeRef.current) cookTimeRef.current.value = recipe.cookTime;
    if (servingsRef.current) servingsRef.current.value = recipe.servings;
  };

  // Filters recipes based on search query
  const searchRecipes = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  // Filter recipes based on search input
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchQuery) ||
    recipe.ingredients.toLowerCase().includes(searchQuery) ||
    recipe.instructions.toLowerCase().includes(searchQuery)
  );

  // Main render method
  return (
    <div className="App" style={{
      backgroundColor: darkMode ? '#333' : '#fff',
      color: darkMode ? '#fff' : '#000',
      minHeight: '100vh'
    }}>
      <div style={{ padding: '20px' }}>
        {/* Search and New Recipe Section */}
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search recipes..."
            onChange={(e) => searchRecipes(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '10px'
            }}
          />
          <button
            onClick={() => {
              resetForm();
              setOpen(true);
            }}
            style={{
              width: '100%',
              padding: '10px',
              background: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            New Recipe
          </button>
        </div>

        {/* Recipe Form Modal */}
        {open && (
          <div className="modal-container">
            <h2>{editMode ? 'Edit Recipe' : 'New Recipe'}</h2>
            <form onSubmit={handleAddRecipe}>
              <div style={{ marginBottom: '10px' }}>
                <input
                  type="text"
                  name="name"
                  placeholder="Recipe Name"
                  ref={recipeNameRef}
                  className="input-field"
                  onChange={handleInputChange}
                  value={newRecipe.name}
                  required
                />
                <textarea
                  name="ingredients"
                  placeholder="Ingredients"
                  ref={ingredientsRef}
                  className="input-field"
                  onChange={handleInputChange}
                  value={newRecipe.ingredients}
                  required
                />
                <textarea
                  name="instructions"
                  placeholder="Instructions"
                  ref={instructionsRef}
                  className="input-field"
                  onChange={handleInputChange}
                  value={newRecipe.instructions}
                  required
                />
                <select
                  name="category"
                  ref={categoryRef}
                  className="input-field category-select"
                  onChange={handleInputChange}
                  value={newRecipe.category}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  name="prepTime"
                  placeholder="Preparation Time"
                  ref={prepTimeRef}
                  className="input-field"
                  onChange={handleInputChange}
                  value={newRecipe.prepTime}
                  required
                />
                <input
                  type="text"
                  name="cookTime"
                  placeholder="Cooking Time"
                  ref={cookTimeRef}
                  className="input-field"
                  onChange={handleInputChange}
                  value={newRecipe.cookTime}
                  required
                />
                <input
                  type="number"
                  name="servings"
                  placeholder="Servings"
                  ref={servingsRef}
                  className="input-field"
                  onChange={handleInputChange}
                  value={newRecipe.servings}
                  required
                />
                <input
                  type="file"
                  name="image"
                  ref={imageRef}
                  accept="image/*"
                  style={{ marginBottom: '10px' }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="cancel-button"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="create-button"
                >
                  {editMode ? 'Update Recipe' : 'Create Recipe'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Header with Dark Mode Toggle */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '20px'
        }}>
          <h1>Recipes</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              padding: '10px',
              background: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>

        {/* Recipe List */}
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '4px'
              }}
            >
              <h2>{recipe.name}</h2>
              <p><strong>Category:</strong> {recipe.category}</p>
              <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
              <p><strong>Instructions:</strong> {recipe.instructions}</p>
              <p><strong>Preparation Time:</strong> {recipe.prepTime}</p>
              <p><strong>Cooking Time:</strong> {recipe.cookTime}</p>
              <p><strong>Servings:</strong> {recipe.servings}</p>

              {recipe.image && (
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                    cursor: 'pointer'
                  }}
                  onClick={() => setZoomImage(recipe.image)}
                />
              )}

              <div style={{
                marginTop: '10px',
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <button
                  onClick={() => handleEditRecipe(index)}
                  className="edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteRecipe(index)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No recipes found.</p>
        )}

        {/* Zoomed Image Modal */}
        {zoomImage && (
          <div
            className="zoomed-image-container"
            onClick={() => setZoomImage(null)}
          >
            <img
              src={zoomImage}
              alt="Zoomed"
              className="zoomed-image"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default AddRecipe;