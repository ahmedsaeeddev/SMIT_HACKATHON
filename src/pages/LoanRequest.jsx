import React, { useState } from 'react';
import axios from 'axios';

const SaylaniApploan = () => {
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [deposit, setDeposit] = useState('');
  const [loanPeriod, setLoanPeriod] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [loanBreakdown, setLoanBreakdown] = useState(null);
  const [error, setError] = useState('');

  // Guarantor details state
  const [guarantorName, setGuarantorName] = useState('');
  const [guarantorCnic, setGuarantorCnic] = useState('');
  const [guarantorEmail, setGuarantorEmail] = useState('');
  const [guarantorRelationship, setGuarantorRelationship] = useState('');
  const [guarantorLoanAmount, setGuarantorLoanAmount] = useState('');

  // Loan categories and subcategories
  const loanCategories = {
    wedding: ['Valima', 'Jahez', 'Furniture', 'Valima Food'],
    home: ['Structure', 'Finishing', 'Loan'],
    business: ['Buy Stall', 'Advance Rent for Shop', 'Shop Assets', 'Shop Machinery'],
    education: ['University Fees', 'Child Fees Loan'],
  };

  // Get user ID from localStorage or any other method
  const userId = localStorage.getItem("userId");

  // Loan calculation logic
  const calculateLoan = () => {
    // Check if all required fields are filled
    if (!category || !subcategory || !deposit || !loanPeriod || !loanAmount || !guarantorName || !guarantorCnic || !guarantorEmail || !guarantorRelationship || !guarantorLoanAmount) {
      setError('All fields are required.');
      setLoanBreakdown(null); // Reset loan breakdown
      return;
    }

    // Clear error if all fields are filled
    setError('');

    // Loan breakdown calculation
    const monthlyEMI = (loanAmount - deposit) / loanPeriod / 12;
    setLoanBreakdown({
      loanAmount,
      monthlyEMI,
      totalRepayment: monthlyEMI * loanPeriod * 12,
    });

    // Create the loan data object
    const loanData = {
      userId: userId,  // Logged-in user ID
      category: category,
      subcategory: subcategory,
      amount: loanAmount,
      duration: loanPeriod,  // This is assumed to be in years
      status: "Pending",  // Default status
      guarantorId: userId,  // Assuming guarantor is the same as the user
      guarantorDetails: {
        name: guarantorName,
        cnic: guarantorCnic,
        email: guarantorEmail,
        relationshipToBorrower: guarantorRelationship,
        loanAmountGuaranteed: guarantorLoanAmount,
      },
    };

    // Log the loan data object in the console
    console.log("Loan Data Object:", loanData);

    // You can send this data to your backend (as per your existing code)
    submitLoanRequest(loanData);
  };

  // Submit loan request to backend
  const token = localStorage.getItem("token");
  const submitLoanRequest = async (loanData) => {
    try {

      // If token is not found, inform the user to log in
      if (!token) {
        setError('User is not authenticated. Please log in.');
        return;
      }

      const response = await axios.post("http://localhost:8000/api/loan/submit", loanData, {
        headers: {
          Authorization: `Bearer ${token}`,  // Send token in Authorization header
        },
      });


      console.log("Loan request submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting loan request:", error);
      setError("Failed to submit loan request.");
    }
  };
  console.log(token);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-700">Choose a Loan Category</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.keys(loanCategories).map((key) => (
            <div
              key={key}
              onClick={() => setCategory(key)}
              className="cursor-pointer p-6 bg-white rounded-lg shadow-md hover:bg-blue-100 transform transition-all hover:scale-105"
            >
              <h3 className="text-xl font-semibold text-center text-blue-600">{key.charAt(0).toUpperCase() + key.slice(1)} Loans</h3>
              <ul className="mt-4 text-gray-600">
                {loanCategories[key].map((subcategory) => (
                  <li key={subcategory} className="text-sm hover:text-blue-600">
                    {subcategory}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Loan Request Form */}
        {category && (
          <div className="mt-8 p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Apply for a Loan</h2>

            {/* Error Message */}
            {error && <div className="mb-4 text-red-500 text-lg">{error}</div>}

            <div className="mb-4">
              <label className="block text-lg text-gray-600 mb-2">Select Subcategory:</label>
              <select
                onChange={(e) => setSubcategory(e.target.value)}
                value={subcategory}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="">--Select--</option>
                {loanCategories[category]?.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-lg text-gray-600 mb-2">Initial Deposit (PKR):</label>
              <input
                type="number"
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-lg text-gray-600 mb-2">Loan Period (Years):</label>
              <input
                type="number"
                value={loanPeriod}
                onChange={(e) => setLoanPeriod(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-lg text-gray-600 mb-2">Loan Amount Needed (PKR):</label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Guarantor Details */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Guarantor Details</h3>
              <div className="mb-4">
                <label className="block text-lg text-gray-600 mb-2">Guarantor Name:</label>
                <input
                  type="text"
                  value={guarantorName}
                  onChange={(e) => setGuarantorName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-lg text-gray-600 mb-2">Guarantor CNIC:</label>
                <input
                  type="text"
                  value={guarantorCnic}
                  onChange={(e) => setGuarantorCnic(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-lg text-gray-600 mb-2">Guarantor Email:</label>
                <input
                  type="email"
                  value={guarantorEmail}
                  onChange={(e) => setGuarantorEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-lg text-gray-600 mb-2">Relationship to Borrower:</label>
                <input
                  type="text"
                  value={guarantorRelationship}
                  onChange={(e) => setGuarantorRelationship(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-lg text-gray-600 mb-2">Loan Amount Guaranteed (PKR):</label>
                <input
                  type="number"
                  value={guarantorLoanAmount}
                  onChange={(e) => setGuarantorLoanAmount(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <button
              onClick={calculateLoan}
              className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition duration-200"
            >
              Calculate
            </button>

            {loanBreakdown && (
              <div className="mt-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Loan Breakdown:</h2>
                <p className="text-lg text-gray-600">Loan Amount: {loanBreakdown.loanAmount}</p>
                <p className="text-lg text-gray-600">Monthly EMI: {loanBreakdown.monthlyEMI}</p>
                <p className="text-lg text-gray-600">Total Repayment: {loanBreakdown.totalRepayment}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SaylaniApploan;
