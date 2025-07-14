import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    const authorPassword = process.env.AUTHOR_PASSWORD;
    if (!authorPassword) {
      console.error('Author password environment variable is not set.');
      return NextResponse.json(
        { success: false, message: 'Server configuration error: author password not set.' },
        { status: 500 }
      );
    }
    
    // Simple password check for author
    if (password === authorPassword) {
      return NextResponse.json({
        success: true,
        message: 'Author login successful!',
        user: {
          role: 'author',
          email: 'author@northumbriasaga.com',
          loginAt: new Date().toISOString()
        }
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid author password.' },
        { status: 401 }
      );
    }
    
  } catch (error) {
    console.error('Author login error:', error);
    return NextResponse.json(
      { success: false, message: 'Login failed. Please try again.' },
      { status: 500 }
    );
  }
}
