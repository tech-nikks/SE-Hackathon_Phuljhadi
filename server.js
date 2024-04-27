const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

// Routes
const preferencesRoutes = require('./routes/preferences');
const imageRoutes = require('./routes/image');
const recipeRoutes = require('./routes/recipe');


app.use('/preferences', preferencesRoutes);
app.use('/image', imageRoutes);
app.use('/recipe', recipeRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
