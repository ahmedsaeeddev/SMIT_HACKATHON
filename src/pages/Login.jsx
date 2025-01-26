import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // For redirection

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [userToken, setUserToken] = useState(null);  // To store the user token
  const [loanData, setLoanData] = useState(null);  // To store fetched loan data
  const [error, setError] = useState("");  // To handle any error messages
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate(); // For redirection after login

  // Clear error on input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");  // Reset error when the user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      // Make the login request
      const response = await axios.post(
        "http://localhost:8000/api/users/login",
        formData
      );

      // Store the token from the response
      const token = response.data.token;
      localStorage.setItem("token", token);
      setUserToken(token);

      alert("Login successful");

      // Optionally fetch loan data after login
      fetchLoanData(token);

      // Redirect user to the dashboard or homepage after login
      navigate("/loan"); // Redirect to a specific route
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Function to fetch loan data after login
  const fetchLoanData = async (token) => {
    try {
      // Fetch loan details using token for authentication
      const loanResponse = await axios.get(
        "http://localhost:8000/api/loans/1",
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Pass the token in headers
          },
        }
      );
      setLoanData(loanResponse.data);  // Store fetched loan data
    } catch (error) {
      console.error("Error fetching loan data:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-600 to-blue-500 text-white">
      <h1 className="text-3xl font-bold mb-8">Login</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>} {/* Display error message */}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="w-80 space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border-2 border-white rounded-lg bg-transparent text-white placeholder-gray-300 focus:outline-none focus:border-purple-300"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border-2 border-white rounded-lg bg-transparent text-white placeholder-gray-300 focus:outline-none focus:border-purple-300"
          required
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-white text-purple-600 font-bold rounded-lg hover:bg-purple-600 hover:text-white transition duration-300"
        >
          {loading ? "Loading..." : "Login"} {/* Show loading indicator */}
        </button>
      </form>

      {/* Optionally display loan data after successful login */}
      {loanData && (
        <div className="mt-8 text-white">
          <h2 className="text-xl font-bold">Loan Data</h2>
          <pre>{JSON.stringify(loanData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Login;
