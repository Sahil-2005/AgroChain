import React, { useState } from 'react';
import { 
  Leaf, 
  Package, 
  Truck, 
  Store, 
  Users, 
  DollarSign, 
  Clock, 
  TrendingUp, 
  Search,
  Filter,
  MapPin,
  Star,
  CheckCircle,
  Thermometer,
  Bell,
  Eye,
  Send,
  ShoppingCart
} from 'lucide-react';
import Footer from '../components/Footer';


const DistributorDashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState('All Areas');
  const [selectedProductType, setSelectedProductType] = useState('All Products');

  // Sample data
  const dashboardStats = {
    partnerFarmers: 3,
    activeInventory: 2,
    inTransit: 1,
    avgMargin: '28%'
  };

  const recentInventoryActivity = [
    {
      name: 'Organic Tomatoes',
      quantity: '300 lbs',
      farm: 'Green Valley Farm',
      status: 'In Storage',
      price: '$3.2/unit'
    },
    {
      name: 'Free-Range Eggs',
      quantity: '100 dozen',
      farm: 'Sunrise Poultry Farm',
      status: 'In Transit',
      price: '$4.2/unit'
    }
  ];

  const farmers = [
    {
      name: 'Green Valley Farm',
      location: 'Fresno, California',
      rating: '4.8/5',
      region: 'Central Valley',
      activeBatches: 3,
      verified: true,
      specialties: ['Organic Tomatoes', 'Bell Peppers', 'Cucumbers'],
      products: [
        { name: 'Organic Tomatoes', quantity: '500 lbs', price: '$2.5/unit', grade: 'Grade A' },
        { name: 'Bell Peppers', quantity: '300 lbs', price: '$3.2/unit', grade: 'Grade A' }
      ]
    },
    {
      name: 'Sunrise Poultry Farm',
      location: 'Petaluma, California',
      rating: '4.6/5',
      region: 'North Bay',
      activeBatches: 2,
      verified: true,
      specialties: ['Free-Range Eggs', 'Organic Chicken'],
      products: [
        { name: 'Free-Range Eggs', quantity: '200 dozen', price: '$3/unit', grade: 'Grade AA' }
      ]
    },
    {
      name: 'Coastal Organic Farm',
      location: 'Salinas, California',
      rating: '4.9/5',
      region: 'Central Coast',
      activeBatches: 5,
      verified: true,
      specialties: ['Lettuce', 'Spinach', 'Kale'],
      products: [
        { name: 'Romaine Lettuce', quantity: '400 heads', price: '$1.25/unit', grade: 'Grade A' },
        { name: 'Baby Spinach', quantity: '150 lbs', price: '$4.5/unit', grade: 'Premium' }
      ]
    }
  ];

  const inventory = [
    {
      name: 'Organic Tomatoes',
      farm: 'Green Valley Farm',
      received: '2024-01-16',
      quantity: '300 lbs',
      purchasePrice: '$2.5',
      currentPrice: '$3.2',
      retailPrice: '$4.2',
      status: 'in storage',
      storage: {
        location: 'Warehouse A',
        temperature: '35°F'
      },
      verified: true
    },
    {
      name: 'Free-Range Eggs',
      farm: 'Sunrise Poultry Farm',
      received: '2024-01-18',
      quantity: '100 dozen',
      purchasePrice: '$3',
      currentPrice: '$4.2',
      retailPrice: '$5.5',
      status: 'in transit',
      storage: {
        location: 'Cold Storage B',
        temperature: '38°F'
      },
      verified: true
    }
  ];

  const retailers = [
    {
      name: 'Organic Market SF',
      location: 'San Francisco, CA',
      rating: '4.7/5'
    },
    {
      name: 'Fresh Foods Plus',
      location: 'Oakland, CA',
      rating: '4.5/5'
    },
    {
      name: 'Green Grocers',
      location: 'Berkeley, CA',
      rating: '4.8/5'
    }
  ];

  const filteredFarmers = farmers.filter(farmer => 
    farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedArea === 'All Areas' || farmer.region === selectedArea)
  );

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Partner Farmers</p>
              <p className="text-3xl font-bold text-gray-900">{dashboardStats.partnerFarmers}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Inventory</p>
              <p className="text-3xl font-bold text-gray-900">{dashboardStats.activeInventory}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Truck className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Transit</p>
              <p className="text-3xl font-bold text-gray-900">{dashboardStats.inTransit}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Margin</p>
              <p className="text-3xl font-bold text-gray-900">{dashboardStats.avgMargin}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Inventory Activity */}
      <div className="bg-white rounded-xl border p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Recent Inventory Activity</h3>
        <p className="text-gray-600 mb-6">Latest updates on your product inventory</p>
        
        <div className="space-y-4">
          {recentInventoryActivity.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.quantity} • From {item.farm}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">{item.status}</p>
                <p className="font-bold text-gray-900">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFarmers = () => (
    <div className="space-y-6">
      {/* Filter Section */}
      <div className="bg-white rounded-xl border p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filter Farmers</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search farmers..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Area</label>
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option>All Areas</option>
              <option>Central Valley</option>
              <option>North Bay</option>
              <option>Central Coast</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Type</label>
            <select
              value={selectedProductType}
              onChange={(e) => setSelectedProductType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option>All Products</option>
              <option>Vegetables</option>
              <option>Fruits</option>
              <option>Eggs & Dairy</option>
            </select>
          </div>
        </div>
        
        <button className="mt-4 text-gray-600 hover:text-gray-800 text-sm">
          Clear Filters
        </button>
      </div>

      {/* Farmers List */}
      <div className="space-y-4">
        {filteredFarmers.map((farmer, index) => (
          <div key={index} className="bg-white rounded-xl border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                  <span>{farmer.name}</span>
                  {farmer.verified && <CheckCircle className="w-5 h-5 text-green-600" />}
                </h3>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">{farmer.region}</p>
                <p className="font-medium">{farmer.activeBatches} active batches</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{farmer.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{farmer.rating}</span>
              </div>
            </div>

            {/* Specialties */}
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Specialties</h4>
              <div className="flex flex-wrap gap-2">
                {farmer.specialties.map((specialty, specialtyIndex) => (
                  <span 
                    key={specialtyIndex}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Available Products */}
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-3">Available Products</h4>
              <div className="space-y-2">
                {farmer.products.map((product, productIndex) => (
                  <div key={productIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.quantity} • {product.price} • {product.grade}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="flex items-center space-x-1 px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm transition-colors">
                        <Send className="w-3 h-3" />
                        <span>Request</span>
                      </button>
                      <button className="flex items-center space-x-1 px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm transition-colors">
                        <ShoppingCart className="w-3 h-3" />
                        <span>Purchase</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 text-sm">
              <Eye className="w-4 h-4" />
              <span>View Farmer Details</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderInventory = () => (
    <div className="space-y-6">
      {inventory.map((item, index) => (
        <div key={index} className="bg-white rounded-xl border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                <span>{item.name}</span>
                {item.verified && <CheckCircle className="w-5 h-5 text-green-600" />}
              </h3>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              item.status === 'in storage' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {item.status}
            </span>
          </div>

          <p className="text-gray-600 mb-6">From {item.farm} • Received {item.received}</p>

          {/* Price Grid */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div>
              <p className="text-sm font-medium text-gray-700">Quantity</p>
              <p className="text-xl font-bold text-gray-900">{item.quantity}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Purchase Price</p>
              <p className="text-xl font-bold text-gray-900">{item.purchasePrice}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Current Price</p>
              <p className="text-xl font-bold text-gray-900">{item.currentPrice}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Retail Price</p>
              <p className="text-xl font-bold text-gray-900">{item.retailPrice}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-6">
            {/* Storage Details */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Storage Details</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-gray-700">
                  <MapPin className="w-4 h-4" />
                  <span>{item.storage.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <Thermometer className="w-4 h-4" />
                  <span>{item.storage.temperature}</span>
                </div>
              </div>
            </div>

            {/* Verification */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Verification</h4>
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span>Authenticity Verified</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              <Bell className="w-4 h-4" />
              <span>Notify Retailers</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              <Truck className="w-4 h-4" />
              <span>Update Transport</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
// ...existing code...
const renderRetailers = () => (
  <div className="bg-white rounded-xl border p-6">
    <h3 className="text-xl font-bold text-gray-900 mb-2">Retail Partners</h3>
    <p className="text-gray-600 mb-6">Manage relationships with retail partners</p>

    <div className="space-y-4">
      {retailers.map((retailer, index) => (
        <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h4 className="font-bold text-gray-900">{retailer.name}</h4>
            <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-600 mt-2">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{retailer.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>Rating: {retailer.rating}</span>
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0 sm:ml-4 w-full sm:w-auto">
            <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors w-full sm:w-auto">
              <Bell className="w-4 h-4" />
              <span>Notify</span>
            </button>
            <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors w-full sm:w-auto">
              <Eye className="w-4 h-4" />
              <span>View Details</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
// ...existing code...

  const tabs = [
    { name: 'Overview', component: renderOverview },
    { name: 'Farmers', component: renderFarmers },
    { name: 'Inventory', component: renderInventory },
    { name: 'Retailers', component: renderRetailers }
  ];

  return (
    <>
   
    <div className="min-h-screen bg-gray-50">
    

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Distributor Dashboard</h1>
          <p className="text-gray-600 text-lg">
            Source products from farmers and manage distribution to retailers
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex flex-wrap gap-2 md:space-x-8 md:flex-row md:gap-0 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`py-2 px-4 font-medium rounded-lg transition-colors flex-1 min-w-[140px] ${
                  activeTab === tab.name
                    ? 'bg-white text-gray-900 border border-gray-300'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div>
          {tabs.find(tab => tab.name === activeTab)?.component()}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default DistributorDashboard;