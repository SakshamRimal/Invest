// app/login/page.tsx
"use client";

import React, { useState, useEffect } from "react"; // Import useEffect
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation"; // Import useSearchParams
import jwt from 'jsonwebtoken'; // For decoding the token to get user info

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams(); // Initialize useSearchParams

  // Get the redirect URL from query parameters
  const redirectUrl = searchParams.get('redirect');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setIsSuccess(false);

    try {
      const response = await fetch('http://localhost:8000/api/accounts/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Login successful!');
        setIsSuccess(true);
        if (data.access) {
          localStorage.setItem('authToken', data.access);
        }
        // Redirect to the URL specified in the 'redirect' query parameter,
        // or to the homepage if no redirect parameter is present.
        if (redirectUrl) {
          router.push(decodeURIComponent(redirectUrl));
        } else {
          router.push('/'); // Default redirect if no specific path was requested
        }
      } else {
        setMessage(data.detail || data.message || 'Login failed. Please check your credentials.');
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('An unexpected error occurred. Please try again.');
      setIsSuccess(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      {/* Login Card */}
      <div className="bg-white text-gray-900 rounded-2xl shadow-2xl p-8 sm:p-12 w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold mb-2">Welcome Back</h1>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        {/* Display messages */}
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
