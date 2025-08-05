import React from 'react';
import { Menu, X, ChevronRight } from 'lucide-react'; 
import Header from '../components/Header';
import { Link } from 'react-router-dom';


const Homepage = () => {

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      
      <Header />
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Connect, Grow, and Thrive
          </h2>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Join our platform to connect with entrepreneurs, showcase your products,
            and grow your business network.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link
                to="/sign-in"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
              >
                Get Started
                <ChevronRight className="ml-2" size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Connect with Entrepreneurs',
              description: 'Network with like-minded business professionals'
            },
            {
              title: 'Showcase Products',
              description: 'List and promote your products or services'
            },
            {
              title: 'Grow Your Business',
              description: 'Access tools and resources for business growth'
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;