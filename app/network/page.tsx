// app/network/page.tsx
import { FaGlobe, FaUsers, FaHandshake } from 'react-icons/fa';
import Navbar from '@/components/Navbar';

export default function NetworkPage() {
  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <Navbar />
      
      <main className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaGlobe className="w-12 h-12 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Global Network</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect with investors and startups worldwide in one powerful platform
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 mb-16">
            <div className="bg-blue-50 p-8 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <FaUsers className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">For Investors</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Access a global pipeline of vetted startups across all industries and stages.
                Find your next investment opportunity with our comprehensive filters and matching algorithms.
              </p>
              <ul className="text-gray-600 space-y-2 pl-5 list-disc">
                <li>5000+ pre-screened startups</li>
                <li>100+ countries represented</li>
                <li>All funding stages available</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-8 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <FaHandshake className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">For Startups</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Get discovered by international investors actively looking for opportunities.
                Showcase your business to the right audience and secure funding faster.
              </p>
              <ul className="text-gray-600 space-y-2 pl-5 list-disc">
                <li>3000+ active investors</li>
                <li>AI-powered matching</li>
                <li>Direct messaging system</li>
              </ul>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How Our Network Works</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Create Profile",
                  description: "Complete your profile with key details about your investment criteria or startup",
                  icon: <FaUsers className="w-8 h-8 text-blue-600" />
                },
                {
                  title: "Get Matched",
                  description: "Our algorithm suggests the most relevant connections",
                  icon: <FaHandshake className="w-8 h-8 text-blue-600" />
                },
                {
                  title: "Start Engaging",
                  description: "Connect directly with your matches through our platform",
                  icon: <FaGlobe className="w-8 h-8 text-blue-600" />
                }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
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