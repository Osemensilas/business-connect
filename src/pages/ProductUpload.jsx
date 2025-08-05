import React, { useState } from 'react';
import axios from 'axios';
import { Upload, X, Plus } from 'lucide-react';

const ProductUpload = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    user_id: 'anonymous', // Optional: dynamic user ID if available
    images: []
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const categories = [
    'Electronics',
    'Fashion',
    'Home & Garden',
    'Services',
    'Digital Products',
    'Other'
  ];

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = 'Title is required';
    if (!formData.description.trim()) errs.description = 'Description is required';
    if (!formData.price || isNaN(formData.price)) errs.price = 'Valid price is required';
    if (!formData.category) errs.category = 'Category is required';
    if (formData.images.length === 0) errs.images = 'At least one image is required';
    return errs;
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files) {
      handleFiles([...e.dataTransfer.files]);
    }
  };

  const handleFiles = (files) => {
    const newFiles = files.filter(file => file.type.startsWith('image/'));
    const newImages = newFiles.map(file => ({
      file,
      url: URL.createObjectURL(file)
    }));
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages].slice(0, 5)
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const submission = new FormData();
    submission.append('title', formData.title);
    submission.append('description', formData.description);
    submission.append('price', formData.price);
    submission.append('category', formData.category);
    submission.append('user_id', formData.user_id);

    formData.images.forEach((img, index) => {
      submission.append('images[]', img.file);
    });

    try {
      setLoading(true);
      const res = await axios.post('https://business.osemen.com.ng/upload_product.php', submission);
      setLoading(false);
      console.log(res.data);
      if (res.data.success) {
        setSuccessMessage(res.data.message);
        setFormData({ title: '', description: '', price: '', category: '', user_id: 'anonymous', images: [] });
      } else {
        setErrors({ form: res.data.message || 'Upload failed' });
      }
    } catch (err) {
      setLoading(false);
      setErrors({ form: 'Server error. Try again.', err });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Upload Product or Service
          </h2>

          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
              {successMessage}
            </div>
          )}
          {errors.form && (
            <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                  className="pl-7 pr-12 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Images (up to 5)</label>
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-6 ${
                  dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
              >
                <div className="flex flex-wrap gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden">
                      <img src={image.url} alt={`img-${index}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  {formData.images.length < 5 && (
                    <label className="w-24 h-24 flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-blue-500">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => handleFiles([...e.target.files])}
                      />
                      <Plus className="h-6 w-6 text-gray-400" />
                      <span className="text-sm text-gray-500">Add</span>
                    </label>
                  )}
                </div>
                {errors.images && <p className="text-red-500 text-sm mt-2">{errors.images}</p>}
                <p className="text-sm text-gray-500 text-center mt-4">
                  Drag and drop images or click to upload
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 rounded-md text-white ${
                  loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                <Upload className="h-5 w-5 mr-2" />
                {loading ? 'Uploading...' : 'Upload Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductUpload;
