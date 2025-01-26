import {Route, Routes } from "react-router";
import Register from "./pages/Register";
import Login from "./pages/Login";
import LoanRequest from "./pages/LoanRequest";
import AdminDashboard from "./pages/AdminDashboard";
import LandingPage from "./pages/LandingPage";

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loan" element={<LoanRequest />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
  );
};

export default App;