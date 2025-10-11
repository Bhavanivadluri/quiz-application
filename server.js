const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, 'frontend')));

// API endpoint to get questions
app.get('/questions', (req, res) => {
  try {
    const questions = JSON.parse(fs.readFileSync(path.join(__dirname, 'questions.json')));
    res.json(questions);
  } catch (err) {
    console.error('Error reading questions.json:', err);
    res.status(500).send('Error reading questions');
  }
});

// Catch-all route to serve index.html
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/index.html'));
});

// Dynamic PORT for Render deployment
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
