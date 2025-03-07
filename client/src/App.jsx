import React, { useState } from "react";
import axios from "axios";

function App() {
  const [incomeProof, setIncomeProof] = useState("");
  const [repaymentData, setRepaymentData] = useState("");
  const [creditScore, setCreditScore] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleIncomeProofChange = (e) => setIncomeProof(e.target.value);
  const handleRepaymentDataChange = (e) => setRepaymentData(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!incomeProof || !repaymentData) {
      setErrorMessage("Both fields are required.");
      return;
    }

    try {
      // Send the form data to your backend server
      const response = await axios.post("http://localhost:5000/api/evaluate", {
        incomeProof,
        repaymentData,
      });

      // Assuming the backend returns a credit score or evaluation result
      setCreditScore(response.data.creditScore);
      setErrorMessage("");
    } catch (error) {
      console.error("Error evaluating creditworthiness:", error);
      setErrorMessage("Error evaluating creditworthiness. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Evaluate Creditworthiness</h2>
        
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="incomeProof" className="block text-sm font-medium text-gray-700">Income Proof</label>
            <input
              type="text"
              id="incomeProof"
              value={incomeProof}
              onChange={handleIncomeProofChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter income proof"
            />
          </div>

          <div>
            <label htmlFor="repaymentData" className="block text-sm font-medium text-gray-700">Repayment Data</label>
            <input
              type="text"
              id="repaymentData"
              value={repaymentData}
              onChange={handleRepaymentDataChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter repayment data"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>

        {creditScore !== null && (
          <div className="mt-4 text-center">
            <h3 className="text-lg font-semibold">Creditworthiness Evaluation Result</h3>
            <p className="text-xl font-bold text-green-600">Credit Score: {creditScore}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
