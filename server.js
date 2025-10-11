const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, 'frontend')));

// API endpoint to get questions
app.get('/questions', (req, res) => {
  try {
    const questionsPath = path.join(__dirname, 'questions.json');
    const questions = JSON.parse(fs.readFileSync(questionsPath, 'utf-8'));
    res.json(questions);
  } catch (err) {
    console.error('Error reading questions.json:', err);
    res.status(500).send('Error reading questions');
  }
});

// Catch-all route to serve index.html for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Dynamic PORT for Render deployment
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
