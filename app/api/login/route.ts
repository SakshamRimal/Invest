// app/api/login/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// --- IMPORTANT: This is the same placeholder for your database as in signup. ---
// This 'global' variable ensures the user data is shared across API routes
// in development mode without a real database. DO NOT USE IN PRODUCTION.
declare global {
  var __demoUsers: any[] | undefined;
}

global.__demoUsers = global.__demoUsers || [];
const userStore = global.__demoUsers; // Your in-memory "database"


export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    // Find user by email (in a real app, query your database)
    const user = userStore.find(u => u.email === email);

    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Compare provided password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Generate JWT (in a real app, use a strong secret from .env)
    // IMPORTANT: Include user 'type' in the token for frontend to know user role
    const token = jwt.sign({ userId: user.id, email: user.email, type: user.type }, 'your_jwt_secret', { expiresIn: '1h' });

    return NextResponse.json({ message: 'Logged in successfully!', token }, { status: 200 });

  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}