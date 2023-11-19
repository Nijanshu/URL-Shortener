const express = require('express');
const router = express.Router();
const URL = require('../models/surl');

router.post('/', async function(req, res) {
  // Get the URL from the request body
  let url = req.body.url;
  try {
    let existingURL = await URL.findOne({ origURL: req.body.url });
  
    if (existingURL) {
      console.log("URL already exists");
    
      res.json({
        original_url: existingURL.origURL,
        short_url: existingURL.ShortUrl
      });
    
      return;
      // Handle the case where the URL already exists
      // For example, you can return a response or perform other actions
    } else {
      console.log("URL does not exist");
      // Handle the case where the URL does not exist
      // For example, you might proceed with saving the URL to the database
    }
  } catch (error) {
    console.error("Error checking URL existence:", error);
    // Handle the error appropriately
  }

      let surl=Math.floor(Math.random()*(10000-1));
    
    console.log(surl);
  // Basic URL validation
  if (!isValidUrl(url)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }
  const resp=new URL({
    origURL: url,
    ShortUrl: surl
  })
  const saved= await resp.save();

  res.json({
    original_url: saved.origURL,
    short_url: saved.ShortUrl
  })
  // Process the URL and send the response
  
});

router.get('/:shURL',async (req, res) => {
  try {
    let existingURL = await URL.findOne({ ShortUrl: req.params.shURL });
  
    if (existingURL) {
      console.log("URL already exists");
    
      res.redirect(existingURL.origURL);
    
      return;
      // Handle the case where the URL already exists
      // For example, you can return a response or perform other actions
    } else {
      res.json(
        {
          error: 'invalid url'
        }
      )
      // Handle the case where the URL does not exist
      // For example, you might proceed with saving the URL to the database
    }
  } catch (error) {
    console.error("Error checking URL existence:", error);
    // Handle the error appropriately
  }
})

// Function to check if a URL is valid
function isValidUrl(str) {
  // Use a regular expression or any other validation logic
  // This is a simple example, you might want to use a more comprehensive solution
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
  return urlRegex.test(str);
}

module.exports = router;
