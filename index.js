const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());


function getAuthorizedNumbers() {
  const data = fs.readFileSync('./ok.json', 'utf8');
  return JSON.parse(data);
}

app.post('/check-number', (req, res) => {
  const { number } = req.body;

  if (!number) {
    return res.status(400).json({ message: 'Number required' });
  }

  const authorizedNumbers = getAuthorizedNumbers();

  if (authorizedNumbers.includes(number)) {
    return res.status(200).json({ message: 'Number authorized. Proceed.' });
  } else {
    return res.status(403).json({ message: 'Global unban activated. Please contact owner.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});