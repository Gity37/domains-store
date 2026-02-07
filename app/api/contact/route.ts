import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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

    // Email destination
    const recipientEmail = process.env.EMAIL_USER || 'cgleztarin@hotmail.com';

    // Create nodemailer transporter with Outlook/Hotmail
    const transporter = nodemailer.createTransport({
      host: 'smtp-mail.outlook.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // Tu email de Hotmail/Outlook
        pass: process.env.EMAIL_PASSWORD, // Tu contraseña o App Password
      },
    });

    // Send email
    try {
      await transporter.sendMail({
        from: `"Consultas Dominios" <${process.env.EMAIL_USER}>`, // Tu email
        to: recipientEmail, // Tu email (te envías a ti mismo)
        replyTo: email, // Email del cliente (para que puedas responder directamente)
        subject: `🌐 Nueva consulta de dominio: ${interestedDomain}`,
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
    .info-box { background: white; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #9333ea; }
    .info-row { margin: 10px 0; }
    .label { font-weight: bold; color: #9333ea; }
    .message-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border: 1px solid #e5e7eb; }
    .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">💼 Nueva Consulta de Dominio</h1>
    </div>
    <div class="content">
      <div class="info-box">
        <div class="info-row">
          <span class="label">🌐 Dominio Visitado:</span> <strong>${currentDomain}</strong>
        </div>
        <div class="info-row">
          <span class="label">🎯 Interesado en:</span> <strong>${interestedDomain}</strong>
        </div>
      </div>

      <div class="info-box">
        <h3 style="margin-top: 0; color: #9333ea;">👤 Información del Cliente</h3>
        <div class="info-row">
          <span class="label">Nombre:</span> ${name}
        </div>
        <div class="info-row">
          <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
        </div>
        <div class="info-row">
          <span class="label">Teléfono:</span> ${phone || 'No proporcionado'}
        </div>
      </div>

      <div class="message-box">
        <h3 style="margin-top: 0; color: #9333ea;">💬 Mensaje</h3>
        <p style="margin: 0; white-space: pre-wrap;">${message}</p>
      </div>

      <div class="footer">
        <p>📅 Recibido el ${new Date().toLocaleString('es-ES', { 
          dateStyle: 'full', 
          timeStyle: 'short' 
        })}</p>
        <p>Puedes responder directamente a este email para contactar con el cliente</p>
      </div>
    </div>
  </div>
</body>
</html>
        `,
      });

      console.log('Email sent successfully');

      return NextResponse.json(
        { 
          success: true, 
          message: 'Your inquiry has been received. We will contact you soon!' 
        },
        { status: 200 }
      );
    } catch (emailError: any) {
      console.error('Error sending email:', emailError);
      return NextResponse.json(
        { error: `Failed to send email: ${emailError.message}` },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    );
  }
}
