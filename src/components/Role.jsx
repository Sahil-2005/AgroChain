// src/components/Role.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Role() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Mock credentials
  const mockUsers = {
    farmer: {
      "Ramesh Farm": { phone: "9876543210", location: "Nashik", password: "farmer123" },
    },
    distributor: {
      "Agro Distributors": { email: "distributor@mail.com", phone: "9998887777", license: "GST12345", password: "dist123" },
    },
    retailer: {
      "FreshMart": { email: "retail@mail.com", phone: "8887776666", password: "retail123" },
    },
  };

  // Login input configs: only name and password for each role
  const roleInputs = {
    farmer: [
      { name: "name", label: "Full Name / Farm Name", type: "text" },
      { name: "password", label: "Password / OTP", type: "password" },
    ],
    distributor: [
      { name: "name", label: "Business / Company Name", type: "text" },
      { name: "password", label: "Password", type: "password" },
    ],
    retailer: [
      { name: "name", label: "Shop / Business Name", type: "text" },
      { name: "password", label: "Password", type: "password" },
    ],
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const roleData = mockUsers[selectedRole];
    const user = roleData[formData.name];

    if (user) {
      let isValid = true;
      Object.keys(user).forEach((key) => {
        if (user[key] !== formData[key]) {
          isValid = false;
        }
      });

      if (isValid) {
        navigate(`/${selectedRole}-dashboard`);
      } else {
        setError("❌ Invalid credentials. Please try again.");
      }
    } else {
      setError("❌ User not found.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
      {!selectedRole ? (
        <>
          <h2 className="text-3xl font-bold text-green-600 text-center mb-2">
            Choose Your Role
          </h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl">
            Select your role in the agricultural supply chain to access your
            personalized dashboard and tools.
          </p>

          <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl">
            {/* Farmer */}
            <div className="border rounded-2xl shadow-md p-6 text-center">
              <h3 className="text-xl font-bold text-green-700 mb-2">👩‍🌾 Farmer</h3>
              <p className="text-gray-600 mb-4">
                Register and track your produce from harvest to market
              </p>
              <ul className="text-sm text-gray-500 mb-6 space-y-1 text-left">
                <li>• Add new produce batches</li>
                <li>• Generate QR codes</li>
                <li>• Track supply chain</li>
                <li>• Manage distributor requests</li>
              </ul>
              <button
                onClick={() => { setSelectedRole("farmer"); setFormData({}); }}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Select Farmer
              </button>
            </div>

            {/* Distributor */}
            <div className="border rounded-2xl shadow-md p-6 text-center">
              <h3 className="text-xl font-bold text-green-700 mb-2">🚚 Distributor</h3>
              <p className="text-gray-600 mb-4">
                Manage logistics and connect farmers with retailers
              </p>
              <ul className="text-sm text-gray-500 mb-6 space-y-1 text-left">
                <li>• View farmer inventory</li>
                <li>• Request produce batches</li>
                <li>• Track shipments</li>
                <li>• Notify retailers</li>
              </ul>
              <button
                onClick={() => { setSelectedRole("distributor"); setFormData({}); }}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Select Distributor
              </button>
            </div>

            {/* Retailer */}
            <div className="border rounded-2xl shadow-md p-6 text-center">
              <h3 className="text-xl font-bold text-green-700 mb-2">🛒 Retailer</h3>
              <p className="text-gray-600 mb-4">
                Source quality produce and serve consumers
              </p>
              <ul className="text-sm text-gray-500 mb-6 space-y-1 text-left">
                <li>• Browse distributor catalog</li>
                <li>• Request products</li>
                <li>• Manage inventory</li>
                <li>• Consumer transparency</li>
              </ul>
              <button
                onClick={() => { setSelectedRole("retailer"); setFormData({}); }}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Select Retailer
              </button>
            </div>
          </div>
        </>
      ) : (
        // Small login card when role is selected
        <div className="w-full max-w-md border rounded-2xl shadow-lg p-8 bg-white">
          <h3 className="text-2xl font-bold text-green-700 mb-6 text-center capitalize">
            {selectedRole} Login
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
                />
              </div>
            ))}

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Sign In as {selectedRole}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            Don't have an account?{' '}
            <a
              href={`/register?role=${selectedRole}`}
              className="text-green-600 hover:underline"
            >
              Register as {selectedRole}
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
