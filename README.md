# Online Recipe Application (Fast-Track Recipe)

## Overview

The **Fast-Track Recipe** application is a web-based platform built with **ReactJS** and **JSON Server**. It allows users to store, manage, and refer to their favorite dishes as recipes. The application supports user authentication, meaning that users can have their own accounts to keep their recipes private and secure. It also provides features for adding, updating, and deleting recipes effectively.

## Key Features

1. **Login Page**: 
   - Users can log in using their credentials to access their personal collection of recipes.

2. **Registration Page**: 
   - New users can easily create an account to start using the app and save their favorite recipes.

3. **Home Page**: 
   - Once logged in, users will see a list of all their stored recipes at a glance.

4. **Recipe Management**:
   - **Search Function**: Quickly find specific recipes by searching with keywords.
   - **Add Function**: Users can add new recipes with the following details:
     - Recipe Name
     - Ingredients
     - Instructions
     - Category (e.g., Dessert, Main Course)
     - Preparation Time
     - Cooking Time
     - Servings
   - **Update Function**: Edit existing recipes to change details as needed.
   - **Delete Function**: Remove recipes that are no longer wanted.
   - **Recipe Categories**: Classify recipes into different categories like Breakfast, Lunch, Dinner, etc.

## Technical Requirements

The app supports **CRUD Operations**, which means that users can:

- **Create**: Add new recipes.
- **Read**: View all existing recipes.
- **Update**: Modify existing recipes.
- **Delete**: Remove recipes.

It utilizes **JSON Server** as a mock backend to store and manage recipe data. The API endpoints include:

- **GET /recipes**: Fetch all recipes.
- **POST /recipes**: Add a new recipe.
- **DELETE /recipes/:id**: Remove an existing recipe.
- **PATCH/PUT /recipes/:id**: Update a recipe.

### User Authentication and Authorization:

- Users can securely log in and register to protect their data.
- The app ensures that users can only access their own specific data for privacy and integrity.

## Responsive Design

The application is designed to be responsive, ensuring a user-friendly experience on all devices, whether on a desktop, tablet, or mobile.

## Input Validation

Proper validation is implemented to check the input fields, preventing errors and ensuring that the data is consistent.

## Installation and Setup

Follow these steps to set up and run the project on your machine:

1. **Clone the Repository**: 
   - Download the code from GitHub by opening your terminal and typing:
   
     git clone https://github.com/eungobs/recipe-app.git
    

2. **Navigate to the Project Directory**: Change into the project folder with:
 
   cd fast-track-recipe


3. **Install Dependencies**: Install all the required packages by typing:
   npm install
 

4. **Start JSON Server**: Run the JSON Server, which acts as the backend:
 
   npm run start:mock
 
   - This command will run JSON Server on port 3001 by default.

5. **Start the React Application**: Launch the React app by typing:
   npm start
 
   - The application will be accessible at `http://localhost:3000`.

## How to Use the App

1. **Register**: New users can create an account on the registration page.

2. **Login**: Existing users can log in using their credentials.

3. **Home Page**: After logging in, users will be able to view, add, edit, delete, and search for their recipes.

4. **Add Recipe**: Click on the 'Add Recipe' button to enter details about a new dish.

5. **Edit Recipe**: Click on an existing recipe to edit its details.

6. **Delete Recipe**: Use the delete option next to a recipe to remove it.

## Project Structure

Here’s how the files in the project are organized:

src/
├── components/:            # Contains reusable components like forms and lists
├── pages/:                 # Includes main application pages (Login, Registration, Home)
├── services/:              # Contains services for API calls to JSON Server
├── auth/:                  # Manages user authentication and authorization logic
└── App.js:                 # Main application file managing routes and rendering components

## Technologies Used

- **Frontend**: Built using ReactJS and styled with CSS.
- **Backend**: Uses JSON Server for a simple mock backend.
- **HTTP Requests**: Managed with Axios for API calls.
- **Routing**: Implements React Router for navigating between different pages.
- **State Management**: Utilizes React Hooks (like useState and useEffect) for managing state.

## Future Enhancements

- Implement a better user management system to accommodate different user roles.
- Add new features like recipe ratings, comments, and sharing options.
- Integrate with a real backend for actual production use.
