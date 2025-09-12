import React, { useState } from 'react';
import { 
  Leaf, 
  Package, 
  Truck, 
  Store, 
  User, 
  Plus, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  QrCode,
  MapPin,
  AlertCircle,
  Check,
  X,
  Send,
  Star
} from 'lucide-react';
import Footer from '../components/Footer';

const FarmerDashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [formData, setFormData] = useState({
    productName: '',
    quantity: '',
    harvestDate: '',
    farmLocation: '',
    basePrice: '',
    description: ''
  });

  // Sample data
  const dashboardStats = {
    totalBatches: 3,
    inTransit: 1,
    atRetail: 1,
    pendingRequests: 2
  };
  const [recentActivity, setRecentActivity] = useState([
    {
      name: 'Organic Tomatoes',
      batch: 'TOM-2024-001',
      quantity: '500 lbs',
      status: 'Retailer',
      price: '$4.99/unit',
      icon: Store
    },
    {
      name: 'Baby Carrots',
      batch: 'CAR-2024-002',
      quantity: '300 lbs',
      status: 'Distributor',
      price: '$2.4/unit',
      icon: Truck
    },
    {
      name: 'Romaine Lettuce',
      batch: 'LET-2024-003',
      quantity: '200 heads',
      status: 'Farmer',
      price: '$1.25/unit',
      icon: Package
    }
  ]);

  const inventory = [
    {
      name: 'Organic Tomatoes',
      batch: 'TOM-2024-001',
      quantity: '500 lbs',
      harvestDate: '2024-01-15',
      location: 'Field A-1',
      basePrice: '$2.5',
      currentPrice: '$4.99',
      increase: '+99.6%',
      supplyChain: [
        { stage: 'Farmer', price: '$2.5', active: true },
        { stage: 'Distributor', price: '$3.2', company: 'FreshLink Distribution', active: true },
        { stage: 'Retailer', price: '$4.99', company: 'Organic Market SF', active: true },
        { stage: 'Consumer', active: false }
      ]
    },
    {
      name: 'Baby Carrots',
      batch: 'CAR-2024-002',
      quantity: '300 lbs',
      harvestDate: '2024-01-18',
      location: 'Field B-2',
      basePrice: '$1.8',
      currentPrice: '$2.4',
      increase: '+33.3%',
      supplyChain: [
        { stage: 'Farmer', price: '$1.8', active: true },
        { stage: 'Distributor', price: '$2.4', company: 'Valley Fresh Logistics', active: true },
        { stage: 'Retailer', active: false },
        { stage: 'Consumer', active: false }
      ]
    },
    {
      name: 'Romaine Lettuce',
      batch: 'LET-2024-003',
      quantity: '200 heads',
      harvestDate: '2024-01-20',
      location: 'Greenhouse 1',
      basePrice: '$1.25',
      currentPrice: '$1.25',
      increase: '+0.0%',
      supplyChain: [
        { stage: 'Farmer', price: '$1.25', active: true },
        { stage: 'Distributor', active: false },
        { stage: 'Retailer', active: false },
        { stage: 'Consumer', active: false }
      ]
    }
  ];

  const distributorRequests = [
    {
      name: 'FreshLink Distribution',
      location: 'Sacramento, CA',
      product: 'Organic Tomatoes',
      quantity: '200 lbs',
      price: '$3/unit',
      description: 'Looking for premium organic tomatoes for our premium retail partners.',
      status: 'pending'
    },
    {
      name: 'Valley Fresh Logistics',
      location: 'Fresno, CA',
      product: 'Romaine Lettuce',
      quantity: '150 heads',
      price: '$1.6/unit',
      description: 'Need fresh lettuce for restaurant chain delivery.',
      status: 'pending'
    }
  ];

  const distributorContacts = [
    {
      name: 'FreshLink Distribution',
      location: 'Sacramento, CA',
      rating: '4.8/5'
    },
    {
      name: 'Valley Fresh Logistics',
      location: 'Fresno, CA',
      rating: '4.6/5'
    },
    {
      name: 'Golden State Produce',
      location: 'Los Angeles, CA',
      rating: '4.7/5'
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddProduct = () => {
    setRecentActivity([
      {
        name: formData.productName,
        batch: `${formData.productName?.slice(0,3)?.toUpperCase() || 'NEW'}-${new Date().getFullYear()}-${Math.floor(Math.random()*1000).toString().padStart(3,'0')}`,
        quantity: formData.quantity,
        status: 'Farmer',
        price: `$${formData.basePrice}/unit`,
        icon: Package
      },
      ...recentActivity
    ]);
    setFormData({
      productName: '',
      quantity: '',
      harvestDate: '',
      farmLocation: '',
      basePrice: '',
      description: ''
    });
  };

  const getSupplyChainIcon = (stage) => {
    switch (stage) {
      case 'Farmer': return Package;
      case 'Distributor': return Truck;
      case 'Retailer': return Store;
      case 'Consumer': return User;
      default: return Package;
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Batches</p>
              <p className="text-3xl font-bold text-gray-900">{recentActivity.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Transit</p>
              <p className="text-3xl font-bold text-gray-900">{dashboardStats.inTransit}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Truck className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">At Retail</p>
              <p className="text-3xl font-bold text-gray-900">{dashboardStats.atRetail}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Store className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Requests</p>
              <p className="text-3xl font-bold text-gray-900">{dashboardStats.pendingRequests}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>
      {/* Recent Activity */}
      <div className="bg-white rounded-xl border p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Recent Produce Activity</h3>
        <p className="text-gray-600 mb-6">Latest updates on your produce batches</p>
        <div className="space-y-4">
          {recentActivity.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.quantity} • {item.batch}</p>
                </div>
              </div>
              <div className="text-right mt-2 sm:mt-0">
                <p className="text-sm text-gray-600">{item.status}</p>
                <p className="font-bold text-gray-900">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAddProduct = () => (
    <div className="bg-white rounded-xl border p-6">
      <div className="flex items-center space-x-3 mb-4">
        <Plus className="w-6 h-6 text-gray-700" />
        <h3 className="text-xl font-bold text-gray-900">Add New Produce Batch</h3>
      </div>
      <p className="text-gray-600 mb-6">Register a new batch of produce to the blockchain</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            placeholder="e.g., Organic Tomatoes"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
          <input
            type="text"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            placeholder="e.g., 500 lbs"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Harvest Date</label>
          <input
            type="date"
            name="harvestDate"
            value={formData.harvestDate}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Farm Location</label>
          <input
            type="text"
            name="farmLocation"
            value={formData.farmLocation}
            onChange={handleInputChange}
            placeholder="e.g., Field A-1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Base Price (per unit)</label>
          <input
            type="text"
            name="basePrice"
            value={formData.basePrice}
            onChange={handleInputChange}
            placeholder="e.g., 2.50"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Additional details about the produce..."
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
      </div>
      <button
        onClick={handleAddProduct}
        className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
      >
        <Plus className="w-5 h-5" />
        <span>Add Produce & Generate QR Code</span>
      </button>
    </div>
  );

  const renderInventory = () => (
    <div className="space-y-6">
      {inventory.map((item, index) => (
        <div key={index} className="bg-white rounded-xl border p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
              <p className="text-gray-600">{item.quantity} • Harvested {item.harvestDate} • {item.location}</p>
              <p className="text-sm text-gray-500">{item.batch}</p>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors mt-2 sm:mt-0">
              <QrCode className="w-4 h-4" />
              <span className="text-sm font-medium">QR Code</span>
            </button>
          </div>
          {/* Supply Chain Progress */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-4">Supply Chain Progress</h4>
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-4">
              {item.supplyChain.map((stage, stageIndex) => {
                const IconComponent = getSupplyChainIcon(stage.stage);
                return (
                  <div key={stageIndex} className="flex flex-col items-center space-y-2 min-w-[80px]">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      stage.active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                    }`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{stage.stage}</p>
                      {stage.price && <p className="text-sm text-gray-600">{stage.price}</p>}
                      {stage.company && <p className="text-xs text-gray-500">{stage.company}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Price Information */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Base Price</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{item.basePrice}</p>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Current Price</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{item.currentPrice}</p>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Price Increase</span>
              </div>
              <p className="text-2xl font-bold text-green-600">{item.increase}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderRequests = () => (
    <div className="space-y-6">
      {/* Distributor Requests */}
      <div className="bg-white rounded-xl border p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Distributor Requests</h3>
        <p className="text-gray-600 mb-6">Manage incoming requests from distributors</p>
        <div className="space-y-6">
          {distributorRequests.map((request, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{request.name}</h4>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{request.location}</span>
                  </div>
                </div>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mt-2 sm:mt-0">
                  {request.status}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Requested Product</p>
                  <p className="text-gray-900">{request.product} • {request.quantity}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Offered Price</p>
                  <p className="text-gray-900">{request.price}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{request.description}</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors w-full sm:w-auto">
                  <Check className="w-4 h-4" />
                  <span>Accept</span>
                </button>
                <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors w-full sm:w-auto">
                  <X className="w-4 h-4" />
                  <span>Decline</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Request Distributors */}
      <div className="bg-white rounded-xl border p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Request Distributors</h3>
        <p className="text-gray-600 mb-6">Send requests to specific distributors for your produce</p>
        <div className="space-y-4">
          {distributorContacts.map((distributor, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-bold text-gray-900">{distributor.name}</h4>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{distributor.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>Rating: {distributor.rating}</span>
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                </div>
              </div>
              <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors w-full sm:w-auto mt-2 sm:mt-0">
                <Send className="w-4 h-4" />
                <span>Send Request</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const tabs = [
    { name: 'Overview', component: renderOverview },
    { name: 'Add Produce', component: renderAddProduct },
    { name: 'Inventory', component: renderInventory },
    { name: 'Requests', component: renderRequests }
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6 sm:py-8">
          {/* Dashboard Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Farmer Dashboard</h1>
            <p className="text-gray-600 text-base sm:text-lg">
              Manage your produce, track supply chain, and connect with distributors
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

export default FarmerDashboard;