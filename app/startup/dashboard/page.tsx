// app/startup/dashboard/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken'; // Import jsonwebtoken for decoding

// Import icons from react-icons
import {
  MdDashboard,
  MdPeopleOutline,
  MdAttachMoney,
  MdDescription,
  MdOutlineMail,
  MdOutlinePerson,
  MdOutlineSettings,
  MdOutlineExitToApp,
} from 'react-icons/md';

import {
  FaHandHoldingDollar,
  FaTarget,
  FaUsers,
  FaEye,
} from 'react-icons/fa6';


export default function StartupDashboardPage() {
  const [activeLink, setActiveLink] = useState('Dashboard');
  const [userName, setUserName] = useState('User'); // State for user's name

  useEffect(() => {
    // Client-side code to get and decode token
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          // Decode the token (replace 'your_jwt_secret' with your actual secret)
          const decodedToken: any = jwt.decode(token);
          if (decodedToken && decodedToken.name) {
            setUserName(decodedToken.name);
          }
        } catch (error) {
          console.error("Error decoding token:", error);
          // Handle invalid token, e.g., redirect to login
        }
      }
    }
  }, []); // Run once on component mount

  const renderContent = () => {
    switch (activeLink) {
      case 'Dashboard':
        return (
          <>
            <header className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-1">Welcome back, {userName}!</h1> {/* Dynamic name */}
                <p className="text-gray-600">Here's your startup overview</p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full flex items-center shadow-lg transition-all">
                <MdPeopleOutline className="mr-2 text-xl" />
                Browse Investors
              </button>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-2">
                  <div className="bg-green-100 rounded-lg p-3 mr-3">
                    <FaHandHoldingDollar className="text-green-600 text-3xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">Funds Raised</h3>
                    <p className="text-3xl font-bold text-gray-900">$780K</p>
                  </div>
                  <p className="ml-auto text-sm text-green-500 font-semibold">+$130K this month</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-2">
                  <div className="bg-blue-100 rounded-lg p-3 mr-3">
                    <FaTarget className="text-blue-600 text-3xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">Funding Goal</h3>
                    <p className="text-3xl font-bold text-gray-900">$1M</p>
                  </div>
                  <p className="ml-auto text-sm text-green-500 font-semibold">78% completed</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-2">
                  <div className="bg-purple-100 rounded-lg p-3 mr-3">
                    <FaUsers className="text-purple-600 text-3xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">Interested Investors</h3>
                    <p className="text-3xl font-bold text-gray-900">47</p>
                  </div>
                  <p className="ml-auto text-sm text-green-500 font-semibold">+12 this week</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-2">
                  <div className="bg-orange-100 rounded-lg p-3 mr-3">
                    <FaEye className="text-orange-600 text-3xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">Pitch Views</h3>
                    <p className="text-3xl font-bold text-gray-900">342</p>
                  </div>
                  <p className="ml-auto text-sm text-green-500 font-semibold">+28%</p>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Funding Progress</h3>
                <div className="h-64 bg-gray-50 flex items-center justify-center text-gray-400">
                  [Area/Line Chart Here]
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Investor Engagement</h3>
                <div className="h-64 bg-gray-50 flex items-center justify-center text-gray-400">
                  [Bar Chart Here]
                </div>
              </div>
            </section>
          </>
        );

      // Add cases for other sidebar links (Investors, Funding, Pitch Deck, Messages, Profile, Settings)
      case 'Investors':
        return <div className="text-gray-700 text-center py-20">Investors content goes here.</div>;
      case 'Funding':
        return <div className="text-gray-700 text-center py-20">Funding content goes here.</div>;
      case 'Pitch Deck':
        return <div className="text-gray-700 text-center py-20">Pitch Deck content goes here.</div>;
      case 'Messages':
        return <div className="text-gray-700 text-center py-20">Messages content goes here.</div>;
      case 'Profile':
        return <div className="text-gray-700 text-center py-20">Profile content goes here.</div>;
      case 'Settings':
        return <div className="text-gray-700 text-center py-20">Settings content goes here.</div>;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-4 shadow-lg">
        <div className="mb-8">
          <span className="text-xl font-bold">InvestLink</span>
          <p className="text-sm text-gray-400 mt-1">Startup Portal</p>
        </div>

        <nav className="flex-grow">
          <ul>
            <li className={`mb-2 rounded-lg ${activeLink === 'Dashboard' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
              <a href="#" className="flex items-center p-3 text-white" onClick={() => setActiveLink('Dashboard')}>
                <MdDashboard className="mr-3 text-2xl" />
                Dashboard
              </a>
            </li>
            <li className={`mb-2 rounded-lg ${activeLink === 'Investors' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
              <a href="#" className="flex items-center p-3 text-white" onClick={() => setActiveLink('Investors')}>
                <MdPeopleOutline className="mr-3 text-2xl" />
                Investors
              </a>
            </li>
            <li className={`mb-2 rounded-lg ${activeLink === 'Funding' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
              <a href="#" className="flex items-center p-3 text-white" onClick={() => setActiveLink('Funding')}>
                <MdAttachMoney className="mr-3 text-2xl" />
                Funding
              </a>
            </li>
            <li className={`mb-2 rounded-lg ${activeLink === 'Pitch Deck' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
              <a href="#" className="flex items-center p-3 text-white" onClick={() => setActiveLink('Pitch Deck')}>
                <MdDescription className="mr-3 text-2xl" />
                Pitch Deck
              </a>
            </li>
            <li className={`mb-2 rounded-lg ${activeLink === 'Messages' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
              <a href="#" className="flex items-center p-3 text-white" onClick={() => setActiveLink('Messages')}>
                <MdOutlineMail className="mr-3 text-2xl" />
                Messages
              </a>
            </li>
            <li className={`mb-2 rounded-lg ${activeLink === 'Profile' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
              <a href="#" className="flex items-center p-3 text-white" onClick={() => setActiveLink('Profile')}>
                <MdOutlinePerson className="mr-3 text-2xl" />
                Profile
              </a>
            </li>
          </ul>
        </nav>

        <div className="mt-auto">
          <ul>
            <li className={`mb-2 rounded-lg ${activeLink === 'Settings' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
              <a href="#" className="flex items-center p-3 text-white" onClick={() => setActiveLink('Settings')}>
                <MdOutlineSettings className="mr-3 text-2xl" />
                Settings
              </a>
            </li>
            <li className="hover:bg-gray-700 rounded-lg">
              <a href="#" className="flex items-center p-3 text-red-400">
                <MdOutlineExitToApp className="mr-3 text-2xl" />
                Logout
              </a>
            </li>
          </ul>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
}
