const jsonServer = require('json-server');
const cors = require('cors');

const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Your database file
const middlewares = jsonServer.defaults();

// Use CORS middleware
server.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
}));

// Use default middlewares (logger, static, etc.)
server.use(middlewares);

// Use the JSON server router
server.use(router);

// Start the server on port 5000
server.listen(5000, () => {
  console.log('JSON Server is running on port 5000');
});
