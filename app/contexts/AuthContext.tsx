"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { decodeJWTToken, isTokenValid, getUserRole } from '../utils/auth';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
  investmentFirm?: string;
  investmentRange?: string;
  preferredSectors?: string;
  founderName?: string;
  startupName?: string;
  industrySector?: string;
  fundingStage?: string;
  companyDescription?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: any, role: 'investor' | 'startup') => Promise<boolean>;
  isAuthenticated: boolean;
  isInvestor: boolean;
  isStartup: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      if (token && isTokenValid(token)) {
        const payload = decodeJWTToken(token);
        if (payload) {
          setUser({
            id: payload.user_id,
            username: payload.username,
            email: payload.email || payload.username,
            role: payload.role,
          });
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:8000/api/accounts/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await response.json();

      if (response.ok && data.access) {
        localStorage.setItem('authToken', data.access);
        const payload = decodeJWTToken(data.access);
        if (payload) {
          setUser({
            id: payload.user_id,
            username: payload.username,
            email: payload.email || payload.username,
            role: payload.role,
          });
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    router.push('/login');
  };

  const register = async (userData: any, role: 'investor' | 'startup'): Promise<boolean> => {
    try {
      const endpoint = role === 'investor'
        ? 'http://localhost:8000/api/accounts/register/investor/'
        : 'http://localhost:8000/api/accounts/register/startup/';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      return response.ok;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    register,
    isAuthenticated: !!user,
    isInvestor: user?.role === 'investor',
    isStartup: user?.role === 'startup',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 