import React, { useState, useEffect } from 'react';
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
  Star,
  Loader2
} from 'lucide-react';
import QRCode from 'react-qr-code';
import Footer from '../components/Footer';
import { useAuth } from '../auth/AuthContext';
import RequestPopup from '../components/RequestPopup';

const FarmerDashboard = () => {
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState('Overview');
  const [formData, setFormData] = useState({
    productName: '',
    quantity: '',
    harvestDate: '',
    farmLocation: '',
    basePrice: '',
    description: ''
  });
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showQRCode, setShowQRCode] = useState(null);
  const [addingProduct, setAddingProduct] = useState(false);
  const [showRequestPopup, setShowRequestPopup] = useState(false);
  const [requestFormData, setRequestFormData] = useState({
    productName: '',
    quantity: '',
    preferredPrice: '',
    deliveryDate: '',
    specialRequirements: ''
  });
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);

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

  // API base URL
  const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Fetch inventory from backend
  const fetchInventory = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${apiBase}/api/farmer/inventory`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch inventory');
      }
      
      const data = await response.json();
      setInventory(data.inventory || []);
    } catch (err) {
      console.error('Failed to fetch inventory:', err);
      setError('Failed to load inventory from server.');
      setInventory([]); // Set empty array instead of sample data
    } finally {
      setLoading(false);
    }
  };

  // Load inventory on component mount
  useEffect(() => {
    if (token) {
      fetchInventory();
    }
  }, [token]);

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

  const handleAddProduct = async () => {
    if (!formData.productName || !formData.quantity || !formData.harvestDate || !formData.farmLocation || !formData.basePrice) {
      setError('Please fill in all required fields');
      return;
    }

    setAddingProduct(true);
    setError('');
    setSuccess('');

    try {
      const batchId = `${formData.productName?.slice(0,3)?.toUpperCase() || 'NEW'}-${new Date().getFullYear()}-${Math.floor(Math.random()*1000).toString().padStart(3,'0')}`;
      
      const productData = {
        name: formData.productName,
        batch: batchId,
        quantity: formData.quantity,
        harvestDate: formData.harvestDate,
        location: formData.farmLocation,
        basePrice: formData.basePrice,
        description: formData.description,
        farmerId: user.id
      };

      // Send to backend
      const response = await fetch(`${apiBase}/api/farmer/inventory`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const newProduct = await response.json();
      
      // Update local state
      setInventory([newProduct.product, ...inventory]);
      setRecentActivity([
        {
          name: formData.productName,
          batch: batchId,
          quantity: formData.quantity,
          status: 'Farmer',
          price: `$${formData.basePrice}/unit`,
          icon: Package
        },
        ...recentActivity
      ]);

      setSuccess('Product added successfully!');
      setFormData({
        productName: '',
        quantity: '',
        harvestDate: '',
        farmLocation: '',
        basePrice: '',
        description: ''
      });

      // Auto-hide success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);

    } catch (err) {
      setError('Failed to add product. Please try again.');
    } finally {
      setAddingProduct(false);
    }
  };

  const generateQRData = (item) => {
    return JSON.stringify({
      name: item.name,
      batch: item.batch,
      harvestDate: item.harvestDate,
      location: item.location
    });
  };

  const toggleQRCode = (itemId) => {
    setShowQRCode(showQRCode === itemId ? null : itemId);
  };

  const handleRequestSubmit = async (formData) => {
    setIsSubmittingRequest(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Request submitted:', formData);
      setShowRequestPopup(false);
      setRequestFormData({
        productName: '',
        quantity: '',
        preferredPrice: '',
        deliveryDate: '',
        specialRequirements: ''
      });
    } catch (error) {
      console.error('Error submitting request:', error);
    } finally {
      setIsSubmittingRequest(false);
    }
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
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl border p-6 shadow-md rounded-xl border p-4 sm:p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-slide-up">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Batches</p>
              <p className="text-3xl font-bold text-gray-900">{recentActivity.length}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl border p-6 shadow-md rounded-xl border p-4 sm:p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-slide-up">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Transit</p>
              <p className="text-3xl font-bold text-gray-900">{dashboardStats.inTransit}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
              <Truck className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl border p-6 shadow-md rounded-xl border p-4 sm:p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-slide-up">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">At Retail</p>
              <p className="text-3xl font-bold text-gray-900">{dashboardStats.atRetail}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
              <Store className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl border p-6 shadow-md rounded-xl border p-4 sm:p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-slide-up">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Requests</p>
              <p className="text-3xl font-bold text-gray-900">{dashboardStats.pendingRequests}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>
      {/* Recent Activity */}
       <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl border p-6 shadow-md  rounded-xl border p-4 sm:p-6 animate-fade-in" style={{animationDelay: '0.4s'}}>
       <h3 className="text-lg font-semibold mb-2 text-green-700 mb-2">Recent Produce Activity</h3>
        <p className="text-gray-600 mb-6">Latest updates on your produce batches</p>
        <div className="space-y-4">
          {recentActivity.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
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
    <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl border p-6 shadow-md rounded-xl border p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-green-100 rounded-lg">
          <Plus className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Add New Produce Batch</h3>
      </div>
      <p className="text-gray-600 mb-6">Register a new batch of produce to the blockchain</p>
      
      {/* Error and Success Messages */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <Check className="w-5 h-5 text-green-600" />
            <p className="text-green-700">{success}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            placeholder="e.g., Organic Tomatoes"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Quantity *</label>
          <input
            type="text"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            placeholder="e.g., 500 lbs"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Harvest Date *</label>
          <input
            type="date"
            name="harvestDate"
            value={formData.harvestDate}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Farm Location *</label>
          <input
            type="text"
            name="farmLocation"
            value={formData.farmLocation}
            onChange={handleInputChange}
            placeholder="e.g., Field A-1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Base Price (per unit) *</label>
          <input
            type="text"
            name="basePrice"
            value={formData.basePrice}
            onChange={handleInputChange}
            placeholder="e.g., 2.50"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
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
        disabled={addingProduct}
        className="w-full mt-6 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-xl font-medium flex items-center justify-center space-x-2 transition-all duration-300 btn-animate shadow-lg"
      >
        {addingProduct ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Adding Product...</span>
          </>
        ) : (
          <>
            <Plus className="w-5 h-5" />
            <span>Add Produce & Generate QR Code</span>
          </>
        )}
      </button>
    </div>
  );

  const renderInventory = () => (
    <div className="space-y-6">
      {loading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-green-600" />
          <span className="ml-2 text-gray-600">Loading inventory...</span>
        </div>
      )}
      
      {error && !loading && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            <p className="text-yellow-700">{error}</p>
          </div>
        </div>
      )}

      {inventory.length === 0 && !loading && !error && (
        <div className="bg-white rounded-xl border p-8 text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Yet</h3>
          <p className="text-gray-600 mb-4">Start by adding your first produce batch to see it here.</p>
          <button
            onClick={() => setActiveTab('Add Produce')}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Add Your First Product
          </button>
        </div>
      )}

      {inventory.map((item, index) => (
        <div key={item._id || index} className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl border p-6 shadow-md  rounded-xl border p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
              <p className="text-gray-600">{item.quantity} • Harvested {item.harvestDate} • {item.location}</p>
              <p className="text-sm text-gray-500">{item.batch}</p>
            </div>
            <button 
              onClick={() => toggleQRCode(item._id || index)}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-lg transition-all duration-300 mt-2 sm:mt-0 btn-animate"
            >
              <QrCode className="w-4 h-4" />
              <span className="text-sm font-medium">
                {showQRCode === (item._id || index) ? 'Hide QR' : 'Show QR'}
              </span>
            </button>
          </div>

          {/* QR Code Display */}
          {showQRCode === (item._id || index) && (
            <div className="mb-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 scale-in">
              <h4 className="font-semibold text-gray-900 mb-4">QR Code for {item.name}</h4>
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                  <QRCode 
                    value={generateQRData(item)}
                    size={128}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  />
                </div>
                <div className="text-sm text-gray-600">
                  <p className="font-medium mb-3 text-gray-800">QR Code contains:</p>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Product: {item.name}</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Batch: {item.batch}</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>Harvest Date: {item.harvestDate}</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Location: {item.location}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
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
      <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl border p-6 shadow-md rounded-xl border p-6">
        <h3 className="text-xl font-bold text-blue-900 mb-2">Distributor Requests</h3>
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
                  <p className="text-sm font-medium text-blue-700">Requested Product</p>
                  <p className="text-gray-900">{request.product} • {request.quantity}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-700">Offered Price</p>
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
      <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl border p-6 shadow-md rounded-xl border p-6">
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
              <button 
                onClick={() => setShowRequestPopup(true)}
                className="flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg transition-all duration-200 w-full sm:w-auto mt-2 sm:mt-0 btn-animate"
              >
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6 sm:py-8">
          {/* Dashboard Header */}
          <div className="mb-6 sm:mb-8 fade-in">
            <h1 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              Farmer Dashboard
            </h1>
            <p className="text-gray-600 text-base sm:text-lg">
              Manage your produce, track supply chain, and connect with distributors
            </p>
          </div>
          {/* Navigation Tabs */}
          <div className="mb-8 fade-in-delay-1">
            <nav className="flex flex-wrap gap-2 md:space-x-8 md:flex-row md:gap-0 overflow-x-auto">
              {tabs.map((tab, index) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`py-3 px-6 font-medium rounded-xl transition-all duration-300 flex-1 min-w-[140px] btn-animate ${
                    activeTab === tab.name
                      ? 'bg-green-600 text-white border-green-600 shadow-md'
                      : 'border-green-400 text-green-700 hover:bg-green-100'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
          {/* Tab Content */}
          <div className="fade-in-delay-2">
            {tabs.find(tab => tab.name === activeTab)?.component()}
          </div>
        </div>
      </div>

      {/* Request Popup */}
      <RequestPopup
        isOpen={showRequestPopup}
        onClose={() => setShowRequestPopup(false)}
        title="Send Request to Distributor"
        formData={requestFormData}
        setFormData={setRequestFormData}
        onSubmit={handleRequestSubmit}
        userRole="farmer"
        isLoading={isSubmittingRequest}
      />
      <Footer/>
    </>
  );
};

export default FarmerDashboard;