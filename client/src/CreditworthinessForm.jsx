import React, { useState } from "react";
import axios from "axios";

const CreditworthinessForm = () => {
  const [name, setName] = useState("");
  const [incomeProof, setIncomeProof] = useState("");
  const [repaymentData, setRepaymentData] = useState([{ amount: "", onTime: false }]);
  const [result, setResult] = useState("");

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedRepaymentData = [...repaymentData];
    updatedRepaymentData[index][name] = value;
    setRepaymentData(updatedRepaymentData);
  };

  const handleAddRepayment = () => {
    setRepaymentData([...repaymentData, { amount: "", onTime: false }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/evaluate", {
        name,
        incomeProof,
        repaymentData,
      });
      setResult(response.data.creditworthiness);
    } catch (error) {
      console.error("Error evaluating creditworthiness", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Evaluate Creditworthiness</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Income Proof (URL)</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={incomeProof}
            onChange={(e) => setIncomeProof(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Repayment Data</label>
          {repaymentData.map((data, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                className="w-20 p-2 border border-gray-300 rounded-md"
                value={data.amount}
                onChange={(e) => handleInputChange(e, index)}
                required
              />
              <input
                type="checkbox"
                name="onTime"
                className="ml-2"
                checked={data.onTime}
                onChange={(e) => handleInputChange(e, index)}
              />
              <label className="ml-2">Paid on time</label>
            </div>
          ))}
          <button
            type="button"
            className="mt-2 text-blue-500"
            onClick={handleAddRepayment}
          >
            Add More Repayment Data
          </button>
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md"
        >
          Evaluate Creditworthiness
        </button>
      </form>

      {result && (
        <div className="mt-4 p-4 border border-gray-300 rounded-md">
          <p className="text-xl">Creditworthiness: {result}</p>
        </div>
      )}
    </div>
  );
};

export default CreditworthinessForm;
