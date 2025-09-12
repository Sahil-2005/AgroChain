import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Package, 
  TrendingUp, 
  DollarSign, 
  Truck,
  Eye,
  Filter,
  Search,
  MapPin,
  Star,
  Calendar,
  BarChart3
} from 'lucide-react';
import Footer from '../components/Footer';



const RetailerDashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');

 const tabs = [
  { name: 'Overview' },
  { name: 'Distributors' },
  { name: 'Inventory' },
  { name: 'Sales' }
];

  // Sample data
  const overviewData = {
    partnerDistributors: 3,
    productsInStock: 2,
    totalRevenue: 616,
    avgMargin: 34.5,
    inventory: [
      {
        name: 'Organic Tomatoes',
        quantity: '150 lbs',
        distributor: 'FreshLink Distribution',
        price: '$4.99/unit',
        status: 'In Stock'
      },
      {
        name: 'Romaine Lettuce',
        quantity: '100 heads',
        distributor: 'Valley Fresh Logistics',
        price: '$2.49/unit',
        status: 'Low Stock'
      }
    ],
    topProducts: [
      { name: 'Organic Tomatoes', units: 50, revenue: 249.5, margin: 35.8 },
      { name: 'Romaine Lettuce', units: 75, revenue: 186.75, margin: 35.6 },
      { name: 'Bell Peppers', units: 30, revenue: 179.7, margin: 32.1 }
    ]
  };

  const distributors = [
    {
      name: 'FreshLink Distribution',
      location: 'Sacramento, California',
      rating: 4.8,
      region: 'Central Valley',
      productsAvailable: 8,
      specialties: ['Organic Produce', 'Fresh Vegetables', 'Fruits'],
      products: [
        {
          name: 'Organic Tomatoes',
          quantity: '300 lbs',
          price: '$3.2/unit',
          origin: 'Green Valley Farm',
          grade: 'A+',
          harvest: '2024-01-8'
        },
        {
          name: 'Bell Peppers',
          quantity: '200 lbs',
          price: '$4.1/unit',
          origin: 'Green Valley Farm',
          grade: 'A+',
          harvest: '2024-01-8'
        }
      ]
    },
    {
      name: 'Valley Fresh Logistics',
      location: 'Fresno, California',
      rating: 4.6,
      region: 'Central Valley',
      productsAvailable: 6,
      specialties: ['Leafy Greens', 'Root Vegetables', 'Herbs'],
      products: [
        {
          name: 'Romaine Lettuce',
          quantity: '250 heads',
          price: '$1.6/unit',
          origin: 'Coastal Organic Farm',
          grade: 'A+',
          harvest: '2024-01-20'
        },
        {
          name: 'Baby Spinach',
          quantity: '100 lbs',
          price: '$5.6/unit',
          origin: 'Coastal Organic Farm',
          grade: 'Premium',
          harvest: '2024-01-19'
        }
      ]
    },
    {
      name: 'Golden State Produce',
      location: 'Los Angeles, California',
      rating: 4.7,
      region: 'Southern California',
      productsAvailable: 5,
      specialties: ['Citrus Fruits', 'Berries', 'Stone Fruits'],
      products: [
        {
          name: 'Navel Oranges',
          quantity: '400 lbs',
          price: '$2.8/unit',
          origin: 'Sunny Grove Farm',
          grade: 'Premium',
          harvest: '2024-01-17'
        }
      ]
    }
  ];

  const inventoryDetails = [
    {
      name: 'Organic Tomatoes',
      status: 'in stock',
      distributor: 'FreshLink Distribution',
      origin: 'Green Valley Farm',
      totalQuantity: '150 lbs',
      sold: '50 lbs',
      purchasePrice: '$3.2',
      retailPrice: '$4.99',
      received: '2024-01-17',
      expires: '2024-01-24',
      margin: '55.9%',
      profitPerUnit: '$1.79'
    },
    {
      name: 'Romaine Lettuce',
      status: 'low stock',
      distributor: 'Valley Fresh Logistics',
      origin: 'Coastal Organic Farm',
      totalQuantity: '100 heads',
      sold: '75 heads',
      purchasePrice: '$1.6',
      retailPrice: '$2.49',
      received: '2024-01-18',
      expires: '2024-01-22',
      margin: '55.6%',
      profitPerUnit: '$0.89'
    }
  ];

  const salesData = {
    totalRevenue: 615.95,
    unitsSold: 155,
    avgMargin: 34.5,
    products: [
      { name: 'Organic Tomatoes', units: 50, revenue: 249.5, margin: 35.8 },
      { name: 'Romaine Lettuce', units: 75, revenue: 186.75, margin: 35.6 },
      { name: 'Bell Peppers', units: 30, revenue: 179.7, margin: 32.1 }
    ]
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-100 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Partner Distributors</p>
              <p className="text-3xl font-bold">{overviewData.partnerDistributors}</p>
            </div>
            <Truck className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-gray-100 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Products in Stock</p>
              <p className="text-3xl font-bold">{overviewData.productsInStock}</p>
            </div>
            <Package className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-gray-100 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
              <p className="text-3xl font-bold">${overviewData.totalRevenue}</p>
            </div>
            <DollarSign className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-gray-100 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg. Margin</p>
              <p className="text-3xl font-bold text-green-600">{overviewData.avgMargin}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Current Inventory Status */}
      <div className="bg-gray-100 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-2">Current Inventory Status</h3>
        <p className="text-gray-600 text-sm mb-4">Overview of your retail inventory</p>
        
        <div className="space-y-4">
          {overviewData.inventory.map((item, index) => (
            <div key={index} className="flex items-center justify-between bg-white rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Package className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.quantity} • From {item.distributor}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                  item.status === 'In Stock' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-orange-100 text-orange-800'
                }`}>
                  {item.status}
                </span>
                <p className="text-sm font-medium mt-1">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Selling Products */}
      <div className="bg-gray-100 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-2">Top Selling Products</h3>
        <p className="text-gray-600 text-sm mb-4">Best performing products this week</p>
        
        <div className="space-y-4">
          {overviewData.topProducts.map((product, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-gray-600">{product.units} units sold</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">${product.revenue}</p>
                <p className="text-sm text-green-600">+{product.margin}% margin</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDistributors = () => (
    <div className="space-y-6">
      {/* Filter Section */}
      <div className="bg-gray-100 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="h-5 w-5" />
          <span className="font-medium">Filter Distributors</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search distributors" 
              className="w-full pl-10 pr-3 py-2 border rounded-lg"
            />
          </div>
          <select className="px-3 py-2 border rounded-lg">
            <option>All Areas</option>
            <option>Central Valley</option>
            <option>Southern California</option>
          </select>
          <select className="px-3 py-2 border rounded-lg">
            <option>All Products</option>
            <option>Organic Produce</option>
            <option>Fresh Vegetables</option>
          </select>
        </div>
        <button className="text-blue-600 text-sm">Clear Filters</button>
      </div>

      {/* Distributors List */}
      {distributors.map((distributor, index) => (
  <div key={index} className="bg-gray-100 rounded-lg p-6 mb-6">
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
          <Truck className="h-4 w-4 text-green-600" />
        </div>
        <div>
          <h3 className="font-semibold">{distributor.name}</h3>
          <div className="flex flex-wrap items-center space-x-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>{distributor.location}</span>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span>{distributor.rating}/5</span>
            </div>
          </div>
        </div>
      </div>
      <div className="text-left md:text-right text-sm">
        <p className="text-gray-600">{distributor.region}</p>
        <p className="font-medium">{distributor.productsAvailable} products available</p>
      </div>
    </div>

    <div className="mb-4">
      <p className="text-sm font-medium mb-2">Specialties</p>
      <div className="flex flex-wrap gap-2">
        {distributor.specialties.map((specialty, idx) => (
          <span key={idx} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            {specialty}
          </span>
        ))}
      </div>
    </div>

    <div>
      <p className="text-sm font-medium mb-3">Available Products</p>
      <div className="space-y-3">
        {distributor.products.map((product, idx) => (
          <div key={idx} className="bg-white rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-medium">{product.name}</p>
              <p className="text-sm text-gray-600">
                {product.quantity} • {product.price} • From {product.origin}
              </p>
              <p className="text-sm text-gray-500">
                Grade {product.grade} • Harvested {product.harvest}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 w-full sm:w-auto">
                Request
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 w-full sm:w-auto">
                Purchase
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="mt-4 pt-4 border-t">
      <button className="flex items-center text-gray-600 text-sm hover:text-gray-800">
        <Eye className="h-4 w-4 mr-2" />
        View Distributor Details
      </button>
    </div>
  </div>
))}
    </div>
  );

  const renderInventory = () => (
    <div className="space-y-6">
      {inventoryDetails.map((item, index) => (
        <div key={index} className="bg-gray-100 rounded-lg p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-600">From {item.distributor} • Origin: {item.origin}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${
              item.status === 'in stock' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-orange-100 text-orange-800'
            }`}>
              {item.status}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Quantity</p>
              <p className="text-xl font-bold">{item.totalQuantity}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Sold</p>
              <p className="text-xl font-bold">{item.sold}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Purchase Price</p>
              <p className="text-xl font-bold">{item.purchasePrice}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Retail Price</p>
              <p className="text-xl font-bold">{item.retailPrice}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium mb-3">Dates</h4>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                  <span>Received: {item.received}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                  <span>Expires: {item.expires}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Profit Analysis</h4>
              <div className="space-y-2">
                <p className="text-sm">Margin: {item.margin}</p>
                <p className="text-sm">Profit per unit: {item.profitPerUnit}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSales = () => (
    <div className="space-y-6">
      <div className="bg-gray-100 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <BarChart3 className="h-5 w-5" />
          <span className="font-semibold text-lg">Sales Performance</span>
        </div>
        <p className="text-gray-600 text-sm mb-6">Track your sales metrics and performance</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-green-700 mb-1">Total Revenue</p>
            <p className="text-2xl font-bold">${salesData.totalRevenue}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-green-700 mb-1">Units Sold</p>
            <p className="text-2xl font-bold">{salesData.unitsSold}</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-700 mb-1">Avg. Margin</p>
            <p className="text-2xl font-bold">{salesData.avgMargin}%</p>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-4">Product Performance</h4>
          <div className="space-y-4">
            {salesData.products.map((product, index) => (
              <div key={index} className="bg-white rounded-lg p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.units} units sold</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${product.revenue}</p>
                  <p className="text-sm text-green-600">+{product.margin}% margin</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

const renderContent = () => {
  switch (activeTab) {
    case 'Overview':
      return renderOverview();
    case 'Distributors':
      return renderDistributors();
    case 'Inventory':
      return renderInventory();
    case 'Sales':
      return renderSales();
    default:
      return renderOverview();
  }
};
  return (
    <>
    <div className="min-h-screen bg-white">
      
      {/* Main Content */}
      <div className="px-6 py-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Retailer Dashboard</h1>
          <p className="text-gray-600">Source products from distributors and manage your retail inventory</p>
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
        {renderContent()}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default RetailerDashboard;