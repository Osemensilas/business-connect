import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  Settings,
  ChevronDown,
  Bell,
  User
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const EntrepreneurDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const mockData = {
    statistics: [
      { name: 'Products', value: 12 },
      { name: 'Orders', value: 45 },
      { name: 'Messages', value: 8 },
      { name: 'Revenue', value: 2500 }
    ],
    chartData: [
      { name: 'Jan', value: 400 },
      { name: 'Feb', value: 300 },
      { name: 'Mar', value: 600 },
      { name: 'Apr', value: 800 },
      { name: 'May', value: 500 }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell className="h-6 w-6 text-gray-500" />
              </button>
              <div className="relative">
                <button className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="h-5 w-5 text-gray-500" />
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="col-span-1">
            <div className="bg-white rounded-lg shadow">
              <nav className="px-4 py-4">
                <ul className="space-y-2">
                  {[
                    {
                      name: 'Overview',
                      icon: LayoutDashboard,
                      id: 'overview'
                    },
                    { name: 'Products', icon: Package, id: 'products' },
                    { name: 'Messages', icon: MessageSquare, id: 'messages' },
                    { name: 'Settings', icon: Settings, id: 'settings' }
                  ].map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center space-x-2 px-4 py-2 rounded-md ${
                          activeTab === item.id
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-1 md:col-span-3">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-6">Dashboard Overview</h2>

              {/* Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {mockData.statistics.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 text-center"
                  >
                    <div className="text-2xl font-bold text-blue-600">
                      {stat.name === 'Revenue' ? `$${stat.value}` : stat.value}
                    </div>
                    <div className="text-sm text-gray-500">{stat.name}</div>
                  </div>
                ))}
              </div>

              {/* Chart */}
              <div className="h-64">
                <BarChart width={600} height={250} data={mockData.chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3B82F6" />
                </BarChart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntrepreneurDashboard;