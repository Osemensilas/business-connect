import React from 'react';
import { Menu, X, ChevronRight } from 'lucide-react'; 
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';


const Homepage = () => {

  const [userPresent, setUserPresent] = useState(false);
  
  useEffect(() => {
    async function getSession() {
      try {
        let url = "https://business.osemen.com.ng/user_session.php";
        const response = await axios.get(url, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        });

        console.log(response.data);

        if (response.data?.session) {
          setUserPresent(true);
        } else {
          setUserPresent(false);
        }
      } catch (err) {
        console.log("Error retrieving session: ", err);
      }
    }

    getSession();
  }, []);

  const buttonText = userPresent ? "Upload Product" : "Get Started";
  const buttonLink = userPresent ? "/product-upload" : "/sign-in";


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
                to={buttonLink}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent 
                text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
              >
                {buttonText}
                <ChevronRight className="ml-2" size={20} />
              </Link>
            </div>
          </div>
        </div>

        {userPresent && (
          <div className="bg-green-100 p-4 rounded-md mt-4 text-green-800">
            Welcome back! You can now upload products.
          </div>
        )}

        {!userPresent && (
          <p className="mt-4 text-gray-500">
            Please sign in to start uploading products.
          </p>
        )}

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