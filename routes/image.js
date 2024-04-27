const express = require('express');
const router = express.Router();
const genimage = require("../aimodels/gemini.image.js")

router.post('/', async (req, res) => {
    try {
        const imageData = req.body.imageData;
        console.log('Received image data:', imageData);
      
        // Call the imageGeneration function with imageData
        const result = await genimage(imageData);
        
        // Log success message if the data is sent correctly
        //console.log('Image generation successful:', result);
        
        // Send the generated content as response
        res.status(200).json({ generatedContent: result });
    
    } catch (error) {
        // Log or send an error response if there's an error
        console.error('Error generating content from image:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;

