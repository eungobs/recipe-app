Online Recipe Application (Fast-Track Recipe)
An application built with ReactJS and JSON Server that allows users to store, manage, and refer to their favorite dishes as recipes. The application supports user authentication and provides CRUD operations to handle recipes effectively.

Features
Pages
Login Page

Users can log in with their credentials to access their recipes.
Registration Page

New users can register to create an account.
Home Page

Displays a list of all recipes stored by the user.
Recipe Management
Search Function: Users can search for recipes by keywords to quickly find the desired recipe.
Add Function: Users can add new recipes with details like:
Recipe Name
Ingredients
Instructions
Category (e.g., Dessert, Main Course, Appetizer)
Preparation Time
Cooking Time
Servings
Update Function: Users can edit existing recipes to update details.
Delete Function: Users can delete recipes they no longer need.
Recipe Categories: Users can classify recipes into categories such as Breakfast, Lunch, Dinner, etc.
Technical Requirements
CRUD Operations
Create: Add new recipes.
Read: View all existing recipes.
Update: Modify existing recipes.
Delete: Remove recipes.
JSON Server
Utilized as a mock backend to store and manage recipe data.
Endpoints:
GET /recipes: Fetch all recipes.
POST /recipes: Add a new recipe.
DELETE /recipes/:id: Remove an existing recipe.
PATCH/PUT /recipes/:id: Update a recipe.
User Authentication and Authorization
Secure login and registration to protect user data.
User-specific data access to ensure privacy and data integrity.
Responsive Design
The application is designed to be responsive and user-friendly on all devices.
Input Validation
Proper validation is implemented for input fields to prevent errors and ensure data consistency.
Installation and Setup
Clone the repository:

git clone https://github.com/eungobs/recipe-app.git
Navigate to the project directory:


cd fast-track-recipe
Install dependencies:


npm install
Start JSON Server:


npm run start:mock
This command runs JSON Server on port 3001 by default.

Start the React Application:


npm start
The application will run on http://localhost:3000.

Usage
Register: New users can create an account on the registration page.
Login: Existing users can log in using their credentials.
Home Page: After logging in, users can view, add, edit, delete, and search for recipes.
Add Recipe: Click on 'Add Recipe' to enter details of a new dish.
Edit Recipe: Click on a recipe to edit its details.
Delete Recipe: Use the delete option to remove recipes.
Project Structure
src/
components/: Contains reusable components like forms and lists.
pages/: Includes the main pages of the application (Login, Registration, Home).
services/: Contains services for API calls to the JSON Server.
auth/: Manages user authentication and authorization logic.
App.js: Main application file managing routes and rendering components.
Technologies Used
Frontend: ReactJS, CSS
Backend: JSON Server
HTTP Requests: Axios
Routing: React Router
State Management: React Hooks (useState, useEffect)
Future Enhancements
Implement a better user management system to handle different user roles.
Add more features like recipe ratings, comments, and sharing options.
Integrate with a real backend for production use.