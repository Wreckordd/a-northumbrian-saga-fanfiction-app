import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple file-based storage for pending signups
const PENDING_FILE = path.join(process.cwd(), 'pending-signups.json');

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

function savePendingSignups(signups: any[]) {
  try {
    fs.writeFileSync(PENDING_FILE, JSON.stringify(signups, null, 2));
  } catch (error) {
    console.error('Error saving pending file:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, password, newsletter, timestamp } = await request.json();
    
    // Generate secure tokens for approval/rejection
    const approvalToken = Math.random().toString(36).substring(2, 15);
    const rejectionToken = Math.random().toString(36).substring(2, 15);
    
    // Store the signup request
    const pendingSignups = getPendingSignups();
    const newSignup = {
      email,
      password,
      newsletter,
      timestamp,
      approvalToken,
      rejectionToken,
      createdAt: new Date().toISOString()
    };
    
    pendingSignups.push(newSignup);
    savePendingSignups(pendingSignups);
    
    console.log('Signup request stored:', { email, newsletter, timestamp, approvalToken, rejectionToken });
    
    // Send email using Resend
    const emailResult = await resend.emails.send({
      from: 'A Northumbrian Saga <onboarding@resend.dev>', // Use Resend's default domain for testing
      to: ['wreckordd@gmail.com'], // Using the verified email address from Resend
      subject: 'New Reader Signup Request - A Northumbrian Saga',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #1a1a1a; color: #ffffff;">
          <h1 style="color: #d97706; text-align: center; margin-bottom: 30px;">A Northumbrian Saga</h1>
          <h2 style="color: #f59e0b; margin-bottom: 20px;">New Reader Signup Request</h2>
          
          <div style="background-color: #374151; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p><strong style="color: #f59e0b;">Email:</strong> ${email}</p>
            <p><strong style="color: #f59e0b;">Newsletter Subscription:</strong> ${newsletter ? 'Yes' : 'No'}</p>
            <p><strong style="color: #f59e0b;">Request Date:</strong> ${new Date(timestamp).toLocaleString()}</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000'}/api/approve-signup?token=${approvalToken}&email=${encodeURIComponent(email)}" 
               style="background-color: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-right: 15px; display: inline-block; font-weight: bold;">
              ✓ APPROVE
            </a>
            <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000'}/api/reject-signup?token=${rejectionToken}&email=${encodeURIComponent(email)}" 
               style="background-color: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
              ✗ REJECT
            </a>
          </div>
          
          <p style="text-align: center; color: #9ca3af; font-style: italic;">
            Click the appropriate button to approve or reject this signup request.
          </p>
          
          <hr style="border: 1px solid #374151; margin: 30px 0;">
          <p style="text-align: center; color: #6b7280; font-size: 12px;">
            This email was sent from A Northumbrian Saga fanfiction app.
          </p>
        </div>
      `
    });

    if (emailResult.error) {
      console.error('Resend error:', emailResult.error);
      return NextResponse.json(
        { success: false, message: 'Failed to send email. Please check your Resend API key.' },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', emailResult.data);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Signup request sent to wreckordbiz@gmail.com for approval',
      emailId: emailResult.data?.id
    });
    
  } catch (error) {
    console.error('Signup request error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process signup request: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
