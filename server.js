const jsonServer = require('json-server');
const path = require('path');
const cors = require('cors'); // Import the cors package
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

<<<<<<< HEAD
// Use CORS middleware
=======
// CORS middleware
>>>>>>> a285153005db7d5ca3aa1fbdb4931526de0df0e0
server.use(cors()); // Apply CORS to all routes

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Set default headers for CORS (not necessary if using cors middleware)
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Use default router with the prefix '/api'
server.use('/api', router);

// Set the port to 3004 (make sure to match this with your frontend requests)
const port = 3004; 
server.listen(port, () => {
  console.log(`JSON Server is running on http://localhost:${port}`);
});