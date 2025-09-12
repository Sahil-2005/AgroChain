import React, { useEffect } from 'react';
import { X, Send, Package, Calendar, DollarSign, FileText } from 'lucide-react';

const RequestPopup = ({ 
  isOpen, 
  onClose, 
  title, 
  formData, 
  setFormData, 
  onSubmit, 
  userRole,
  isLoading = false 
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getFormFields = () => {
    switch (userRole) {
      case 'distributor':
        return [
          { name: 'productName', label: 'Product Name', type: 'text', icon: Package, required: true },
          { name: 'quantity', label: 'Quantity Needed', type: 'text', icon: Package, required: true },
          { name: 'preferredPrice', label: 'Preferred Price (per unit)', type: 'text', icon: DollarSign, required: true },
          { name: 'deliveryDate', label: 'Preferred Delivery Date', type: 'date', icon: Calendar, required: true },
          { name: 'specialRequirements', label: 'Special Requirements', type: 'textarea', icon: FileText, required: false }
        ];
      case 'retailer':
        return [
          { name: 'productName', label: 'Product Name', type: 'text', icon: Package, required: true },
          { name: 'quantity', label: 'Quantity Needed', type: 'text', icon: Package, required: true },
          { name: 'preferredPrice', label: 'Budget Range', type: 'text', icon: DollarSign, required: true },
          { name: 'deliveryDate', label: 'Required Delivery Date', type: 'date', icon: Calendar, required: true },
          { name: 'specialRequirements', label: 'Quality Requirements', type: 'textarea', icon: FileText, required: false }
        ];
      case 'farmer':
        return [
          { name: 'productName', label: 'Product Available', type: 'text', icon: Package, required: true },
          { name: 'quantity', label: 'Available Quantity', type: 'text', icon: Package, required: true },
          { name: 'preferredPrice', label: 'Asking Price (per unit)', type: 'text', icon: DollarSign, required: true },
          { name: 'deliveryDate', label: 'Harvest Date', type: 'date', icon: Calendar, required: true },
          { name: 'specialRequirements', label: 'Additional Information', type: 'textarea', icon: FileText, required: false }
        ];
      default:
        return [];
    }
  };

  const getSubmitButtonText = () => {
    switch (userRole) {
      case 'distributor': return 'Send Request to Farmer';
      case 'retailer': return 'Send Request to Distributor';
      case 'farmer': return 'Send Request to Distributor';
      default: return 'Send Request';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Popup */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {getFormFields().map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center space-x-2">
                  <field.icon className="w-4 h-4 text-green-600" />
                  <span>{field.label} {field.required && <span className="text-red-500">*</span>}</span>
                </div>
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleInputChange}
                  placeholder={`Enter ${field.label.toLowerCase()}...`}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                />
              ) : (
                <input
                  name={field.name}
                  type={field.type}
                  value={formData[field.name] || ''}
                  onChange={handleInputChange}
                  placeholder={`Enter ${field.label.toLowerCase()}...`}
                  required={field.required}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                />
              )}
            </div>
          ))}

          {/* Submit Button */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 transition-all duration-200 flex items-center justify-center space-x-2 btn-animate"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>{getSubmitButtonText()}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestPopup;
