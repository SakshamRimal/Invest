// app/targeting/page.tsx
import { FaCrosshairs, FaFilter, FaSearch, FaBell, FaSave, FaChartBar } from 'react-icons/fa';
import Navbar from '@/components/Navbar';

export default function TargetingPage() {
  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <Navbar />
      
      <main className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCrosshairs className="w-12 h-12 text-red-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Precise Targeting</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Pinpoint your ideal matches with surgical precision
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 mb-16">
            <div className="bg-red-50 p-8 rounded-xl border border-red-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <FaSearch className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">Advanced Search</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Filter through thousands of opportunities using 50+ parameters.
              </p>
              <ul className="text-gray-600 space-y-2 pl-5 list-disc">
                <li>Industry-specific filters</li>
                <li>Geographic targeting</li>
                <li>Financial metrics</li>
              </ul>
            </div>
            
            <div className="bg-red-50 p-8 rounded-xl border border-red-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <FaSave className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">Saved Profiles</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Create and manage custom search profiles for different strategies.
              </p>
              <ul className="text-gray-600 space-y-2 pl-5 list-disc">
                <li>Unlimited saved searches</li>
                <li>One-click application</li>
                <li>Share with team members</li>
              </ul>
            </div>
            
            <div className="bg-red-50 p-8 rounded-xl border border-red-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <FaBell className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">Smart Alerts</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Get real-time notifications when new matches meet your criteria.
              </p>
              <ul className="text-gray-600 space-y-2 pl-5 list-disc">
                <li>Customizable alert frequency</li>
                <li>Email & in-app notifications</li>
                <li>Priority matching system</li>
              </ul>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Targeting Process</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Define Parameters",
                  description: "Set your investment criteria and must-have attributes",
                  icon: <FaFilter className="w-8 h-8 text-red-600" />
                },
                {
                  title: "Refine Results",
                  description: "Use our advanced filters to narrow down matches",
                  icon: <FaSearch className="w-8 h-8 text-red-600" />
                },
                {
                  title: "Save & Monitor",
                  description: "Create alerts for your ideal investment profile",
                  icon: <FaChartBar className="w-8 h-8 text-red-600" />
                }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
    </div>
  );
}