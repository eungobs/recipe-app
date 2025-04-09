const cors = require('cors');
module.exports = cors({ origin: 'http://localhost:3000' }); // Allow requests from your React app
