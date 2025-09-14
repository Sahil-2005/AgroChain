import React from 'react';
import { Leaf, Package, Truck, Store, ShoppingCart, Shield, Clock, Users } from 'lucide-react';
import Footer from '../components/Footer';
import { useNavigate } from "react-router-dom";



export  function Homepage() {
  const navigate = useNavigate();

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white via-green-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-gradient-to-r from-green-100 to-green-200 text-green-800 px-6 py-3 rounded-full text-sm font-medium mb-6 fade-in shadow-sm">
            🌱 Blockchain-Powered Transparency
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 fade-in-delay-1">
            Track Your Food
          </h1>
          <h1 className="text-5xl md:text-6xl font-bold mb-8 fade-in-delay-2">
            from <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">Farm to Table</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto fade-in-delay-3">
            Revolutionary blockchain technology ensuring complete transparency in 
            agricultural supply chains. Know exactly where your food comes from, 
            every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-delay-3">
            <button onClick={() => navigate("/trace")} className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 flex items-center justify-center btn-animate shadow-lg">
              <Package className="mr-2 h-5 w-5" />
              Trace Produce Now
            </button>
            <button onClick={() => navigate("/login")} className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 btn-animate">
              Join as Partner
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How AgroChain Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our blockchain-based system creates an immutable record of your produce 
              journey, ensuring transparency and trust at every step.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Leaf className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-sm text-green-600 font-semibold mb-1">Step 1 • FARMER</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Harvest & Record</h3>
              <p className="text-gray-600 mb-4">
                Farmers register their produce on the blockchain with harvest date, location, and quality certifications. Each batch gets a unique QR code.
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <Shield className="h-4 w-4 mr-2" />
                Blockchain Verified
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Truck className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-sm text-green-600 font-semibold mb-1">Step 2 • DISTRIBUTOR</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Transport & Track</h3>
              <p className="text-gray-600 mb-4">
                Distributors update the blockchain with transport conditions, storage details, and delivery timestamps for complete traceability.
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-2" />
                Real-time Updates
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Store className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-sm text-green-600 font-semibold mb-1">Step 3 • RETAILER</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Stock & Display</h3>
              <p className="text-gray-600 mb-4">
                Retailers receive verified produce and update final pricing, display conditions, and availability for consumer transparency.
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <Users className="h-4 w-4 mr-2" />
                Consumer Ready
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <ShoppingCart className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-sm text-green-600 font-semibold mb-1">Step 4 • CONSUMER</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Scan & Verify</h3>
              <p className="text-gray-600 mb-4">
                Consumers scan the QR code to see the complete journey of their food, from farm to table, with all verification details.
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <Shield className="h-4 w-4 mr-2" />
                Full Transparency
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              Try Tracing Now
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose AgriTrace Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose AgroChain?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built on blockchain technology to ensure trust, transparency, and efficiency 
              across the entire agricultural supply chain.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Immutable Records</h3>
              <p className="text-gray-600">
                Blockchain technology ensures that all supply chain data cannot be tampered with or falsified.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Real-Time Tracking</h3>
              <p className="text-gray-600">
                Get instant updates on produce location, condition, and status throughout the supply chain.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Consumer Trust</h3>
              <p className="text-gray-600">
                Build consumer confidence with complete transparency and verifiable quality assurance.
              </p>
            </div>
          </div>
        </div>
      </section>

      
    </div>
    <Footer/>
</>
  );
}