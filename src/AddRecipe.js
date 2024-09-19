import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './recipe.css';

const API_URL = 'http://localhost:3001/recipes'; // Adjust the URL as needed

export default function RecipeManager() {
  const [recipes, setRecipes] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [zoomImage, setZoomImage] = useState(null);

  const recipeNameRef = useRef(null);
  const ingredientsRef = useRef(null);
  const instructionsRef = useRef(null);
  const categoryRef = useRef(null);
  const prepTimeRef = useRef(null);
  const cookTimeRef = useRef(null);
  const servingsRef = useRef(null);
  const imageRef = useRef(null);

  const categories = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert', 'Beverage', 'Salad', 'Soup', 'Appetizer'];

  useEffect(() => {
    // Try to fetch stored recipes from JSON Server on component mount
    axios.get(API_URL)
      .then(response => {
        setRecipes(response.data);
        // Save recipes to local storage
        localStorage.setItem('recipes', JSON.stringify(response.data));
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
        // Load recipes from local storage if fetch fails
        const savedRecipes = localStorage.getItem('recipes');
        if (savedRecipes) {
          setRecipes(JSON.parse(savedRecipes));
        } else {
          console.error('No saved recipes found.');
        }
      });
  }, []);

  function addOrUpdateRecipe() {
    const imageFile = imageRef.current.files[0];

    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newRecipe = {
          name: recipeNameRef.current.value,
          ingredients: ingredientsRef.current.value,
          instructions: instructionsRef.current.value,
          category: categoryRef.current.value,
          prepTime: prepTimeRef.current.value,
          cookTime: cookTimeRef.current.value,
          servings: servingsRef.current.value,
          image: reader.result, // Store image as base64 string
        };

        saveRecipe(newRecipe);
      };
      reader.readAsDataURL(imageFile);
    } else {
      const newRecipe = {
        name: recipeNameRef.current.value,
        ingredients: ingredientsRef.current.value,
        instructions: instructionsRef.current.value,
        category: categoryRef.current.value,
        prepTime: prepTimeRef.current.value,
        cookTime: cookTimeRef.current.value,
        servings: servingsRef.current.value,
        image: null,
      };

      saveRecipe(newRecipe);
    }
  }

  function saveRecipe(newRecipe) {
    if (editMode) {
      // Update existing recipe
      axios.put(`${API_URL}/${recipes[currentIndex].id}`, newRecipe)
        .then(() => {
          const updatedRecipes = [...recipes];
          updatedRecipes[currentIndex] = { ...newRecipe, id: recipes[currentIndex].id };
          setRecipes(updatedRecipes);
          localStorage.setItem('recipes', JSON.stringify(updatedRecipes)); // Save updated recipes
          setEditMode(false);
          setCurrentIndex(null);
          setOpen(false);
        })
        .catch(error => console.error('Error updating recipe:', error));
    } else {
      // Add new recipe
      axios.post(API_URL, newRecipe)
        .then(response => {
          const newRecipes = [...recipes, response.data];
          setRecipes(newRecipes);
          localStorage.setItem('recipes', JSON.stringify(newRecipes)); // Save new recipes
          setOpen(false);
        })
        .catch(error => console.error('Error adding recipe:', error));
    }
  }

  function deleteRecipe(index) {
    const recipeToDelete = recipes[index];
    axios.delete(`${API_URL}/${recipeToDelete.id}`)
      .then(() => {
        const updatedRecipes = recipes.filter((_, i) => i !== index);
        setRecipes(updatedRecipes);
        localStorage.setItem('recipes', JSON.stringify(updatedRecipes)); // Update local storage
      })
      .catch(error => console.error('Error deleting recipe:', error));
  }

  function editRecipe(index) {
    const recipe = recipes[index];
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
  }

  function searchRecipes(query) {
    setSearchQuery(query.toLowerCase());
  }

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
            <div style={{ marginBottom: '10px' }}>
              <input type="text" placeholder="Recipe Name" ref={recipeNameRef} className="input-field" />
              <textarea placeholder="Ingredients" ref={ingredientsRef} className="input-field" />
              <textarea placeholder="Instructions" ref={instructionsRef} className="input-field" />
              <select ref={categoryRef} className="input-field category-select">
                <option value="">Select Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <input type="text" placeholder="Preparation Time" ref={prepTimeRef} className="input-field" />
              <input type="text" placeholder="Cooking Time" ref={cookTimeRef} className="input-field" />
              <input type="number" placeholder="Servings" ref={servingsRef} className="input-field" />
              <input type="file" ref={imageRef} style={{ marginBottom: '10px' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => setOpen(false)} className="cancel-button">Cancel</button>
              <button onClick={addOrUpdateRecipe} className="create-button">
                {editMode ? 'Update Recipe' : 'Create Recipe'}
              </button>
            </div>
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
                <button onClick={() => editRecipe(index)} className="edit-button">Edit</button>
                <button onClick={() => deleteRecipe(index)} className="delete-button">Delete</button>
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
      </div>

      {zoomImage && (
        <div className="zoom-modal" onClick={() => setZoomImage(null)}>
          <img src={zoomImage} alt="Zoomed" className="zoomed-image" />
        </div>
      )}
    </div>
  );
}
