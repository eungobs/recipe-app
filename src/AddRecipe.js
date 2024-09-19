import React, { useState, useRef } from 'react';
import './recipe.css';

export default function RecipeManager() {
  const [recipes, setRecipes] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const recipeNameRef = useRef(null);
  const ingredientsRef = useRef(null);
  const instructionsRef = useRef(null);
  const categoryRef = useRef(null);
  const prepTimeRef = useRef(null);
  const cookTimeRef = useRef(null);
  const servingsRef = useRef(null);
  const imageRef = useRef(null);

  function addOrUpdateRecipe() {
    const newRecipe = {
      name: recipeNameRef.current.value,
      ingredients: ingredientsRef.current.value,
      instructions: instructionsRef.current.value,
      category: categoryRef.current.value,
      prepTime: prepTimeRef.current.value,
      cookTime: cookTimeRef.current.value,
      servings: servingsRef.current.value,
      image: imageRef.current.files[0] ? URL.createObjectURL(imageRef.current.files[0]) : null
    };

    if (editMode) {
      const updatedRecipes = [...recipes];
      updatedRecipes[currentIndex] = newRecipe;
      setRecipes(updatedRecipes);
      setEditMode(false);
      setCurrentIndex(null);
    } else {
      setRecipes([...recipes, newRecipe]);
    }
    setOpen(false);
  }

  function deleteRecipe(index) {
    const updatedRecipes = recipes.filter((_, i) => i !== index);
    setRecipes(updatedRecipes);
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

  const filteredRecipes = recipes.filter(recipe =>
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
          <div style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <h2>{editMode ? 'Edit Recipe' : 'New Recipe'}</h2>
            <div style={{ marginBottom: '10px' }}>
              <input type="text" placeholder="Recipe Name" ref={recipeNameRef} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
              <textarea placeholder="Ingredients" ref={ingredientsRef} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
              <textarea placeholder="Instructions" ref={instructionsRef} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
              <input type="text" placeholder="Category" ref={categoryRef} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
              <input type="text" placeholder="Preparation Time" ref={prepTimeRef} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
              <input type="text" placeholder="Cooking Time" ref={cookTimeRef} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
              <input type="number" placeholder="Servings" ref={servingsRef} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
              <input type="file" ref={imageRef} style={{ marginBottom: '10px' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => setOpen(false)} style={{ padding: '10px', background: '#f0f0f0', border: 'none', borderRadius: '4px' }}>Cancel</button>
              <button onClick={addOrUpdateRecipe} style={{ padding: '10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}>
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
            <div key={index} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '10px', marginBottom: '10px' }}>
              {recipe.image && <img src={recipe.image} alt={recipe.name} style={{ width: '100%', height: 'auto', borderRadius: '4px', marginBottom: '10px' }} />}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{recipe.name}</strong>
                <button onClick={() => editRecipe(index)} style={{ background: 'transparent', border: 'none', color: '#007bff' }}>Edit</button>
                <button onClick={() => deleteRecipe(index)} style={{ background: 'transparent', border: 'none', color: 'red' }}>Delete</button>
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
          <p>You have no recipes</p>
        )}
      </div>
    </div>
  );
}


