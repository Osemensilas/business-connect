import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

const ProductPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get("id");

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    axios.get(`https://business.osemen.com.ng/get_single_product.php?id=${productId}`)
      .then(res => {
        if (res.data.success) {
          setProduct(res.data.product);
        } else {
          console.error('Product not found.');
        }
      })
      .catch(err => console.error('Error fetching product:', err))
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading product...</div>;
  if (!product) return <div className="p-8 text-center text-red-500">Product not found.</div>;

  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={`https://business.osemen.com.ng/${product.images?.[0]}`}
              alt={product.title}
              className="w-full h-auto rounded"
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <p className="text-gray-700">{product.description}</p>
            <div className="text-blue-600 text-xl font-semibold">₦{product.price}</div>
            <div className="text-sm text-gray-500">Category: {product.category}</div>
            <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
