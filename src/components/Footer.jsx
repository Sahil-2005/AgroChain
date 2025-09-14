import React from "react";
import { Leaf } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div>
            <div className="flex items-center mb-4">
              <Leaf className="h-8 w-8 text-green-400" />
              <span className="ml-2 text-xl font-bold">AgroChain</span>
            </div>
            <p className="text-gray-400">
              Revolutionizing agricultural supply chains with blockchain
              transparency.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Trace Produce
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Login
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          {/* Partners */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Partners</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  For Farmers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  For Distributors
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  For Retailers
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} AgroChain. All rights reserved. Powered
            by blockchain technology.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
