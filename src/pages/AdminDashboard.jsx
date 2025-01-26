import { useState, useEffect } from "react";
import axios from "axios";
import { Route, useNavigate } from "react-router-dom"; // Import the useNavigate hook

const AdminDashboard = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Fetch loans from backend
  const fetchLoans = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/api/admin/applications", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setLoans(response.data.applications);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch loans.");
      setLoading(false);
    }
  };

  // Update loan application status (approve or reject)
  const updateApplicationStatus = async (id, status) => {
    try {
      setLoading(true);
      await axios.put(
        `http://localhost:8000/api/admin/update/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setLoans((prevLoans) =>
        prevLoans.map((loan) =>
          loan._id === id ? { ...loan, status } : loan
        )
      );
      setLoading(false);
    } catch (error) {
      setError("Failed to update loan status.");
      setLoading(false);
    }
  };

  // Check if user is authenticated, otherwise redirect to login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login page if no token is found
    } else {
      fetchLoans(); // Fetch the loans if token is present
    }
  }, [navigate]); // Added navigate to dependency array

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="bg-purple-700 text-white w-64 p-6">
        <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
        <ul className="space-y-4">
          <li>
            <a href="#" className="flex items-center space-x-2 hover:bg-purple-600 p-2 rounded-lg">
              <span>🏠</span>
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a href="" className="flex items-center space-x-2 hover:bg-purple-600 p-2 rounded-lg">
              <span>📄</span>
              <span>Loan Applications</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center space-x-2 hover:bg-purple-600 p-2 rounded-lg">
              <span>📊</span>
              <span>Reports</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center space-x-2 hover:bg-purple-600 p-2 rounded-lg">
              <span>⚙️</span>
              <span>Settings</span>
            </a>
          </li>
        </ul>
      </div>

      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Loan Applications</h1>
          <div className="flex items-center space-x-4">
            <span>👤 Admin</span>
            <button
              onClick={() => {
                localStorage.removeItem("token"); // Clear the token from localStorage
                navigate("/login"); // Redirect to login page
              }}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          {error && (
            <div className="bg-red-500 text-white p-4 rounded-md mb-4">
              {error}
            </div>
          )}
          <h2 className="text-xl font-bold mb-4">Manage Loan Applications</h2>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Subcategory</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan._id} className="border-b">
                  <td className="p-3">{loan.category}</td>
                  <td className="p-3">{loan.subcategory}</td>
                  <td className="p-3">PKR {loan.amount}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${loan.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : loan.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {loan.status}
                    </span>
                  </td>
                  <td className="p-3 flex gap-2">
                    {loan.status === "Pending" && (
                      <>
                        <button
                          onClick={() => updateApplicationStatus(loan._id, "approved")}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateApplicationStatus(loan._id, "rejected")}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
