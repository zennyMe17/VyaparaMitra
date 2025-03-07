const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Enable CORS to allow requests from your frontend URL
const corsOptions = {
  origin: 'https://vyapara-mitra.vercel.app', // Your frontend hosted URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

// Use CORS middleware
app.use(cors(corsOptions));

// Middleware to parse JSON request body
app.use(bodyParser.json());

// Route for evaluating creditworthiness
app.post('/api/evaluate', (req, res) => {
  const { incomeProof, repaymentData } = req.body;

  if (!incomeProof || !repaymentData) {
    return res.status(400).json({ error: 'Both income proof and repayment data are required' });
  }

  // Basic logic for evaluating credit score (you can replace this with more complex logic)
  let creditScore = 0;

  if (parseFloat(incomeProof) > 1000 && parseFloat(repaymentData) > 0) {
    creditScore = 80; // Good score
  } else if (parseFloat(incomeProof) > 500) {
    creditScore = 50; // Moderate score
  } else {
    creditScore = 30; // Low score
  }

  // Respond with the evaluated credit score
  return res.json({ creditScore });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
