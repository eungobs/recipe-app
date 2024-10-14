import React, { useState, useEffect, useRef } from 'react';
import './recipe.css';

function AddRecipe() {
  const [recipes, setRecipes] = useState(() => {
    // Retrieve recipes from local storage
    const storedRecipes = localStorage.getItem('recipes');
    return storedRecipes ? JSON.parse(storedRecipes) : [];
  });
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [zoomImage, setZoomImage] = useState(null);
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

  const recipeNameRef = useRef(null);
  const ingredientsRef = useRef(null);
  const instructionsRef = useRef(null);
  const categoryRef = useRef(null);
  const prepTimeRef = useRef(null);
  const cookTimeRef = useRef(null);
  const servingsRef = useRef(null);
  const imageRef = useRef(null);

  const categories = [
    'Breakfast', 
    'Lunch', 
    'Dinner', 
    'Snack', 
    'Dessert', 
    'Beverage', 
    'Salad', 
    'Soup', 
    'Appetizer'
  ];

  useEffect(() => {
    // Update local storage whenever recipes change
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  const handleAddRecipe = (e) => {
    e.preventDefault();
    const imageFile = imageRef.current.files[0];

    const handleImageUpload = async (file) => {
      if (file) {
        const base64Image = await getBase64(file);
        return base64Image;
      }
      return newRecipe.image;
    };

    handleImageUpload(imageFile).then((base64Image) => {
      const recipeWithImage = {
        ...newRecipe,
        image: base64Image
      };

      if (editMode) {
        // Update existing recipe
        const updatedRecipes = recipes.map((recipe, index) =>
          index === currentIndex ? recipeWithImage : recipe
        );
        setRecipes(updatedRecipes);
      } else {
        // Add new recipe
        setRecipes([...recipes, recipeWithImage]);
      }
      resetForm();
    }).catch((error) => {
      console.error('Error adding/updating recipe:', error);
    });
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

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
    recipeNameRef.current.value = '';
    ingredientsRef.current.value = '';
    instructionsRef.current.value = '';
    categoryRef.current.value = '';
    prepTimeRef.current.value = '';
    cookTimeRef.current.value = '';
    servingsRef.current.value = '';
    imageRef.current.value = '';
  };

  const handleDeleteRecipe = (index) => {
    const updatedRecipes = recipes.filter((_, i) => i !== index);
    setRecipes(updatedRecipes);
  };

  const handleEditRecipe = (index) => {
    const recipe = recipes[index];
    setNewRecipe(recipe);
    recipeNameRef.current.value = recipe.name;
    ingredientsRef.current.value = recipe.ingredients;
    instructionsRef.current.value = recipe.instructions;
    categoryRef.current.value = recipe.category;
    prepTimeRef.current.value = recipe.prepTime;
    cookTimeRef.current.value = recipe.cookTime;
    servingsRef.current.value = recipe.servings;
    setCurrentIndex(index);
    setEditMode(true);
    setOpen(true);
  };

  const searchRecipes = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchQuery) ||
    recipe.ingredients.toLowerCase().includes(searchQuery) ||
    recipe.instructions.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="App" style={{ backgroundColor: darkMode ? '#333' : '#fff', color: darkMode ? '#fff' : '#000', minHeight: '100vh' }}>
      <div style={{ padding: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search recipes..."
            onChange={(e) => searchRecipes(e.target.value)}
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
          <button onClick={() => setOpen(true)} style={{ width: '100%', padding: '10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}>
            {editMode ? 'Update Recipe' : 'New Recipe'}
          </button>
        </div>

        {open && (
          <div className="modal-container">
            <h2>{editMode ? 'Edit Recipe' : 'New Recipe'}</h2>
            <form onSubmit={handleAddRecipe}>
              <div style={{ marginBottom: '10px' }}>
                <input type="text" placeholder="Recipe Name" ref={recipeNameRef} className="input-field" required />
                <textarea placeholder="Ingredients" ref={ingredientsRef} className="input-field" required />
                <textarea placeholder="Instructions" ref={instructionsRef} className="input-field" required />
                <select ref={categoryRef} className="input-field category-select" required>
                  <option value="">Select Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <input type="text" placeholder="Preparation Time" ref={prepTimeRef} className="input-field" required />
                <input type="text" placeholder="Cooking Time" ref={cookTimeRef} className="input-field" required />
                <input type="number" placeholder="Servings" ref={servingsRef} className="input-field" required />
                <input type="file" ref={imageRef} style={{ marginBottom: '10px' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button type="button" onClick={() => setOpen(false)} className="cancel-button">Cancel</button>
                <button type="submit" className="create-button">
                  {editMode ? 'Update Recipe' : 'Create Recipe'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h1>Recipes</h1>
          <button onClick={() => setDarkMode(!darkMode)} style={{ padding: '10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>

        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe, index) => (
            <div key={index} className="recipe-card">
              {recipe.image && (
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="recipe-image"
                  onClick={() => setZoomImage(recipe.image)}
                />
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{recipe.name}</strong>
                <button onClick={() => handleEditRecipe(index)} className="edit-button">Edit</button>
                <button onClick={() => handleDeleteRecipe(index)} className="delete-button">Delete</button>
              </div>
              <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
              <p><strong>Instructions:</strong> {recipe.instructions}</p>
              <p><strong>Category:</strong> {recipe.category}</p>
              <p><strong>Prep Time:</strong> {recipe.prepTime}</p>
              <p><strong>Cook Time:</strong> {recipe.cookTime}</p>
              <p><strong>Servings:</strong> {recipe.servings}</p>
            </div>
          ))
        ) : (
          <p>No recipes found.</p>
        )}

        {zoomImage && (
          <div className="zoom-modal" onClick={() => setZoomImage(null)}>
            <img src={zoomImage} alt="Zoomed" className="zoomed-image" />
          </div>
        )}
      </div>
    </div>
  );
}

export default AddRecipe;

