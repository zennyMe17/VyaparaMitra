// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse JSON bodies

// Simple route to test if the server is working
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// POST route for creditworthiness evaluation
app.post('/api/evaluate', (req, res) => {
  const { incomeProof, repaymentData } = req.body;

  // Check if incomeProof and repaymentData are provided
  if (!incomeProof || !repaymentData) {
    return res.status(400).json({ error: 'Both income proof and repayment data are required' });
  }

  // Simulate evaluation logic for demo purposes
  let creditScore = 0;

  // Example logic for demo purposes (could be replaced with actual AI/ML model)
  // If the incomeProof is a number > 1000 and repayment data is positive, it's a good score
  if (parseFloat(incomeProof) > 1000 && parseFloat(repaymentData) > 0) {
    creditScore = 80; // Higher score
  } else if (parseFloat(incomeProof) > 500) {
    creditScore = 50; // Moderate score
  } else {
    creditScore = 30; // Low score
  }

  // Return the evaluated credit score
  return res.json({ creditScore });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
