// components/Navbar.tsx
"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Logo from './Logo';

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handlePortalEntry = (portalType: 'investor' | 'startup') => {
    const redirectPath = portalType === 'investor' 
      ? '/investor/dashboard' 
      : '/startup/dashboard';
    router.push(`/login?redirect=${encodeURIComponent(redirectPath)}`);
  };

  return (
    <>
      {/* Desktop Navbar */}
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
    </>
  );
}