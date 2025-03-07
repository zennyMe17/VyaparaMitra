import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [incomeProof, setIncomeProof] = useState('');
  const [repaymentData, setRepaymentData] = useState('');
  const [creditScore, setCreditScore] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure both fields are filled
    if (!incomeProof || !repaymentData) {
      setError('Both income proof and repayment data are required');
      return;
    }

    try {
      // Send data to the backend API
      const response = await axios.post('https://vyapara-mitra-iyd6.vercel.app/api/evaluate', {
        incomeProof,
        repaymentData,
      });

      // Set credit score from the response
      setCreditScore(response.data.creditScore);
      setError(''); // Clear previous errors
    } catch (err) {
      setError('Error occurred while evaluating creditworthiness.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Creditworthiness Evaluation</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="incomeProof" className="block text-sm font-semibold text-gray-700">Income Proof</label>
            <input
              type="text"
              id="incomeProof"
              value={incomeProof}
              onChange={(e) => setIncomeProof(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md"
              placeholder="Enter income proof"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="repaymentData" className="block text-sm font-semibold text-gray-700">Repayment Data</label>
            <input
              type="text"
              id="repaymentData"
              value={repaymentData}
              onChange={(e) => setRepaymentData(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md"
              placeholder="Enter repayment data"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Evaluate
          </button>
        </form>

        {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
        {creditScore !== null && (
          <p className="mt-4 text-green-500 text-lg font-semibold">Credit Score: {creditScore}</p>
        )}
      </div>
    </div>
  );
}

export default App;
