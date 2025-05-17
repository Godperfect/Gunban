const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  let body = '';
  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', () => {
    try {
      const { number } = JSON.parse(body);

      if (!number) {
        return res.status(400).json({ message: 'Number is required' });
      }

      const filePath = path.join(__dirname, '..', 'ok.json');
      const allowedNumbers = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      if (allowedNumbers.includes(number)) {
        return res.status(200).json({ message: 'Number authorized. Proceed.' });
      } else {
        return res.status(403).json({ message: 'Global unban activated. Please contact owner.' });
      }
    } catch (err) {
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  });
};