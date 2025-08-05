import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter, Grid, List } from 'lucide-react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const Marketplace = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    sortBy: 'newest',
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://business.osemen.com.ng/get_products.php')
      .then((res) => {
        if (res.data.success) {
          setProducts(res.data.products);
        }
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchCategory =
      filters.category === '' ||
      filters.category === 'All Categories' ||
      product.category.toLowerCase() === filters.category.toLowerCase();

    let matchPrice = true;
    const price = parseFloat(product.price);

    if (filters.priceRange === 'Under ₦5000') matchPrice = price < 5000;
    else if (filters.priceRange === '₦5000 - ₦10000') matchPrice = price >= 5000 && price <= 10000;
    else if (filters.priceRange === '₦10000 - ₦50000') matchPrice = price > 10000 && price <= 50000;
    else if (filters.priceRange === 'Over ₦50000') matchPrice = price > 50000;

    return matchCategory && matchPrice;
  });

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Toolbar */}
        <div className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-1/2">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters */}
            <div className="w-full md:w-1/4 space-y-6">
              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Filter size={16} /> Filters
                </h3>
                <div className="space-y-4">
                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium">Category</label>
                    <select
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      value={filters.category}
                      onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    >
                      <option>All Categories</option>
                      <option>Electronics</option>
                      <option>Clothing</option>
                      <option>Books</option>
                      <option>Furniture</option>
                    </select>
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-medium">Price Range</label>
                    <select
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      value={filters.priceRange}
                      onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                    >
                      <option>All</option>
                      <option>Under ₦5000</option>
                      <option>₦5000 - ₦10000</option>
                      <option>₦10000 - ₦50000</option>
                      <option>Over ₦50000</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Product List */}
            <div className="flex-1">
              {loading ? (
                <div className="text-center text-gray-500">Loading products...</div>
              ) : (
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
                  {filteredProducts.map((product, index) => (
                    <div
                      key={index}
                      className={`bg-white rounded-lg shadow overflow-hidden ${viewMode === 'list' ? 'flex' : ''}`}
                    >
                      {/* Image */}
                      <div className={`${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'w-full'}`}>
                        <img
                          src={product.images?.[0] || 'https://via.placeholder.com/200'}
                          alt={product.title}
                          className="w-full h-48 object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-4 flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{product.title}</h3>
                          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-lg font-bold text-blue-600">₦{product.price}</span>
                          <button
                            onClick={() => navigate(`/product?id=${product.id}`)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Marketplace;
