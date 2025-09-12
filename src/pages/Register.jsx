import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const roleInputs = {
  farmer: [
    { name: "name", label: "Full Name / Farm Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: "Phone Number", type: "tel" },
    { name: "location", label: "Location / Village / District", type: "text" },
    { name: "password", label: "Password / OTP", type: "password" },
  ],
  distributor: [
    { name: "name", label: "Business / Company Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: "Phone Number", type: "tel" },
    { name: "license", label: "Business License / GST ID", type: "text" },
    { name: "password", label: "Password", type: "password" },
  ],
  retailer: [
    { name: "name", label: "Shop / Business Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: "Phone Number", type: "tel" },
    { name: "password", label: "Password", type: "password" },
  ],
};

export default function Register() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Pre-select role if ?role= is present in URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const role = params.get("role");
    if (role && ["farmer", "distributor", "retailer"].includes(role)) {
      setSelectedRole(role);
    }
  }, [location.search]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: selectedRole, ...formData })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      setSuccess(`Registration successful as ${selectedRole}!`);
      if (login && data.token) {
        login(data.token, data.user);
        navigate(`/${selectedRole}-dashboard`);
      } else {
        setTimeout(() => navigate('/login'), 1000);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex flex-col items-center justify-center px-6 py-12">
      {!selectedRole ? (
        <>
          <div className="text-center mb-10 fade-in">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              Register Your Role
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl">
              Select your role in the agricultural supply chain to create your account.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 text-center card-hover fade-in-delay-1">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👩‍🌾</span>
              </div>
              <h3 className="text-xl font-bold text-green-700 mb-3">Farmer</h3>
              <p className="text-gray-600 mb-6">Register as a farmer to track your produce and connect with distributors.</p>
              <button
                onClick={() => { setSelectedRole("farmer"); setFormData({}); }}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 btn-animate shadow-lg"
              >
                Register as Farmer
              </button>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 text-center card-hover fade-in-delay-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-bold text-blue-700 mb-3">Distributor</h3>
              <p className="text-gray-600 mb-6">Register as a distributor to manage logistics and connect farmers with retailers.</p>
              <button
                onClick={() => { setSelectedRole("distributor"); setFormData({}); }}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 btn-animate shadow-lg"
              >
                Register as Distributor
              </button>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 text-center card-hover fade-in-delay-3">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛒</span>
              </div>
              <h3 className="text-xl font-bold text-purple-700 mb-3">Retailer</h3>
              <p className="text-gray-600 mb-6">Register as a retailer to source quality produce and serve consumers.</p>
              <button
                onClick={() => { setSelectedRole("retailer"); setFormData({}); }}
                className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 btn-animate shadow-lg"
              >
                Register as Retailer
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full max-w-md border border-gray-200 rounded-2xl shadow-xl p-8 bg-white card-hover scale-in">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">
                {selectedRole === 'farmer' ? '👩‍🌾' : selectedRole === 'distributor' ? '🚚' : '🛒'}
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent capitalize">
              {selectedRole} Registration
            </h3>
            <p className="text-gray-600 text-sm">Fill in your details to get started</p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {roleInputs[selectedRole].map((input, idx) => (
              <div key={idx}>
                <label className="block text-sm text-gray-600 mb-1">
                  {input.label}
                </label>
                <input
                  name={input.name}
                  type={input.type}
                  placeholder={input.label}
                  value={formData[input.name] || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                  required
                />
              </div>
            ))}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 btn-animate shadow-lg font-medium"
            >
              Register as {selectedRole}
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{' '}
            <a
              href="/login"
              className="text-green-600 hover:underline"
            >
              Login
            </a>
          </p>
          <p
            onClick={() => setSelectedRole(null)}
            className="text-center text-sm text-gray-500 mt-6 cursor-pointer hover:text-green-600"
          >
            Change Role
          </p>
        </div>
      )}
    </div>
  );
}
