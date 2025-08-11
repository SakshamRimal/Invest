"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Logo from '@/components/Logo';
import {
  FaGlobe,
  FaFilter,
  FaHandHolding,
  FaUsers,
  FaHandshake,
  FaChartLine,
  FaShieldAlt,
  FaCrosshairs
} from 'react-icons/fa';
import { FaHandHoldingDollar } from 'react-icons/fa6';

export default function Home() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [djangoMessage, setDjangoMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/api/accounts/')
      .then(res => res.text())
      .then(data => setDjangoMessage(data))
      .catch(() => setDjangoMessage('Could not connect to Django backend.'));
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handlePortalEntry = (portalType: 'investor' | 'startup') => {
    const redirectPath = portalType === 'investor' 
      ? '/investor/dashboard' 
      : '/startup/dashboard';
    router.push(`/login?redirect=${encodeURIComponent(redirectPath)}`);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <main className="bg-white text-gray-800 min-h-screen">
      {/* Django API message */}
      {djangoMessage && (
        <div className="bg-blue-50 text-blue-800 p-2 text-center text-sm font-medium">
          Backend status: {djangoMessage}
        </div>
      )}

      {/* Header Section */}
      <header className="bg-white border-b border-gray-100 py-4 px-4 sm:px-6 lg:px-8 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo size="lg" className="text-blue-600" />
          <nav className="hidden md:flex items-center space-x-8">
            {['features', 'how-it-works', 'about-us'].map((item) => {
              const label = item.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ');
              return (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm uppercase tracking-wider hover:underline underline-offset-4 decoration-2"
                >
                  {label}
                </button>
              );
            })}
          </nav>
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={() => handlePortalEntry('investor')}
              className="h-10 bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-md font-medium text-sm shadow-sm transition-all hover:shadow-md"
            >
              Investor Login
            </button>
            <button
              onClick={() => handlePortalEntry('startup')}
              className="h-10 bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 px-5 rounded-md font-medium text-sm shadow-sm transition-all hover:shadow-md"
            >
              Startup Login
            </button>
          </div>
          <button 
            onClick={toggleMenu}
            className="md:hidden text-gray-600 text-2xl focus:outline-none hover:text-blue-600 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-white z-50 p-8 md:hidden transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        style={{ backdropFilter: isMenuOpen ? 'blur(4px)' : 'none' }}
      >
        <div className="flex justify-between items-center mb-12">
          <Logo size="md" className="text-blue-600" />
          <button 
            onClick={toggleMenu}
            className="text-gray-600 text-3xl focus:outline-none hover:text-blue-600 transition-colors"
            aria-label="Close menu"
          >
            &times;
          </button>
        </div>
        <nav className="flex flex-col space-y-6">
          {['features', 'how-it-works', 'about-us'].map((item) => {
            const label = item.split('-').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');
            return (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-gray-900 hover:text-blue-600 font-medium text-xl py-2 border-b border-gray-100 transition-colors text-left"
              >
                {label}
              </button>
            );
          })}
          <div className="flex flex-col space-y-3 mt-8">
            <button
              onClick={() => {
                toggleMenu();
                handlePortalEntry('investor');
              }}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium shadow-sm transition-all hover:shadow-md text-lg"
            >
              Investor Portal
            </button>
            <button
              onClick={() => {
                toggleMenu();
                handlePortalEntry('startup');
              }}
              className="w-full py-3 bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-md font-medium shadow-sm transition-all hover:shadow-md text-lg"
            >
              Startup Portal
            </button>
          </div>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-white py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 leading-tight mb-6">
            <span className="text-blue-600">Investors</span> Meet <span className="text-blue-600">Startups</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            The premier platform connecting visionary investors with innovative startups.
            Fuel the next generation of breakthrough companies.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => handlePortalEntry('investor')}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all text-lg"
            >
              Investor Portal
            </button>
            <button
              onClick={() => handlePortalEntry('startup')}
              className="px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all text-lg"
            >
              Startup Portal
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Features</h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Everything you need to build successful investment relationships
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Global Network Card */}
      <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm hover:shadow-md transition-all hover:border-blue-200 group relative overflow-hidden">
        <div className="absolute -right-10 -top-10 text-blue-50 group-hover:text-blue-100 transition-colors z-0">
          <FaGlobe className="w-32 h-32" />
        </div>
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <FaGlobe className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Global Network</h3>
          <p className="text-gray-600 mb-4">
            Access investors and startups from around the world in one connected platform
          </p>
          <Link 
            href="/network" 
            className="flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            Learn more
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
      
      {/* Smart Matching Card */}
      <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm hover:shadow-md transition-all hover:border-blue-200 group relative overflow-hidden">
        <div className="absolute -right-10 -top-10 text-blue-50 group-hover:text-blue-100 transition-colors z-0">
          <FaChartLine className="w-32 h-32" />
        </div>
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <FaFilter className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Smart Matching</h3>
          <p className="text-gray-600 mb-4">
            Our AI-powered algorithm finds the perfect matches for your investment criteria
          </p>
          <Link 
            href="/matching" 
            className="flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            Learn more
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
      
      {/* Precise Targeting Card */}
      <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm hover:shadow-md transition-all hover:border-blue-200 group relative overflow-hidden">
        <div className="absolute -right-10 -top-10 text-blue-50 group-hover:text-blue-100 transition-colors z-0">
          <FaCrosshairs className="w-32 h-32" />
        </div>
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <FaHandHoldingDollar className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Precise Targeting</h3>
          <p className="text-gray-600 mb-4">
            Pinpoint exactly the type of startups or investors you want to connect with
          </p>
          <Link 
            href="/targeting" 
            className="flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            Learn more
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <FaGlobe className="w-10 h-10 text-blue-600" />, value: "10K+", label: "Global Members" },
              { icon: <FaHandshake className="w-10 h-10 text-blue-600" />, value: "2.5K+", label: "Successful Matches" },
              { icon: <FaChartLine className="w-10 h-10 text-blue-600" />, value: "$500M+", label: "Capital Raised" },
              { icon: <FaShieldAlt className="w-10 h-10 text-blue-600" />, value: "100%", label: "Verified Users" },
            ].map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-lg text-center shadow-sm hover:shadow-md transition-all">
                <div className="mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 text-lg font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple steps to start your investment journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Create Profile",
                description: "Set up your investor or startup profile with key details",
                icon: <FaUsers className="w-12 h-12 text-blue-600" />
              },
              {
                step: "2",
                title: "Find Matches",
                description: "Discover compatible investment opportunities or startups",
                icon: <FaFilter className="w-12 h-12 text-blue-600" />
              },
              {
                step: "3",
                title: "Connect & Grow",
                description: "Start conversations and build relationships",
                icon: <FaHandHoldingDollar className="w-12 h-12 text-blue-600" />
              }
            ].map((item, index) => (
              <div key={index} className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm hover:shadow-md transition-all hover:border-blue-200">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl mr-4">
                    {item.step}
                  </div>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-lg">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Success stories from our community
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "This platform helped me find the perfect investor for my AI startup. We secured $2M in funding!",
                name: "Sarah Johnson",
                role: "Founder, TechStart AI"
              },
              {
                quote: "As an angel investor, I've discovered 3 promising startups here that are now in my portfolio.",
                name: "Michael Chen",
                role: "Angel Investor"
              },
              {
                quote: "The matching algorithm is incredibly accurate. Saved me months of manual searching.",
                name: "David Rodriguez",
                role: "VC Partner"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="text-gray-600 text-lg mb-6 italic">"{testimonial.quote}"</div>
                <div className="border-t border-gray-100 pt-4">
                  <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                  <div className="text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about-us" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About Us</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our mission to revolutionize startup funding
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h3>
              <p className="text-gray-600 mb-6 text-lg">
                Founded in 2023, InvestLink was created to bridge the gap between innovative startups and visionary investors. 
                We saw the challenges both sides faced in finding the right matches and built a platform to solve this problem.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Team</h3>
              <p className="text-gray-600 mb-6 text-lg">
                With decades of combined experience in venture capital and startup development, 
                our team understands what makes successful investment relationships work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-blue-100 text-xl mb-10 max-w-2xl mx-auto">
            Join our platform today and connect with the perfect investment matches
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => handlePortalEntry('investor')}
              className="px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all text-lg"
            >
              Investor Sign Up
            </button>
            <button
              onClick={() => handlePortalEntry('startup')}
              className="px-8 py-4 border-2 border-white text-white hover:bg-blue-700 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all text-lg"
            >
              Startup Sign Up
            </button>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-gray-300 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center mb-6">
                <Logo size="md" className="text-white" />
              </div>
              <p className="text-gray-400 mb-6 text-lg">
                Connecting the world's best investors with the most innovative startups
              </p>
              <div className="flex space-x-4">
                {['Twitter', 'LinkedIn', 'Facebook'].map((social) => (
                  <a 
                    key={social} 
                    href="#" 
                    className="text-gray-400 hover:text-white transition-colors text-lg"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
            
            {[
              {
                title: "Company",
                links: ["About", "Careers", "Blog"]
              },
              {
                title: "Resources",
                links: ["Help Center", "Community", "Guides"]
              },
              {
                title: "Legal",
                links: ["Privacy", "Terms", "Cookies"]
              }
            ].map((column, index) => (
              <div key={index}>
                <h3 className="text-white font-semibold text-lg uppercase tracking-wider mb-6">{column.title}</h3>
                <ul className="space-y-3">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a 
                        href="#" 
                        className="text-gray-400 hover:text-white transition-colors text-lg"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-lg text-gray-500">
            <p>&copy; {new Date().getFullYear()} InvestLink. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}