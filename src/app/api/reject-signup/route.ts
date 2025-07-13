import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // In a real app, you would:
    // 1. Validate the token against your database
    // 2. Mark the signup request as rejected
    // 3. Optionally send a rejection email to the user

    // Send rejection email to the user (optional)
    const rejectionEmail = await resend.emails.send({
      from: 'A Northumbrian Saga <onboarding@resend.dev>',
      to: [email],
      subject: 'Signup Request Update - A Northumbrian Saga',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #1a1a1a; color: #ffffff;">
          <h1 style="color: #d97706; text-align: center; margin-bottom: 30px;">A Northumbrian Saga</h1>
          <h2 style="color: #f59e0b; margin-bottom: 20px;">Signup Request Update</h2>
          
          <div style="background-color: #374151; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p>Thank you for your interest in joining A Northumbrian Saga.</p>
            <p>Unfortunately, your signup request could not be approved at this time. This may be due to capacity limits or other considerations.</p>
            <p>You're welcome to try again in the future.</p>
          </div>
          
          <p style="text-align: center; color: #9ca3af;">
            Thank you for your understanding.
          </p>
        </div>
      `
    });

    console.log('User rejected:', email, 'Rejection email sent:', rejectionEmail.data?.id);

    // Return a rejection page
    return new NextResponse(`
      <html>
        <head>
          <title>User Rejected - A Northumbrian Saga</title>
          <style>
            body { font-family: Arial, sans-serif; background-color: #1a1a1a; color: #ffffff; padding: 40px; text-align: center; }
            .container { max-width: 600px; margin: 0 auto; background-color: #374151; padding: 40px; border-radius: 8px; }
            h1 { color: #d97706; margin-bottom: 20px; }
            .rejected { color: #dc2626; font-size: 18px; margin-bottom: 20px; }
            .email { color: #f59e0b; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>A Northumbrian Saga</h1>
            <div class="rejected">✗ User Signup Rejected</div>
            <p>The signup request for <span class="email">${email}</span> has been rejected and the user has been notified.</p>
            <p>The user can try again in the future if desired.</p>
          </div>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' }
    });

  } catch (error) {
    console.error('Rejection error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to reject user: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
