const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 8000; // Or any port you prefer
const preferencesRoutes = require('./routes/preferences');

// Middleware
app.use(cors());
app.use(bodyParser.json({ origin: "http://localhost:5173" }));

// Routes
// Add other route imports as needed

// Use Routes
app.use('/preferences', preferencesRoutes);
// Use other routes as needed

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
