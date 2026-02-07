import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, interestedDomain, currentDomain } = body;

    // Validate required fields
    if (!name || !email || !message || !interestedDomain) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // In a production environment, you would send an email here
    // For now, we'll log the submission and return success
    // You can integrate with services like SendGrid, Resend, or Nodemailer

    console.log('Contact Form Submission:', {
      name,
      email,
      phone,
      message,
      interestedDomain,
      currentDomain,
      timestamp: new Date().toISOString(),
    });

    // Example email content that would be sent
    const emailContent = {
      to: process.env.CONTACT_EMAIL || 'your-email@example.com',
      subject: `Domain Inquiry: ${interestedDomain}`,
      html: `
        <h2>New Domain Inquiry</h2>
        <p><strong>Domain Visited:</strong> ${currentDomain}</p>
        <p><strong>Interested in:</strong> ${interestedDomain}</p>
        <hr>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><small>Submitted on ${new Date().toLocaleString()}</small></p>
      `,
    };

    // TODO: Send email using your preferred email service
    // Example with SendGrid:
    // await sendEmail(emailContent);

    // For demonstration, we're logging to console
    console.log('Email would be sent:', emailContent);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Your inquiry has been received. We will contact you soon!' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    );
  }
}
