// /api/auth.js - Vercel serverless function for user authorization
const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  try {
    // Read the ok.json file containing authorized numbers
    const filePath = path.join(process.cwd(), 'ok.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const authorizedNumbers = JSON.parse(data);

    // Get the number from query parameters
    const { number } = req.query;

    if (!number) {
      return res.status(400).json({ 
        authorized: false, 
        message: 'Number parameter is required' 
      });
    }

    // Check if the number exists in authorized list
    if (authorizedNumbers.numbers.includes(number)) {
      return res.status(200).json({ 
        authorized: true, 
        message: 'User is authorized' 
      });
    } else {
      return res.status(200).json({ 
        authorized: false, 
        message: 'Not authorized. Please contact the owner' 
      });
    }
  } catch (error) {
    console.error('Error checking authorization:', error);
    return res.status(500).json({ 
      error: 'Internal server error', 
      message: error.message 
    });
  }
}