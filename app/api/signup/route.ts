// app/api/signup/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// --- IMPORTANT: This is a placeholder for your database. ---
// In a real application, you would connect to a database (e.g., MongoDB, PostgreSQL)
// and store/retrieve users from there.

// This 'global' variable ensures the user data is shared across API routes
// in development mode without a real database. DO NOT USE IN PRODUCTION.
declare global {
  var __demoUsers: any[] | undefined;
}

global.__demoUsers = global.__demoUsers || [];
const userStore = global.__demoUsers; // Your in-memory "database"


export async function POST(request: Request) {
  try {
    const { 
      email, 
      password, 
      signupType, 
      // Investor fields
      firstName, 
      lastName, 
      investmentFirm, 
      investmentRange, 
      preferredSectors,
      // Startup fields
      founderName, 
      startupName, 
      industrySector, 
      fundingStage, 
      companyDescription 
    } = await request.json();

    if (!email || !password || !signupType) {
      return NextResponse.json({ message: 'Email, password, and signup type are required' }, { status: 400 });
    }

    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ message: 'Invalid email format' }, { status: 400 });
    }

    // Check if user already exists
    if (userStore.find(user => user.email === email)) {
      return NextResponse.json({ message: 'User with this email already exists' }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds: 10

    // Construct user object based on type
    const newUser: any = { 
      id: userStore.length + 1, 
      email, 
      password: hashedPassword,
      type: signupType // Store the type (investor or startup)
    };

    if (signupType === 'investor') {
      Object.assign(newUser, { 
        firstName, 
        lastName, 
        investmentFirm, 
        investmentRange, 
        preferredSectors 
      });
    } else { // startup
      Object.assign(newUser, { 
        founderName, 
        startupName, 
        industrySector, 
        fundingStage, 
        companyDescription 
      });
    }

    // Save user to our in-memory array (replace with DB save in real app)
    userStore.push(newUser);
    console.log("New user signed up:", newUser); // For debugging

    // Create a simple JWT (in a real app, use a strong secret from .env)
    const token = jwt.sign({ userId: newUser.id, email: newUser.email, type: newUser.type }, 'your_jwt_secret', { expiresIn: '1h' });

    return NextResponse.json({ message: 'Account created successfully!', token }, { status: 201 });

  } catch (error) {
    console.error('Signup API error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}