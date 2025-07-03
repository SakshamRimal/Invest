// app/login/page.tsx
"use client"; // This component needs to run on the client-side

import React, { useState } from "react"; // Import useState
import Image from "next/image"; 
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter

export default function LoginPage() {
  // State for email and password inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // State for displaying messages to the user (e.g., success, error)
  const [message, setMessage] = useState(''); 
  // New state to track if the message is a success message
  const [isSuccess, setIsSuccess] = useState(false); 

  const router = useRouter(); // Initialize useRouter

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(''); // Clear any previous messages
    setIsSuccess(false); // Reset success status

    try {
      // Send a POST request to your /api/login endpoint
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Send email and password
      });

      const data = await response.json(); // Parse the JSON response

      if (response.ok) {
        // If login is successful (status 200)
        setMessage(data.message || 'Login successful!'); // Display success message
        setIsSuccess(true); // Set to true for green color
        localStorage.setItem('authToken', data.token); // Store the token (important!)
        router.push('/'); // Redirect to the homepage or a dashboard
      } else {
        // If login fails (e.g., status 401, 400, etc.)
        setMessage(data.message || 'Login failed. Please check your credentials.'); // Display error message
        setIsSuccess(false); // Set to false for red color (already default, but good for clarity)
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('An unexpected error occurred. Please try again.');
      setIsSuccess(false); // Set to false for red color
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      {/* The header with the logo and "InvestLink" text has been removed from here */}

      {/* Login Card */}
      <div className="bg-white text-gray-900 rounded-2xl shadow-2xl p-8 sm:p-12 w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold mb-2">Welcome Back</h1>
          {/* Updated text for the paragraph below the title to remove "InvestLink" if desired */}
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Email address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              required
              value={email} // Controlled component
              onChange={(e) => setEmail(e.target.value)} // Update state on change
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              required
              value={password} // Controlled component
              onChange={(e) => setPassword(e.target.value)} // Update state on change
            />
          </div>

          {/* Remember me and Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label htmlFor="remember" className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                id="remember"
                className="rounded text-blue-500 focus:ring-blue-500"
              />
              <span className="text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-blue-500 hover:text-blue-600 font-medium transition-colors">
              Forgot your password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            Sign In
          </button>
        </form>

        {/* Display messages - Now conditionally applies green or red text */}
        {message && (
          <p className={`text-center mt-4 text-sm font-medium ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        )}

        {/* Separator */}
        <div className="flex items-center my-8">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-500">Or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}