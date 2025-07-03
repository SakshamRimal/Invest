// app/page.tsx
"use client";
import { useState } from 'react';
import Image from "next/image";
import Link from "next/link"; 

export default function Home() {
  
  // State for mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  // Function to toggle mobile menu
  const toggleMenu = () => {
    console.log("Toggle menu button clicked!"); 
    setIsMenuOpen(!isMenuOpen);
  };

  // Click handlers for portal buttons
  const handleInvestorClick = () => {
    alert("Navigating to Investor Portal...");
  };

  const handleStartupClick = () => {
    alert("Navigating to Startup Portal...");
  };

  return (
    <main className="bg-white text-gray-700 overflow-x-hidden">
      {/* Header Section */}
      <header className="bg-white shadow-sm py-4 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex justify-between items-center">
          {/* Left side: Logo and Text with corrected alignment */}
          <div className="flex items-center">
            {/* Logo container with controlled size */}
            <div className="relative w-16 h-16 flex-shrink-0 mr-2 rounded-[8px] overflow-hidden">
              <Image
                src="/invest link.png"
                alt="InvestLink Logo"
                fill // Image fills its parent container
                className="object-contain" // Maintains aspect ratio
                priority // Preload for better performance
                sizes="64px" // Since the parent div is w-16 h-16, which is usually 64px by 64px in Tailwind's default config.
              />
            </div>
            {/* Text with vertical nudge for perfect alignment */}
            <span className="text-black font-poppins text-2xl font-bold -translate-y-0.5">
              InvestLink
            </span>
          </div>

          {/* Center: Main navigation links (desktop only) */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-600 hover:text-blue-500 font-semibold transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-blue-500 font-semibold transition-colors">
              How It Works
            </a>
            <a href="#about" className="text-gray-600 hover:text-blue-500 font-semibold transition-colors">
              About Us
            </a>
          </nav>
          
          {/* Right side: Login/Signup buttons (desktop only) with consistent height */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="flex items-center justify-center h-10 bg-blue-500 hover:bg-blue-600 text-white px-6 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all">
              Login
            </Link>
            <Link href="/signup" className="flex items-center justify-center h-10 bg-blue-500 hover:bg-blue-600 text-white px-6 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all">
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button (hidden on desktop) */}
          <button onClick={toggleMenu} className="md:hidden text-gray-600 text-2xl">
            ☰
          </button>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY - This appears when the ☰ button is clicked */}
      {/* It slides in/out based on the 'isMenuOpen' state */}
      <div className={`fixed top-0 left-0 w-full h-full bg-white transition-transform duration-300 ease-in-out z-50 md:hidden p-8 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-end">
          {/* Close button for the mobile menu */}
          <button onClick={toggleMenu} className="text-gray-600 text-4xl">&times;</button>
        </div>
        <nav className="flex flex-col items-center space-y-6 mt-16 text-xl">
          {/* Links within the mobile menu, also close the menu on click */}
          <a href="#features" onClick={toggleMenu} className="text-gray-900 hover:text-blue-500 font-medium">Features</a>
          <a href="#how-it-works" onClick={toggleMenu} className="text-gray-900 hover:text-blue-500 font-medium">How It Works</a>
          <a href="#about" onClick={toggleMenu} className="text-gray-900 hover:text-blue-500 font-medium">About Us</a>
          <Link href="/login" onClick={toggleMenu} className="w-full text-center bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold shadow-md transition-all">Login</Link>
          <Link href="/signup" onClick={toggleMenu} className="w-full text-center bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold shadow-md transition-all">Sign Up</Link>
        </nav>
      </div>
      {/* END MOBILE MENU OVERLAY */}

      {/* Hero Section */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Where <span className="text-blue-500">Investors</span> and{" "}
            <span className="text-blue-500">Startups</span> Connect
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Join the premier platform connecting innovative startups with visionary investors.
            Build meaningful partnerships and fuel the next generation of breakthrough companies.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              onClick={handleInvestorClick}
              className="bg-blue-500 hover:bg-blue-600 text-white py-4 px-10 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              Enter Investor Portal
            </button>
            <button
              onClick={handleStartupClick}
              className="bg-blue-500 hover:bg-blue-600 text-white py-4 px-10 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              Enter Startup Portal
            </button>
          </div>
        </div>
      </section>

      {/* Homepage Section: Global Network, Smart Matching, Precise Targeting */}
      {/* Removed 'id="how-it-works"' as per your clarification that this is not a navigation target. */}
      {/* If you later want this section to be a navigation target, you'll need to add an 'id' (e.g., id="homepage-info")
          and update the corresponding link in the header. */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center">
              <span className="text-5xl text-blue-500 mb-4">👥</span>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Global Network
              </h3>
              <p className="text-gray-600">
                Connect with investors and startups from around the world.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center">
              <span className="text-5xl text-blue-500 mb-4">💡</span>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Smart Matching
              </h3>
              <p className="text-gray-600">
                AI-powered recommendations based on your preferences.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center">
              <span className="text-5xl text-blue-500 mb-4">🎯</span>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Precise Targeting
              </h3>
              <p className="text-gray-600">
                Find exactly what you're looking for with advanced filters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Placeholder for your actual "Features" section */}
      {/* This section will be the target for the #features link in the header */}
      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 text-center bg-white">
        <div className="container mx-auto max-w-7xl">
          {/* Section Heading and Subtitle */}
          <h2 className="text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            Why Choose InvestLink?
          </h2>
          <p className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto">
            Everything you need to build successful partnerships in the startup ecosystem.
          </p>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Feature 1: Verified Profiles */}
            <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center transition-transform transform hover:scale-105 duration-300">
              <div className="flex items-center justify-center w-20 h-20 bg-blue-50 text-blue-500 rounded-2xl mb-6">
                <span className="text-5xl">✅</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Verified Profiles
              </h3>
              <p className="text-gray-600">
                All users are thoroughly vetted for authenticity and credibility.
              </p>
            </div>
            
            {/* Feature 2: Fast Connections */}
            <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center transition-transform transform hover:scale-105 duration-300">
              <div className="flex items-center justify-center w-20 h-20 bg-blue-50 text-blue-500 rounded-2xl mb-6">
                <span className="text-5xl">🔗</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Fast Connections
              </h3>
              <p className="text-gray-600">
                Connect with potential partners in minutes, not months.
              </p>
            </div>
            
            {/* Feature 3: Secure Platform */}
            <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center transition-transform transform hover:scale-105 duration-300">
              <div className="flex items-center justify-center w-20 h-20 bg-blue-50 text-blue-500 rounded-2xl mb-6">
                <span className="text-5xl">🔒</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Secure Platform
              </h3>
              <p className="text-gray-600">
                Enterprise-grade security protecting your sensitive information.
              </p>
            </div>
            
            {/* Feature 4: Global Reach */}
            <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center transition-transform transform hover:scale-105 duration-300">
              <div className="flex items-center justify-center w-20 h-20 bg-blue-50 text-blue-500 rounded-2xl mb-6">
                <span className="text-5xl">🌍</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Global Reach
              </h3>
              <p className="text-gray-600">
                Access opportunities from emerging markets to Silicon Valley.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* "How It Works" Section - Revised Look */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 text-center bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          {/* Section Heading */}
          <h2 className="text-5xl font-extrabold text-gray-900 leading-tight mb-16">
            How InvestLink Works
          </h2>
          
          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Step 1: Create Your Profile */}
            <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-xl transition-transform transform hover:scale-105 duration-300">
              {/* Smaller, numbered circle with a ring effect */}
              <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-white text-blue-600 font-bold mb-8 ring-4 ring-blue-200">
                <span className="text-5xl">1</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Create Your Profile
              </h3>
              <p className="text-gray-600">
                Set up your detailed profile showcasing your investment thesis or startup vision.
              </p>
            </div>
            
            {/* Step 2: Discover Matches */}
            <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-xl transition-transform transform hover:scale-105 duration-300">
              <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-white text-blue-600 font-bold mb-8 ring-4 ring-blue-200">
                <span className="text-5xl">2</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Discover Matches
              </h3>
              <p className="text-gray-600">
                Browse curated matches based on your preferences and investment criteria.
              </p>
            </div>
            
            {/* Step 3: Start Connecting */}
            <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-xl transition-transform transform hover:scale-105 duration-300">
              <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-white text-blue-600 font-bold mb-8 ring-4 ring-blue-200">
                <span className="text-5xl">3</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Start Connecting
              </h3>
              <p className="text-gray-600">
                Initiate conversations and build meaningful business relationships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section - Refined Look and Alignment */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-6xl text-center">
          {/* Main Heading and Mission Statement */}
          <h2 className="text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            Our Mission
          </h2>
          <p className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto">
            At InvestLink, we believe in the power of innovation. Our mission is to democratize the startup investment ecosystem by creating a trusted, efficient, and intelligent platform where groundbreaking ideas meet the capital they need to thrive.
          </p>
          
          {/* Two-Column Content with Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
            {/* Our Story Card */}
            <div className="p-10 bg-white rounded-2xl shadow-xl flex flex-col transition-transform transform hover:scale-105 duration-300">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h3>
              <p className="text-gray-600 leading-relaxed">
                Founded by a team of seasoned entrepreneurs and investors, InvestLink was born from a simple idea: to remove the barriers that stand between brilliant startups and the right investors. We've built a platform that's not just a directory, but a dynamic community where connections are made, partnerships are forged, and visions become reality.
              </p>
            </div>
            
            {/* Our Values Card */}
            <div className="p-10 bg-white rounded-2xl shadow-xl flex flex-col transition-transform transform hover:scale-105 duration-300">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Values</h3>
              <ul className="text-gray-600 space-y-6 list-none p-0 mt-2">
                {/* Value 1: Innovation */}
                <li className="flex items-center">
                  <span className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-500 rounded-full text-2xl mr-4">🚀</span>
                  <div>
                    <span className="font-semibold text-gray-900">Innovation:</span> We support and champion disruptive ideas.
                  </div>
                </li>
                {/* Value 2: Trust */}
                <li className="flex items-center">
                  <span className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-500 rounded-full text-2xl mr-4">🤝</span>
                  <div>
                    <span className="font-semibold text-gray-900">Trust:</span> We ensure a secure and transparent environment for all users.
                  </div>
                </li>
                {/* Value 3: Community */}
                <li className="flex items-center">
                  <span className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-500 rounded-full text-2xl mr-4">🌐</span>
                  <div>
                    <span className="font-semibold text-gray-900">Community:</span> We foster a global network of collaboration and growth.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      
      {/* Footer Section */}
      <footer className="bg-gray-900 text-gray-300 py-10 px-4 sm:px-6 lg:px-8 text-center">
        <div className="container mx-auto">
          <div className="flex items-center justify-center mb-4">
            <div
            className="w-[40px] h-[40px] flex-shrink-0 mr-2 rounded-[8px] overflow-hidden"
            >
              <Image
              src="/invest link.png"
              alt="InvestLink Logo"
              width={100}
              height={120}
              className="mr-2 rounded-[8px] object-contain flex-shrink-0"
              priority
              />
              </div>
              <span className="text-white font-poppins text-2xl font-semibold">
                InvestLink
                </span>
                </div>
                <p className="text-sm">
                  Connecting investors and startups worldwide
                  </p>
                  <p className="mt-2 text-xs">&copy; 2024 InvestLink. All rights reserved.</p>
                  </div>
                  </footer>
                   </main>
                   );
                  }