import React, { useState, useEffect, useRef } from 'react';
import './recipe.css';

function AddRecipe() {
  // State to manage the list of recipes, initialized from local storage
  const [recipes, setRecipes] = useState(() => {
    const storedRecipes = localStorage.getItem('recipes');
    return storedRecipes ? JSON.parse(storedRecipes) : [];
  });

  // State to control modal visibility for adding/editing recipes
  const [open, setOpen] = useState(false);

  // State to track if the user is editing an existing recipe
  const [editMode, setEditMode] = useState(false);

  // State to track the index of the recipe being edited
  const [currentIndex, setCurrentIndex] = useState(null);

  // State to manage the search query input
  const [searchQuery, setSearchQuery] = useState('');

  // State to toggle between light and dark mode
  const [darkMode, setDarkMode] = useState(false);

  // State to handle zooming in on the recipe image
  const [zoomImage, setZoomImage] = useState(null);

  // State to manage the current form values for adding or editing a recipe
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

  // Refs to manage form input fields
  const recipeNameRef = useRef(null);
  const ingredientsRef = useRef(null);
  const instructionsRef = useRef(null);
  const categoryRef = useRef(null);
  const prepTimeRef = useRef(null);
  const cookTimeRef = useRef(null);
  const servingsRef = useRef(null);
  const imageRef = useRef(null);

  // Array of predefined recipe categories
  const categories = [
    'Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert', 
    'Beverage', 'Salad', 'Soup', 'Appetizer'
  ];

  // Effect to update local storage whenever the recipes state changes
  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe(prevRecipe => ({
      ...prevRecipe,
      [name]: value
    }));
  };

  // Function to handle adding or updating a recipe
  const handleAddRecipe = (e) => {
    e.preventDefault();

    // Get the selected image file from the input
    const imageFile = imageRef.current.files[0];

    // Helper function to convert the image file to a Base64 string
    const handleImageUpload = async (file) => {
      if (file) {
        const base64Image = await getBase64(file);
        return base64Image;
      }
      return newRecipe.image;
    };

    // Upload the image and either add or update the recipe in the list
    handleImageUpload(imageFile).then((base64Image) => {
      const recipeWithImage = {
        ...newRecipe,
        image: base64Image
      };

      if (editMode && currentIndex !== null) {
        // Update the existing recipe
        const updatedRecipes = [...recipes];
        updatedRecipes[currentIndex] = recipeWithImage;
        setRecipes(updatedRecipes);
      } else {
        // Add a new recipe
        setRecipes([...recipes, recipeWithImage]);
      }

      // Reset the form after submitting
      resetForm();
    }).catch((error) => {
      console.error('Error adding/updating recipe:', error);
    });
  };

  // Utility function to convert a file to Base64 format
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Function to reset the form fields and states
  const resetForm = () => {
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
    
    // Reset all input fields
    if (recipeNameRef.current) recipeNameRef.current.value = '';
    if (ingredientsRef.current) ingredientsRef.current.value = '';
    if (instructionsRef.current) instructionsRef.current.value = '';
    if (categoryRef.current) categoryRef.current.value = '';
    if (prepTimeRef.current) prepTimeRef.current.value = '';
    if (cookTimeRef.current) cookTimeRef.current.value = '';
    if (servingsRef.current) servingsRef.current.value = '';
    if (imageRef.current) imageRef.current.value = '';
  };

  // Function to delete a recipe by its index
  const handleDeleteRecipe = (index) => {
    const updatedRecipes = recipes.filter((_, i) => i !== index);
    setRecipes(updatedRecipes);
  };

  // Function to edit an existing recipe
  const handleEditRecipe = (index) => {
    const recipe = recipes[index];
    
    // Set the form with the recipe details to edit
    setNewRecipe(recipe);
    setCurrentIndex(index);
    setEditMode(true);
    setOpen(true);

    // Update input fields
    if (recipeNameRef.current) recipeNameRef.current.value = recipe.name;
    if (ingredientsRef.current) ingredientsRef.current.value = recipe.ingredients;
    if (instructionsRef.current) instructionsRef.current.value = recipe.instructions;
    if (categoryRef.current) categoryRef.current.value = recipe.category;
    if (prepTimeRef.current) prepTimeRef.current.value = recipe.prepTime;
    if (cookTimeRef.current) cookTimeRef.current.value = recipe.cookTime;
    if (servingsRef.current) servingsRef.current.value = recipe.servings;
  };

  // Function to filter recipes based on the search query
  const searchRecipes = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  // Filter recipes based on the search query
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchQuery) ||
    recipe.ingredients.toLowerCase().includes(searchQuery) ||
    recipe.instructions.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="App" style={{ 
      backgroundColor: darkMode ? '#333' : '#fff', 
      color: darkMode ? '#fff' : '#000', 
      minHeight: '100vh' 
    }}>
      <div style={{ padding: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          {/* Search input for filtering recipes */}
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
          {/* Button to open the form modal for adding a new recipe */}
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

        {/* Modal for adding/editing a recipe */}
        {open && (
          <div className="modal-container">
            <h2>{editMode ? 'Edit Recipe' : 'New Recipe'}</h2>
            <form onSubmit={handleAddRecipe}>
              <div style={{ marginBottom: '10px' }}>
                {/* Input fields for the recipe form */}
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
                  style={{ marginBottom: '10px' }} 
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* Cancel and Submit buttons */}
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

        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: '20px' 
        }}>
          <h1>Recipes</h1>
          {/* Button to toggle between dark and light modes */}
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

        {/* Display filtered recipes */}
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
              
              {/* Show recipe image if available */}
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
              
              <div 
                style={{ 
                  marginTop: '10px', 
                  display: 'flex', 
                  justifyContent: 'space-between' 
                }}
              >
                {/* Edit and Delete buttons for each recipe */}
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

        {/* Zoomed-in image modal when the user clicks on a recipe image */}
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