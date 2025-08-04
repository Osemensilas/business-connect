import React from 'react';
import Header from '../components/Header';

const About = () => (
    <>
    <Header />
  <div className="min-h-screen bg-gray-50 py-12">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">About Us</h1>
      <p className="text-lg text-gray-700 mb-4">
        BusinessConnect is a platform designed to empower entrepreneurs and business owners to connect, collaborate, and grow. Our mission is to provide a vibrant marketplace and networking space for businesses of all sizes.
      </p>
      <p className="text-gray-600 mb-2">
        Whether you're looking to showcase your products, find new partners, or access resources for business growth, BusinessConnect is here to support your journey.
      </p>
      <p className="text-gray-600">
        Join our community and take your business to the next level!
      </p>
    </div>
  </div>
  </>
);

export default About;