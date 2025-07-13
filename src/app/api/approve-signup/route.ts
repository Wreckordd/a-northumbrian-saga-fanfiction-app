import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple file-based storage for approved users
const USERS_FILE = path.join(process.cwd(), 'approved-users.json');
const PENDING_FILE = path.join(process.cwd(), 'pending-signups.json');

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

function getPendingSignups() {
  try {
    if (fs.existsSync(PENDING_FILE)) {
      const data = fs.readFileSync(PENDING_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading pending file:', error);
  }
  return [];
}

function saveApprovedUsers(users: any[]) {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error saving users file:', error);
  }
}

function savePendingSignups(signups: any[]) {
  try {
    fs.writeFileSync(PENDING_FILE, JSON.stringify(signups, null, 2));
  } catch (error) {
    console.error('Error saving pending file:', error);
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    if (!token || !email) {
      return NextResponse.json(
        { success: false, message: 'Missing token or email' },
        { status: 400 }
      );
    }

    // Find the pending signup by token
    const pendingSignups = getPendingSignups();
    const signupIndex = pendingSignups.findIndex((s: any) => s.approvalToken === token && s.email === email);
    
    if (signupIndex === -1) {
      return new NextResponse(`
        <html>
          <head>
            <title>Invalid Token - A Northumbrian Saga</title>
            <style>
              body { font-family: Arial, sans-serif; background-color: #1a1a1a; color: #ffffff; padding: 40px; text-align: center; }
              .container { max-width: 600px; margin: 0 auto; background-color: #374151; padding: 40px; border-radius: 8px; }
              h1 { color: #d97706; margin-bottom: 20px; }
              .error { color: #dc2626; font-size: 18px; margin-bottom: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>A Northumbrian Saga</h1>
              <div class="error">❌ Invalid or Expired Token</div>
              <p>This approval link is invalid or has already been used.</p>
            </div>
          </body>
        </html>
      `, {
        headers: { 'Content-Type': 'text/html' }
      });
    }

    const signup = pendingSignups[signupIndex];
    
    // Add user to approved users
    const approvedUsers = getApprovedUsers();
    const newUser = {
      email: signup.email,
      password: signup.password,
      newsletter: signup.newsletter,
      approvedAt: new Date().toISOString(),
      approvalToken: token
    };
    
    approvedUsers.push(newUser);
    saveApprovedUsers(approvedUsers);
    
    // Remove from pending signups
    pendingSignups.splice(signupIndex, 1);
    savePendingSignups(pendingSignups);

    // Send welcome email to the approved user
    const welcomeEmail = await resend.emails.send({
      from: 'A Northumbrian Saga <onboarding@resend.dev>',
      to: [email],
      subject: 'Welcome to A Northumbrian Saga!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #1a1a1a; color: #ffffff;">
          <h1 style="color: #d97706; text-align: center; margin-bottom: 30px;">A Northumbrian Saga</h1>
          <h2 style="color: #f59e0b; margin-bottom: 20px;">Welcome, Fellow Reader!</h2>
          
          <div style="background-color: #374151; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p>Your signup request has been approved! You can now access all chapters and leave comments on A Northumbrian Saga.</p>
            <p>Journey through the medieval lands of Northumbria and immerse yourself in this epic fanfiction series.</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000'}/auth/signin" 
               style="background-color: #d97706; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
              Sign In Now
            </a>
          </div>
          
          <p style="text-align: center; color: #9ca3af;">
            Thank you for joining our community of readers!
          </p>
        </div>
      `
    });

    console.log('User approved:', email, 'Welcome email sent:', welcomeEmail.data?.id);

    // Return a success page
    return new NextResponse(`
      <html>
        <head>
          <title>User Approved - A Northumbrian Saga</title>
          <style>
            body { font-family: Arial, sans-serif; background-color: #1a1a1a; color: #ffffff; padding: 40px; text-align: center; }
            .container { max-width: 600px; margin: 0 auto; background-color: #374151; padding: 40px; border-radius: 8px; }
            h1 { color: #d97706; margin-bottom: 20px; }
            .success { color: #16a34a; font-size: 18px; margin-bottom: 20px; }
            .email { color: #f59e0b; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>A Northumbrian Saga</h1>
            <div class="success">✓ User Approved Successfully!</div>
            <p>The user <span class="email">${email}</span> has been approved and notified via email.</p>
            <p>They can now sign in and access all chapters.</p>
          </div>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' }
    });

  } catch (error) {
    console.error('Approval error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to approve user: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
