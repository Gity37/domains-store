# Domains Store - Next.js Application

A Next.js application for advertising domains for sale. The app displays the current domain being accessed and provides a contact form for interested buyers.

## Features

- 🌐 **Dynamic Domain Detection**: Automatically detects and displays the current domain
- 📋 **Multiple Domains**: Shows a list of other available domains for sale
- 📧 **Contact Form**: Easy-to-use form for potential buyers to express interest
- 🎨 **Responsive Design**: Beautiful, mobile-friendly interface with Tailwind CSS
- ⚡ **Next.js App Router**: Modern Next.js 14+ with TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Gity37/domains-store.git
cd domains-store
```

2. Install dependencies:
```bash
npm install
```

3. Configure your domains:
   - Open `app/page.tsx`
   - Update the `DOMAINS_FOR_SALE` array with your actual domains:
   ```typescript
   const DOMAINS_FOR_SALE = [
     'yourdomain1.com',
     'yourdomain2.com',
     'yourdomain3.com',
   ];
   ```

4. Set up environment variables (optional):
```bash
cp .env.example .env
```
Edit `.env` and add your email configuration.

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

```bash
npm run build
npm start
```

## Configuration

### Email Integration

The contact form currently logs submissions to the console. To enable email sending:

1. Choose an email service provider (SendGrid, Resend, Nodemailer, etc.)
2. Install the necessary package:
   ```bash
   npm install @sendgrid/mail
   # or
   npm install resend
   ```
3. Update `app/api/contact/route.ts` with your email service integration
4. Add your API keys to `.env`

### Example with Resend:

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'onboarding@resend.dev',
  to: process.env.CONTACT_EMAIL,
  subject: `Domain Inquiry: ${interestedDomain}`,
  html: emailContent.html,
});
```

## Deployment

This app can be deployed to:

- **Vercel** (recommended): Deploy with one click
- **Netlify**: Works with Next.js
- **Your own server**: Use `npm run build && npm start`

### Multi-Domain Setup

To serve multiple domains from the same app:

1. Configure your DNS to point all domains to your server
2. Set up your web server (Nginx/Apache) or hosting platform to handle multiple domains
3. The app will automatically detect which domain is being accessed

## Project Structure

```
domains-store/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts        # Contact form API endpoint
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page with domain display
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore file
├── next.config.js              # Next.js configuration
├── package.json                # Dependencies
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## Customization

### Styling

The app uses Tailwind CSS. You can customize the design by:
- Editing `tailwind.config.ts` for theme customization
- Modifying classes in `app/page.tsx`
- Adding custom CSS in `app/globals.css`

### Content

Update the following in `app/page.tsx`:
- Domain list: `DOMAINS_FOR_SALE` array
- Page title and descriptions in `app/layout.tsx`
- Form fields and validation

## License

ISC

## Support

For issues or questions, please open an issue on GitHub.
