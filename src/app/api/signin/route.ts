import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Simple file-based storage for approved users
const USERS_FILE = path.join(process.cwd(), 'approved-users.json');

function getApprovedUsers() {
  try {
    if (fs.existsSync(USERS_FILE)) {
      const data = fs.readFileSync(USERS_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading users file:', error);
  }
  return [];
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    // Get approved users
    const approvedUsers = getApprovedUsers();
    
    // Find user by email
    const user = approvedUsers.find((u: any) => u.email === email);
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Account not found or not approved yet.' },
        { status: 401 }
      );
    }
    
    // Simple password check (in a real app, you'd hash passwords)
    if (user.password !== password) {
      return NextResponse.json(
        { success: false, message: 'Invalid password.' },
        { status: 401 }
      );
    }
    
    // Successful sign in
    return NextResponse.json({
      success: true,
      message: 'Sign in successful!',
      user: {
        email: user.email,
        newsletter: user.newsletter,
        approvedAt: user.approvedAt
      }
    });
    
  } catch (error) {
    console.error('Sign in error:', error);
    return NextResponse.json(
      { success: false, message: 'Sign in failed. Please try again.' },
      { status: 500 }
    );
  }
}
