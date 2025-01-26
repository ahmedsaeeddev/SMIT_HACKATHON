import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-600 to-blue-500 text-white text-center p-6">
      <h1 className="text-5xl font-bold mb-8">Saylani Microfinance App</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 ">
        <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg hover:bg-opacity-20 transition duration-300 text-black">
          <h2 className="text-2xl font-bold mb-4">Wedding Loans</h2>
          <p>
            Financial support for weddings, including Valima, Jahez, and more.
          </p>
        </div>

        <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg text-black">
          <h2 className="text-2xl font-bold mb-4">Home Construction Loans</h2>
          <p>
            Loans for building or renovating your home.
          </p>
        </div>

        <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg text-black">
          <h2 className="text-2xl font-bold mb-4">Business Startup Loans</h2>
          <p>
            Support for starting or expanding your business.
          </p>
        </div>

        <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg text-black">
          <h2 className="text-2xl font-bold mb-4">Education Loans</h2>
          <p>
            Loans for university fees and child education.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link
          to="/register"
          className="text-lg px-6 py-2 border-2 border-white rounded-lg hover:bg-white hover:text-purple-600 transition duration-300"
        >
          Register
        </Link>
        <span className="text-2xl">|</span>
        <Link
          to="/login"
          className="text-lg px-6 py-2 border-2 border-white rounded-lg hover:bg-white hover:text-purple-600 transition duration-300"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;