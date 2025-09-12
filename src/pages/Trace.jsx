import React, { useState } from 'react';
import { QrCode, MapPin, Calendar, CheckCircle, Truck, Store, ShoppingCart, User, Leaf, Award, Shield } from 'lucide-react';
import Footer from '../components/Footer';

const Trace = () => {
  const [qrCode, setQrCode] = useState('OR001');
  const [selectedDemo, setSelectedDemo] = useState('OR001');

  const demoProducts = {
    OR001: {
      name: 'Organic Tomatoes',
      batchId: 'TOM-2024-001',
      farm: 'Green Valley Farm',
      location: 'Fresno, California',
      harvestDate: '2024-01-15',
      certifications: ['Organic', 'Non-GMO', 'Fair Trade'],
      journey: [
        {
          stage: 'Harvested',
          date: '2024-01-15',
          time: '06:30 AM',
          location: 'Green Valley Farm, Fresno, CA',
          description: 'Fresh organic tomatoes harvested at peak ripeness',
          price: '$2.50/lb',
          temp: '68°F',
          grade: 'Grade A',
          verified: true
        },
        {
          stage: 'Collected & Transported',
          date: '2024-01-16',
          time: '03:00 AM',
          location: 'FreshLink Distribution, Sacramento, CA',
          description: 'Temperature-controlled transport, quality inspection passed',
          price: '$3.20/lb',
          temp: '39°F',
          grade: 'Grade A',
          verified: true
        },
        {
          stage: 'Received at Store',
          date: '2024-01-17',
          time: '10:15 AM',
          location: 'Organic Market, San Francisco, CA',
          description: 'Final quality check completed, ready for sale',
          price: '$4.99/lb',
          temp: '36°F',
          grade: 'Grade A',
          verified: true
        },
        {
          stage: 'Available for Purchase',
          date: '2024-01-17',
          time: '12:00 PM',
          location: 'Organic Market, San Francisco, CA',
          description: 'Fresh organic tomatoes ready for consumers',
          price: '$4.99/lb',
          temp: '36°F',
          grade: 'Grade A',
          verified: true
        }
      ],
      pricing: [
        { role: 'Farmer', location: 'Green Valley Farm, Fresno, CA', price: '$2.50/lb' },
        { role: 'Distributor', location: 'FreshLink Distribution, Sacramento, CA', price: '$3.20/lb' },
        { role: 'Retailer', location: 'Organic Market, San Francisco, CA', price: '$4.99/lb' },
        { role: 'Consumer', location: 'Organic Market, San Francisco, CA', price: '$4.99/lb' }
      ]
    },
    OR002: {
      name: 'Free-Range Eggs',
      batchId: 'EGG-2024-002',
      farm: 'Happy Hens Farm',
      location: 'Napa, California',
      harvestDate: '2024-01-20',
      certifications: ['Organic', 'Free-Range', 'Cage-Free'],
      journey: [
        {
          stage: 'Collected',
          date: '2024-01-20',
          time: '07:00 AM',
          location: 'Happy Hens Farm, Napa, CA',
          description: 'Fresh free-range eggs collected from happy hens',
          price: '$3.00/dozen',
          temp: '45°F',
          grade: 'Grade AA',
          verified: true
        }
      ],
      pricing: [
        { role: 'Farmer', location: 'Happy Hens Farm, Napa, CA', price: '$3.00/dozen' }
      ]
    }
  };

  const currentProduct = demoProducts[selectedDemo];

  const getStageIcon = (stage) => {
    switch (stage) {
      case 'Harvested': return <Leaf className="w-5 h-5" />;
      case 'Collected & Transported': return <Truck className="w-5 h-5" />;
      case 'Received at Store': return <Store className="w-5 h-5" />;
      case 'Available for Purchase': return <ShoppingCart className="w-5 h-5" />;
      default: return <CheckCircle className="w-5 h-5" />;
    }
  };

  const handleTrace = () => {
    if (qrCode === 'OR001' || qrCode === 'OR002') {
      setSelectedDemo(qrCode);
    }
  };

  return (
    <>
    <div className="min-h-screen bg-gray-50">
    
      

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Consumer Traceability Badge */}
        <div className="text-center mb-8">
          <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
            Consumer Traceability
          </span>
        </div>

        {/* Main Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Trace Your Produce</h1>
          <p className="text-gray-600 text-lg">
            Scan or enter a QR code to see the complete journey of your produce from farm
            <br />
            to table, verified by blockchain technology.
          </p>
        </div>

        {/* QR Code Scanner Section */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <QrCode className="w-6 h-6 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">QR Code Scanner</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Scan the QR code on your produce packaging or enter it manually
          </p>
          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">QR Code</label>
              <input
                type="text"
                value={qrCode}
                onChange={(e) => setQrCode(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter QR code"
              />
            </div>
            <button
              onClick={handleTrace}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors mt-6"
            >
              Trace
            </button>
          </div>
        </div>

        {/* Demo QR Codes */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Demo QR Codes</h3>
          <p className="text-gray-600 mb-4">Try these sample QR codes to explore the traceability features</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold text-gray-900">OR001</div>
                  <div className="text-sm text-gray-600">Organic Tomatoes</div>
                </div>
                <button
                  onClick={() => setSelectedDemo('OR001')}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Use Code
                </button>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold text-gray-900">OR002</div>
                  <div className="text-sm text-gray-600">Free-Range Eggs</div>
                </div>
                <button
                  onClick={() => setSelectedDemo('OR002')}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Use Code
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Information */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">{currentProduct.name}</h2>
            </div>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
              <Shield className="w-4 h-4" />
              <span>Blockchain Verified</span>
            </span>
          </div>
          <p className="text-gray-600 mb-6">Batch ID: {currentProduct.batchId}</p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Farm Information */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <MapPin className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Farm Information</h3>
              </div>
              <div className="space-y-2 text-gray-700">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{currentProduct.farm}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{currentProduct.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Harvested: {currentProduct.harvestDate}</span>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Award className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Certifications</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {currentProduct.certifications.map((cert, index) => (
                  <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    {cert}
                  </span>
                ))}
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4" />
                  <span>Verified</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Supply Chain Journey */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <CheckCircle className="w-6 h-6 text-gray-600" />
            <h3 className="text-xl font-bold text-gray-900">Supply Chain Journey</h3>
          </div>
          <p className="text-gray-600 mb-6">Complete traceability from farm to your table</p>

          <div className="space-y-6">
            {currentProduct.journey.map((step, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    {getStageIcon(step.stage)}
                  </div>
                </div>
                <div className="flex-1 bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                      <span>{step.stage}</span>
                      {step.verified && <CheckCircle className="w-4 h-4 text-green-600" />}
                    </h4>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    {step.date} at {step.time} • {step.location}
                  </div>
                  <p className="text-gray-700 mb-3">{step.description}</p>
                  <div className="flex items-center space-x-6 text-sm">
                    <span className="font-medium">{step.price}</span>
                    <span>{step.temp}</span>
                    <span>{step.grade}</span>
                    {step.verified && (
                      <span className="text-green-600 flex items-center space-x-1">
                        <CheckCircle className="w-4 h-4" />
                        <span>Verified</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing History */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-green-600 text-xl">$</span>
            <h3 className="text-xl font-bold text-gray-900">Pricing History</h3>
          </div>
          <p className="text-gray-600 mb-6">Price changes throughout the supply chain</p>

          <div className="space-y-4">
            {currentProduct.pricing.map((price, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div>
                  <div className="font-semibold text-gray-900">{price.role}</div>
                  <div className="text-sm text-gray-600">{price.location}</div>
                </div>
                <div className="text-lg font-bold text-gray-900">{price.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    <Footer/>
    </>
  );
};

export default Trace;