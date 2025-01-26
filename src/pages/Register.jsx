import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    cnic: "",
    email: "",
    name: "",
    password: "",
    country: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Clear error when the user starts typing again
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // Reset error when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make the registration request
      const response = await axios.post(
        "https://smit-final-hackathon-hazel.vercel.app/api/users/register",
        formData
      );

      // Handle success
      setSuccessMessage("Registration successful! You can now login.");
      setError("");  // Clear previous error if successful
      setFormData({
        cnic: "",
        email: "",
        name: "",
        password: "",
        country: "",
      });
    } catch (error) {
      // Handle error (e.g., duplicate email or CNIC)
      setError("Registration failed. Please try again.");
      setSuccessMessage("");  // Clear success message if error occurs
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-600 to-blue-500 text-white">
      <h1 className="text-3xl font-bold mb-8">Register</h1>

      {/* Display error or success message */}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="w-80 space-y-4">
        <input
          type="text"
          placeholder="CNIC"
          name="cnic"
          value={formData.cnic}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border-2 border-white rounded-lg bg-transparent text-white placeholder-gray-300 focus:outline-none focus:border-purple-300"
          required
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border-2 border-white rounded-lg bg-transparent text-white placeholder-gray-300 focus:outline-none focus:border-purple-300"
          required
        />
        <input
          type="text"
          placeholder="Full Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border-2 border-white rounded-lg bg-transparent text-white placeholder-gray-300 focus:outline-none focus:border-purple-300"
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border-2 border-white rounded-lg bg-transparent text-white placeholder-gray-300 focus:outline-none focus:border-purple-300"
          required
        />
        <input
          type="text"
          placeholder="Country (optional)"
          name="country"
          value={formData.country}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border-2 border-white rounded-lg bg-transparent text-white placeholder-gray-300 focus:outline-none focus:border-purple-300"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-white text-purple-600 font-bold rounded-lg hover:bg-purple-600 hover:text-white transition duration-300"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
