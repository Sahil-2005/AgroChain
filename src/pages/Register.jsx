import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const roleInputs = {
  farmer: [
    { name: "name", label: "Full Name / Farm Name", type: "text" },
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    // Here you would send formData to your backend for registration
    setSuccess(`Registration successful as ${selectedRole}!`);
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
      {!selectedRole ? (
        <>
          <h2 className="text-3xl font-bold text-green-600 text-center mb-2">
            Register Your Role
          </h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl">
            Select your role in the agricultural supply chain to create your account.
          </p>
          <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl">
            <div className="border rounded-2xl shadow-md p-6 text-center">
              <h3 className="text-xl font-bold text-green-700 mb-2">👩‍🌾 Farmer</h3>
              <p className="text-gray-600 mb-4">Register as a farmer to track your produce.</p>
              <button
                onClick={() => { setSelectedRole("farmer"); setFormData({}); }}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Register as Farmer
              </button>
            </div>
            <div className="border rounded-2xl shadow-md p-6 text-center">
              <h3 className="text-xl font-bold text-green-700 mb-2">🚚 Distributor</h3>
              <p className="text-gray-600 mb-4">Register as a distributor to manage logistics.</p>
              <button
                onClick={() => { setSelectedRole("distributor"); setFormData({}); }}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Register as Distributor
              </button>
            </div>
            <div className="border rounded-2xl shadow-md p-6 text-center">
              <h3 className="text-xl font-bold text-green-700 mb-2">🛒 Retailer</h3>
              <p className="text-gray-600 mb-4">Register as a retailer to source quality produce.</p>
              <button
                onClick={() => { setSelectedRole("retailer"); setFormData({}); }}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Register as Retailer
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full max-w-md border rounded-2xl shadow-lg p-8 bg-white">
          <h3 className="text-2xl font-bold text-green-700 mb-6 text-center capitalize">
            {selectedRole} Registration
          </h3>
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
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            ))}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
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
            ← Change Role
          </p>
        </div>
      )}
    </div>
  );
}
